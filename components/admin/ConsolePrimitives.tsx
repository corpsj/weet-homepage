import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const consoleInputClass =
  'h-10 rounded-md border border-[#d8d8d2] bg-[#fbfbfa] px-3 text-sm text-[#111111] outline-none transition-colors placeholder:text-gray-400 focus:border-[#111111] focus:ring-2 focus:ring-[#111111]/10 disabled:cursor-not-allowed disabled:opacity-60';

export const consoleSelectClass =
  'h-10 rounded-md border border-[#d8d8d2] bg-[#fbfbfa] px-3 text-sm font-semibold text-[#111111] outline-none transition-colors focus:border-[#111111] focus:ring-2 focus:ring-[#111111]/10 disabled:cursor-not-allowed disabled:opacity-60';

export const consolePrimaryButtonClass =
  'inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#111111] bg-[#111111] px-4 text-sm font-bold text-white transition-colors hover:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#111111]/20 disabled:cursor-not-allowed disabled:opacity-60';

export const consoleSecondaryButtonClass =
  'inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#d8d8d2] bg-[#fbfbfa] px-4 text-sm font-bold text-[#111111] transition-colors hover:border-[#111111] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111]/10 disabled:cursor-not-allowed disabled:opacity-60';

export const consoleIconButtonClass =
  'inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#d8d8d2] bg-[#fbfbfa] text-[#111111] transition-colors hover:border-[#111111] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111]/10 disabled:cursor-not-allowed disabled:opacity-60';

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
        <p className="mb-2 text-xs font-bold text-[#8a6a12]">{eyebrow}</p>
        <h1 className="text-2xl font-black text-[#111111]">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-gray-500">{description}</p>
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
    neutral: 'border-[#e5e5df] bg-white text-[#111111]',
    dark: 'border-[#111111] bg-[#111111] text-white',
    accent: 'border-[#eab308] bg-[#eab308] text-[#111111]',
    warning: 'border-[#fed7aa] bg-[#fff7ed] text-[#7c2d12]',
  }[tone];

  return (
    <div className={cn('rounded-md border p-4 shadow-sm', toneClass)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold opacity-70">{label}</p>
          <p className="mt-2 text-2xl font-black">{value}</p>
          {caption && <p className="mt-2 text-xs leading-5 opacity-65">{caption}</p>}
        </div>
        {icon && <div className="opacity-70">{icon}</div>}
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
    <section className={cn('overflow-hidden rounded-md border border-[#e5e5df] bg-white shadow-sm', className)}>
      {children}
    </section>
  );
}

export function ConsoleSectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-[#eab308]" />
      <h2 className="text-sm font-bold text-[#111111]">{children}</h2>
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
    neutral: 'border-[#d8d8d2] bg-[#f4f4f1] text-gray-600',
    success: 'border-[#bbf7d0] bg-[#f0fdf4] text-[#166534]',
    warning: 'border-[#fed7aa] bg-[#fff7ed] text-[#9a3412]',
    danger: 'border-[#fecaca] bg-[#fef2f2] text-[#b91c1c]',
    dark: 'border-[#111111] bg-[#111111] text-white',
  }[tone];

  return (
    <span className={cn('inline-flex items-center rounded-md border px-2 py-1 text-xs font-bold', toneClass)}>
      {children}
    </span>
  );
}

export function ReadinessRing({ score }: { score: number }) {
  const safeScore = Math.max(0, Math.min(100, score));
  const color = safeScore >= 85 ? '#16a34a' : safeScore >= 65 ? '#eab308' : '#ef4444';

  return (
    <div
      className="grid h-10 w-10 place-items-center rounded-full text-xs font-black text-[#111111]"
      style={{
        background: `conic-gradient(${color} ${safeScore * 3.6}deg, #e7e5df 0deg)`,
      }}
      aria-label={`준비도 ${safeScore}점`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white">{safeScore}</span>
    </div>
  );
}
