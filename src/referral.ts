// Creator-referral helpers (browser side).
// The code is a public identifier, not a secret: the server re-validates it every time.
const REF_KEY = 'fmj_ref';
const VID_KEY = 'fmj_vid';
const RET_KEY = 'fmj_return_to';
const REF_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days, last click wins
const RET_TTL_MS = 60 * 60 * 1000;           // 1 hour
const CODE_RE = /^[A-Za-z0-9]{7}$/;
const RETURN_RE = /^\/jobs\/view\/[A-Za-z0-9_\-%.]+$/; // only job pages may be returned to

export function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VID_KEY, id);
    }
    return id;
  } catch {
    return '';
  }
}

export function saveReferral(code: string): void {
  if (!CODE_RE.test(code)) return;
  try {
    localStorage.setItem(REF_KEY, JSON.stringify({ code, ts: Date.now() }));
  } catch {
    /* storage blocked: tracking is simply skipped */
  }
}

export function getReferral(): string | null {
  try {
    const raw = localStorage.getItem(REF_KEY);
    if (!raw) return null;
    const { code, ts } = JSON.parse(raw);
    if (typeof code !== 'string' || !CODE_RE.test(code) || Date.now() - ts > REF_TTL_MS) {
      localStorage.removeItem(REF_KEY);
      return null;
    }
    return code;
  } catch {
    return null;
  }
}

export function clearReferral(): void {
  try {
    localStorage.removeItem(REF_KEY);
  } catch {
    /* ignore */
  }
}

// After a creator link, a logged-out visitor goes through login/register.
// These two functions bring them back to the job they clicked.
export function setReturnTo(path: string): void {
  if (!RETURN_RE.test(path)) return;
  try {
    sessionStorage.setItem(RET_KEY, JSON.stringify({ path, ts: Date.now() }));
  } catch {
    /* ignore */
  }
}

export function consumeReturnTo(): string | null {
  try {
    const raw = sessionStorage.getItem(RET_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(RET_KEY);
    const { path, ts } = JSON.parse(raw);
    if (typeof path !== 'string' || !RETURN_RE.test(path) || Date.now() - ts > RET_TTL_MS) return null;
    return path;
  } catch {
    return null;
  }
}