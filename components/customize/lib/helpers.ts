import {
  formatWon,
  getDefaultSelections,
  optionsForModel,
} from '@/lib/customize/priceCalculator';
import type {
  CustomizeCatalog,
  CustomizeOption,
  EstimateBreakdown,
  SelectedOptions,
} from '@/lib/customize/types';
import {
  COPY,
  FALLBACK_CATALOG,
  type ConfigStep,
} from './constants';

export function nextStepCta(step: ConfigStep) {
  if (step === 'space') return '다음: 공간 구성';
  if (step === 'included') return '다음: 무드 & 소재';
  if (step === 'mood') return '다음: 스마트 테크';
  if (step === 'smart') return '구성 검토하기';
  return '상담·견적 요청하기';
}

// 옵션 카드/요약에 노출하는 가격 라벨은 '기본 포함 / +₩x / 상담 필요' 세 가지로 통일한다.
export function optionPriceDisplay(option: Pick<CustomizeOption, 'priceType' | 'price'>) {
  if (option.priceType === 'included') return '기본 포함';
  if (option.priceType === 'consult') return '상담 필요';
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

  return { selections: nextSelections, removedOptions };
}

export function stepStatusText(step: ConfigStep, count: number) {
  if (step === 'space') return '선택 완료';
  if (step === 'review') return '최종 확인';
  return `${count}개 선택`;
}

export function hasOptionInfo(option: CustomizeOption) {
  const optionKey = option.key || option.id;
  return Boolean(option.detailDescriptionKo || option.shortDescriptionKo || option.imagePath || FALLBACK_CATALOG[optionKey] || FALLBACK_CATALOG[option.id]);
}

export function buildQuoteHtml(estimate: EstimateBreakdown, selectedOptions: CustomizeOption[]) {
  const optionRows = selectedOptions
    .map((option) => `<tr><td>${escapeHtml(option.nameKo)}</td><td>${escapeHtml(optionPriceDisplay(option))}</td></tr>`)
    .join('');
  const consultRow = estimate.consultOptionCount > 0
    ? `<tr><td>${escapeHtml(COPY.consultNeeded)} 항목</td><td>${estimate.consultOptionCount}개 · 견적 별도</td></tr>`
    : '';

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>위트 견적 요약</title>
  <style>
    @page { size: A4 landscape; margin: 18mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Noto Sans KR", sans-serif; color: #2f3432; background: #f8f4ec; }
    h1 { margin: 0 0 8px; font-size: 28px; }
    p { margin: 0; color: #6f6658; }
    table { width: 100%; margin-top: 24px; border-collapse: collapse; background: #fffaf2; }
    th, td { border-bottom: 1px solid #ded5c8; padding: 12px; text-align: left; }
    .total { margin-top: 24px; font-size: 30px; font-weight: 900; }
    .note { margin-top: 10px; font-size: 13px; color: #6f6658; }
  </style>
</head>
<body>
  <h1>위트 이동식주택 견적 요약</h1>
  <p>상담 요청용 예상 금액 · ${escapeHtml(COPY.transportNote)}</p>
  <table>
    <tr><th>항목</th><th>가격</th></tr>
    <tr><td>${escapeHtml(estimate.model.nameKo)} (${escapeHtml(COPY.basePrice)})</td><td>${escapeHtml(formatWon(estimate.model.basePrice))}</td></tr>
    ${optionRows}
    <tr><td>${escapeHtml(COPY.optionSubtotal)}</td><td>${escapeHtml(estimate.optionTotal > 0 ? `+${formatWon(estimate.optionTotal)}` : formatWon(0))}</td></tr>
    ${consultRow}
  </table>
  <div class="total">${escapeHtml(COPY.estimatedAmount)} ${escapeHtml(formatWon(estimate.estimatedTotal))}</div>
  <p class="note">${escapeHtml(COPY.notPayment)} ${escapeHtml(COPY.finalQuote)}</p>
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
