'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { buildUtmUrl } from '@/lib/utm/builder';
import { classifyAcquisition } from '@/lib/analytics/acquisition';
import { ConsolePanel, ConsoleSectionTitle, consoleInputClass, consoleSelectClass, consolePrimaryButtonClass, consoleSecondaryButtonClass } from '@/components/admin/ConsolePrimitives';

type Preset = {
  label: string;
  utm_source: string;
  utm_medium: string;
};

const PRESETS: Preset[] = [
  { label: 'Instagram (유기)', utm_source: 'instagram', utm_medium: 'social' },
  { label: 'Instagram Ads', utm_source: 'instagram', utm_medium: 'paid_social' },
  { label: '당근(게시글)', utm_source: 'daangn', utm_medium: 'referral' },
  { label: '네이버 블로그', utm_source: 'naverblog', utm_medium: 'referral' },
  { label: '티스토리', utm_source: 'tistory', utm_medium: 'referral' },
  { label: '브런치', utm_source: 'brunch', utm_medium: 'referral' },
  { label: '구글 검색광고', utm_source: 'google', utm_medium: 'cpc' },
  { label: '네이버 검색광고', utm_source: 'naver', utm_medium: 'cpc' },
  { label: '디스플레이', utm_source: 'display', utm_medium: 'display' },
  { label: '이메일', utm_source: 'newsletter', utm_medium: 'email' },
  { label: '오프라인 QR', utm_source: 'offline', utm_medium: 'qr' },
];

function yyyymmToday() {
  const now = new Date();
  const yyyy = String(now.getFullYear());
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  return `${yyyy}${mm}`;
}

