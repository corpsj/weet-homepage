'use client';

import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { getSiteSettingRows, updateSiteSettings } from '@/app/actions/settings-actions';
import { SITE_SETTING_LABELS, type SiteSettings } from '@/lib/site-settings';
import { ConsolePanel, ConsoleSectionTitle, consoleInputClass, consolePrimaryButtonClass } from '@/components/admin/ConsolePrimitives';

const FIELD_ORDER: (keyof SiteSettings)[] = [
  'contact_phone',
  'consult_hours',
  'kakao_channel_url',
  'contact_email',
  'naver_blog_url',
  'instagram_url',
  'daangn_url',
  'trust_founded_year',
  'trust_units_built',
  'lead_time_note',
];

export default function SiteSettingsPanel() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getSiteSettingRows()
      .then((rows) => {
        const next: Record<string, string> = {};
        for (const row of rows) next[row.key] = row.value;
        setValues(next);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateSiteSettings(values as Partial<SiteSettings>);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <ConsolePanel className="p-6">
      <ConsoleSectionTitle>사이트 정보</ConsoleSectionTitle>
      <p className="mt-1 text-xs text-gray-500">
        고객에게 노출되는 연락처·상담 채널 정보입니다. 비워두면 해당 항목은 사이트에 표시되지 않습니다. 숫자 항목은 검증 가능한
        값만 입력해 주세요.
      </p>
      {loading ? (
        <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          불러오는 중...
        </div>
      ) : (
        <>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {FIELD_ORDER.map((key) => (
              <div key={key}>
                <label htmlFor={`site-setting-${key}`} className="block text-xs font-bold text-gray-600 mb-1">
                  {SITE_SETTING_LABELS[key]}
                </label>
                <input
                  id={`site-setting-${key}`}
                  className={consoleInputClass}
                  value={values[key] ?? ''}
                  onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))}
                />
              </div>
            ))}
          </div>
          <button type="button" className={`${consolePrimaryButtonClass} mt-6`} onClick={handleSave} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            저장
          </button>
        </>
      )}
    </ConsolePanel>
  );
}
