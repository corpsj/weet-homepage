import type { ReactNode } from 'react';

export function CategoryHeading({ title, status, icon }: { title: string; status: string; icon: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-customize-dune text-customize-ink">{icon}</span>
        <h3 className="text-sm font-black text-customize-ink">{title}</h3>
      </div>
      {status && <p className="text-xs font-bold text-customize-olive">{status}</p>}
    </div>
  );
}
