import type { ReactNode } from 'react';

export function CategoryHeading({ title, status, icon }: { title: string; status: string; icon: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-weet-paper-alt text-weet-ink">{icon}</span>
        <h3 className="text-sm font-black text-weet-ink">{title}</h3>
      </div>
      {status && <p className="text-xs font-bold text-weet-gold-deep">{status}</p>}
    </div>
  );
}
