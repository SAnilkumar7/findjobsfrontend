// // import React from 'react';

// // interface AboutPageProps {
// //   navigate: (path: string) => void;
// // }

// // export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
// //   return (
// //     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
// //       {/* Heading */}
// //       <div className="text-center space-y-3">
// //         <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
// //           About Us
// //         </h1>
// //         <p className="text-slate-500 max-w-2xl mx-auto">
// //           We help job seekers find genuine job openings in one place, with direct
// //           application links and no middlemen.
// //         </p>
// //       </div>

// //       {/* Mission / What we do / Why us */}
// //       <div className="grid sm:grid-cols-3 gap-5">
// //         <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
// //           <h3 className="font-bold text-slate-900">Our Mission</h3>
// //           <p className="text-sm text-slate-600 leading-relaxed">
// //             Make job hunting simple, fast and trustworthy for everyone.
// //           </p>
// //         </div>
// //         <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
// //           <h3 className="font-bold text-slate-900">What We Do</h3>
// //           <p className="text-sm text-slate-600 leading-relaxed">
// //             We list verified IT, Non-IT and Banking jobs, with full details and the
// //             official apply link or contact number.
// //           </p>
// //         </div>
// //         <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
// //           <h3 className="font-bold text-slate-900">Why Choose Us</h3>
// //           <p className="text-sm text-slate-600 leading-relaxed">
// //             One-time payment, instant access, and regularly updated listings.
// //           </p>
// //         </div>
// //       </div>

// //       {/* Call to action */}
// //       <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
// //         <div>
// //           <h4 className="font-bold text-slate-900 text-sm">Ready to find your next job?</h4>
// //           <p className="text-xs text-slate-600">Browse jobs or check our plans.</p>
// //         </div>
// //         <div className="flex gap-2">
// //           <button
// //             onClick={() => navigate('/jobs/all')}
// //             className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors"
// //           >
// //             Browse Jobs
// //           </button>
// //           <button
// //             onClick={() => navigate('/pricing')}
// //             className="px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-white font-semibold rounded-xl text-xs transition-colors"
// //           >
// //             View Pricing
// //           </button>
// //         </div>
// //       </div>

// //       {/* Contact */}
// //       <p className="text-center text-sm text-slate-500">
// //         Questions? Reach us on the{' '}
// //         <button
// //           onClick={() => navigate('/queries')}
// //           className="text-indigo-600 font-semibold hover:underline"
// //         >
// //           Queries page
// //         </button>
// //         .
// //       </p>
// //     </div>
// //   );
// // };











// import React, { useEffect, useRef, useState } from 'react';

// interface AboutPageProps {
//   navigate: (path: string) => void;
// }

// /* ------------------------------------------------------------------ */
// /* EDIT THIS BLOCK: your real company details.                         */
// /* Leave a text value as '' to hide that line on the page.             */
// /* ------------------------------------------------------------------ */
// const COMPANY = {
//   name: 'FindMyJobs',
//   location: '', // e.g. 'Bengaluru, Karnataka'
//   supportEmail: '', // e.g. 'support@yourdomain.com'
//   supportHours: '', // e.g. 'Mon to Sat, 10:00 AM to 6:00 PM IST'
// };

// // Optional: put your own image here (for example '/images/about.png' from
// // your public folder). Leave '' to use the built-in 3D illustration.
// const HEADER_IMAGE = '';

// /* ------------------------------ Content ----------------------------- */

// const SECTIONS = [
//   { id: 'story', label: 'Our story' },
//   { id: 'mission', label: 'Mission and vision' },
//   { id: 'coverage', label: 'What we cover' },
//   { id: 'process', label: 'How we verify' },
//   { id: 'values', label: 'Our values' },
//   { id: 'faq', label: 'FAQ' },
//   { id: 'contact', label: 'Contact' },
// ];

