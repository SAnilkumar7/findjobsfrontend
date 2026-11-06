// import React, { useCallback, useEffect, useState } from 'react';
// import { useAuth } from '../../context/AuthContext.tsx';
// import { AlertCircle, CheckCircle2, Copy, Download, Loader2, RefreshCw } from 'lucide-react';

// interface AdminReferralsPageProps {
//   navigate: (path: string) => void;
// }

// interface Creator {
//   id: string;
//   name: string;
//   handle?: string | null;
//   platform?: string | null;
//   contact?: string | null;
//   commission_percent: number;
//   is_active: boolean;
// }
// interface AdminJob {
//   id: string;
//   title: string;
//   company_name: string;
//   category_id: string;
//   deadline: string;
//   status: string;
// }
// interface RefLink {
//   id: string;
//   code: string;
//   url: string;
//   job_id: string;
//   job_title?: string | null;
//   category_id?: string | null;
//   creator_id: string;
//   creator_name: string;
//   is_active: boolean;
// }
// interface LinkStat {
//   link_id: string;
//   code: string;
//   url: string;
//   job_title?: string | null;
//   category_id?: string | null;
//   is_active: boolean;
//   clicks: number;
//   unique_visitors: number;
//   signups: number;
//   paid_users: number;
//   revenue: number;
//   commission_earned: number;
//   commission_paid: number;
//   commission_approved: number;
//   commission_in_hold: number;
// }
// interface CreatorStat {
//   creator_id: string;
//   name: string;
//   clicks: number;
//   unique_visitors: number;
//   signups: number;
//   paid_users: number;
//   revenue: number;
//   commission_earned: number;
//   commission_paid: number;
//   commission_approved: number;
//   commission_in_hold: number;
//   payable_now: number;
//   total_paid_out: number;
//   links: LinkStat[];
// }
// interface Stats {
//   creators: CreatorStat[];
//   totals: {
//     clicks: number;
//     signups: number;
//     paid_users: number;
//     revenue: number;
//     commission_earned: number;
//     payable_now: number;
//     total_paid_out: number;
//   };
// }
// interface Conversion {
//   id: string;
//   created_at: string;
//   creator_name: string;
//   job_title?: string | null;
//   user_email?: string | null;
//   payment_id: string;
//   amount_paid: number;
//   commission_percent: number;
//   commission_amount: number;
//   status: string;
//   state: string;
// }

// type Request = (path: string, init?: RequestInit) => Promise<any>;
// type Tab = 'dashboard' | 'creators' | 'links';

// const inr = (n: number) => `₹${(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
// const errMsg = (e: unknown) => (e instanceof Error ? e.message : 'Something went wrong');

// const copyText = async (text: string): Promise<boolean> => {
//   try {
//     await navigator.clipboard.writeText(text);
//     return true;
//   } catch {
//     return false;
//   }
// };

// const inputCls =
//   'w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white';
// const btnPrimary =
//   'px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5';
// const btnGhost =
//   'px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5';

// const stateBadge = (state: string) => {
//   const map: Record<string, string> = {
//     pending: 'bg-amber-50 text-amber-700 border-amber-200',
//     approved: 'bg-indigo-50 text-indigo-700 border-indigo-200',
//     paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
//     reversed: 'bg-rose-50 text-rose-700 border-rose-200',
//   };
//   return `inline-block px-2 py-0.5 rounded-full border text-[11px] font-semibold ${map[state] || 'bg-slate-50 text-slate-600 border-slate-200'}`;
// };

// // ------------------------------------------------------------------ Dashboard
// const DashboardTab: React.FC<{
//   request: Request;
//   adminToken: string | null;
//   creators: Creator[];
//   onError: (m: string) => void;
//   onNotice: (m: string) => void;
// }> = ({ request, adminToken, creators, onError, onNotice }) => {
//   const [stats, setStats] = useState<Stats | null>(null);
//   const [conversions, setConversions] = useState<Conversion[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [creatorId, setCreatorId] = useState('');
//   const [from, setFrom] = useState('');
//   const [to, setTo] = useState('');
//   const [open, setOpen] = useState<string | null>(null);
//   const [payFor, setPayFor] = useState<CreatorStat | null>(null);
//   const [payMethod, setPayMethod] = useState('UPI');
//   const [payRef, setPayRef] = useState('');
//   const [payNote, setPayNote] = useState('');
//   const [paying, setPaying] = useState(false);

//   const qs = useCallback(() => {
//     const p = new URLSearchParams();
//     if (creatorId) p.set('creator_id', creatorId);
//     if (from) p.set('from', from);
//     if (to) p.set('to', to);
//     return p.toString();
//   }, [creatorId, from, to]);

//   const load = useCallback(async () => {
//     setLoading(true);
//     try {
//       const q = qs();
//       const [s, c] = await Promise.all([
//         request(`/api/admin/referrals/stats${q ? `?${q}` : ''}`),
//         request(`/api/admin/referrals/conversions${q ? `?${q}` : ''}`),
//       ]);
//       setStats(s);
//       setConversions(c);
//     } catch (e) {
//       onError(errMsg(e));
//     } finally {
//       setLoading(false);
//     }
//   }, [qs, request, onError]);

//   useEffect(() => {
//     load();
//   }, [load]);

//   const doPayout = async () => {
//     if (!payFor) return;
//     setPaying(true);
//     try {
//       const r = await request(`/api/admin/referrals/creators/${payFor.creator_id}/payouts`, {
//         method: 'POST',
//         body: JSON.stringify({ method: payMethod, reference: payRef, note: payNote }),
//       });
//       onNotice(`Payout of ${inr(r.amount)} recorded for ${payFor.name}.`);
//       setPayFor(null);
//       setPayRef('');
//       setPayNote('');
//       await load();
//     } catch (e) {
//       onError(errMsg(e));
//     } finally {
//       setPaying(false);
//     }
//   };

//   const reverse = async (id: string) => {
//     if (!window.confirm('Reverse this commission? Use this for refunds or fraud. This cannot be undone.')) return;
//     try {
//       await request(`/api/admin/referrals/conversions/${id}/reverse`, { method: 'POST' });
//       onNotice('Commission reversed.');
//       await load();
//     } catch (e) {
//       onError(errMsg(e));
//     }
//   };

//   const exportCsv = async () => {
//     try {
//       const q = qs();
//       const res = await fetch(`/api/admin/referrals/export.csv${q ? `?${q}` : ''}`, {
//         headers: { Authorization: `Bearer ${adminToken}` },
//       });
//       if (!res.ok) throw new Error('Export failed');
//       const blob = await res.blob();
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'referrals.csv';
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       URL.revokeObjectURL(url);
//     } catch (e) {
//       onError(errMsg(e));
//     }
//   };

