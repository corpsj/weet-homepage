import type {
  ConfigShareState,
  CustomizeCatalog,
  CustomizeCategory,
  CustomizeModel,
  CustomizeOption,
  EstimateBreakdown,
  SelectedOptions,
} from './types';

// 정확한 원화 표기: ₩ 기호 + 천단위 구분 → "₩28,000,000". "~만원" 약식 표기는 쓰지 않는다.
export function formatWon(value: number) {
  return `₩${Math.max(0, value).toLocaleString('ko-KR')}`;
}

export function formatModelStartPrice(value: number) {
  return `${formatWon(value)}부터`;
}

export function formatOptionPrice(option: Pick<CustomizeOption, 'priceType' | 'price'>) {
  if (option.priceType === 'included') return '포함';
  if (option.priceType === 'consult') return '협의';
  return formatWon(option.price);
}

export function optionPriceValue(option: Pick<CustomizeOption, 'priceType' | 'price'>) {
  return option.priceType === 'fixed' ? option.price : 0;
}

export function optionsForModel(options: CustomizeOption[], modelId: string) {
  return options.filter((option) => option.availableModelIds.length === 0 || option.availableModelIds.includes(modelId));
}

export function getDefaultSelections(catalog: CustomizeCatalog, modelId: string): SelectedOptions {
  const selections: SelectedOptions = {};
  const availableOptions = optionsForModel(catalog.options.filter((option) => option.isActive), modelId);

  for (const category of catalog.categories.filter((item) => item.isActive)) {
    const defaults = availableOptions
      .filter((option) => option.categoryId === category.id && option.isDefault)
      .map((option) => option.id);

    if (defaults.length > 0) {
      selections[category.id] = category.selectionType === 'single' ? [defaults[0]] : defaults;
    }
  }

  return selections;
}

export function selectedOptionIds(selectedOptions: SelectedOptions) {
  return Object.values(selectedOptions).flat().filter(Boolean);
}

export function selectedOptionList(catalog: CustomizeCatalog, selectedOptions: SelectedOptions, modelId: string) {
  const selected = new Set(selectedOptionIds(selectedOptions));
  return optionsForModel(catalog.options, modelId).filter((option) => selected.has(option.id));
}

export function getConflictingOptionIds(catalog: CustomizeCatalog, optionId: string) {
  return catalog.conflicts
    .filter((conflict) => conflict.optionId === optionId)
    .map((conflict) => conflict.conflictsWithOptionId);
}

// 옵션을 켤 때 충돌로 제외될 옵션 + 사유(reasonKo)를 미리 계산한다(토글 적용 전 안내용).
// 현재 선택돼 있고, 새 옵션과 충돌하는 옵션만 대상으로 한다.
export function getRemovedConflicts(
  catalog: CustomizeCatalog,
  selectedOptions: SelectedOptions,
  option: CustomizeOption
): { option: CustomizeOption; reasonKo: string | null }[] {
  const conflicts = new Set(getConflictingOptionIds(catalog, option.id));
  if (conflicts.size === 0) return [];

  const selected = new Set(selectedOptionIds(selectedOptions));
  const reasonByOptionId = new Map(
    catalog.conflicts
      .filter((conflict) => conflict.optionId === option.id)
      .map((conflict) => [conflict.conflictsWithOptionId, conflict.reasonKo])
  );

  return catalog.options
    .filter((candidate) => candidate.id !== option.id && conflicts.has(candidate.id) && selected.has(candidate.id))
    .map((candidate) => ({ option: candidate, reasonKo: reasonByOptionId.get(candidate.id) ?? null }));
}

export function hasConflict(catalog: CustomizeCatalog, optionIds: string[]) {
  const selected = new Set(optionIds);
  return catalog.conflicts.some(
    (conflict) => selected.has(conflict.optionId) && selected.has(conflict.conflictsWithOptionId)
  );
}

export function toggleOptionSelection(params: {
  catalog: CustomizeCatalog;
  selectedOptions: SelectedOptions;
  category: CustomizeCategory;
  option: CustomizeOption;
}) {
  const { catalog, selectedOptions, category, option } = params;
  const next: SelectedOptions = { ...selectedOptions };
  const current = next[category.id] ?? [];

  if (category.selectionType === 'single') {
    // 필수가 아닌 단일선택 카테고리는 이미 선택된 옵션을 재클릭하면 해제할 수 있다.
    next[category.id] = !category.required && current.length === 1 && current[0] === option.id
      ? []
      : [option.id];
  } else {
    next[category.id] = current.includes(option.id)
      ? current.filter((id) => id !== option.id)
      : [...current, option.id];
  }

  const conflicts = new Set(getConflictingOptionIds(catalog, option.id));
  if (conflicts.size > 0) {
    for (const [categoryId, ids] of Object.entries(next)) {
      next[categoryId] = ids.filter((id) => !conflicts.has(id));
    }
  }

  return next;
}

