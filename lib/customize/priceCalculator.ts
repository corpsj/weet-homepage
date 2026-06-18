import type {
  ConfigShareState,
  CustomizeCatalog,
  CustomizeCategory,
  CustomizeModel,
  CustomizeOption,
  EstimateBreakdown,
  SelectedOptions,
} from './types';

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
    next[category.id] = [option.id];
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
