import React, { useState } from 'react';
import type { Package } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { usePackages } from '../context/PackagesContext.tsx';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ArrowRight,
  AlertCircle,
  Loader2,
  Sparkles,
  CreditCard,
} from 'lucide-react';

interface PaymentModalProps {
  packageItem: Package;
  onClose: () => void;
  onSuccess: (packageSlug: string) => void;
  navigate: (path: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  packageItem,
  onClose,
  onSuccess,
  navigate,
}) => {
  const { user, token, refreshAccess } = useAuth();
  const { formatPrice } = usePackages();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [verifiedPayment, setVerifiedPayment] = useState<any>(null);

  const isAllAccess = packageItem.slug === 'all';

  const handleProceedToPayment = async () => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Create order on server (server looks up price from DB)
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ package_id: packageItem.id }),
      });

      if (!orderRes.ok) {
        const errData = await orderRes.json();
        throw new Error(errData.detail || 'Failed to initialize payment order');
      }

      const orderData = await orderRes.json();

      if (!(window as any).Razorpay) {
        throw new Error('Payment gateway failed to load. Please refresh and try again.');
      }

      // Real Razorpay checkout flow
      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'JobAccess India',
        description: `Unlock ${packageItem.name}`,
        order_id: orderData.order_id,
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone || '',
        },
        theme: {
          color: '#4f46e5',
        },
        handler: async function (response: any) {
          try {
            setLoading(true);
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                package_id: packageItem.id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verifyRes.ok) {
              const vErr = await verifyRes.json();
              throw new Error(vErr.detail || 'Payment signature verification failed.');
            }

            const verifyData = await verifyRes.json();
            setVerifiedPayment(verifyData);
            await refreshAccess();
            setSuccess(true);
            onSuccess(packageItem.slug);
          } catch (verErr: any) {
            setError(verErr.message || 'Payment verification failed');
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        setError(resp.error?.description || 'Payment was declined or cancelled');
        setLoading(false);
      });
      rzp.open();
    } catch (err: any) {
      console.error('Payment flow error:', err);
      setError(err.message || 'Payment processing failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-base">
            <Lock className="w-4 h-4 text-indigo-600" />
            <span>{success ? 'Payment Successful' : 'Secure Razorpay Checkout'}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {success ? (
            /* Success State */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Access Unlocked Instantly!
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                  Your payment of <strong className="text-slate-900">{formatPrice(packageItem.price)}</strong> has been verified. Access to{' '}
                  <strong className="text-indigo-600">{packageItem.name}</strong> is now active.
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-left text-xs space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment ID:</span>
                  <span className="font-mono text-slate-800 font-medium">
                    {verifiedPayment?.payment_id || 'pay_verified'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Category Unlocked:</span>
                  <span className="font-semibold text-emerald-700">
                    {isAllAccess ? 'All Categories (IT, Non-IT, Banking)' : packageItem.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Access Duration:</span>
                  <span className="text-slate-800 font-medium">Unlimited Access</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                {isAllAccess ? (
                  <>
                    <button
                      onClick={() => {
                        onClose();
                        navigate('/jobs/it');
                      }}
                      className="flex-1 py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      IT Jobs <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        navigate('/jobs/banking');
                      }}
                      className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      Banking Jobs <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      onClose();
                      navigate(`/jobs/${packageItem.slug}`);
                    }}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    Browse Unlocked Jobs Now <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Order Checkout Details */
            <div className="space-y-5">
              {/* Package Banner */}
              <div className={`p-4 rounded-xl border ${
                isAllAccess
                  ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    {isAllAccess && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full mb-1 uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" /> Best Value Bundle
                      </span>
                    )}
                    <h3 className="font-bold text-slate-900 text-lg">
                      {packageItem.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {packageItem.description}
                    </p>
                  </div>
                  <div className="text-right pl-3">
                    <div className="text-2xl font-extrabold text-slate-900">
                      {formatPrice(packageItem.price)}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      One-time fee
                    </span>
                  </div>
                </div>
              </div>

              {/* Inclusions */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  What&apos;s Included:
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant access to verified job listings in this category</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct links to original employer application pages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>View full requirements, salary ranges, and eligibility criteria</span>
                  </div>
                  {isAllAccess && (
                    <div className="flex items-center gap-2 font-medium text-indigo-700">
                      <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Unlocks all 3 categories (IT + Non-IT + Banking) forever</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>No recurring monthly subscriptions or hidden charges</span>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold">Payment Failed: </strong>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Trust badges */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-slate-500" /> 256-bit SSL Encrypted
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Idempotent Access
                </span>
                <span>Powered by Razorpay</span>
              </div>

              {/* Payment Button */}
              <div className="pt-1">
                <button
                  id="btn-trigger-razorpay"
                  disabled={loading}
                  onClick={handleProceedToPayment}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-xl text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Verifying Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" /> Pay {formatPrice(packageItem.price)} via Razorpay
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};