export function calculateEstimate(catalog: CustomizeCatalog, modelId: string, selectedOptions: SelectedOptions): EstimateBreakdown | null {
  const model = catalog.models.find((item) => item.id === modelId && item.isActive);
  if (!model) return null;

  const options = selectedOptionList(catalog, selectedOptions, modelId);
  const optionTotal = options.reduce((sum, option) => sum + optionPriceValue(option), 0);

  return {
    model,
    selectedOptions: options,
    optionTotal,
    estimatedTotal: model.basePrice + optionTotal,
    consultOptionCount: options.filter((option) => option.priceType === 'consult').length,
  };
}

export function floorplanSize(model: CustomizeModel) {
  const width = model.id === 'standard-3x9' || model.lengthM >= 9 ? 900 : 600;
  // 우측 고정(우변 x=950) · 좌측 확장. 3×6 → 3×9 시 오른쪽 벽은 그대로, 왼쪽 벽만 바깥으로 확장된다.
  // 3×9는 기존과 동일한 x=50, 3×6만 x=350으로 우측 정렬되어 동일 스케일(100px/m) 비교가 된다.
  const RIGHT_EDGE = 950;
  return { x: RIGHT_EDGE - width, y: 60, width, height: 300 };
}

function encodeBase64Url(value: string) {
  const base64 = typeof Buffer !== 'undefined' && typeof window === 'undefined'
    ? Buffer.from(value, 'utf8').toString('base64')
    : btoa(unescape(encodeURIComponent(value)));

  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');

  if (typeof Buffer !== 'undefined' && typeof window === 'undefined') {
    return Buffer.from(padded, 'base64').toString('utf8');
  }

  return decodeURIComponent(escape(atob(padded)));
}

export function encodeConfig(modelId: string, selectedOptions: SelectedOptions) {
  const state: ConfigShareState = {
    version: 1,
    modelId,
    selectedOptions,
  };

  return encodeBase64Url(JSON.stringify(state));
}

export function decodeConfig(value: string | null): ConfigShareState | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(decodeBase64Url(value)) as ConfigShareState;
    if (parsed.version !== 1 || !parsed.modelId || typeof parsed.selectedOptions !== 'object') {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export const calculateTotalPrice = (model: CustomizeModel, options: CustomizeOption[]) =>
  model.basePrice + options.reduce((sum, option) => sum + optionPriceValue(option), 0);

export const formatPrice = formatWon;

// ?c= 디코드/모델 변경 등 신뢰할 수 없는 선택 상태를 카탈로그 기준으로 정규화한다.
// 규칙: 없는 옵션 제거 → 실제 categoryId로 재매핑 → single은 첫 항목만 →
// 충돌 쌍은 기본(isDefault) 옵션을 제거(둘 다/둘 다 아니면 conflictsWith 쪽 제거) →
// 모델이 비활성/부재면 첫 활성 모델 + 기본 선택으로 폴백.
export function sanitizeConfig(
  catalog: CustomizeCatalog,
  modelId: string,
  selections: SelectedOptions
): { modelId: string; selections: SelectedOptions } {
  const model = catalog.models.find((item) => item.id === modelId && item.isActive);
  if (!model) {
    const fallbackId = catalog.models.find((item) => item.isActive)?.id ?? modelId;
    return { modelId: fallbackId, selections: getDefaultSelections(catalog, fallbackId) };
  }

  const available = new Map(
    optionsForModel(catalog.options.filter((option) => option.isActive), model.id).map((option) => [option.id, option])
  );
  const categories = new Map(catalog.categories.filter((category) => category.isActive).map((category) => [category.id, category]));

  const next: SelectedOptions = {};
  const seen = new Set<string>();
  for (const optionId of Object.values(selections).flat()) {
    const option = available.get(optionId);
    if (!option || seen.has(optionId)) continue;
    const category = categories.get(option.categoryId);
    if (!category) continue;
    const current = next[option.categoryId] ?? [];
    if (category.selectionType === 'single' && current.length >= 1) continue;
    seen.add(optionId);
    next[option.categoryId] = [...current, optionId];
  }

  for (const conflict of catalog.conflicts) {
    const ids = new Set(Object.values(next).flat());
    if (!ids.has(conflict.optionId) || !ids.has(conflict.conflictsWithOptionId)) continue;
    const a = available.get(conflict.optionId);
    const b = available.get(conflict.conflictsWithOptionId);
    const dropId = a?.isDefault && !b?.isDefault ? conflict.optionId
      : b?.isDefault && !a?.isDefault ? conflict.conflictsWithOptionId
      : conflict.conflictsWithOptionId;
    for (const [categoryId, optionIds] of Object.entries(next)) {
      next[categoryId] = optionIds.filter((id) => id !== dropId);
    }
  }

  for (const [categoryId, optionIds] of Object.entries(next)) {
    if (optionIds.length === 0) delete next[categoryId];
  }

  return { modelId: model.id, selections: next };
}