// const COVERAGE = [
//   {
//     title: 'IT jobs',
//     text: 'Software development, data, testing, support and IT-services roles.',
//     points: ['Fresher and experienced roles', 'Skills and experience required', 'Official careers-page link'],
//   },
//   {
//     title: 'Non-IT jobs',
//     text: 'Private-sector roles across sales, operations, administration, logistics and customer service.',
//     points: ['Eligibility and location', 'Employer contact or apply link', 'Last date to apply'],
//   },
//   {
//     title: 'Banking jobs',
//     text: 'Openings from public and private sector banks.',
//     points: ['Eligibility and age criteria', 'Notification details', 'Official application link'],
//   },
// ];

// const PROCESS = [
//   {
//     title: 'Check the source',
//     text: 'Each opening is traced to an official company page, a published notification or a direct employer contact.',
//   },
//   {
//     title: 'Record the details',
//     text: 'We note the role, location, eligibility, salary where published, and the last date to apply.',
//   },
//   {
//     title: 'Link to the employer',
//     text: 'Every listing carries the employer’s own apply link or contact number, so you apply directly.',
//   },
//   {
//     title: 'Keep it current',
//     text: 'Listings are refreshed regularly. Expired or reported openings are reviewed and removed.',
//   },
// ];

// const VALUES = [
//   {
//     title: 'Accuracy first',
//     text: 'A short, correct listing is better than a long one we cannot stand behind.',
//   },
//   {
//     title: 'Direct, no middlemen',
//     text: 'You apply on the employer’s own channel. We never stand between you and the company.',
//   },
//   {
//     title: 'Transparent pricing',
//     text: 'One-time payment, shown on the pricing page before you pay. No hidden charges.',
//   },
//   {
//     title: 'Respect for your data',
//     text: 'We collect only what is needed to run your account and sign-in, and we do not sell personal data.',
//   },
//   {
//     title: 'Accountability',
//     text: 'If a listing is wrong or suspicious, you can report it and we will review it.',
//   },
//   {
//     title: 'Honest expectations',
//     text: 'We help you find openings. We cannot promise interviews or selection.',
//   },
// ];

// const FAQS = [
//   {
//     q: 'What does the one-time payment give me?',
//     a: 'Access to the full job listings, including official apply links and contact details. The pricing page shows the exact plan details.',
//   },
//   {
//     q: 'Are you a recruitment agency or an employer?',
//     a: 'No. We are a job information service. We publish openings and point you to the employer. We do not hire on behalf of companies or take part in selection.',
//   },
//   {
//     q: 'Will anyone ask me for money to get a job?',
//     a: 'Genuine employers do not charge candidates for interviews or selection. If a listing asks for such a payment, report it on the Queries page and we will review it.',
//   },
//   {
//     q: 'How do I report an expired or incorrect listing?',
//     a: 'Use the Queries page and include the job title and company. We will check it and update or remove the listing.',
//   },
// ];

// /* ------------------------------ Pieces ------------------------------ */

// const primaryBtn =
//   'inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2';

// const Section: React.FC<{
//   id: string;
//   title: string;
//   subtitle?: string;
//   children: React.ReactNode;
// }> = ({ id, title, subtitle, children }) => (
//   <section id={id} className="scroll-mt-28 pt-14 first:pt-0">
//     <div className="max-w-2xl mb-8 space-y-2">
//       <h2 className="text-2xl sm:text-[1.75rem] font-bold text-slate-900 tracking-tight">
//         {title}
//       </h2>
//       {subtitle && <p className="text-slate-600 leading-relaxed">{subtitle}</p>}
//     </div>
//     {children}
//   </section>
// );

// const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="border-b border-slate-200">
//       <button
//         type="button"
//         onClick={() => setOpen(!open)}
//         aria-expanded={open}
//         className="w-full flex items-center justify-between gap-4 py-4 text-left rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
//       >
//         <span className="font-semibold text-slate-900">{q}</span>
//         <svg
//           className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
//           viewBox="0 0 20 20"
//           fill="currentColor"
//           aria-hidden="true"
//         >
//           <path
//             fillRule="evenodd"
//             d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>
//       {open && <p className="pb-4 pr-10 text-slate-600 leading-relaxed">{a}</p>}
//     </div>
//   );
// };