//   const t = stats?.totals;

//   return (
//     <div className="space-y-5">
//       {/* Filters */}
//       <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-end gap-3">
//         <div className="min-w-[180px]">
//           <label className="block text-[11px] font-semibold text-slate-600 mb-1">Creator</label>
//           <select className={inputCls} value={creatorId} onChange={(e) => setCreatorId(e.target.value)}>
//             <option value="">All creators</option>
//             {creators.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-[11px] font-semibold text-slate-600 mb-1">From</label>
//           <input type="date" className={inputCls} value={from} onChange={(e) => setFrom(e.target.value)} />
//         </div>
//         <div>
//           <label className="block text-[11px] font-semibold text-slate-600 mb-1">To</label>
//           <input type="date" className={inputCls} value={to} onChange={(e) => setTo(e.target.value)} />
//         </div>
//         <button className={btnGhost} onClick={load} disabled={loading}>
//           {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
//           Refresh
//         </button>
//         <button className={btnGhost} onClick={exportCsv}>
//           <Download className="w-3.5 h-3.5" />
//           Export CSV
//         </button>
//         <p className="text-[11px] text-slate-400 w-full">
//           Dates are UTC. Balances (Payable now / Paid out) always show the full total, ignoring the dates.
//         </p>
//       </div>

//       {/* Totals */}
//       {t && (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
//           {[
//             ['Clicks', String(t.clicks)],
//             ['Signups', String(t.signups)],
//             ['Paid users', String(t.paid_users)],
//             ['Revenue', inr(t.revenue)],
//             ['Commission earned', inr(t.commission_earned)],
//             ['Payable now', inr(t.payable_now)],
//           ].map(([label, value]) => (
//             <div key={label} className="bg-white border border-slate-200 rounded-2xl p-4">
//               <div className="text-[11px] text-slate-500 font-medium">{label}</div>
//               <div className="text-lg font-bold text-slate-900 mt-0.5">{value}</div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Per creator */}
//       <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
//         <table className="w-full text-xs">
//           <thead className="bg-slate-50 text-slate-600">
//             <tr>
//               {['Creator', 'Clicks', 'Unique', 'Signups', 'Paid users', 'Revenue', 'Earned', 'In hold', 'Payable now', 'Paid out', ''].map(
//                 (h) => (
//                   <th key={h} className="text-left font-semibold px-3 py-2.5 whitespace-nowrap">
//                     {h}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {stats && stats.creators.length === 0 && (
//               <tr>
//                 <td colSpan={11} className="px-3 py-6 text-center text-slate-400">
//                   No creator links yet. Create a creator, then generate a link in the Links tab.
//                 </td>
//               </tr>
//             )}
//             {stats?.creators.map((c) => (
//               <React.Fragment key={c.creator_id}>
//                 <tr className="border-t border-slate-100 hover:bg-slate-50/60">
//                   <td className="px-3 py-2.5 font-semibold text-slate-900">
//                     <button className="hover:underline" onClick={() => setOpen(open === c.creator_id ? null : c.creator_id)}>
//                       {open === c.creator_id ? '▾' : '▸'} {c.name}
//                     </button>
//                   </td>
//                   <td className="px-3 py-2.5">{c.clicks}</td>
//                   <td className="px-3 py-2.5">{c.unique_visitors}</td>
//                   <td className="px-3 py-2.5">{c.signups}</td>
//                   <td className="px-3 py-2.5">{c.paid_users}</td>
//                   <td className="px-3 py-2.5">{inr(c.revenue)}</td>
//                   <td className="px-3 py-2.5">{inr(c.commission_earned)}</td>
//                   <td className="px-3 py-2.5">{inr(c.commission_in_hold)}</td>
//                   <td className="px-3 py-2.5 font-semibold text-indigo-700">{inr(c.payable_now)}</td>
//                   <td className="px-3 py-2.5">{inr(c.total_paid_out)}</td>
//                   <td className="px-3 py-2.5">
//                     <button className={btnPrimary} disabled={c.payable_now <= 0} onClick={() => setPayFor(c)}>
//                       Pay
//                     </button>
//                   </td>
//                 </tr>
//                 {open === c.creator_id &&
//                   c.links.map((l) => (
//                     <tr key={l.link_id} className="bg-slate-50/70 border-t border-slate-100 text-slate-600">
//                       <td className="px-3 py-2 pl-7">
//                         {l.job_title || 'Job'} <span className="text-slate-400">({l.category_id})</span>
//                         {!l.is_active && <span className="ml-1 text-rose-500">inactive</span>}
//                       </td>
//                       <td className="px-3 py-2">{l.clicks}</td>
//                       <td className="px-3 py-2">{l.unique_visitors}</td>
//                       <td className="px-3 py-2">{l.signups}</td>
//                       <td className="px-3 py-2">{l.paid_users}</td>
//                       <td className="px-3 py-2">{inr(l.revenue)}</td>
//                       <td className="px-3 py-2">{inr(l.commission_earned)}</td>
//                       <td className="px-3 py-2">{inr(l.commission_in_hold)}</td>
//                       <td className="px-3 py-2">{inr(l.commission_approved)}</td>
//                       <td className="px-3 py-2">{inr(l.commission_paid)}</td>
//                       <td className="px-3 py-2" />
//                     </tr>
//                   ))}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Conversions */}
//       <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
//         <div className="px-4 py-3 border-b border-slate-100 text-sm font-bold text-slate-900">Credited purchases</div>
//         <table className="w-full text-xs">
//           <thead className="bg-slate-50 text-slate-600">
//             <tr>
//               {['Date', 'Creator', 'Job', 'User', 'Paid', 'Rate', 'Commission', 'Status', ''].map((h) => (
//                 <th key={h} className="text-left font-semibold px-3 py-2.5 whitespace-nowrap">
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {conversions.length === 0 && (
//               <tr>
//                 <td colSpan={9} className="px-3 py-6 text-center text-slate-400">
//                   No credited purchases yet.
//                 </td>
//               </tr>
//             )}
//             {conversions.map((cv) => (
//               <tr key={cv.id} className="border-t border-slate-100">
//                 <td className="px-3 py-2 whitespace-nowrap">{new Date(cv.created_at + 'Z').toLocaleString('en-IN')}</td>
//                 <td className="px-3 py-2">{cv.creator_name}</td>
//                 <td className="px-3 py-2">{cv.job_title || '-'}</td>
//                 <td className="px-3 py-2">{cv.user_email || '-'}</td>
//                 <td className="px-3 py-2">{inr(cv.amount_paid)}</td>
//                 <td className="px-3 py-2">{cv.commission_percent}%</td>
//                 <td className="px-3 py-2 font-semibold">{inr(cv.commission_amount)}</td>
//                 <td className="px-3 py-2">
//                   <span className={stateBadge(cv.state)}>{cv.state}</span>
//                 </td>
//                 <td className="px-3 py-2">
//                   {cv.status === 'pending' && (
//                     <button className="text-rose-600 hover:underline font-semibold" onClick={() => reverse(cv.id)}>
//                       Reverse
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <p className="px-4 py-2 text-[11px] text-slate-400">
//           Pending = inside the 7-day refund window. Approved = payable. Showing the latest 200.
//         </p>
//       </div>

//       {/* Payout dialog */}
//       {payFor && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60">
//           <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
//             <h3 className="text-base font-bold text-slate-900">Record payout to {payFor.name}</h3>
//             <p className="text-xs text-slate-600">
//               Amount (calculated automatically): <strong>{inr(payFor.payable_now)}</strong>. Pay the creator first, then record it
//               here.
//             </p>
//             <div>
//               <label className="block text-[11px] font-semibold text-slate-600 mb-1">Method</label>
//               <input className={inputCls} value={payMethod} onChange={(e) => setPayMethod(e.target.value)} placeholder="UPI / Bank" />
//             </div>
//             <div>
//               <label className="block text-[11px] font-semibold text-slate-600 mb-1">Reference (UPI transaction ID)</label>
//               <input className={inputCls} value={payRef} onChange={(e) => setPayRef(e.target.value)} />
//             </div>
//             <div>
//               <label className="block text-[11px] font-semibold text-slate-600 mb-1">Note (optional)</label>
//               <input className={inputCls} value={payNote} onChange={(e) => setPayNote(e.target.value)} />
//             </div>
//             <div className="flex justify-end gap-2 pt-1">
//               <button className={btnGhost} onClick={() => setPayFor(null)} disabled={paying}>
//                 Cancel
//               </button>
//               <button className={btnPrimary} onClick={doPayout} disabled={paying}>
//                 {paying && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
//                 Confirm payout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ------------------------------------------------------------------ Creators
// const CreatorsTab: React.FC<{
//   request: Request;
//   creators: Creator[];
//   onChanged: () => Promise<void>;
//   onError: (m: string) => void;
//   onNotice: (m: string) => void;
// }> = ({ request, creators, onChanged, onError, onNotice }) => {
//   const [name, setName] = useState('');
//   const [handle, setHandle] = useState('');
//   const [platform, setPlatform] = useState('instagram');
//   const [contact, setContact] = useState('');
//   const [commission, setCommission] = useState('10');
//   const [saving, setSaving] = useState(false);
//   const [edits, setEdits] = useState<Record<string, string>>({});

//   const create = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       await request('/api/admin/referrals/creators', {
//         method: 'POST',
//         body: JSON.stringify({
//           name,
//           handle: handle || undefined,
//           platform,
//           contact: contact || undefined,
//           commission_percent: Number(commission) || 0,
//         }),
//       });
//       onNotice(`Creator "${name}" added.`);
//       setName('');
//       setHandle('');
//       setContact('');
//       await onChanged();
//     } catch (err) {
//       onError(errMsg(err));
//     } finally {
//       setSaving(false);
//     }
//   };

//   const patch = async (id: string, body: Record<string, unknown>, okMsg: string) => {
//     try {
//       await request(`/api/admin/referrals/creators/${id}`, { method: 'PATCH', body: JSON.stringify(body) });
//       onNotice(okMsg);
//       setEdits((prev) => {
//         const next = { ...prev };
//         delete next[id];
//         return next;
//       });
//       await onChanged();
//     } catch (err) {
//       onError(errMsg(err));
//     }
//   };

//   return (
//     <div className="space-y-5">
//       <form onSubmit={create} className="bg-white border border-slate-200 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
//         <div className="md:col-span-2">
//           <label className="block text-[11px] font-semibold text-slate-600 mb-1">Creator name *</label>
//           <input className={inputCls} required minLength={2} value={name} onChange={(e) => setName(e.target.value)} />
//         </div>
//         <div>
//           <label className="block text-[11px] font-semibold text-slate-600 mb-1">Handle</label>
//           <input className={inputCls} value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="@username" />
//         </div>
//         <div>
//           <label className="block text-[11px] font-semibold text-slate-600 mb-1">Platform</label>
//           <select className={inputCls} value={platform} onChange={(e) => setPlatform(e.target.value)}>
//             {['instagram', 'youtube', 'telegram', 'whatsapp', 'other'].map((p) => (
//               <option key={p} value={p}>
//                 {p}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-[11px] font-semibold text-slate-600 mb-1">Contact (email / phone)</label>
//           <input className={inputCls} value={contact} onChange={(e) => setContact(e.target.value)} />
//         </div>
//         <div>
//           <label className="block text-[11px] font-semibold text-slate-600 mb-1">Commission %</label>
//           <input className={inputCls} type="number" min={0} max={100} step="0.5" value={commission} onChange={(e) => setCommission(e.target.value)} />
//         </div>
//         <div className="md:col-span-6">
//           <button className={btnPrimary} type="submit" disabled={saving}>
//             {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
//             Add creator
//           </button>
//           <span className="ml-3 text-[11px] text-slate-400">
//             Contact is used to block self-referrals (a creator buying through their own link earns nothing).
//           </span>
//         </div>
//       </form>

//       <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
//         <table className="w-full text-xs">
//           <thead className="bg-slate-50 text-slate-600">
//             <tr>
//               {['Creator', 'Platform', 'Contact', 'Commission %', 'Status', ''].map((h) => (
//                 <th key={h} className="text-left font-semibold px-3 py-2.5">
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {creators.length === 0 && (
//               <tr>
//                 <td colSpan={6} className="px-3 py-6 text-center text-slate-400">
//                   No creators yet.
//                 </td>
//               </tr>
//             )}
//             {creators.map((c) => {
//               const value = edits[c.id] ?? String(c.commission_percent);
//               const changed = edits[c.id] !== undefined && Number(edits[c.id]) !== c.commission_percent;
//               return (
//                 <tr key={c.id} className="border-t border-slate-100">
//                   <td className="px-3 py-2.5 font-semibold text-slate-900">
//                     {c.name} {c.handle && <span className="text-slate-400 font-normal">{c.handle}</span>}
//                   </td>
//                   <td className="px-3 py-2.5">{c.platform || '-'}</td>
//                   <td className="px-3 py-2.5">{c.contact || '-'}</td>
//                   <td className="px-3 py-2.5">
//                     <div className="flex items-center gap-2">
//                       <input
//                         className="w-20 px-2 py-1 border border-slate-300 rounded-lg text-xs"
//                         type="number"
//                         min={0}
//                         max={100}
//                         step="0.5"
//                         value={value}
//                         onChange={(e) => setEdits((prev) => ({ ...prev, [c.id]: e.target.value }))}
//                       />
//                       {changed && (
//                         <button
//                           className="text-indigo-600 font-semibold hover:underline"
//                           onClick={() => patch(c.id, { commission_percent: Number(edits[c.id]) }, 'Commission updated (applies to future purchases only).')}
//                         >
//                           Save
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-3 py-2.5">
//                     <span className={stateBadge(c.is_active ? 'paid' : 'reversed')}>{c.is_active ? 'active' : 'inactive'}</span>
//                   </td>
//                   <td className="px-3 py-2.5">
//                     <button
//                       className={btnGhost}
//                       onClick={() => patch(c.id, { is_active: !c.is_active }, c.is_active ? 'Creator deactivated.' : 'Creator activated.')}
//                     >
//                       {c.is_active ? 'Deactivate' : 'Activate'}
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // ------------------------------------------------------------------ Links
// const LinksTab: React.FC<{
//   request: Request;
//   creators: Creator[];
//   jobs: AdminJob[];
//   onError: (m: string) => void;
//   onNotice: (m: string) => void;
// }> = ({ request, creators, jobs, onError, onNotice }) => {
//   const [jobId, setJobId] = useState('');
//   const [creatorId, setCreatorId] = useState('');
//   const [filterCreator, setFilterCreator] = useState('');
//   const [links, setLinks] = useState<RefLink[]>([]);
//   const [busy, setBusy] = useState(false);

//   const loadLinks = useCallback(async () => {
//     try {
//       const q = filterCreator ? `?creator_id=${encodeURIComponent(filterCreator)}` : '';
//       setLinks(await request(`/api/admin/referrals/links${q}`));
//     } catch (e) {
//       onError(errMsg(e));
//     }
//   }, [filterCreator, request, onError]);

//   useEffect(() => {
//     loadLinks();
//   }, [loadLinks]);

//   const generate = async () => {
//     if (!jobId || !creatorId) return;
//     setBusy(true);
//     try {
//       const l: RefLink = await request('/api/admin/referrals/links', {
//         method: 'POST',
//         body: JSON.stringify({ job_id: jobId, creator_id: creatorId }),
//       });
//       const ok = await copyText(`${l.job_title || 'Job'}\nApply here 👉 ${l.url}`);
//       onNotice(ok ? 'Link created and share message copied.' : `Link created: ${l.url}`);
//       await loadLinks();
//     } catch (e) {
//       onError(errMsg(e));
//     } finally {
//       setBusy(false);
//     }
//   };

//   const toggle = async (l: RefLink) => {
//     try {
//       await request(`/api/admin/referrals/links/${l.id}`, { method: 'PATCH', body: JSON.stringify({ is_active: !l.is_active }) });
//       onNotice(l.is_active ? 'Link deactivated.' : 'Link activated.');
//       await loadLinks();
//     } catch (e) {
//       onError(errMsg(e));
//     }
//   };

//   const copy = async (text: string, label: string) => {
//     const ok = await copyText(text);
//     onNotice(ok ? `${label} copied.` : 'Could not copy. Select and copy manually.');
//   };

//   const activeCreators = creators.filter((c) => c.is_active);

//   return (
//     <div className="space-y-5">
//       <div className="bg-white border border-slate-200 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
//         <div className="md:col-span-2">
//           <label className="block text-[11px] font-semibold text-slate-600 mb-1">Job</label>
//           <select className={inputCls} value={jobId} onChange={(e) => setJobId(e.target.value)}>
//             <option value="">Select a job...</option>
//             {jobs.map((j) => (
//               <option key={j.id} value={j.id}>
//                 {j.title} - {j.company_name} ({j.category_id}, deadline {j.deadline})
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="md:col-span-2">
//           <label className="block text-[11px] font-semibold text-slate-600 mb-1">Creator</label>
//           <select className={inputCls} value={creatorId} onChange={(e) => setCreatorId(e.target.value)}>
//             <option value="">Select a creator...</option>
//             {activeCreators.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name} ({c.commission_percent}%)
//               </option>
//             ))}
//           </select>
//         </div>
//         <button className={btnPrimary} onClick={generate} disabled={busy || !jobId || !creatorId}>
//           {busy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
//           Generate link
//         </button>
//         <p className="md:col-span-5 text-[11px] text-slate-400">
//           One link per job and creator. Generating again for the same pair returns the same link.
//         </p>
//       </div>

//       <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
//         <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
//           <span className="text-sm font-bold text-slate-900">All links</span>
//           <select className="px-2 py-1 border border-slate-300 rounded-lg text-xs" value={filterCreator} onChange={(e) => setFilterCreator(e.target.value)}>
//             <option value="">All creators</option>
//             {creators.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <table className="w-full text-xs">
//           <thead className="bg-slate-50 text-slate-600">
//             <tr>
//               {['Creator', 'Job', 'Link', 'Status', ''].map((h) => (
//                 <th key={h} className="text-left font-semibold px-3 py-2.5">
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {links.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="px-3 py-6 text-center text-slate-400">
//                   No links yet.
//                 </td>
//               </tr>
//             )}
//             {links.map((l) => (
//               <tr key={l.id} className="border-t border-slate-100">
//                 <td className="px-3 py-2.5 font-semibold text-slate-900">{l.creator_name}</td>
//                 <td className="px-3 py-2.5">
//                   {l.job_title || 'Job'} <span className="text-slate-400">({l.category_id})</span>
//                 </td>
//                 <td className="px-3 py-2.5 font-mono text-slate-600">{l.url}</td>
//                 <td className="px-3 py-2.5">
//                   <span className={stateBadge(l.is_active ? 'paid' : 'reversed')}>{l.is_active ? 'active' : 'inactive'}</span>
//                 </td>
//                 <td className="px-3 py-2.5">
//                   <div className="flex flex-wrap gap-1.5">
//                     <button className={btnGhost} onClick={() => copy(l.url, 'Link')}>
//                       <Copy className="w-3 h-3" /> Link
//                     </button>
//                     <button className={btnGhost} onClick={() => copy(`${l.job_title || 'Job'}\nApply here 👉 ${l.url}`, 'Share message')}>
//                       <Copy className="w-3 h-3" /> Message
//                     </button>
//                     <button className={btnGhost} onClick={() => toggle(l)}>
//                       {l.is_active ? 'Deactivate' : 'Activate'}
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // ------------------------------------------------------------------ Page
// export const AdminReferralsPage: React.FC<AdminReferralsPageProps> = ({ navigate }) => {
//   const { adminToken } = useAuth();
//   const [tab, setTab] = useState<Tab>('dashboard');
//   const [creators, setCreators] = useState<Creator[]>([]);
//   const [jobs, setJobs] = useState<AdminJob[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [notice, setNotice] = useState<string | null>(null);

//   const request: Request = useCallback(
//     async (path, init) => {
//       const res = await fetch(path, {
//         ...init,
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${adminToken}`,
//           ...(init?.headers || {}),
//         },
//       });
//       let data: any = {};
//       try {
//         data = await res.json();
//       } catch {
//         /* non-JSON body */
//       }
//       if (!res.ok) {
//         const d = data?.detail;
//         throw new Error(typeof d === 'string' ? d : Array.isArray(d) ? d[0]?.msg || 'Invalid input' : 'Request failed');
//       }
//       return data;
//     },
//     [adminToken]
//   );

//   const loadBase = useCallback(async () => {
//     try {
//       const [c, j] = await Promise.all([request('/api/admin/referrals/creators'), request('/api/admin/jobs')]);
//       setCreators(c);
//       setJobs(j);
//     } catch (e) {
//       setError(errMsg(e));
//     }
//   }, [request]);

//   useEffect(() => {
//     if (!adminToken) {
//       navigate('/admin/login');
//     }
//   }, [adminToken]); // eslint-disable-line react-hooks/exhaustive-deps

//   useEffect(() => {
//     if (adminToken) loadBase();
//   }, [adminToken, loadBase]);

//   useEffect(() => {
//     if (!notice) return;
//     const t = setTimeout(() => setNotice(null), 4000);
//     return () => clearTimeout(t);
//   }, [notice]);

//   const showError = useCallback((m: string) => {
//     setNotice(null);
//     setError(m);
//   }, []);
//   const showNotice = useCallback((m: string) => {
//     setError(null);
//     setNotice(m);
//   }, []);

//   const tabs: [Tab, string][] = [
//     ['dashboard', 'Dashboard'],
//     ['creators', 'Creators'],
//     ['links', 'Links'],
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 space-y-5">
//       <div>
//         <h1 className="text-2xl font-bold text-slate-900">Creator Referrals</h1>
//         <p className="text-xs text-slate-500 mt-1">
//           Create a link per job for each content creator, then see who brought clicks, signups and paid users.
//         </p>
//       </div>

//       <div className="flex gap-2">
//         {tabs.map(([key, label]) => (
//           <button
//             key={key}
//             onClick={() => setTab(key)}
//             className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
//               tab === key ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
//             }`}
//           >
//             {label}
//           </button>
//         ))}
//       </div>

//       {error && (
//         <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
//           <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
//           <span className="flex-1">{error}</span>
//           <button className="font-semibold hover:underline" onClick={() => setError(null)}>
//             Dismiss
//           </button>
//         </div>
//       )}
//       {notice && (
//         <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
//           <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
//           <span>{notice}</span>
//         </div>
//       )}

//       {tab === 'dashboard' && (
//         <DashboardTab request={request} adminToken={adminToken} creators={creators} onError={showError} onNotice={showNotice} />
//       )}
//       {tab === 'creators' && (
//         <CreatorsTab request={request} creators={creators} onChanged={loadBase} onError={showError} onNotice={showNotice} />
//       )}
//       {tab === 'links' && <LinksTab request={request} creators={creators} jobs={jobs} onError={showError} onNotice={showNotice} />}
//     </div>
//   );
// };




















import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { AlertCircle, CheckCircle2, ChevronLeft, Copy, Download, Loader2, RefreshCw } from 'lucide-react';

interface AdminReferralsPageProps {
  navigate: (path: string) => void;
}

interface Creator {
  id: string;
  name: string;
  handle?: string | null;
  platform?: string | null;
  contact?: string | null;
  commission_percent: number;
  is_active: boolean;
}
interface AdminJob {
  id: string;
  title: string;
  company_name: string;
  category_id: string;
  deadline: string;
  status: string;
}
interface RefLink {
  id: string;
  code: string;
  url: string;
  job_id: string;
  job_title?: string | null;
  category_id?: string | null;
  creator_id: string;
  creator_name: string;
  is_active: boolean;
}
interface LinkStat {
  link_id: string;
  code: string;
  url: string;
  job_title?: string | null;
  category_id?: string | null;
  is_active: boolean;
  clicks: number;
  unique_visitors: number;
  signups: number;
  paid_users: number;
  revenue: number;
  commission_earned: number;
  commission_paid: number;
  commission_approved: number;
  commission_in_hold: number;
}
interface CreatorStat {
  creator_id: string;
  name: string;
  clicks: number;
  unique_visitors: number;
  signups: number;
  paid_users: number;
  revenue: number;
  commission_earned: number;
  commission_paid: number;
  commission_approved: number;
  commission_in_hold: number;
  payable_now: number;
  total_paid_out: number;
  links: LinkStat[];
}
interface Stats {
  creators: CreatorStat[];
  totals: {
    clicks: number;
    signups: number;
    paid_users: number;
    revenue: number;
    commission_earned: number;
    payable_now: number;
    total_paid_out: number;
  };
}
interface Conversion {
  id: string;
  created_at: string;
  creator_name: string;
  job_title?: string | null;
  user_email?: string | null;
  payment_id: string;
  amount_paid: number;
  commission_percent: number;
  commission_amount: number;
  status: string;
  state: string;
}

type Request = (path: string, init?: RequestInit) => Promise<any>;
type Tab = 'dashboard' | 'creators' | 'links';

const inr = (n: number) => `₹${(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const errMsg = (e: unknown) => (e instanceof Error ? e.message : 'Something went wrong');

const copyText = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

const inputCls =
  'w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white';
const btnPrimary =
  'px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5';
const btnGhost =
  'px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5';

const stateBadge = (state: string) => {
  const map: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    approved: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    reversed: 'bg-rose-50 text-rose-700 border-rose-200',
  };
  return `inline-block px-2 py-0.5 rounded-full border text-[11px] font-semibold ${map[state] || 'bg-slate-50 text-slate-600 border-slate-200'}`;
};

// ------------------------------------------------------------------ Dashboard
const DashboardTab: React.FC<{
  request: Request;
  adminToken: string | null;
  creators: Creator[];
  onError: (m: string) => void;
  onNotice: (m: string) => void;
}> = ({ request, adminToken, creators, onError, onNotice }) => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [loading, setLoading] = useState(false);
  const [creatorId, setCreatorId] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const [payFor, setPayFor] = useState<CreatorStat | null>(null);
  const [payMethod, setPayMethod] = useState('UPI');
  const [payRef, setPayRef] = useState('');
  const [payNote, setPayNote] = useState('');
  const [paying, setPaying] = useState(false);

  const qs = useCallback(() => {
    const p = new URLSearchParams();
    if (creatorId) p.set('creator_id', creatorId);
    if (from) p.set('from', from);
    if (to) p.set('to', to);
    return p.toString();
  }, [creatorId, from, to]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const q = qs();
      const [s, c] = await Promise.all([
        request(`/api/admin/referrals/stats${q ? `?${q}` : ''}`),
        request(`/api/admin/referrals/conversions${q ? `?${q}` : ''}`),
      ]);
      setStats(s);
      setConversions(c);
    } catch (e) {
      onError(errMsg(e));
    } finally {
      setLoading(false);
    }
  }, [qs, request, onError]);

  useEffect(() => {
    load();
  }, [load]);

  const doPayout = async () => {
    if (!payFor) return;
    setPaying(true);
    try {
      const r = await request(`/api/admin/referrals/creators/${payFor.creator_id}/payouts`, {
        method: 'POST',
        body: JSON.stringify({ method: payMethod, reference: payRef, note: payNote }),
      });
      onNotice(`Payout of ${inr(r.amount)} recorded for ${payFor.name}.`);
      setPayFor(null);
      setPayRef('');
      setPayNote('');
      await load();
    } catch (e) {
      onError(errMsg(e));
    } finally {
      setPaying(false);
    }
  };

  const reverse = async (id: string) => {
    if (!window.confirm('Reverse this commission? Use this for refunds or fraud. This cannot be undone.')) return;
    try {
      await request(`/api/admin/referrals/conversions/${id}/reverse`, { method: 'POST' });
      onNotice('Commission reversed.');
      await load();
    } catch (e) {
      onError(errMsg(e));
    }
  };

  const exportCsv = async () => {
    try {
      const q = qs();
      const res = await fetch(`/api/admin/referrals/export.csv${q ? `?${q}` : ''}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'referrals.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      onError(errMsg(e));
    }
  };

  const t = stats?.totals;

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-end gap-3">
        <div className="min-w-[180px]">
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Creator</label>
          <select className={inputCls} value={creatorId} onChange={(e) => setCreatorId(e.target.value)}>
            <option value="">All creators</option>
            {creators.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">From</label>
          <input type="date" className={inputCls} value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">To</label>
          <input type="date" className={inputCls} value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <button className={btnGhost} onClick={load} disabled={loading}>
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
          Refresh
        </button>
        <button className={btnGhost} onClick={exportCsv}>
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>
        <p className="text-[11px] text-slate-400 w-full">
          Dates are UTC. Balances (Payable now / Paid out) always show the full total, ignoring the dates.
        </p>
      </div>

      {/* Totals */}
      {t && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            ['Clicks', String(t.clicks)],
            ['Signups', String(t.signups)],
            ['Paid users', String(t.paid_users)],
            ['Revenue', inr(t.revenue)],
            ['Commission earned', inr(t.commission_earned)],
            ['Payable now', inr(t.payable_now)],
          ].map(([label, value]) => (
            <div key={label} className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-[11px] text-slate-500 font-medium">{label}</div>
              <div className="text-lg font-bold text-slate-900 mt-0.5">{value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Per creator */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              {['Creator', 'Clicks', 'Unique', 'Signups', 'Paid users', 'Revenue', 'Earned', 'In hold', 'Payable now', 'Paid out', ''].map(
                (h) => (
                  <th key={h} className="text-left font-semibold px-3 py-2.5 whitespace-nowrap">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {stats && stats.creators.length === 0 && (
              <tr>
                <td colSpan={11} className="px-3 py-6 text-center text-slate-400">
                  No creator links yet. Create a creator, then generate a link in the Links tab.
                </td>
              </tr>
            )}
            {stats?.creators.map((c) => (
              <React.Fragment key={c.creator_id}>
                <tr className="border-t border-slate-100 hover:bg-slate-50/60">
                  <td className="px-3 py-2.5 font-semibold text-slate-900">
                    <button className="hover:underline" onClick={() => setOpen(open === c.creator_id ? null : c.creator_id)}>
                      {open === c.creator_id ? '▾' : '▸'} {c.name}
                    </button>
                  </td>
                  <td className="px-3 py-2.5">{c.clicks}</td>
                  <td className="px-3 py-2.5">{c.unique_visitors}</td>
                  <td className="px-3 py-2.5">{c.signups}</td>
                  <td className="px-3 py-2.5">{c.paid_users}</td>
                  <td className="px-3 py-2.5">{inr(c.revenue)}</td>
                  <td className="px-3 py-2.5">{inr(c.commission_earned)}</td>
                  <td className="px-3 py-2.5">{inr(c.commission_in_hold)}</td>
                  <td className="px-3 py-2.5 font-semibold text-indigo-700">{inr(c.payable_now)}</td>
                  <td className="px-3 py-2.5">{inr(c.total_paid_out)}</td>
                  <td className="px-3 py-2.5">
                    <button className={btnPrimary} disabled={c.payable_now <= 0} onClick={() => setPayFor(c)}>
                      Pay
                    </button>
                  </td>
                </tr>
                {open === c.creator_id &&
                  c.links.map((l) => (
                    <tr key={l.link_id} className="bg-slate-50/70 border-t border-slate-100 text-slate-600">
                      <td className="px-3 py-2 pl-7">
                        {l.job_title || 'Job'} <span className="text-slate-400">({l.category_id})</span>
                        {!l.is_active && <span className="ml-1 text-rose-500">inactive</span>}
                      </td>
                      <td className="px-3 py-2">{l.clicks}</td>
                      <td className="px-3 py-2">{l.unique_visitors}</td>
                      <td className="px-3 py-2">{l.signups}</td>
                      <td className="px-3 py-2">{l.paid_users}</td>
                      <td className="px-3 py-2">{inr(l.revenue)}</td>
                      <td className="px-3 py-2">{inr(l.commission_earned)}</td>
                      <td className="px-3 py-2">{inr(l.commission_in_hold)}</td>
                      <td className="px-3 py-2">{inr(l.commission_approved)}</td>
                      <td className="px-3 py-2">{inr(l.commission_paid)}</td>
                      <td className="px-3 py-2" />
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conversions */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
        <div className="px-4 py-3 border-b border-slate-100 text-sm font-bold text-slate-900">Credited purchases</div>
        <table className="w-full text-xs">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              {['Date', 'Creator', 'Job', 'User', 'Paid', 'Rate', 'Commission', 'Status', ''].map((h) => (
                <th key={h} className="text-left font-semibold px-3 py-2.5 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {conversions.length === 0 && (
              <tr>
                <td colSpan={9} className="px-3 py-6 text-center text-slate-400">
                  No credited purchases yet.
                </td>
              </tr>
            )}
            {conversions.map((cv) => (
              <tr key={cv.id} className="border-t border-slate-100">
                <td className="px-3 py-2 whitespace-nowrap">{new Date(cv.created_at + 'Z').toLocaleString('en-IN')}</td>
                <td className="px-3 py-2">{cv.creator_name}</td>
                <td className="px-3 py-2">{cv.job_title || '-'}</td>
                <td className="px-3 py-2">{cv.user_email || '-'}</td>
                <td className="px-3 py-2">{inr(cv.amount_paid)}</td>
                <td className="px-3 py-2">{cv.commission_percent}%</td>
                <td className="px-3 py-2 font-semibold">{inr(cv.commission_amount)}</td>
                <td className="px-3 py-2">
                  <span className={stateBadge(cv.state)}>{cv.state}</span>
                </td>
                <td className="px-3 py-2">
                  {cv.status === 'pending' && (
                    <button className="text-rose-600 hover:underline font-semibold" onClick={() => reverse(cv.id)}>
                      Reverse
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="px-4 py-2 text-[11px] text-slate-400">
          Pending = inside the 7-day refund window. Approved = payable. Showing the latest 200.
        </p>
      </div>

      {/* Payout dialog */}
      {payFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            <h3 className="text-base font-bold text-slate-900">Record payout to {payFor.name}</h3>
            <p className="text-xs text-slate-600">
              Amount (calculated automatically): <strong>{inr(payFor.payable_now)}</strong>. Pay the creator first, then record it
              here.
            </p>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Method</label>
              <input className={inputCls} value={payMethod} onChange={(e) => setPayMethod(e.target.value)} placeholder="UPI / Bank" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Reference (UPI transaction ID)</label>
              <input className={inputCls} value={payRef} onChange={(e) => setPayRef(e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Note (optional)</label>
              <input className={inputCls} value={payNote} onChange={(e) => setPayNote(e.target.value)} />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button className={btnGhost} onClick={() => setPayFor(null)} disabled={paying}>
                Cancel
              </button>
              <button className={btnPrimary} onClick={doPayout} disabled={paying}>
                {paying && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Confirm payout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ------------------------------------------------------------------ Creators
const CreatorsTab: React.FC<{
  request: Request;
  creators: Creator[];
  onChanged: () => Promise<void>;
  onError: (m: string) => void;
  onNotice: (m: string) => void;
}> = ({ request, creators, onChanged, onError, onNotice }) => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [contact, setContact] = useState('');
  const [commission, setCommission] = useState('10');
  const [saving, setSaving] = useState(false);
  const [edits, setEdits] = useState<Record<string, string>>({});

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await request('/api/admin/referrals/creators', {
        method: 'POST',
        body: JSON.stringify({
          name,
          handle: handle || undefined,
          platform,
          contact: contact || undefined,
          commission_percent: Number(commission) || 0,
        }),
      });
      onNotice(`Creator "${name}" added.`);
      setName('');
      setHandle('');
      setContact('');
      await onChanged();
    } catch (err) {
      onError(errMsg(err));
    } finally {
      setSaving(false);
    }
  };

  const patch = async (id: string, body: Record<string, unknown>, okMsg: string) => {
    try {
      await request(`/api/admin/referrals/creators/${id}`, { method: 'PATCH', body: JSON.stringify(body) });
      onNotice(okMsg);
      setEdits((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      await onChanged();
    } catch (err) {
      onError(errMsg(err));
    }
  };

  return (
    <div className="space-y-5">
      <form onSubmit={create} className="bg-white border border-slate-200 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
        <div className="md:col-span-2">
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Creator name *</label>
          <input className={inputCls} required minLength={2} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Handle</label>
          <input className={inputCls} value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="@username" />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Platform</label>
          <select className={inputCls} value={platform} onChange={(e) => setPlatform(e.target.value)}>
            {['instagram', 'youtube', 'telegram', 'whatsapp', 'other'].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Contact (email / phone)</label>
          <input className={inputCls} value={contact} onChange={(e) => setContact(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Commission %</label>
          <input className={inputCls} type="number" min={0} max={100} step="0.5" value={commission} onChange={(e) => setCommission(e.target.value)} />
        </div>
        <div className="md:col-span-6">
          <button className={btnPrimary} type="submit" disabled={saving}>
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Add creator
          </button>
          <span className="ml-3 text-[11px] text-slate-400">
            Contact is used to block self-referrals (a creator buying through their own link earns nothing).
          </span>
        </div>
      </form>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              {['Creator', 'Platform', 'Contact', 'Commission %', 'Status', ''].map((h) => (
                <th key={h} className="text-left font-semibold px-3 py-2.5">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {creators.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-slate-400">
                  No creators yet.
                </td>
              </tr>
            )}
            {creators.map((c) => {
              const value = edits[c.id] ?? String(c.commission_percent);
              const changed = edits[c.id] !== undefined && Number(edits[c.id]) !== c.commission_percent;
              return (
                <tr key={c.id} className="border-t border-slate-100">
                  <td className="px-3 py-2.5 font-semibold text-slate-900">
                    {c.name} {c.handle && <span className="text-slate-400 font-normal">{c.handle}</span>}
                  </td>
                  <td className="px-3 py-2.5">{c.platform || '-'}</td>
                  <td className="px-3 py-2.5">{c.contact || '-'}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <input
                        className="w-20 px-2 py-1 border border-slate-300 rounded-lg text-xs"
                        type="number"
                        min={0}
                        max={100}
                        step="0.5"
                        value={value}
                        onChange={(e) => setEdits((prev) => ({ ...prev, [c.id]: e.target.value }))}
                      />
                      {changed && (
                        <button
                          className="text-indigo-600 font-semibold hover:underline"
                          onClick={() => patch(c.id, { commission_percent: Number(edits[c.id]) }, 'Commission updated (applies to future purchases only).')}
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={stateBadge(c.is_active ? 'paid' : 'reversed')}>{c.is_active ? 'active' : 'inactive'}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <button
                      className={btnGhost}
                      onClick={() => patch(c.id, { is_active: !c.is_active }, c.is_active ? 'Creator deactivated.' : 'Creator activated.')}
                    >
                      {c.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------ Links
const LinksTab: React.FC<{
  request: Request;
  creators: Creator[];
  jobs: AdminJob[];
  onError: (m: string) => void;
  onNotice: (m: string) => void;
}> = ({ request, creators, jobs, onError, onNotice }) => {
  const [jobId, setJobId] = useState('');
  const [creatorId, setCreatorId] = useState('');
  const [filterCreator, setFilterCreator] = useState('');
  const [links, setLinks] = useState<RefLink[]>([]);
  const [busy, setBusy] = useState(false);

  const loadLinks = useCallback(async () => {
    try {
      const q = filterCreator ? `?creator_id=${encodeURIComponent(filterCreator)}` : '';
      setLinks(await request(`/api/admin/referrals/links${q}`));
    } catch (e) {
      onError(errMsg(e));
    }
  }, [filterCreator, request, onError]);

  useEffect(() => {
    loadLinks();
  }, [loadLinks]);

  const generate = async () => {
    if (!jobId || !creatorId) return;
    setBusy(true);
    try {
      const l: RefLink = await request('/api/admin/referrals/links', {
        method: 'POST',
        body: JSON.stringify({ job_id: jobId, creator_id: creatorId }),
      });
      const ok = await copyText(`${l.job_title || 'Job'}\nApply here 👉 ${l.url}`);
      onNotice(ok ? 'Link created and share message copied.' : `Link created: ${l.url}`);
      await loadLinks();
    } catch (e) {
      onError(errMsg(e));
    } finally {
      setBusy(false);
    }
  };

  const toggle = async (l: RefLink) => {
    try {
      await request(`/api/admin/referrals/links/${l.id}`, { method: 'PATCH', body: JSON.stringify({ is_active: !l.is_active }) });
      onNotice(l.is_active ? 'Link deactivated.' : 'Link activated.');
      await loadLinks();
    } catch (e) {
      onError(errMsg(e));
    }
  };

  const copy = async (text: string, label: string) => {
    const ok = await copyText(text);
    onNotice(ok ? `${label} copied.` : 'Could not copy. Select and copy manually.');
  };

  const activeCreators = creators.filter((c) => c.is_active);

  return (
    <div className="space-y-5">
      <div className="bg-white border border-slate-200 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
        <div className="md:col-span-2">
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Job</label>
          <select className={inputCls} value={jobId} onChange={(e) => setJobId(e.target.value)}>
            <option value="">Select a job...</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title} - {j.company_name} ({j.category_id}, deadline {j.deadline})
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Creator</label>
          <select className={inputCls} value={creatorId} onChange={(e) => setCreatorId(e.target.value)}>
            <option value="">Select a creator...</option>
            {activeCreators.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.commission_percent}%)
              </option>
            ))}
          </select>
        </div>
        <button className={btnPrimary} onClick={generate} disabled={busy || !jobId || !creatorId}>
          {busy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Generate link
        </button>
        <p className="md:col-span-5 text-[11px] text-slate-400">
          One link per job and creator. Generating again for the same pair returns the same link.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
          <span className="text-sm font-bold text-slate-900">All links</span>
          <select className="px-2 py-1 border border-slate-300 rounded-lg text-xs" value={filterCreator} onChange={(e) => setFilterCreator(e.target.value)}>
            <option value="">All creators</option>
            {creators.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <table className="w-full text-xs">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              {['Creator', 'Job', 'Link', 'Status', ''].map((h) => (
                <th key={h} className="text-left font-semibold px-3 py-2.5">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {links.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-slate-400">
                  No links yet.
                </td>
              </tr>
            )}
            {links.map((l) => (
              <tr key={l.id} className="border-t border-slate-100">
                <td className="px-3 py-2.5 font-semibold text-slate-900">{l.creator_name}</td>
                <td className="px-3 py-2.5">
                  {l.job_title || 'Job'} <span className="text-slate-400">({l.category_id})</span>
                </td>
                <td className="px-3 py-2.5 font-mono text-slate-600">{l.url}</td>
                <td className="px-3 py-2.5">
                  <span className={stateBadge(l.is_active ? 'paid' : 'reversed')}>{l.is_active ? 'active' : 'inactive'}</span>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex flex-wrap gap-1.5">
                    <button className={btnGhost} onClick={() => copy(l.url, 'Link')}>
                      <Copy className="w-3 h-3" /> Link
                    </button>
                    <button className={btnGhost} onClick={() => copy(`${l.job_title || 'Job'}\nApply here 👉 ${l.url}`, 'Share message')}>
                      <Copy className="w-3 h-3" /> Message
                    </button>
                    <button className={btnGhost} onClick={() => toggle(l)}>
                      {l.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------ Page
export const AdminReferralsPage: React.FC<AdminReferralsPageProps> = ({ navigate }) => {
  const { adminToken } = useAuth();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [creators, setCreators] = useState<Creator[]>([]);
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const request: Request = useCallback(
    async (path, init) => {
      const res = await fetch(path, {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
          ...(init?.headers || {}),
        },
      });
      let data: any = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON body */
      }
      if (!res.ok) {
        const d = data?.detail;
        throw new Error(typeof d === 'string' ? d : Array.isArray(d) ? d[0]?.msg || 'Invalid input' : 'Request failed');
      }
      return data;
    },
    [adminToken]
  );

  const loadBase = useCallback(async () => {
    try {
      const [c, j] = await Promise.all([request('/api/admin/referrals/creators'), request('/api/admin/jobs')]);
      setCreators(c);
      setJobs(j);
    } catch (e) {
      setError(errMsg(e));
    }
  }, [request]);

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
    }
  }, [adminToken]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (adminToken) loadBase();
  }, [adminToken, loadBase]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(t);
  }, [notice]);

  const showError = useCallback((m: string) => {
    setNotice(null);
    setError(m);
  }, []);
  const showNotice = useCallback((m: string) => {
    setError(null);
    setNotice(m);
  }, []);

  const tabs: [Tab, string][] = [
    ['dashboard', 'Dashboard'],
    ['creators', 'Creators'],
    ['links', 'Links'],
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-5">
      {/* Back to the Admin Console */}
      <button
        onClick={() => navigate('/admin/dashboard')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Admin Console
      </button>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Creator Referrals</h1>
        <p className="text-xs text-slate-500 mt-1">
          Create a link per job for each content creator, then see who brought clicks, signups and paid users.
        </p>
      </div>

      <div className="flex gap-2">
        {tabs.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
              tab === key ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span className="flex-1">{error}</span>
          <button className="font-semibold hover:underline" onClick={() => setError(null)}>
            Dismiss
          </button>
        </div>
      )}
      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>{notice}</span>
        </div>
      )}

      {tab === 'dashboard' && (
        <DashboardTab request={request} adminToken={adminToken} creators={creators} onError={showError} onNotice={showNotice} />
      )}
      {tab === 'creators' && (
        <CreatorsTab request={request} creators={creators} onChanged={loadBase} onError={showError} onNotice={showNotice} />
      )}
      {tab === 'links' && <LinksTab request={request} creators={creators} jobs={jobs} onError={showError} onNotice={showNotice} />}
    </div>
  );
};