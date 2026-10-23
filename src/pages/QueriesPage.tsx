import React, { useRef, useState } from 'react';
import { Mail, Clock, ChevronDown } from 'lucide-react';

type ContactMethod = 'whatsapp' | 'email';
type FieldKey = 'name' | 'email' | 'phone' | 'canCall' | 'subject' | 'message';

// WhatsApp number (India country code 91 + 9663910713)
const WHATSAPP_NUMBER = '919663910713';
const WHATSAPP_DISPLAY = 'Opens your whatsapp app';

// The email address that receives queries. Put your support email here,
// for example: const SUPPORT_EMAIL = 'support@yourdomain.com';
const SUPPORT_EMAIL = '';

const RESPONSE_TIME = '24 to 48 hours';

// Original WhatsApp logo (brand glyph, brand green by default)
const WhatsAppLogo: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#25D366',
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill={color}
    role="img"
    aria-label="WhatsApp"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface QueriesPageProps {
  navigate: (path: string) => void;
}

export const QueriesPage: React.FC<QueriesPageProps> = () => {
  const [contactMethod, setContactMethod] = useState<ContactMethod | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [canCall, setCanCall] = useState<'' | 'yes' | 'no'>(''); // can we call this number?
  const [subject, setSubject] = useState('');
  const [jobRef, setJobRef] = useState(''); // job title or link (optional)
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const isWhatsApp = contactMethod === 'whatsapp';

  const pickContactMethod = (method: ContactMethod) => {
    const firstPick = contactMethod === null;
    setContactMethod(method);
    setError('');
    // First tap: the form appears, so bring it into view
    if (firstPick) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  };

  // Clear a field's error as soon as the user edits it
  const clearFieldError = (key: FieldKey) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<FieldKey, string>> = {};
    if (!name.trim()) e.name = 'Please enter your name.';
    if (!email.trim()) e.email = 'Please enter your email.';
    else if (!EMAIL_REGEX.test(email.trim())) e.email = 'Please enter a valid email address.';
    const digits = phone.replace(/\D/g, '');
    if (!phone.trim()) e.phone = 'Please enter your phone number.';
    else if (digits.length < 10 || digits.length > 15)
      e.phone = 'Please enter a valid phone number (10 to 15 digits).';
    if (!canCall) e.canCall = 'Please choose Yes or No.';
    if (!subject.trim()) e.subject = 'Please enter a subject.';
    if (!message.trim()) e.message = 'Please describe your query.';
    else if (message.trim().length < 10) e.message = 'Please write at least 10 characters.';
    return e;
  };

  // Returns true when every required field is valid
  const validateAll = () => {
    const found = validate();
    setErrors(found);
    const firstKey = (
      ['name', 'email', 'phone', 'canCall', 'subject', 'message'] as FieldKey[]
    ).find((k) => found[k]);
    if (firstKey) {
      setError('Please fill in the highlighted fields.');
      document.getElementById(`q-${firstKey}`)?.focus();
      return false;
    }
    return true;
  };

  const buildWhatsAppUrl = () => {
    const lines = [
      'Hi FindMyJobs team,',
      '',
      `*Name:* ${name.trim()}`,
      `*Email:* ${email.trim()}`,
      `*Phone:* ${phone.trim()}`,
      `*Can we call you?* ${canCall === 'yes' ? 'Yes' : 'No'}`,
      `*Subject:* ${subject.trim()}`,
      jobRef.trim() ? `*Job:* ${jobRef.trim()}` : '',
      '',
      message.trim(),
    ].filter((line, i, arr) => !(line === '' && arr[i - 1] === ''));
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const buildEmailParts = () => {
    const lines = [
      'Hi FindMyJobs team,',
      '',
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim()}`,
      `Can we call you? ${canCall === 'yes' ? 'Yes' : 'No'}`,
      jobRef.trim() ? `Job title or link: ${jobRef.trim()}` : '',
      '',
      message.trim(),
    ].filter((line, i, arr) => !(line === '' && arr[i - 1] === ''));
    return {
      subject: `FindMyJobs query: ${subject.trim()}`,
      body: lines.join('\r\n'),
    };
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');
    if (!contactMethod) return;

    // All of these fields are required, for both WhatsApp and Email
    if (!validateAll()) return;

    // Option 1: continue on WhatsApp (opens chat with the message pre-filled)
    if (isWhatsApp) {
      window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer');
      return;
    }

    // Option 2: continue in Email (opens the email app with the message pre-filled)
    if (!SUPPORT_EMAIL) {
      setError('Email is not set up yet. Please use WhatsApp for now.');
      return;
    }
    const { subject: s, body } = buildEmailParts();
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      s
    )}&body=${encodeURIComponent(body)}`;
  };

  // For people without a mail app on their computer
  const handleOpenGmail = () => {
    setError('');
    if (!validateAll()) return;
    if (!SUPPORT_EMAIL) {
      setError('Email is not set up yet. Please use WhatsApp for now.');
      return;
    }
    const { subject: s, body } = buildEmailParts();
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      SUPPORT_EMAIL
    )}&su=${encodeURIComponent(s)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const labelCls = 'block text-sm font-medium text-slate-700 mb-1.5';
  const baseInput =
    'w-full h-12 rounded-xl border bg-slate-50/60 px-4 text-base placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-4';
  const okBorder = isWhatsApp
    ? 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100';
  const badBorder = 'border-rose-400 focus:border-rose-500 focus:ring-rose-100';
  const inputFor = (key: FieldKey) =>
    `${baseInput} text-slate-900 ${errors[key] ? badBorder : okBorder}`;
  const plainInput = `${baseInput} text-slate-900 ${okBorder}`;
  const textareaCls = inputFor('message').replace('h-12', 'min-h-[9rem] py-3 resize-y');
  const selectCls = `${baseInput} appearance-none pr-11 ${
    canCall === '' ? 'text-slate-400' : 'text-slate-900'
  } ${errors.canCall ? badBorder : okBorder}`;

  const Required = () => (
    <span className="text-rose-500" aria-hidden="true">
      {' '}
      *
    </span>
  );
  const FieldError: React.FC<{ field: FieldKey }> = ({ field }) =>
    errors[field] ? (
      <p id={`q-${field}-error`} className="mt-1.5 text-xs text-rose-600">
        {errors[field]}
      </p>
    ) : null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-16">
      {/* Heading */}
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          How can we help?
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-prose">
          Questions about your job, your access or your plan? Tell us how you would like to hear back.
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
          <Clock className="w-4 h-4" />
          We respond within {RESPONSE_TIME}
        </p>
      </header>

      {/* Card */}
      <div className="mt-6 sm:mt-8 rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Contact method */}
          <fieldset>
            <legend className="text-sm font-medium text-slate-700 mb-3">
              How would you like to reach us?
            </legend>
            <div role="radiogroup" aria-label="Contact method" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                id="queries-method-email"
                type="button"
                role="radio"
                aria-checked={contactMethod === 'email'}
                onClick={() => pickContactMethod('email')}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  contactMethod === 'email'
                    ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span className="w-11 h-11 shrink-0 rounded-full bg-white border border-slate-100 shadow-xs flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-600" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-slate-900">Email</span>
                  <span className="block text-xs text-slate-500 truncate">Opens your email app</span>
                </span>
              </button>

              <button
                id="queries-method-whatsapp"
                type="button"
                role="radio"
                aria-checked={isWhatsApp}
                onClick={() => pickContactMethod('whatsapp')}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isWhatsApp
                    ? 'border-[#25D366] bg-emerald-50/50 ring-1 ring-[#25D366]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span className="w-11 h-11 shrink-0 rounded-full bg-white border border-slate-100 shadow-xs flex items-center justify-center">
                  <WhatsAppLogo className="w-6 h-6" />
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-slate-900">
                    WhatsApp
                    <span className="whitespace-nowrap shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
                      Fastest reply
                    </span>
                  </span>
                  <span className="block text-xs text-slate-500 truncate">{WHATSAPP_DISPLAY}</span>
                </span>
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              {contactMethod === null
                ? 'Tap Email or WhatsApp to open the form. For a faster response, choose WhatsApp.'
                : 'For a faster response, choose WhatsApp.'}
            </p>
          </fieldset>

          {/* The form opens as soon as Email or WhatsApp is tapped */}
          {contactMethod && (
            <div
              ref={formRef}
              className="scroll-mt-20 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300"
            >
              <div className="space-y-5">
                <p className="text-xs text-slate-500">
                  Fields marked <span className="text-rose-500">*</span> are required.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="q-name" className={labelCls}>
                      Your name
                      <Required />
                    </label>
                    <input
                      id="q-name"
                      className={inputFor('name')}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        clearFieldError('name');
                      }}
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'q-name-error' : undefined}
                      maxLength={100}
                    />
                    <FieldError field="name" />
                  </div>

                  <div>
                    <label htmlFor="q-email" className={labelCls}>
                      Email
                      <Required />
                    </label>
                    <input
                      id="q-email"
                      type="email"
                      className={inputFor('email')}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearFieldError('email');
                      }}
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'q-email-error' : undefined}
                      maxLength={200}
                    />
                    <FieldError field="email" />
                  </div>

                  <div>
                    <label htmlFor="q-phone" className={labelCls}>
                      Phone number
                      <Required />
                    </label>
                    <input
                      id="q-phone"
                      type="tel"
                      inputMode="tel"
                      className={inputFor('phone')}
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        clearFieldError('phone');
                      }}
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'q-phone-error' : undefined}
                      maxLength={20}
                    />
                    <FieldError field="phone" />
                  </div>

                  <div>
                    <label htmlFor="q-canCall" className={labelCls}>
                      Can we call this number?
                      <Required />
                    </label>
                    <div className="relative">
                      <select
                        id="q-canCall"
                        className={selectCls}
                        value={canCall}
                        onChange={(e) => {
                          setCanCall(e.target.value as '' | 'yes' | 'no');
                          clearFieldError('canCall');
                        }}
                        aria-required="true"
                        aria-invalid={!!errors.canCall}
                        aria-describedby={errors.canCall ? 'q-canCall-error' : undefined}
                      >
                        <option value="" disabled>
                          Yes or No
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                        aria-hidden="true"
                      />
                    </div>
                    <FieldError field="canCall" />
                  </div>
                </div>

                <div>
                  <label htmlFor="q-subject" className={labelCls}>
                    Subject
                    <Required />
                  </label>
                  <input
                    id="q-subject"
                    className={inputFor('subject')}
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      clearFieldError('subject');
                    }}
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'q-subject-error' : undefined}
                    maxLength={150}
                  />
                  <FieldError field="subject" />
                </div>

                <div>
                  <label htmlFor="q-ref" className={labelCls}>
                    Job title or link <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <input
                    id="q-ref"
                    className={plainInput}
                    value={jobRef}
                    onChange={(e) => setJobRef(e.target.value)}
                    placeholder="Job title, company or link"
                    maxLength={300}
                  />
                </div>

                <div>
                  <label htmlFor="q-message" className={labelCls}>
                    Describe your query
                    <Required />
                  </label>
                  <textarea
                    id="q-message"
                    className={textareaCls}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      clearFieldError('message');
                    }}
                    placeholder="Which job or plan is this about? What do you need help with?"
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'q-message-error' : undefined}
                    maxLength={3000}
                  />
                  <div className="mt-1.5 flex items-start justify-between gap-3">
                    <div>
                      <FieldError field="message" />
                    </div>
                    <span className="ml-auto text-xs text-slate-400">{message.length} / 3000</span>
                  </div>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3"
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="space-y-3">
                <button
                  id="queries-submit"
                  type="submit"
                  className="w-full h-12 inline-flex items-center justify-center gap-2.5 rounded-xl bg-slate-900 text-white text-base font-semibold hover:bg-slate-800 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300"
                >
                  {isWhatsApp ? (
                    <>
                      <WhatsAppLogo className="w-5 h-5" />
                      Continue on WhatsApp
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Continue in Email
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-500">
                  {isWhatsApp
                    ? 'WhatsApp opens with your message ready to send. Nothing is sent until you press send there.'
                    : 'Your email app opens with your message ready to send. Nothing is sent until you press send there.'}
                </p>
                {!isWhatsApp && (
                  <p className="text-center text-xs text-slate-500">
                    No email app on this device?{' '}
                    <button
                      id="queries-open-gmail"
                      type="button"
                      onClick={handleOpenGmail}
                      className="font-medium text-indigo-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                    >
                      Open in Gmail
                    </button>
                  </p>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};