// /**
//  * One interactive 3D image. The layers tilt towards the mouse (or finger)
//  * and move apart in depth. Respects "reduce motion". If HEADER_IMAGE is set,
//  * that single image gets the same tilt instead of the built-in layers.
//  */
// const TiltImage: React.FC = () => {
//   const ref = useRef<HTMLDivElement>(null);
//   const reduceMotion =
//     typeof window !== 'undefined' &&
//     window.matchMedia &&
//     window.matchMedia('(prefers-reduced-motion: reduce)').matches;

//   const tilt = (clientX: number, clientY: number) => {
//     const el = ref.current;
//     if (!el || reduceMotion) return;
//     const r = el.getBoundingClientRect();
//     const px = (clientX - r.left) / r.width - 0.5;
//     const py = (clientY - r.top) / r.height - 0.5;
//     el.style.transform = `rotateX(${(-py * 16).toFixed(2)}deg) rotateY(${(px * 22).toFixed(2)}deg)`;
//   };
//   const reset = () => {
//     if (ref.current) ref.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
//   };

//   const layer = (z: number): React.CSSProperties => ({
//     transform: `translateZ(${z}px)`,
//     transformStyle: 'preserve-3d',
//   });

//   return (
//     <div
//       className="relative mx-auto w-full max-w-md h-72 sm:h-80 select-none"
//       style={{ perspective: '1100px' }}
//       onMouseMove={(e) => tilt(e.clientX, e.clientY)}
//       onMouseLeave={reset}
//       onTouchMove={(e) => tilt(e.touches[0].clientX, e.touches[0].clientY)}
//       onTouchEnd={reset}
//       role="img"
//       aria-label="Illustration of a verified job listing with an official apply button"
//     >
//       <div
//         ref={ref}
//         className="absolute inset-0 transition-transform duration-200 ease-out"
//         style={{ transformStyle: 'preserve-3d' }}
//       >
//         {HEADER_IMAGE ? (
//           <img
//             src={HEADER_IMAGE}
//             alt=""
//             className="absolute inset-0 h-full w-full object-contain"
//             draggable={false}
//           />
//         ) : (
//           <>
//             {/* Back layer: the three categories */}
//             <div
//               className="absolute inset-0 rounded-3xl bg-indigo-50 border border-indigo-100 shadow-xl shadow-indigo-100/70 p-6"
//               style={layer(0)}
//             >
//               <div className="flex gap-2">
//                 {['IT', 'Non-IT', 'Banking'].map((t) => (
//                   <span
//                     key={t}
//                     className="rounded-full bg-white border border-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700"
//                   >
//                     {t}
//                   </span>
//                 ))}
//               </div>
//               <div className="mt-5 space-y-3">
//                 {[0, 1, 2].map((i) => (
//                   <div key={i} className="flex items-center gap-3">
//                     <span className="h-8 w-8 rounded-lg bg-indigo-100" />
//                     <span className="h-2.5 flex-1 rounded-full bg-indigo-100" />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Middle layer: a verified listing */}
//             <div
//               className="absolute left-8 right-4 top-24 sm:top-28 rounded-2xl bg-white border border-slate-200 shadow-2xl shadow-slate-300/60 p-5"
//               style={layer(55)}
//             >
//               <div className="flex items-start justify-between gap-3">
//                 <div>
//                   <p className="text-sm font-bold text-slate-900">Software Engineer</p>
//                   <p className="text-xs text-slate-500">Company name, City</p>
//                 </div>
//                 <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
//                   <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//                     <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />
//                     <path d="M9 12l2 2 4-4" />
//                   </svg>
//                   Verified
//                 </span>
//               </div>
//               <div className="mt-4 space-y-2">
//                 <span className="block h-2 w-5/6 rounded-full bg-slate-100" />
//                 <span className="block h-2 w-2/3 rounded-full bg-slate-100" />
//               </div>
//             </div>

//             {/* Front layer: official apply action */}
//             <div
//               className="absolute right-2 bottom-4 sm:bottom-6 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-2xl shadow-indigo-400/50"
//               style={layer(110)}
//             >
//               Apply on the official site
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// /* -------------------------------- Page ------------------------------ */

// export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
//   const [active, setActive] = useState(SECTIONS[0].id);

