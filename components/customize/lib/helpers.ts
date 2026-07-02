import {
  formatWon,
  getDefaultSelections,
  optionsForModel,
  sanitizeConfig,
} from '@/lib/customize/priceCalculator';
import type { Language } from '@/contexts/LanguageContext';
import type {
  CustomizeCatalog,
  CustomizeOption,
  EstimateBreakdown,
  SelectedOptions,
} from '@/lib/customize/types';
import { pickText } from '@/lib/customize/i18n';
import {
  COPY,
  FALLBACK_CATALOG,
  UI_COPY,
  type ConfigStep,
  type CustomizeUiCopy,
} from './constants';

export function nextStepCta(step: ConfigStep, copy: CustomizeUiCopy = COPY) {
  if (step === 'space') return copy.ctaNextIncluded;
  if (step === 'included') return copy.ctaNextMood;
  if (step === 'mood') return copy.ctaNextSmart;
  if (step === 'smart') return copy.ctaReview;
  return copy.ctaRequest;
}

// 옵션 카드/요약에 노출하는 가격 라벨은 '기본 포함 / +₩x / 상담 필요' 세 가지로 통일한다.
export function optionPriceDisplay(option: Pick<CustomizeOption, 'priceType' | 'price'>, copy: CustomizeUiCopy = COPY) {
  if (option.priceType === 'included') return copy.optionIncluded;
  if (option.priceType === 'consult') return copy.optionConsult;
  return `+${formatWon(option.price)}`;
}

export function buildSelectionsForModelChange(
  catalog: CustomizeCatalog,
  currentSelections: SelectedOptions,
  nextModelId: string
) {
  const nextSelections = getDefaultSelections(catalog, nextModelId);
  const activeOptions = catalog.options.filter((option) => option.isActive);
  const availableOptions = new Map(optionsForModel(activeOptions, nextModelId).map((option) => [option.id, option]));
  const allOptions = new Map(activeOptions.map((option) => [option.id, option]));
  const categories = new Map(catalog.categories.filter((category) => category.isActive).map((category) => [category.id, category]));
  const removedOptions: CustomizeOption[] = [];

  for (const [categoryId, optionIds] of Object.entries(currentSelections)) {
    const category = categories.get(categoryId);
    if (!category) continue;

    const preservedIds: string[] = [];
    for (const optionId of optionIds) {
      const option = availableOptions.get(optionId);
      if (option?.categoryId === categoryId) {
        preservedIds.push(optionId);
      } else {
        const removedOption = allOptions.get(optionId);
        if (removedOption && !removedOptions.some((item) => item.id === removedOption.id)) {
          removedOptions.push(removedOption);
        }
      }
    }

    if (preservedIds.length === 0) continue;

    if (category.selectionType === 'single') {
      nextSelections[categoryId] = [preservedIds[0]];
    } else {
      nextSelections[categoryId] = Array.from(new Set([...(nextSelections[categoryId] ?? []), ...preservedIds]));
    }
  }

  return { selections: sanitizeConfig(catalog, nextModelId, nextSelections).selections, removedOptions };
}

export function stepStatusText(step: ConfigStep, count: number, copy: CustomizeUiCopy = COPY) {
  if (step === 'space') return copy.stepStatusDone;
  if (step === 'review') return copy.stepStatusFinal;
  return copy.stepStatusCount(count);
}

export function hasOptionInfo(option: CustomizeOption) {
  const optionKey = option.key || option.id;
  return Boolean(option.detailDescriptionKo || option.shortDescriptionKo || option.imagePath || FALLBACK_CATALOG[optionKey] || FALLBACK_CATALOG[option.id]);
}

export function buildQuoteHtml(
  estimate: EstimateBreakdown,
  selectedOptions: CustomizeOption[],
  language: Language = 'KO'
) {
  const copy = UI_COPY[language];
  const optionRows = selectedOptions
    .map((option) => `<tr><td>${escapeHtml(pickText(option.nameKo, option.nameEn, language))}</td><td>${escapeHtml(optionPriceDisplay(option, copy))}</td></tr>`)
    .join('');
  const consultRow = estimate.consultOptionCount > 0
    ? `<tr><td>${escapeHtml(copy.consultItemsLabel)}</td><td>${escapeHtml(copy.quoteConsultItems(estimate.consultOptionCount))}</td></tr>`
    : '';

  return `<!doctype html>
<html lang="${copy.quoteDocLang}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(copy.quoteDocTitle)}</title>
  <style>
    @page { size: A4 landscape; margin: 18mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Noto Sans KR", sans-serif; color: #2f3432; background: #f8f4ec; word-break: keep-all; }
    h1 { margin: 0 0 8px; font-size: 28px; }
    p { margin: 0; color: #6f6658; }
    table { width: 100%; margin-top: 24px; border-collapse: collapse; background: #fffaf2; }
    th, td { border-bottom: 1px solid #ded5c8; padding: 12px; text-align: left; }
    .total { margin-top: 24px; font-size: 30px; font-weight: 900; }
    .note { margin-top: 10px; font-size: 13px; color: #6f6658; }
  </style>
</head>
<body>
  <h1>${escapeHtml(copy.quoteSummaryTitle)}</h1>
  <p>${escapeHtml(copy.quoteSubheadPrefix)}${escapeHtml(copy.transportNote)}</p>
  <table>
    <tr><th>${escapeHtml(copy.quoteColItem)}</th><th>${escapeHtml(copy.quoteColPrice)}</th></tr>
    <tr><td>${escapeHtml(pickText(estimate.model.nameKo, estimate.model.nameEn, language))} (${escapeHtml(copy.basePrice)})</td><td>${escapeHtml(formatWon(estimate.model.basePrice))}</td></tr>
    ${optionRows}
    <tr><td>${escapeHtml(copy.optionSubtotal)}</td><td>${escapeHtml(estimate.optionTotal > 0 ? `+${formatWon(estimate.optionTotal)}` : formatWon(0))}</td></tr>
    ${consultRow}
  </table>
  <div class="total">${escapeHtml(copy.estimatedAmount)} ${escapeHtml(formatWon(estimate.estimatedTotal))}</div>
  <p class="note">${escapeHtml(copy.notPayment)} ${escapeHtml(copy.finalQuote)}</p>
</body>
</html>`;
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[char] ?? char);
}
