export type SelectionType = 'single' | 'multiple';
export type PriceType = 'included' | 'fixed' | 'consult';
export type ConsultationStatus = '신규' | '진행중' | '완료' | '보류';

export interface CustomizeModel {
  id: string;
  code: string;
  nameKo: string;
  nameEn: string | null;
  widthM: number;
  lengthM: number;
  areaSqm: number;
  basePrice: number;
  floorplanImagePath: string | null;
  floorplanOverlayPath: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface CustomizeCategory {
  id: string;
  key: string;
  nameKo: string;
  nameEn: string | null;
  descriptionKo: string | null;
  descriptionEn: string | null;
  selectionType: SelectionType;
  required: boolean;
  displayOrder: number;
  isActive: boolean;
}

export interface CustomizeOption {
  id: string;
  categoryId: string;
  categoryKey: string;
  key: string;
  nameKo: string;
  nameEn: string | null;
  shortDescriptionKo: string;
  shortDescriptionEn: string | null;
  detailDescriptionKo: string | null;
  detailDescriptionEn: string | null;
  priceType: PriceType;
  price: number;
  isDefault: boolean;
  availableModelIds: string[];
  imagePath: string | null;
  overlayImagePath: string | null;
  overlayLabelKo: string | null;
  overlayLabelEn: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface CustomizeIncludedSpec {
  id: string;
  modelId: string | null;
  key: string;
  nameKo: string;
  nameEn: string | null;
  descriptionKo: string | null;
  descriptionEn: string | null;
  categoryKey: string | null;
  iconName: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface CustomizeOptionConflict {
  optionId: string;
  conflictsWithOptionId: string;
  reasonKo: string | null;
  reasonEn: string | null;
}

export interface CustomizeCatalog {
  models: CustomizeModel[];
  categories: CustomizeCategory[];
  options: CustomizeOption[];
  includedSpecs: CustomizeIncludedSpec[];
  conflicts: CustomizeOptionConflict[];
}

export type SelectedOptions = Record<string, string[]>;

export interface ConfigShareState {
  version: 1;
  modelId: string;
  selectedOptions: SelectedOptions;
}

export interface EstimateBreakdown {
  model: CustomizeModel;
  selectedOptions: CustomizeOption[];
  optionTotal: number;
  estimatedTotal: number;
  consultOptionCount: number;
}

export interface ConsultationFormInput {
  modelId: string;
  selectedOptions: SelectedOptions;
  configQuery?: string;
  customerName: string;
  phone: string;
  region: string;
  purchaseTimeline?: string;
  landType?: string;
  installAddress?: string;
  budgetRange?: string;
  memo?: string;
}

export interface CustomizeConsultation {
  id: string;
  customerName: string;
  phone: string;
  region: string;
  purchaseTimeline: string | null;
  landType: string | null;
  installAddress: string | null;
  budgetRange: string | null;
  memo: string | null;
  status: ConsultationStatus;
  internalMemo: string | null;
  selectedModelId: string | null;
  selectedOptionIds: string[];
  estimatedTotal: number;
  configQuery: string | null;
  configSnapshot: unknown;
  createdAt: string;
  updatedAt: string;
}
