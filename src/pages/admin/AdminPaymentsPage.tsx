import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { usePackages } from '../../context/PackagesContext.tsx';
import type { AdminPaymentView } from '../../types/index.ts';
import {
  CreditCard,
  Search,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  TrendingUp,
} from 'lucide-react';

interface AdminPaymentsPageProps {
  navigate: (path: string) => void;
}

export const AdminPaymentsPage: React.FC<AdminPaymentsPageProps> = ({ navigate }) => {
  const { adminToken } = useAuth();
  const { formatPrice } = usePackages();
  const [payments, setPayments] = useState<AdminPaymentView[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!adminToken) return;

    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/payments', {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        if (res.ok) {
          const data = await res.json();
          setPayments(data);
        }
      } catch (err) {
        console.error('Failed to load payments', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [adminToken]);

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.email.toLowerCase().includes(q) ||
      p.package_name.toLowerCase().includes(q) ||
      p.order_id.toLowerCase().includes(q) ||
      (p.payment_id && p.payment_id.toLowerCase().includes(q))
    );
  });

  const totalCollected = payments
    .filter((p) => p.status === 'Successful')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => navigate('/admin/dashboard')}
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-4"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Payment Transactions & Orders
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Idempotent Razorpay transaction logs with verified signatures
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-900">
            Total Settled: <strong>{formatPrice(totalCollected)}</strong>
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search email, package, or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <span className="text-xs text-slate-400 font-medium">
          {filtered.length} Orders
        </span>
      </div>

      {/* Payments Table (Section 8: user, email, package, amount, Razorpay order ID, payment ID, status, date) */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-16 text-center text-slate-400">
            <Loader2 className="w-7 h-7 animate-spin mx-auto text-indigo-600 mb-2" />
            <p className="text-xs">Loading transactions...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-1">
            <CreditCard className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-700">No payment logs found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">User / Email</th>
                  <th className="py-3 px-4">Package</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Razorpay Order ID</th>
                  <th className="py-3 px-4">Payment ID</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((pay) => {
                  const dateStr = new Date(pay.created_at).toLocaleString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <tr key={pay.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-900">
                        {pay.email}
                      </td>
                      <td className="py-3 px-4 font-semibold text-indigo-700">
                        {pay.package_name}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {formatPrice(pay.amount)}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                        {pay.order_id}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                        {pay.payment_id || '—'}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            pay.status === 'Successful'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : pay.status === 'Refunded'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {pay.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-400">
                        {dateStr}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