export default function UtmBuilder() {
  const [baseUrl, setBaseUrl] = useState<string>(process.env.NEXT_PUBLIC_SITE_URL || 'https://weet.kr');
  const [path, setPath] = useState<string>('/');
  const [preset, setPreset] = useState<string>(PRESETS[0].label);

  const [utmSource, setUtmSource] = useState<string>(PRESETS[0].utm_source);
  const [utmMedium, setUtmMedium] = useState<string>(PRESETS[0].utm_medium);
  const [utmCampaign, setUtmCampaign] = useState<string>(`${yyyymmToday()}_brand_home`);
  const [utmContent, setUtmContent] = useState<string>('');
  const [utmTerm, setUtmTerm] = useState<string>('');

  const generatedUrl = useMemo(() => {
    try {
      return buildUtmUrl({
        baseUrl,
        path,
        utm: {
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          utm_content: utmContent || undefined,
          utm_term: utmTerm || undefined,
        },
      });
    } catch {
      return '';
    }
  }, [baseUrl, path, utmSource, utmMedium, utmCampaign, utmContent, utmTerm]);

  const preview = useMemo(() => {
    if (!generatedUrl) return null;
    try {
      return classifyAcquisition({ landingUrl: generatedUrl, siteOrigin: baseUrl });
    } catch {
      return null;
    }
  }, [generatedUrl, baseUrl]);

  const applyPreset = (label: string) => {
    const found = PRESETS.find((p) => p.label === label);
    if (!found) return;
    setPreset(label);
    setUtmSource(found.utm_source);
    setUtmMedium(found.utm_medium);
  };

  const canGenerate = Boolean(baseUrl && utmSource && utmMedium && utmCampaign && generatedUrl);

  const copy = async () => {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(generatedUrl);
      toast.success('UTM 링크를 복사했어요.');
    } catch {
      toast.error('복사에 실패했어요.');
    }
  };

  const open = () => {
    if (!generatedUrl) return;
    window.open(generatedUrl, '_blank', 'noopener,noreferrer');
  };

  const suggestCampaign = () => {
    setUtmCampaign(`${yyyymmToday()}_brand_home`);
    toast.message('캠페인 예시값을 넣었어요.');
  };

  return (
    <div className="space-y-6">
      <ConsolePanel className="p-6">
        <ConsoleSectionTitle>기본 설정</ConsoleSectionTitle>
        <p className="mt-1 mb-6 text-sm text-admin-muted">홈 랜딩(/) 기준으로 캠페인 링크를 생성합니다.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-bold text-admin-muted">Base URL</label>
            <input
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://weet.kr"
              className={`${consoleInputClass} w-full`}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-admin-muted">Path</label>
            <input
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="/"
              className={`${consoleInputClass} w-full`}
            />
          </div>
        </div>
      </ConsolePanel>

      <ConsolePanel className="p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <ConsoleSectionTitle>UTM 파라미터</ConsoleSectionTitle>
            <p className="mt-1 text-sm text-admin-muted">`utm_source`, `utm_medium`, `utm_campaign`는 필수입니다.</p>
          </div>
          <button
            type="button"
            onClick={suggestCampaign}
            className={consoleSecondaryButtonClass}
          >
            캠페인 예시
          </button>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-xs font-bold text-admin-muted">유입 소스 프리셋</label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => {
              const active = preset === p.label;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => applyPreset(p.label)}
                  className={cn(
                    'rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors',
                    active
                      ? 'border-admin-accent-line bg-admin-accent-soft text-admin-accent'
                      : 'border-admin-line-2 bg-white text-[#52525b] hover:border-[#d4d4d8] hover:bg-[#f4f4f5]'
                  )}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-bold text-admin-muted">프리셋</label>
            <select
              value={preset}
              onChange={(e) => applyPreset(e.target.value)}
              className={`${consoleSelectClass} w-full`}
            >
              {PRESETS.map((p) => (
                <option key={p.label} value={p.label}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-admin-muted">utm_source</label>
              <input
                value={utmSource}
                onChange={(e) => setUtmSource(e.target.value)}
                className={`${consoleInputClass} w-full`}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-admin-muted">utm_medium</label>
              <input
                value={utmMedium}
                onChange={(e) => setUtmMedium(e.target.value)}
                className={`${consoleInputClass} w-full`}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-admin-muted">utm_campaign</label>
            <input
              value={utmCampaign}
              onChange={(e) => setUtmCampaign(e.target.value)}
              placeholder="202512_brand_home"
              className={`${consoleInputClass} w-full`}
            />
            <p className="mt-2 text-xs text-admin-muted">권장: `yyyymm_goal_theme` (예: `202512_brand_home`)</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-admin-muted">utm_content (선택)</label>
              <input
                value={utmContent}
                onChange={(e) => setUtmContent(e.target.value)}
                placeholder="reels_a"
                className={`${consoleInputClass} w-full`}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-admin-muted">utm_term (선택)</label>
              <input
                value={utmTerm}
                onChange={(e) => setUtmTerm(e.target.value)}
                placeholder="keyword"
                className={`${consoleInputClass} w-full`}
              />
            </div>
          </div>
        </div>
      </ConsolePanel>

      <ConsolePanel className="p-6">
        <ConsoleSectionTitle>생성 결과</ConsoleSectionTitle>

        {/* 다크 타일 — 2안에서 생성된 링크를 강조 표시 */}
        <div className="mt-4 rounded-[12px] bg-admin-ink p-5 text-white">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-[#a1a1aa]">생성된 링크</span>
            <button
              type="button"
              onClick={copy}
              disabled={!canGenerate}
              className="inline-flex h-[30px] items-center gap-1.5 rounded-[7px] bg-admin-accent px-3 text-xs font-bold text-white transition-colors hover:bg-admin-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              복사
            </button>
          </div>
          <p className="m-0 break-all font-mono text-[12.5px] leading-[1.7] text-[#e4e4e7]">
            {generatedUrl || '대상 URL과 필수 파라미터를 입력하면 링크가 생성됩니다.'}
          </p>
        </div>

        <div className="mt-4">
          <label className="mb-1 block text-xs font-bold text-admin-muted">UTM 링크</label>
          <div className="flex gap-2">
            <input
              readOnly
              value={generatedUrl}
              className={`${consoleInputClass} flex-1`}
            />
            <button
              type="button"
              onClick={copy}
              disabled={!canGenerate}
              className={consolePrimaryButtonClass}
            >
              복사
            </button>
            <button
              type="button"
              onClick={open}
              disabled={!canGenerate}
              className={consoleSecondaryButtonClass}
            >
              열기
            </button>
          </div>
        </div>

        {preview && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-[12px] border border-admin-line bg-[#fafafb] p-4">
              <p className="text-[11px] font-bold text-admin-muted">예상 채널그룹</p>
              <p className="mt-1 text-sm font-bold text-admin-ink">{preview.channelGroup}</p>
            </div>
            <div className="rounded-[12px] border border-admin-line bg-[#fafafb] p-4">
              <p className="text-[11px] font-bold text-admin-muted">source / medium</p>
              <p className="mt-1 text-sm font-bold text-admin-ink">
                {preview.source} / {preview.medium}
              </p>
            </div>
            <div className="rounded-[12px] border border-admin-line bg-[#fafafb] p-4">
              <p className="text-[11px] font-bold text-admin-muted">campaign</p>
              <p className="mt-1 text-sm font-bold text-admin-ink">{preview.campaign ?? '-'}</p>
            </div>
          </div>
        )}

        <div className="mt-6 rounded-[12px] border border-admin-line bg-[#fafafb] p-4 text-sm text-admin-ink">
          <p className="mb-2 text-xs font-bold text-admin-ink">운영 규칙 요약</p>
          <ul className="list-inside list-disc space-y-1 text-xs text-admin-muted">
            <li>인스타/당근/블로그처럼 referrer가 깨질 수 있는 채널은 UTM을 반드시 붙입니다.</li>
            <li>하나의 캠페인(utm_campaign)은 기간/목적이 바뀌면 새로 만듭니다.</li>
            <li>소재/버전 구분은 utm_content로 분리합니다.</li>
          </ul>
        </div>
      </ConsolePanel>
    </div>
  );
}