//   // Scroll-spy: highlight the section that is currently in view.
//   useEffect(() => {
//     if (typeof IntersectionObserver === 'undefined') return;
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((e) => {
//           if (e.isIntersecting) setActive(e.target.id);
//         });
//       },
//       { rootMargin: '-120px 0px -65% 0px', threshold: 0 }
//     );
//     SECTIONS.forEach((s) => {
//       const el = document.getElementById(s.id);
//       if (el) observer.observe(el);
//     });
//     return () => observer.disconnect();
//   }, []);

//   const goTo = (id: string) => {
//     setActive(id);
//     document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   return (
//     <div className="bg-white text-slate-900">
//       {/* Page header */}
//       <header className="border-b border-slate-200">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid lg:grid-cols-2 gap-12 items-center">
//           <div className="space-y-4">
//             <p className="text-sm text-slate-500">Home / About us</p>
//             <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
//               About {COMPANY.name}
//             </h1>
//             <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
//               We are a job information service that collects, checks and organises IT, Non-IT and
//               Banking openings in one place, so job seekers can apply directly to the employer with
//               confidence.
//             </p>
//             {COMPANY.location && (
//               <p className="text-sm text-slate-500">Based in {COMPANY.location}</p>
//             )}
//           </div>

//           <TiltImage />
//         </div>
//       </header>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid lg:grid-cols-4 gap-12">
//         {/* Sticky section navigation (desktop) */}
//         <nav aria-label="On this page" className="hidden lg:block">
//           <div className="sticky top-28 space-y-1 border-l border-slate-200">
//             {SECTIONS.map((s) => (
//               <button
//                 key={s.id}
//                 type="button"
//                 onClick={() => goTo(s.id)}
//                 aria-current={active === s.id ? 'true' : undefined}
//                 className={`block w-full text-left -ml-px pl-4 py-1.5 text-sm border-l-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
//                   active === s.id
//                     ? 'border-indigo-600 text-indigo-700 font-semibold'
//                     : 'border-transparent text-slate-600 hover:text-slate-900'
//                 }`}
//               >
//                 {s.label}
//               </button>
//             ))}
//           </div>
//         </nav>

//         <div className="lg:col-span-3">
//           {/* Scrollable section chips (mobile and tablet) */}
//           <nav
//             aria-label="On this page"
//             className="lg:hidden -mx-4 px-4 mb-8 flex gap-2 overflow-x-auto pb-1"
//           >
//             {SECTIONS.map((s) => (
//               <button
//                 key={s.id}
//                 type="button"
//                 onClick={() => goTo(s.id)}
//                 className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
//                   active === s.id
//                     ? 'border-indigo-600 bg-indigo-600 text-white'
//                     : 'border-slate-300 text-slate-700 hover:bg-slate-50'
//                 }`}
//               >
//                 {s.label}
//               </button>
//             ))}
//           </nav>

//           {/* Story */}
//           <Section id="story" title="Our story">
//             <div className="max-w-2xl space-y-4 text-slate-600 leading-relaxed">
//               <p>
//                 Job seekers lose a lot of time on expired posts, unclear requirements and listings
//                 that pass through third parties before reaching the real employer. Many also get
//                 asked for money for jobs that do not exist.
//               </p>
//               <p>
//                 {COMPANY.name} was started to fix that. We put IT, Non-IT and Banking openings in one
//                 place, check each one against its source, and link you straight to the employer’s
//                 own application page or contact number.
//               </p>
//               <p>
//                 You pay once for access. There are no hidden charges and no commission on your
//                 application, because we are not part of the hiring process.
//               </p>
//             </div>
//           </Section>

//           {/* Mission & vision */}
//           <Section id="mission" title="Mission and vision">
//             <div className="grid sm:grid-cols-2 gap-5">
//               <div className="rounded-2xl border border-slate-200 p-6">
//                 <h3 className="font-bold text-slate-900">Our mission</h3>
//                 <p className="mt-2 text-slate-600 leading-relaxed">
//                   Make job hunting simple, fast and trustworthy by listing only openings that link to
//                   an official source.
//                 </p>
//               </div>
//               <div className="rounded-2xl border border-slate-200 p-6">
//                 <h3 className="font-bold text-slate-900">Our vision</h3>
//                 <p className="mt-2 text-slate-600 leading-relaxed">
//                   A job search where every opening is real, every detail is clear, and nobody pays a
//                   middleman to apply.
//                 </p>
//               </div>
//             </div>
//           </Section>

//           {/* Coverage */}
//           <Section
//             id="coverage"
//             title="What we cover"
//             subtitle="Three categories, each listing with the details you need before you apply."
//           >
//             <div className="grid md:grid-cols-3 gap-5">
//               {COVERAGE.map((c) => (
//                 <div key={c.title} className="rounded-2xl border border-slate-200 p-6 flex flex-col">
//                   <h3 className="font-bold text-slate-900">{c.title}</h3>
//                   <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.text}</p>
//                   <ul className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-sm text-slate-700">
//                     {c.points.map((p) => (
//                       <li key={p} className="flex gap-2">
//                         <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
//                         {p}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </Section>

//           {/* Process: a true sequence, so numbering is meaningful */}
//           <Section
//             id="process"
//             title="How we verify listings"
//             subtitle="Every opening follows the same steps before and after it goes live."
//           >
//             <ol>
//               {PROCESS.map((s, i) => (
//                 <li key={s.title} className="relative flex gap-5 pb-8 last:pb-0">
//                   {i < PROCESS.length - 1 && (
//                     <span
//                       className="absolute left-[17px] top-10 bottom-0 w-px bg-slate-200"
//                       aria-hidden="true"
//                     />
//                   )}
//                   <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-bold">
//                     {i + 1}
//                   </span>
//                   <div className="pt-1">
//                     <h3 className="font-bold text-slate-900">{s.title}</h3>
//                     <p className="mt-1 text-slate-600 leading-relaxed max-w-xl">{s.text}</p>
//                   </div>
//                 </li>
//               ))}
//             </ol>
//           </Section>

//           {/* Values */}
//           <Section id="values" title="Our values">
//             <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-7">
//               {VALUES.map((v) => (
//                 <div key={v.title} className="border-t border-slate-200 pt-4">
//                   <dt className="font-bold text-slate-900">{v.title}</dt>
//                   <dd className="mt-1 text-sm text-slate-600 leading-relaxed">{v.text}</dd>
//                 </div>
//               ))}
//             </dl>
//           </Section>

//           {/* Notice */}
//           <div className="mt-14 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6" role="note">
//             <h3 className="font-semibold text-slate-900">Please note</h3>
//             <p className="mt-1 text-sm text-slate-700 leading-relaxed">
//               {COMPANY.name} is a job information service. We are not an employer or a recruitment
//               agency, and we do not guarantee interviews or selection. Always confirm details on the
//               official source, and never pay money to anyone in order to get a job.
//             </p>
//           </div>

//           {/* FAQ */}
//           <Section id="faq" title="Frequently asked questions">
//             <div className="border-t border-slate-200 max-w-3xl">
//               {FAQS.map((f) => (
//                 <FaqItem key={f.q} q={f.q} a={f.a} />
//               ))}
//             </div>
//           </Section>

//           {/* Contact */}
//           <Section id="contact" title="Contact us">
//             <div className="rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
//               <div className="space-y-1 text-sm">
//                 <p className="text-slate-700">
//                   Questions, feedback or a listing to report? Send it through the Queries page.
//                 </p>
//                 {COMPANY.supportEmail && (
//                   <p>
//                     <span className="text-slate-500">Email: </span>
//                     <a
//                       href={`mailto:${COMPANY.supportEmail}`}
//                       className="text-indigo-600 font-medium hover:underline break-all"
//                     >
//                       {COMPANY.supportEmail}
//                     </a>
//                   </p>
//                 )}
//                 {COMPANY.supportHours && (
//                   <p>
//                     <span className="text-slate-500">Hours: </span>
//                     <span className="text-slate-800">{COMPANY.supportHours}</span>
//                   </p>
//                 )}
//               </div>
//               <button type="button" onClick={() => navigate('/queries')} className={primaryBtn}>
//                 Go to Queries
//               </button>
//             </div>
//           </Section>
//         </div>
//       </div>
//     </div>
//   );
// };



























// import React from 'react';

// interface AboutPageProps {
//   navigate: (path: string) => void;
// }

// export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
//       {/* Heading */}
//       <div className="text-center space-y-3">
//         <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
//           About Us
//         </h1>
//         <p className="text-slate-500 max-w-2xl mx-auto">
//           We help job seekers find genuine job openings in one place, with direct
//           application links and no middlemen.
//         </p>
//       </div>

//       {/* Mission / What we do / Why us */}
//       <div className="grid sm:grid-cols-3 gap-5">
//         <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
//           <h3 className="font-bold text-slate-900">Our Mission</h3>
//           <p className="text-sm text-slate-600 leading-relaxed">
//             Make job hunting simple, fast and trustworthy for everyone.
//           </p>
//         </div>
//         <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
//           <h3 className="font-bold text-slate-900">What We Do</h3>
//           <p className="text-sm text-slate-600 leading-relaxed">
//             We list verified IT, Non-IT and Banking jobs, with full details and the
//             official apply link or contact number.
//           </p>
//         </div>
//         <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
//           <h3 className="font-bold text-slate-900">Why Choose Us</h3>
//           <p className="text-sm text-slate-600 leading-relaxed">
//             One-time payment, instant access, and regularly updated listings.
//           </p>
//         </div>
//       </div>

//       {/* Call to action */}
//       <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
//         <div>
//           <h4 className="font-bold text-slate-900 text-sm">Ready to find your next job?</h4>
//           <p className="text-xs text-slate-600">Browse jobs or check our plans.</p>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => navigate('/jobs/all')}
//             className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors"
//           >
//             Browse Jobs
//           </button>
//           <button
//             onClick={() => navigate('/pricing')}
//             className="px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-white font-semibold rounded-xl text-xs transition-colors"
//           >
//             View Pricing
//           </button>
//         </div>
//       </div>

//       {/* Contact */}
//       <p className="text-center text-sm text-slate-500">
//         Questions? Reach us on the{' '}
//         <button
//           onClick={() => navigate('/queries')}
//           className="text-indigo-600 font-semibold hover:underline"
//         >
//           Queries page
//         </button>
//         .
//       </p>
//     </div>
//   );
// };











import React, { useEffect, useState } from 'react';

interface AboutPageProps {
  navigate: (path: string) => void;
}

/* ------------------------------------------------------------------ */
/* EDIT THIS BLOCK: your real company details.                         */
/* Leave a text value as '' to hide that line on the page.             */
/* ------------------------------------------------------------------ */
const COMPANY = {
  name: 'FindMyJobs',
  location: '', // e.g. 'Bengaluru, Karnataka'
  supportEmail: '', // e.g. 'support@yourdomain.com'
  supportHours: '', // e.g. 'Mon to Sat, 10:00 AM to 6:00 PM IST'
};

/* ------------------------------ Content ----------------------------- */

const SECTIONS = [
  { id: 'story', label: 'Our story' },
  { id: 'mission', label: 'Mission and vision' },
  { id: 'coverage', label: 'What we cover' },
  { id: 'process', label: 'How we verify' },
  { id: 'values', label: 'Our values' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

const COVERAGE = [
  {
    title: 'IT jobs',
    text: 'Software development, data, testing, support and IT-services roles.',
    points: ['Fresher and experienced roles', 'Skills and experience required', 'Official careers-page link'],
  },
  {
    title: 'Non-IT jobs',
    text: 'Private-sector roles across sales, operations, administration, logistics and customer service.',
    points: ['Eligibility and location', 'Employer contact or apply link', 'Last date to apply'],
  },
  {
    title: 'Banking jobs',
    text: 'Openings from public and private sector banks.',
    points: ['Eligibility and age criteria', 'Notification details', 'Official application link'],
  },
];

const PROCESS = [
  {
    title: 'Check the source',
    text: 'Each opening is traced to an official company page, a published notification or a direct employer contact.',
  },
  {
    title: 'Record the details',
    text: 'We note the role, location, eligibility, salary where published, and the last date to apply.',
  },
  {
    title: 'Link to the employer',
    text: 'Every listing carries the employer’s own apply link or contact number, so you apply directly.',
  },
  {
    title: 'Keep it current',
    text: 'Listings are refreshed regularly. Expired or reported openings are reviewed and removed.',
  },
];

const VALUES = [
  {
    title: 'Accuracy first',
    text: 'A short, correct listing is better than a long one we cannot stand behind.',
  },
  {
    title: 'Direct, no middlemen',
    text: 'You apply on the employer’s own channel. We never stand between you and the company.',
  },
  {
    title: 'Transparent pricing',
    text: 'One-time payment, shown on the pricing page before you pay. No hidden charges.',
  },
  {
    title: 'Respect for your data',
    text: 'We collect only what is needed to run your account and sign-in, and we do not sell personal data.',
  },
  {
    title: 'Accountability',
    text: 'If a listing is wrong or suspicious, you can report it and we will review it.',
  },
  {
    title: 'Honest expectations',
    text: 'We help you find openings. We cannot promise interviews or selection.',
  },
];

const FAQS = [
  {
    q: 'What does the one-time payment give me?',
    a: 'Access to the full job listings, including official apply links and contact details. The pricing page shows the exact plan details.',
  },
  {
    q: 'Are you a recruitment agency or an employer?',
    a: 'No. We are a job information service. We publish openings and point you to the employer. We do not hire on behalf of companies or take part in selection.',
  },
  {
    q: 'Will anyone ask me for money to get a job?',
    a: 'Genuine employers do not charge candidates for interviews or selection. If a listing asks for such a payment, report it on the Queries page and we will review it.',
  },
  {
    q: 'How do I report an expired or incorrect listing?',
    a: 'Use the Queries page and include the job title and company. We will check it and update or remove the listing.',
  },
];

/* ------------------------------ Pieces ------------------------------ */

const primaryBtn =
  'inline-flex w-full sm:w-auto items-center justify-center px-5 py-3 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2';

const Section: React.FC<{
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ id, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-24 lg:scroll-mt-28 pt-10 sm:pt-14 first:pt-0">
    <div className="max-w-2xl mb-6 sm:mb-8 space-y-2">
      <h2 className="text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-slate-900 tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{subtitle}</p>}
    </div>
    {children}
  </section>
);

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-4 text-left rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <span className="font-semibold text-slate-900 text-sm sm:text-base">{q}</span>
        <svg
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <p className="pb-4 pr-2 sm:pr-10 text-sm sm:text-base text-slate-600 leading-relaxed">{a}</p>
      )}
    </div>
  );
};

