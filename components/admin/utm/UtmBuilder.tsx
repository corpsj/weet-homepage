'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { buildUtmUrl } from '@/lib/utm/builder';
import { classifyAcquisition } from '@/lib/analytics/acquisition';

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
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-gray-900">기본 설정</h2>
        <p className="text-sm text-gray-500 mt-1">홈 랜딩(/) 기준으로 캠페인 링크를 생성합니다.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Base URL</label>
            <input
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://weet.kr"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Path</label>
            <input
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="/"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">UTM 파라미터</h2>
            <p className="text-sm text-gray-500 mt-1">`utm_source`, `utm_medium`, `utm_campaign`는 필수입니다.</p>
          </div>
          <button
            type="button"
            onClick={suggestCampaign}
            className="px-3 py-2 text-sm font-semibold rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            캠페인 예시
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">프리셋</label>
            <select
              value={preset}
              onChange={(e) => applyPreset(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">utm_source</label>
              <input
                value={utmSource}
                onChange={(e) => setUtmSource(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">utm_medium</label>
              <input
                value={utmMedium}
                onChange={(e) => setUtmMedium(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">utm_campaign</label>
            <input
              value={utmCampaign}
              onChange={(e) => setUtmCampaign(e.target.value)}
              placeholder="202512_brand_home"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <p className="text-xs text-gray-500 mt-2">권장: `yyyymm_goal_theme` (예: `202512_brand_home`)</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">utm_content (선택)</label>
              <input
                value={utmContent}
                onChange={(e) => setUtmContent(e.target.value)}
                placeholder="reels_a"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">utm_term (선택)</label>
              <input
                value={utmTerm}
                onChange={(e) => setUtmTerm(e.target.value)}
                placeholder="keyword"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-gray-900">생성 결과</h2>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">UTM 링크</label>
          <div className="flex gap-2">
            <input
              readOnly
              value={generatedUrl}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900"
            />
            <button
              type="button"
              onClick={copy}
              disabled={!canGenerate}
              className="px-4 py-2 text-sm font-bold rounded-lg bg-black text-white disabled:bg-gray-300"
            >
              복사
            </button>
            <button
              type="button"
              onClick={open}
              disabled={!canGenerate}
              className="px-4 py-2 text-sm font-bold rounded-lg border border-gray-200 hover:bg-gray-50 disabled:text-gray-400 disabled:hover:bg-white"
            >
              열기
            </button>
          </div>
        </div>

        {preview && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-500">예상 채널그룹</p>
              <p className="text-sm font-bold text-gray-900 mt-1">{preview.channelGroup}</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-500">source / medium</p>
              <p className="text-sm font-bold text-gray-900 mt-1">
                {preview.source} / {preview.medium}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-500">campaign</p>
              <p className="text-sm font-bold text-gray-900 mt-1">{preview.campaign ?? '-'}</p>
            </div>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p className="font-semibold text-gray-900">운영 규칙 요약</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>인스타/당근/블로그처럼 referrer가 깨질 수 있는 채널은 UTM을 반드시 붙입니다.</li>
            <li>하나의 캠페인(utm_campaign)은 기간/목적이 바뀌면 새로 만듭니다.</li>
            <li>소재/버전 구분은 utm_content로 분리합니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

