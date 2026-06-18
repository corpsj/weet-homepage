import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// 관리자 콘솔 2안 — 라이트·인박스 테마. 액센트 블루 #2563eb (admin.* 토큰).
export const consoleInputClass =
  'h-10 rounded-[9px] border border-admin-line-2 bg-white px-3 text-sm text-admin-ink outline-none transition-colors placeholder:text-[#a1a1aa] focus:border-admin-accent focus:ring-2 focus:ring-admin-accent/15 disabled:cursor-not-allowed disabled:opacity-60';

export const consoleSelectClass =
  'h-10 rounded-[9px] border border-admin-line-2 bg-white px-3 text-sm font-semibold text-admin-ink outline-none transition-colors focus:border-admin-accent focus:ring-2 focus:ring-admin-accent/15 disabled:cursor-not-allowed disabled:opacity-60';

export const consolePrimaryButtonClass =
  'inline-flex h-10 items-center justify-center gap-2 rounded-[9px] border border-admin-accent bg-admin-accent px-4 text-sm font-semibold text-white transition-colors hover:border-admin-accent-hover hover:bg-admin-accent-hover focus:outline-none focus:ring-2 focus:ring-admin-accent/30 disabled:cursor-not-allowed disabled:opacity-60';

export const consoleSecondaryButtonClass =
  'inline-flex h-10 items-center justify-center gap-2 rounded-[9px] border border-admin-line-2 bg-white px-4 text-sm font-semibold text-admin-ink transition-colors hover:border-[#d4d4d8] hover:bg-[#f4f4f5] focus:outline-none focus:ring-2 focus:ring-admin-accent/15 disabled:cursor-not-allowed disabled:opacity-60';

export const consoleIconButtonClass =
  'inline-flex h-9 w-9 items-center justify-center rounded-[9px] border border-admin-line-2 bg-white text-[#52525b] transition-colors hover:border-[#d4d4d8] hover:bg-[#f4f4f5] focus:outline-none focus:ring-2 focus:ring-admin-accent/15 disabled:cursor-not-allowed disabled:opacity-60';

export function ConsolePageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.06em] text-admin-accent">{eyebrow}</p>
        <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-admin-ink">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-admin-muted">{description}</p>
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function ConsoleMetricCard({
  label,
  value,
  caption,
  icon,
  tone = 'neutral',
}: {
  label: string;
  value: ReactNode;
  caption?: string;
  icon?: ReactNode;
  tone?: 'neutral' | 'dark' | 'accent' | 'warning';
}) {
  const toneClass = {
    neutral: 'border-admin-line bg-white text-admin-ink',
    dark: 'border-admin-ink bg-admin-ink text-white',
    accent: 'border-transparent bg-gradient-to-br from-admin-accent to-admin-accent-hover text-white',
    warning: 'border-[#fed7aa] bg-[#fff7ed] text-[#9a3412]',
  }[tone];

  return (
    <div className={cn('rounded-[12px] border p-[18px]', toneClass)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold opacity-70">{label}</p>
          <p className="mt-3 text-[28px] font-extrabold tracking-[-0.02em]">{value}</p>
          {caption && <p className="mt-1.5 text-[12px] leading-5 opacity-65">{caption}</p>}
        </div>
        {icon && <div className="opacity-60">{icon}</div>}
      </div>
    </div>
  );
}

export function ConsolePanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('overflow-hidden rounded-[12px] border border-admin-line bg-white', className)}>
      {children}
    </section>
  );
}

export function ConsoleSectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-admin-accent" />
      <h2 className="text-sm font-bold text-admin-ink">{children}</h2>
    </div>
  );
}

export function ConsoleStatusPill({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'dark';
}) {
  const toneClass = {
    neutral: 'border-admin-line-2 bg-[#f4f4f5] text-[#52525b]',
    success: 'border-[#bbf7d0] bg-[#f0fdf4] text-[#166534]',
    warning: 'border-[#fed7aa] bg-[#fff7ed] text-[#9a3412]',
    danger: 'border-[#fecaca] bg-[#fef2f2] text-[#b91c1c]',
    dark: 'border-admin-accent-line bg-admin-accent-soft text-admin-accent',
  }[tone];

  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold', toneClass)}>
      {children}
    </span>
  );
}

export function ReadinessRing({ score }: { score: number }) {
  const safeScore = Math.max(0, Math.min(100, score));
  const color = safeScore >= 85 ? '#16a34a' : safeScore >= 65 ? '#2563eb' : '#ef4444';

  return (
    <div
      className="grid h-10 w-10 place-items-center rounded-full text-xs font-black text-admin-ink"
      style={{
        background: `conic-gradient(${color} ${safeScore * 3.6}deg, #e7e5df 0deg)`,
      }}
      aria-label={`준비도 ${safeScore}점`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white">{safeScore}</span>
    </div>
  );
}