/* -------------------------------- Page ------------------------------ */

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const [active, setActive] = useState(SECTIONS[0].id);

  // Scroll-spy: highlight the section that is currently in view.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-120px 0px -65% 0px', threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-white text-slate-900">
      {/* Page header */}
      <header className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="space-y-3 sm:space-y-4 max-w-3xl">
            <p className="text-xs sm:text-sm text-slate-500">Home / About us</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 break-words">
              About {COMPANY.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              We are a job information service that collects, checks and organises IT, Non-IT and
              Banking openings in one place, so job seekers can apply directly to the employer with
              confidence.
            </p>
            {COMPANY.location && (
              <p className="text-sm text-slate-500">Based in {COMPANY.location}</p>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 grid grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[10rem_minmax(0,1fr)] lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-12">
        {/* Sticky section navigation (all screen sizes) */}
        <nav aria-label="On this page">
          <div className="sticky top-20 sm:top-24 lg:top-28 space-y-1 border-l border-slate-200">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(s.id)}
                aria-current={active === s.id ? 'true' : undefined}
                className={`block w-full text-left -ml-px pl-3 sm:pl-4 py-1.5 text-xs sm:text-sm leading-snug border-l-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  active === s.id
                    ? 'border-indigo-600 text-indigo-700 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="lg:col-span-3 min-w-0">
          {/* Story */}
          <Section id="story" title="Our story">
            <div className="max-w-2xl space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                Job seekers lose a lot of time on expired posts, unclear requirements and listings
                that pass through third parties before reaching the real employer. Many also get
                asked for money for jobs that do not exist.
              </p>
              <p>
                {COMPANY.name} was started to fix that. We put IT, Non-IT and Banking openings in one
                place, check each one against its source, and link you straight to the employer’s
                own application page or contact number.
              </p>
              <p>
                You pay once for access. There are no hidden charges and no commission on your
                application, because we are not part of the hiring process.
              </p>
            </div>
          </Section>

          {/* Mission & vision */}
          <Section id="mission" title="Mission and vision">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
              <div className="rounded-2xl border border-slate-200 p-5 sm:p-6">
                <h3 className="font-bold text-slate-900">Our mission</h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Make job hunting simple, fast and trustworthy by listing only openings that link to
                  an official source.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-5 sm:p-6">
                <h3 className="font-bold text-slate-900">Our vision</h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                  A job search where every opening is real, every detail is clear, and nobody pays a
                  middleman to apply.
                </p>
              </div>
            </div>
          </Section>

          {/* Coverage */}
          <Section
            id="coverage"
            title="What we cover"
            subtitle="Three categories, each listing with the details you need before you apply."
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
              {COVERAGE.map((c) => (
                <div key={c.title} className="rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col">
                  <h3 className="font-bold text-slate-900">{c.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.text}</p>
                  <ul className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-sm text-slate-700">
                    {c.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* Process: a true sequence, so numbering is meaningful */}
          <Section
            id="process"
            title="How we verify listings"
            subtitle="Every opening follows the same steps before and after it goes live."
          >
            <ol>
              {PROCESS.map((s, i) => (
                <li key={s.title} className="relative flex gap-4 sm:gap-5 pb-8 last:pb-0">
                  {i < PROCESS.length - 1 && (
                    <span
                      className="absolute left-[17px] top-10 bottom-0 w-px bg-slate-200"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-bold">
                    {i + 1}
                  </span>
                  <div className="pt-1 min-w-0">
                    <h3 className="font-bold text-slate-900">{s.title}</h3>
                    <p className="mt-1 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                      {s.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          {/* Values */}
          <Section id="values" title="Our values">
            <dl className="grid md:grid-cols-2 gap-x-10 gap-y-6 sm:gap-y-7">
              {VALUES.map((v) => (
                <div key={v.title} className="border-t border-slate-200 pt-4">
                  <dt className="font-bold text-slate-900">{v.title}</dt>
                  <dd className="mt-1 text-sm text-slate-600 leading-relaxed">{v.text}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* Notice */}
          <div className="mt-10 sm:mt-14 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-6" role="note">
            <h3 className="font-semibold text-slate-900">Please note</h3>
            <p className="mt-1 text-sm text-slate-700 leading-relaxed">
              {COMPANY.name} is a job information service. We are not an employer or a recruitment
              agency, and we do not guarantee interviews or selection. Always confirm details on the
              official source, and never pay money to anyone in order to get a job.
            </p>
          </div>

          {/* FAQ */}
          <Section id="faq" title="Frequently asked questions">
            <div className="border-t border-slate-200 max-w-3xl">
              {FAQS.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </Section>

          {/* Contact */}
          <Section id="contact" title="Contact us">
            <div className="rounded-2xl border border-slate-200 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-1 text-sm min-w-0">
                <p className="text-slate-700">
                  Questions, feedback or a listing to report? Send it through the Queries page.
                </p>
                {COMPANY.supportEmail && (
                  <p>
                    <span className="text-slate-500">Email: </span>
                    <a
                      href={`mailto:${COMPANY.supportEmail}`}
                      className="text-indigo-600 font-medium hover:underline break-all"
                    >
                      {COMPANY.supportEmail}
                    </a>
                  </p>
                )}
                {COMPANY.supportHours && (
                  <p>
                    <span className="text-slate-500">Hours: </span>
                    <span className="text-slate-800">{COMPANY.supportHours}</span>
                  </p>
                )}
              </div>
              <button type="button" onClick={() => navigate('/queries')} className={primaryBtn}>
                Go to Queries
              </button>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};