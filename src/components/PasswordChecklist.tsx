import React from 'react';
import { CheckCircle2, Circle, Sparkles } from 'lucide-react';

export const MIN_PASSWORD_LENGTH = 8;

const RULES: { label: string; test: (p: string) => boolean }[] = [
  { label: `At least ${MIN_PASSWORD_LENGTH} characters`, test: (p) => p.length >= MIN_PASSWORD_LENGTH },
  { label: 'One uppercase letter (A-Z)', test: (p) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter (a-z)', test: (p) => /[a-z]/.test(p) },
  { label: 'One number (0-9)', test: (p) => /[0-9]/.test(p) },
  { label: 'One special character (@ # $ % !)', test: (p) => /[^A-Za-z0-9]/.test(p) },
];

/** Returns the labels of the rules the password does NOT satisfy yet. */
export const getPasswordIssues = (password: string): string[] =>
  RULES.filter((r) => !r.test(password)).map((r) => r.label);

/** Cryptographically secure random strong password (always meets every rule). */
export const generateStrongPassword = (length = 14): string => {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghijkmnopqrstuvwxyz';
  const digits = '23456789';
  const special = '!@#$%^&*?';
  const all = upper + lower + digits + special;

  const rand = (max: number): number => {
    const buf = new Uint32Array(1);
    const limit = Math.floor(0xffffffff / max) * max; // avoids modulo bias
    let x: number;
    do {
      crypto.getRandomValues(buf);
      x = buf[0];
    } while (x >= limit);
    return x % max;
  };
  const pick = (s: string) => s[rand(s.length)];

  const chars = [pick(upper), pick(lower), pick(digits), pick(special)];
  while (chars.length < length) chars.push(pick(all));

  // Fisher-Yates shuffle so the guaranteed characters aren't always first
  for (let i = chars.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
};

interface PasswordChecklistProps {
  password: string;
  onSuggest?: (suggested: string) => void;
}

export const PasswordChecklist: React.FC<PasswordChecklistProps> = ({ password, onSuggest }) => {
  return (
    <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
      <ul className="space-y-1">
        {RULES.map((rule) => {
          const ok = rule.test(password);
          return (
            <li
              key={rule.label}
              className={`flex items-center gap-1.5 text-[11px] ${
                ok ? 'text-emerald-600' : 'text-slate-500'
              }`}
            >
              {ok ? (
                <CheckCircle2 className="w-3 h-3 shrink-0" />
              ) : (
                <Circle className="w-3 h-3 shrink-0" />
              )}
              {rule.label}
            </li>
          );
        })}
      </ul>

      {onSuggest && (
        <button
          type="button"
          onClick={() => onSuggest(generateStrongPassword())}
          className="mt-2.5 text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          Suggest a strong password
        </button>
      )}
    </div>
  );
};