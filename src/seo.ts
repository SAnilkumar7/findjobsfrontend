const SITE_URL = 'https://findmyjobs.in';
const SITE_NAME = 'FindMyJobs';

type SeoEntry = { title: string; description: string };

// Only public pages are listed here. Every other path (admin, login, register,
// dashboard, job details, 404) automatically gets "noindex".
const PAGES: Record<string, SeoEntry> = {
  '/': {
    title: `${SITE_NAME} | Verified IT, Non-IT & Banking Jobs in India`,
    description: 'Find verified IT, Non-IT and Banking jobs in India with direct apply links. One-time payment, instant access.',
  },
  '/about': {
    title: `About Us | ${SITE_NAME}`,
    description: 'Learn how FindMyJobs helps job seekers find genuine openings in one place.',
  },
  '/pricing': {
    title: `Pricing & Plans | ${SITE_NAME}`,
    description: 'Simple one-time pricing for IT, Non-IT and Banking job access.',
  },
  '/jobs/it': {
    title: `IT Jobs in India | ${SITE_NAME}`,
    description: 'Latest IT job openings: software, data, cloud, QA and more.',
  },
  '/jobs/non-it': {
    title: `Non-IT Jobs in India | ${SITE_NAME}`,
    description: 'Latest Non-IT job openings across sales, HR, operations and more.',
  },
  '/jobs/banking': {
    title: `Banking Jobs in India | ${SITE_NAME}`,
    description: 'Latest banking and finance job openings.',
  },
  '/jobs/all': {
    title: `All Jobs | ${SITE_NAME}`,
    description: 'Browse all verified job openings in one place.',
  },
  '/queries': {
    title: `Contact & Queries | ${SITE_NAME}`,
    description: 'Send us a question, feedback or bug report.',
  },
  '/terms': { title: `Terms & Conditions | ${SITE_NAME}`, description: 'Terms of use for FindMyJobs.' },
  '/privacy': { title: `Privacy Policy | ${SITE_NAME}`, description: 'How FindMyJobs handles your data.' },
  '/refund': { title: `Refund Policy | ${SITE_NAME}`, description: 'The FindMyJobs refund policy.' },
  '/disclaimer': { title: `Disclaimer | ${SITE_NAME}`, description: 'FindMyJobs site disclaimer.' },
};

const FALLBACK: SeoEntry = {
  title: SITE_NAME,
  description: 'Verified IT, Non-IT and Banking jobs in India.',
};

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function applySEO(path: string) {
  const clean = path.split('?')[0].replace(/\/+$/, '') || '/';
  const entry = PAGES[clean];
  const data = entry ?? FALLBACK;
  const url = `${SITE_URL}${clean}`;

  document.title = data.title;
  setMeta('name', 'description', data.description);
  setMeta('name', 'robots', entry ? 'index, follow' : 'noindex, nofollow');
  setCanonical(url);

  setMeta('property', 'og:title', data.title);
  setMeta('property', 'og:description', data.description);
  setMeta('property', 'og:url', url);
  setMeta('name', 'twitter:title', data.title);
  setMeta('name', 'twitter:description', data.description);
}