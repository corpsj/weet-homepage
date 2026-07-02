import { useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { ChevronDown, Download, Info, Link2, Loader2, Pencil, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  BUDGET_RANGES,
  LAND_TYPES,
  PURCHASE_TIMELINES,
  choiceLabel,
} from '@/lib/customize/config';
import { formatModelStartPrice, formatWon } from '@/lib/customize/priceCalculator';
import type { Language } from '@/contexts/LanguageContext';
import type { CustomizeModel, CustomizeOption, EstimateBreakdown } from '@/lib/customize/types';
import { pickText } from '@/lib/customize/i18n';
import {
  REQUIRED_FIELDS,
  STEPS,
  inputClass,
  selectClass,
  type ConfigStep,
  type ConsultationDraft,
  type CustomizeUiCopy,
  type FieldRenderArgs,
  type OptionStep,
  type RequiredFieldName,
} from '../lib/constants';
import { optionPriceDisplay, scrollBehavior } from '../lib/helpers';
import { FloorplanCanvas } from './FloorplanCanvas';

// 마지막 단계: 구성 검토 + 상담 요청. 모달 대신 전용 화면으로 'Configure → Review → Request' 흐름을 만든다.
export function ReviewStep({
  estimate,
  selectedOptions,
  goToStep,
  form,
  setForm,
  isPending,
  submitted,
  submittedSnapshot,
  onEditAfterSubmit,
  onSubmit,
  onSaveQuote,
  copy,
  language,
}: {
  estimate: EstimateBreakdown;
  selectedOptions: CustomizeOption[];
  goToStep: (step: ConfigStep) => void;
  form: ConsultationDraft;
  setForm: Dispatch<SetStateAction<ConsultationDraft>>;
  isPending: boolean;
  submitted: boolean;
  submittedSnapshot: { model: CustomizeModel; estimatedTotal: number; encodedConfig: string } | null;
  onEditAfterSubmit: () => void;
  onSubmit: () => void;
  onSaveQuote: () => void;
  copy: CustomizeUiCopy;
  language: Language;
}) {
  const consultOptions = selectedOptions.filter((option) => option.priceType === 'consult');
  const optionSteps = STEPS.filter((step): step is (typeof STEPS)[number] & { id: OptionStep } => step.id !== 'space' && step.id !== 'review');

  const handleCopyLink = async () => {
    // 현재 URL에는 구성(?c=...)이 동기화돼 있다. 클립보드로 복사해 같은 구성을 그대로 공유한다.
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success(copy.copyLinkSuccess);
    } catch {
      toast.error(copy.copyLinkFail);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-6 md:px-8" data-testid="customize-review">
      <header className="mb-5">
        <h1 className="text-2xl font-black text-weet-ink md:text-3xl">{copy.reviewTitle}</h1>
        <p className="mt-1 text-sm leading-relaxed text-weet-sub">
          {copy.reviewIntro} {copy.notPayment} {copy.finalQuote}
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        <section aria-label={copy.reviewSummaryAria} className="space-y-4">
          <div className="rounded-lg border border-weet-line bg-weet-surface p-4 md:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold text-weet-muted">{copy.selectedModel}</p>
                <h2 className="text-lg font-black text-weet-ink">{pickText(estimate.model.nameKo, estimate.model.nameEn, language)}</h2>
                <p className="text-xs text-weet-sub">
                  {estimate.model.widthM}m × {estimate.model.lengthM}m · {estimate.model.areaSqm}m²
                </p>
                <p className="mt-1 text-xs font-bold text-weet-gold-deep">
                  {copy.basePrice} {formatModelStartPrice(estimate.model.basePrice)}
                </p>
              </div>
              <ReviewEditButton label={copy.editModel} onClick={() => goToStep('space')} copy={copy} />
            </div>
            <details className="group mt-3 rounded-lg border border-weet-line bg-weet-paper open:bg-weet-surface">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 text-xs font-bold text-weet-sub [&::-webkit-details-marker]:hidden">
                {copy.planView}
                <ChevronDown className="h-4 w-4 text-weet-muted transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-weet-line p-2">
                <FloorplanCanvas
                  model={estimate.model}
                  selectedOptions={selectedOptions}
                  testId="review-floorplan-canvas"
                  copy={copy}
                  language={language}
                />
              </div>
            </details>
          </div>

          {optionSteps.map((step) => {
            const stepOptions = selectedOptions.filter((option) => step.categories?.includes(option.categoryKey));
            return (
              <div key={step.id} className="rounded-lg border border-weet-line bg-weet-surface p-4 md:p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-black text-weet-ink">{copy.stepLabels[step.id]}</h3>
                  <ReviewEditButton label={copy.editStep(copy.stepLabels[step.id])} onClick={() => goToStep(step.id)} copy={copy} />
                </div>
                {stepOptions.length > 0 ? (
                  <ul className="mt-2 divide-y divide-weet-line">
                    {stepOptions.map((option) => (
                      <li key={option.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span className="min-w-0 truncate font-semibold text-weet-sub">{pickText(option.nameKo, option.nameEn, language)}</span>
                        <span
                          className={cn(
                            'shrink-0 text-xs font-bold',
                            option.priceType === 'consult' ? 'text-weet-gold-deep' : option.priceType === 'fixed' ? 'text-weet-ink' : 'text-weet-muted'
                          )}
                        >
                          {optionPriceDisplay(option, copy)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-xs text-weet-muted">{copy.noStepOptions}</p>
                )}
              </div>
            );
          })}

          {consultOptions.length > 0 && (
            <div className="rounded-lg border border-weet-gold/40 bg-weet-gold/10 p-4">
              <p className="text-sm font-black text-weet-gold-deep">{copy.consultItemsTitle(consultOptions.length)}</p>
              <p className="mt-1 text-xs leading-relaxed text-weet-gold-deep/90">{copy.consultExplain} {copy.consultItemsBody}</p>
            </div>
          )}
        </section>

        <section aria-label={copy.reviewPriceAria} className="space-y-4">
          <div className="rounded-lg border border-weet-line bg-weet-surface p-4 md:p-5">
            <h2 className="text-sm font-black text-weet-ink">{copy.priceSummaryTitle}</h2>
            <dl className="mt-3 space-y-1.5 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="font-semibold text-weet-sub">{copy.basePrice}</dt>
                <dd className="font-bold text-weet-ink">{formatWon(estimate.model.basePrice)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="font-semibold text-weet-sub">{copy.optionSubtotal}</dt>
                <dd className="font-bold text-weet-ink">{estimate.optionTotal > 0 ? `+${formatWon(estimate.optionTotal)}` : formatWon(0)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-weet-line pt-2">
                <dt className="flex items-center gap-1.5 text-base font-black text-weet-ink">
                  <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-weet-forest" />
                  {copy.estimatedAmount}
                </dt>
                <dd className="text-xl font-black text-weet-ink" data-testid="review-estimated-total">{formatWon(estimate.estimatedTotal)}</dd>
              </div>
              {estimate.consultOptionCount > 0 && (
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-1.5 font-semibold text-weet-gold-deep">
                    <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-weet-gold" />
                    {copy.consultItemsLabel}
                  </dt>
                  <dd className="font-bold text-weet-gold-deep">{copy.quoteConsultItems(estimate.consultOptionCount)}</dd>
                </div>
              )}
            </dl>
            <p className="mt-3 text-[11px] leading-relaxed text-weet-muted">
              {copy.transportNote} ·{' '}
              <a href="/support#cost" target="_blank" rel="noopener noreferrer" className="font-bold text-weet-forest underline-offset-2 hover:underline">
                {copy.costInfoLink}
              </a>
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Button variant="outline" className="h-11 w-full border-weet-line-2 bg-weet-surface text-weet-ink" onClick={onSaveQuote}>
                <Download className="h-4 w-4" />
                {copy.saveQuote}
              </Button>
              <Button variant="outline" className="h-11 w-full border-weet-line-2 bg-weet-surface text-weet-ink" onClick={handleCopyLink}>
                <Link2 className="h-4 w-4" />
                {copy.copyLink}
              </Button>
            </div>
          </div>

          {submitted && submittedSnapshot ? (
            <div className="rounded-lg border border-weet-forest/30 bg-weet-forest/10 p-5" role="status" aria-live="polite">
              <p className="text-lg font-black text-weet-forest">{copy.submittedTitle}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-weet-forest/90">
                {copy.submittedBody} {copy.finalQuote}
              </p>
              <dl className="mt-3 rounded-md border border-weet-forest/20 bg-weet-surface/70 p-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="font-semibold text-weet-sub">{copy.receivedModel}</dt>
                  <dd className="font-bold text-weet-ink">{pickText(submittedSnapshot.model.nameKo, submittedSnapshot.model.nameEn, language)}</dd>
                </div>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <dt className="font-semibold text-weet-sub">{copy.estimatedAmount}</dt>
                  <dd className="font-bold text-weet-ink">{formatWon(submittedSnapshot.estimatedTotal)}</dd>
                </div>
              </dl>
              <Button
                variant="outline"
                className="mt-4 h-11 w-full border-weet-line-2 bg-weet-surface text-weet-ink"
                onClick={onEditAfterSubmit}
              >
                {copy.writeNewRequest}
              </Button>
            </div>
          ) : (
            <ConsultationForm form={form} setForm={setForm} isPending={isPending} onSubmit={onSubmit} copy={copy} language={language} />
          )}
        </section>
      </div>
    </div>
  );
}

function ReviewEditButton({ label, onClick, copy }: { label: string; onClick: () => void; copy: CustomizeUiCopy }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex min-h-[36px] shrink-0 items-center gap-1 rounded-md border border-weet-line bg-weet-surface px-2.5 py-1 text-xs font-bold text-weet-sub transition-colors hover:border-weet-muted hover:text-weet-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep"
    >
      <Pencil className="h-3 w-3" />
      {copy.editWord}
    </button>
  );
}

function ConsultationForm({
  form,
  setForm,
  isPending,
  onSubmit,
  copy,
  language,
}: {
  form: ConsultationDraft;
  setForm: Dispatch<SetStateAction<ConsultationDraft>>;
  isPending: boolean;
  onSubmit: () => void;
  copy: CustomizeUiCopy;
  language: Language;
}) {
  const [showOptional, setShowOptional] = useState(false);
  // 필수 필드 검증 결과 + UI 피드백(에러 표시·포커스 이동)은 ReviewStep이 단독으로 담당한다.
  const [fieldErrors, setFieldErrors] = useState<Record<RequiredFieldName, boolean>>({
    customerName: false,
    phone: false,
    region: false,
  });
  // 첫 invalid 필드로 포커스/스크롤하기 위한 ref 맵.
  const fieldRefs = useRef<Record<RequiredFieldName, HTMLInputElement | null>>({
    customerName: null,
    phone: null,
    region: null,
  });
  const updateField = (name: keyof ConsultationDraft, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
    // 사용자가 입력하면 해당 필드의 오류 표시를 즉시 해제한다.
    if ((REQUIRED_FIELDS as readonly string[]).includes(name) && value.trim()) {
      setFieldErrors((current) => ({ ...current, [name as RequiredFieldName]: false }));
    }
  };

  const handleSubmit = () => {
    const nextErrors: Record<RequiredFieldName, boolean> = {
      customerName: !form.customerName.trim(),
      phone: !form.phone.trim(),
      region: !form.region.trim(),
    };
    setFieldErrors(nextErrors);

    // 첫 invalid 필드로 포커스 + 스크롤. 부모(handleSubmit)는 invalid면 조용히 반환한다.
    const firstInvalid = (REQUIRED_FIELDS as readonly RequiredFieldName[]).find((name) => nextErrors[name]);
    if (firstInvalid) {
      const target = fieldRefs.current[firstInvalid];
      target?.scrollIntoView({ behavior: scrollBehavior(), block: 'center' });
      target?.focus({ preventScroll: true });
      return;
    }

    onSubmit();
  };

  return (
    <form
      className="rounded-lg border border-weet-line bg-weet-surface p-4 md:p-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <h2 className="text-lg font-black text-weet-ink">{copy.formTitle}</h2>
      <p className="mt-1 text-xs leading-relaxed text-weet-muted">
        {copy.formIntro} {copy.privacyUse}
      </p>

      <div className="mt-4 grid gap-4">
        <Field label={copy.fieldName} required fieldId="consultation-name" error={fieldErrors.customerName ? copy.errName : undefined} copy={copy}>
          {({ id, describedBy, invalid }) => (
            <Input
              ref={(node) => { fieldRefs.current.customerName = node; }}
              id={id}
              data-testid="consultation-name"
              className={inputClass}
              autoComplete="name"
              required
              aria-invalid={invalid}
              aria-describedby={describedBy}
              value={form.customerName}
              onChange={(event) => updateField('customerName', event.target.value)}
            />
          )}
        </Field>
        <Field label={copy.fieldPhone} required fieldId="consultation-phone" error={fieldErrors.phone ? copy.errPhone : undefined} copy={copy}>
          {({ id, describedBy, invalid }) => (
            <Input
              ref={(node) => { fieldRefs.current.phone = node; }}
              id={id}
              data-testid="consultation-phone"
              className={inputClass}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              aria-invalid={invalid}
              aria-describedby={describedBy}
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
            />
          )}
        </Field>
        <Field label={copy.fieldRegion} required fieldId="consultation-region" error={fieldErrors.region ? copy.errRegion : undefined} copy={copy}>
          {({ id, describedBy, invalid }) => (
            <Input
              ref={(node) => { fieldRefs.current.region = node; }}
              id={id}
              data-testid="consultation-region"
              className={inputClass}
              placeholder={copy.fieldRegionPlaceholder}
              required
              aria-invalid={invalid}
              aria-describedby={describedBy}
              value={form.region}
              onChange={(event) => updateField('region', event.target.value)}
            />
          )}
        </Field>
      </div>

      <button
        type="button"
        aria-expanded={showOptional}
        onClick={() => setShowOptional((current) => !current)}
        className="mt-5 flex min-h-[44px] w-full items-center justify-between gap-2 rounded-lg border border-weet-line bg-weet-paper px-3 py-2 text-left text-sm font-bold text-weet-sub transition-colors hover:border-weet-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep"
      >
        <span>
          {copy.optionalToggle}
          <span className="mt-0.5 block text-[11px] font-semibold text-weet-muted">{copy.optionalHint}</span>
        </span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-weet-muted transition-transform', showOptional && 'rotate-180')} />
      </button>

      {showOptional && (
        <div className="mt-4 grid gap-4">
          <Field label={copy.fieldTimeline} fieldId="consultation-timeline" helper={copy.fieldTimelineHelp} copy={copy}>
            {({ id, describedBy }) => (
              <Select id={id} ariaDescribedBy={describedBy} value={form.purchaseTimeline} onChange={(value) => updateField('purchaseTimeline', value)} options={PURCHASE_TIMELINES} copy={copy} language={language} />
            )}
          </Field>
          <Field label={copy.fieldLandType} fieldId="consultation-landtype" helper={copy.fieldLandTypeHelp} copy={copy}>
            {({ id, describedBy }) => (
              <Select id={id} ariaDescribedBy={describedBy} value={form.landType} onChange={(value) => updateField('landType', value)} options={LAND_TYPES} copy={copy} language={language} />
            )}
          </Field>
          <Field label={copy.fieldBudget} fieldId="consultation-budget" helper={copy.fieldBudgetHelp} copy={copy}>
            {({ id, describedBy }) => (
              <Select id={id} ariaDescribedBy={describedBy} value={form.budgetRange} onChange={(value) => updateField('budgetRange', value)} options={BUDGET_RANGES} copy={copy} language={language} />
            )}
          </Field>
          <Field label={copy.fieldAddress} fieldId="consultation-address" helper={copy.fieldAddressHelp} copy={copy}>
            {({ id, describedBy }) => (
              <Input id={id} aria-describedby={describedBy} className={inputClass} autoComplete="address-level2" value={form.installAddress} onChange={(event) => updateField('installAddress', event.target.value)} />
            )}
          </Field>
          <Field label={copy.fieldMemo} fieldId="consultation-memo" helper={copy.fieldMemoHelp} copy={copy}>
            {({ id, describedBy }) => (
              <Textarea id={id} aria-describedby={describedBy} className="min-h-24 rounded-lg border-gray-300 bg-weet-surface text-sm focus-visible:ring-weet-gold-deep" value={form.memo} onChange={(event) => updateField('memo', event.target.value)} />
            )}
          </Field>
        </div>
      )}

      <div className="mt-5 rounded bg-weet-paper-alt/60 p-3 text-xs leading-relaxed text-weet-sub">
        <Info className="mr-1 inline-block h-3.5 w-3.5 align-[-2px] text-weet-muted" />
        {copy.notPayment} {copy.finalQuote} {copy.formDisclaimer}
      </div>

      <Button type="submit" data-testid="consultation-submit" className="mt-4 h-12 w-full bg-weet-ink text-weet-paper hover:bg-weet-ink-deep" disabled={isPending}>
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {copy.ctaRequest}
      </Button>
    </form>
  );
}

function Field({
  label,
  required,
  helper,
  error,
  fieldId,
  className,
  copy,
  children,
}: {
  label: string;
  required?: boolean;
  helper?: string;
  error?: string;
  fieldId: string;
  className?: string;
  copy: CustomizeUiCopy;
  children: (args: FieldRenderArgs) => ReactNode;
}) {
  const helperId = helper ? `${fieldId}-helper` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  // aria-describedby는 오류를 먼저, 그다음 도움말 순으로 연결한다.
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={className}>
      <Label htmlFor={fieldId} className="mb-2 flex items-center gap-2 text-sm font-bold text-weet-sub">
        <span>{label}</span>
        <span className={cn(
          'rounded px-1.5 py-0.5 text-[10px] font-black',
          required ? 'bg-weet-ink text-weet-paper' : 'bg-weet-paper-alt text-weet-gold-deep'
        )}>
          {required ? copy.requiredBadge : copy.optionalBadge}
        </span>
      </Label>
      {children({ id: fieldId, describedBy, invalid: Boolean(error) })}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs font-semibold leading-relaxed text-customize-error">
          {error}
        </p>
      )}
      {helper && (
        <p id={helperId} className="mt-1.5 text-xs leading-relaxed text-weet-muted">
          {helper}
        </p>
      )}
    </div>
  );
}

function Select({
  id,
  ariaDescribedBy,
  value,
  onChange,
  options,
  copy,
  language,
}: {
  id?: string;
  ariaDescribedBy?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  copy: CustomizeUiCopy;
  language: Language;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        aria-describedby={ariaDescribedBy}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={selectClass}
      >
        {/* value(KO)는 서버 저장 일관성을 위해 그대로, 표시 라벨만 언어별로 변환 */}
        <option value="">{copy.selectNone}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {choiceLabel(option, language)}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-weet-muted" />
    </div>
  );
}
