'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import type { Project } from '@/types/supabase';
import { getProjectHeroImage, hasValidProjectImageUrl } from '@/lib/projects/publicProjects';

const ALL = '전체';

type GalleryCard = {
  project: Project;
  hero: string;
  cat: string;
  images: string[];
  meta: string;
};

function projectCategory(project: Project): string {
  return project.tags?.find((t) => t && t.trim().length > 0)?.trim() ?? '프로젝트';
}

function projectMeta(project: Project): string {
  return [project.location, project.completed_at].filter(Boolean).join(' · ');
}

function buildSpecs(project: Project): { k: string; v: string }[] {
  const specs: { k: string; v: string }[] = [];
  if (project.client) specs.push({ k: '고객사', v: project.client });
  if (project.location) specs.push({ k: '위치', v: project.location });
  if (project.completed_at) specs.push({ k: '완료일', v: project.completed_at });
  if (project.tags && project.tags.length > 0) specs.push({ k: '분류', v: project.tags.join(' · ') });
  return specs;
}

export default function ProjectsGallery({ projects }: { projects: Project[] }) {
  const cards = useMemo<GalleryCard[]>(() => {
    return projects.map((project) => {
      const hero = getProjectHeroImage(project) ?? '';
      const extra = (project.images ?? [])
        .map((image) => image?.trim())
        .filter((image): image is string => hasValidProjectImageUrl(image));
      const images = Array.from(new Set([hero, ...extra].filter(Boolean)));
      return {
        project,
        hero,
        cat: projectCategory(project),
        images,
        meta: projectMeta(project),
      };
    });
  }, [projects]);

  const categories = useMemo<string[]>(() => {
    const set = new Set<string>();
    cards.forEach((c) => set.add(c.cat));
    return [ALL, ...Array.from(set)];
  }, [cards]);

  const [activeCat, setActiveCat] = useState<string>(ALL);
  const [openId, setOpenId] = useState<string | null>(null);
  const [thumbIdx, setThumbIdx] = useState<number>(0);

  const filtered = useMemo(
    () => (activeCat === ALL ? cards : cards.filter((c) => c.cat === activeCat)),
    [cards, activeCat],
  );

  const selected = useMemo(
    () => cards.find((c) => c.project.id === openId) ?? null,
    [cards, openId],
  );

  const openCard = useCallback((id: string) => {
    setOpenId(id);
    setThumbIdx(0);
  }, []);

  const close = useCallback(() => setOpenId(null), []);

  // Esc to close + scroll lock while lightbox open.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selected, close]);

  const selMain = selected ? selected.images[thumbIdx] ?? selected.hero : '';
  const selSpecs = selected ? buildSpecs(selected.project) : [];

  return (
    <>
      {/* ===== FILTER PILLS ===== */}
      <div className="mt-[30px] flex flex-wrap gap-2">
        {categories.map((cat) => {
          const on = cat === activeCat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCat(cat)}
              className={[
                'rounded-full border px-4 py-2 text-[13.5px] font-semibold transition-colors duration-150',
                on
                  ? 'border-weet-ink bg-weet-ink text-weet-paper'
                  : 'border-weet-line-2 bg-weet-surface text-weet-sub hover:border-weet-ink/40',
              ].join(' ')}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ===== GRID ===== */}
      <div className="wt-reveal mt-[34px] grid grid-cols-1 gap-5 min-[521px]:grid-cols-2 min-[861px]:grid-cols-3">
        {filtered.map((card, index) => (
          <button
            key={card.project.id}
            type="button"
            onClick={() => openCard(card.project.id)}
            className="group block overflow-hidden rounded-[14px] border border-weet-line bg-weet-surface text-left shadow-weet-card transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:shadow-weet-float"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {card.hero && (
                <Image
                  src={card.hero}
                  alt={card.project.title}
                  fill
                  sizes="(max-width: 520px) 100vw, (max-width: 860px) 50vw, 33vw"
                  priority={index === 0}
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
                />
              )}
              <span className="absolute left-3.5 top-3.5 rounded-full bg-weet-ink/[0.62] px-[11px] py-[5px] font-mono text-[11px] font-semibold text-weet-paper backdrop-blur-sm">
                {card.cat}
              </span>
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-weet-ink/70 to-transparent to-[55%] p-[18px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-mono text-[12px] font-semibold text-weet-gold">자세히 보기 →</span>
              </div>
            </div>
            <div className="px-[18px] py-4">
              <strong className="text-[16px] font-semibold tracking-[-0.01em] text-weet-ink">
                {card.project.title}
              </strong>
              {card.meta && (
                <span className="mt-[3px] block text-[13px] text-weet-muted">{card.meta}</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-[14px] text-weet-muted">
          해당 분류의 공개 사례가 아직 없습니다.
        </p>
      )}

      {/* ===== LIGHTBOX / DETAIL ===== */}
      {selected && (
        <div
          onClick={close}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-weet-ink-deep/[0.82] px-6 py-[5vh] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selected.project.title}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1000px] overflow-hidden rounded-[16px] bg-weet-paper shadow-weet-float"
          >
            <button
              type="button"
              onClick={close}
              aria-label="닫기"
              className="absolute right-4 top-4 z-[5] flex h-10 w-10 items-center justify-center rounded-full bg-weet-ink/[0.55] text-weet-paper backdrop-blur-sm transition-colors hover:bg-weet-paper/20"
            >
              <X className="h-4 w-4" strokeWidth={1.8} />
            </button>

            <div className="relative aspect-video overflow-hidden bg-weet-ink">
              {selMain && (
                <Image
                  src={selMain}
                  alt={selected.project.title}
                  fill
                  sizes="(max-width: 1000px) 100vw, 1000px"
                  className="object-cover"
                />
              )}
              <span className="absolute left-4 top-4 rounded-full bg-weet-ink/[0.62] px-3 py-1.5 font-mono text-[11px] font-semibold text-weet-gold backdrop-blur-sm">
                {selected.cat}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-8 px-[34px] pb-9 pt-[30px] min-[861px]:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="m-0 mb-1.5 text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.025em] text-weet-ink">
                  {selected.project.title}
                </h2>
                {selected.meta && (
                  <p className="m-0 mb-5 text-[13.5px] text-weet-muted">{selected.meta}</p>
                )}
                {selected.project.description && (
                  <p className="m-0 mb-6 whitespace-pre-wrap text-[15px] leading-[1.85] text-weet-sub kr-balance">
                    {selected.project.description}
                  </p>
                )}
                {selected.images.length > 1 && (
                  <div className="flex flex-wrap gap-2">
                    {selected.images.map((img, i) => (
                      <button
                        key={`${img}-${i}`}
                        type="button"
                        onClick={() => setThumbIdx(i)}
                        aria-label={`이미지 ${i + 1} 보기`}
                        className={[
                          'relative h-[54px] w-[72px] overflow-hidden rounded-[7px] border border-weet-line-2 outline outline-2 outline-offset-2 transition-opacity hover:opacity-85',
                          i === thumbIdx ? 'outline-weet-gold' : 'outline-transparent',
                        ].join(' ')}
                      >
                        <Image src={img} alt="" fill sizes="72px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-weet-line-2 min-[861px]:border-l min-[861px]:pl-8">
                <h4 className="m-0 mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-weet-muted">
                  프로젝트 정보
                </h4>
                <div className="flex flex-col gap-[13px]">
                  {selSpecs.map((s) => (
                    <div
                      key={s.k}
                      className="flex justify-between gap-3 border-b border-weet-paper-alt pb-[11px] text-[13.5px]"
                    >
                      <span className="font-medium text-weet-muted">{s.k}</span>
                      <span className="font-semibold text-weet-ink">{s.v}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/projects/${selected.project.id}`}
                  className="mt-6 flex items-center justify-center gap-1.5 rounded-[8px] border border-weet-line-2 bg-weet-surface px-3 py-3 text-[14px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
                >
                  전체 페이지로 보기
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/support#consult"
                  className="mt-2.5 flex items-center justify-center gap-1.5 rounded-[8px] bg-weet-gold px-3 py-[13px] text-[14px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
                >
                  비슷한 공간 상담 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
