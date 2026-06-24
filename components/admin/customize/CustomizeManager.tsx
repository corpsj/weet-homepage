'use client';

import { useEffect, useMemo, useState, useTransition, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  AlertTriangle,
  Boxes,
  Eye,
  EyeOff,
  FolderTree,
  Image as ImageIcon,
  Loader2,
  PackageCheck,
  Plus,
  Save,
  SlidersHorizontal,
  Trash2,
  type LucideIcon,
} from 'lucide-react';
import ImageUpload from '@/components/admin/media/ImageUpload';
import { cn } from '@/lib/utils';
import { confirmToast } from '@/lib/ui/confirm';
import { useUnsavedChangesWarning } from '@/hooks/useUnsavedChangesWarning';
import {
  createCustomizeOptionConflict,
  deleteCustomizeCategory,
  deleteCustomizeIncludedSpec,
  deleteCustomizeModel,
  deleteCustomizeOption,
  deleteCustomizeOptionConflict,
  setCustomizeEntityActive,
  upsertCustomizeCategory,
  upsertCustomizeIncludedSpec,
  upsertCustomizeModel,
  upsertCustomizeOption,
} from '@/app/actions/customize-actions';
import type {
  CustomizeCatalog,
  CustomizeCategory,
  CustomizeIncludedSpec,
  CustomizeModel,
  CustomizeOption,
} from '@/lib/customize/types';
import {
  ConsoleMetricCard,
  ConsolePageHeader,
  ConsolePanel,
  ConsoleSectionTitle,
  ConsoleStatusPill,
  consoleInputClass,
  consoleSelectClass,
  consolePrimaryButtonClass,
  consoleSecondaryButtonClass,
  consoleIconButtonClass,
} from '@/components/admin/ConsolePrimitives';

interface CustomizeManagerProps {
  initialCatalog: CustomizeCatalog;
}

type CustomizeTab = 'models' | 'included' | 'categories' | 'options' | 'assets';

// Base UI Tabs가 이 화면에서 탭 전환(aria-selected)을 반영하지 못해 로컬 제어형 탭으로 대체한다.
const TAB_ITEMS: { value: CustomizeTab; label: string; Icon: LucideIcon }[] = [
  { value: 'models', label: '모델', Icon: Boxes },
  { value: 'included', label: '기본 포함 사양', Icon: PackageCheck },
  { value: 'categories', label: '카테고리', Icon: FolderTree },
  { value: 'options', label: '옵션', Icon: SlidersHorizontal },
  { value: 'assets', label: '이미지 자산', Icon: ImageIcon },
];

const textareaClass = 'min-h-20 w-full rounded-[9px] border border-admin-line-2 bg-white px-3 py-2 text-sm text-admin-ink outline-none transition-colors placeholder:text-[#a1a1aa] focus:border-admin-accent focus:ring-2 focus:ring-admin-accent/15 disabled:cursor-not-allowed disabled:opacity-60';
const labelClass = 'mb-1 block text-xs font-bold text-admin-muted';

const emptyModel = {
  id: '',
  code: '',
  nameKo: '',
  nameEn: '',
  widthM: 3,
  lengthM: 6,
  areaSqm: 18,
  basePrice: 0,
  floorplanImagePath: '',
  floorplanOverlayPath: '',
  displayOrder: 0,
  isActive: true,
};

const emptyCategory = {
  key: '',
  nameKo: '',
  nameEn: '',
  descriptionKo: '',
  descriptionEn: '',
  selectionType: 'single',
  required: false,
  displayOrder: 0,
  isActive: true,
};

const emptyOption = {
  categoryId: '',
  key: '',
  nameKo: '',
  nameEn: '',
  shortDescriptionKo: '',
  shortDescriptionEn: '',
  detailDescriptionKo: '',
  detailDescriptionEn: '',
  priceType: 'fixed',
  price: 0,
  isDefault: false,
  availableModelIds: [] as string[],
  imagePath: '',
  overlayImagePath: '',
  overlayLabelKo: '',
  overlayLabelEn: '',
  displayOrder: 0,
  isActive: true,
};

const emptyIncludedSpec = {
  modelId: '',
  key: '',
  nameKo: '',
  nameEn: '',
  descriptionKo: '',
  descriptionEn: '',
  categoryKey: '',
  iconName: '',
  displayOrder: 0,
  isActive: true,
};

export default function CustomizeManager({ initialCatalog }: CustomizeManagerProps) {
  const router = useRouter();
  const [catalog, setCatalog] = useState(initialCatalog);
  const [activeTab, setActiveTab] = useState<CustomizeTab>('models');
  const [isPending, startTransition] = useTransition();
  const [modelForm, setModelForm] = useState(emptyModel);
  const [categoryForm, setCategoryForm] = useState(emptyCategory);
  const [editingCategoryId, setEditingCategoryId] = useState<string | undefined>();
  const [optionForm, setOptionForm] = useState(emptyOption);
  const [editingOptionId, setEditingOptionId] = useState<string | undefined>();
  const [includedForm, setIncludedForm] = useState(emptyIncludedSpec);
  const [editingIncludedId, setEditingIncludedId] = useState<string | undefined>();
  const [conflictForm, setConflictForm] = useState({ optionId: '', conflictsWithOptionId: '', reasonKo: '' });
  const [uploadedUrl, setUploadedUrl] = useState('');

  useEffect(() => {
    setCatalog(initialCatalog);
  }, [initialCatalog]);

  const optionNameById = useMemo(
    () => new Map(catalog.options.map((option) => [option.id, option.nameKo])),
    [catalog.options]
  );

  // 운영 개요: 노출 상태와 데이터 공백(빈 카테고리, 이미지 누락)을 한눈에 보여준다.
  const overview = useMemo(() => {
    const optionCategories = catalog.categories.filter((category) => category.key !== 'model');
    const activeOptions = catalog.options.filter((option) => option.isActive);
    return {
      modelTotal: catalog.models.length,
      modelActive: catalog.models.filter((model) => model.isActive).length,
      optionTotal: catalog.options.length,
      optionActive: activeOptions.length,
      categoryTotal: optionCategories.length,
      categoryActive: optionCategories.filter((category) => category.isActive).length,
      missingInfoImage: activeOptions.filter((option) => !option.imagePath?.trim()).length,
      overlayCount: activeOptions.filter((option) => option.overlayImagePath?.trim()).length,
      emptyActiveCategories: optionCategories.filter(
        (category) =>
          category.isActive &&
          !catalog.options.some((option) => option.categoryId === category.id && option.isActive)
      ).length,
      conflictCount: catalog.conflicts.length,
    };
  }, [catalog]);

  const tabCounts: Record<CustomizeTab, number | null> = {
    models: catalog.models.length,
    included: catalog.includedSpecs.length,
    categories: catalog.categories.length,
    options: catalog.options.length,
    assets: null,
  };

  const runAction = (label: string, action: () => Promise<unknown>) => {
    startTransition(async () => {
      try {
        await action();
        toast.success(`${label} 완료`);
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : `${label} 실패`);
      }
    });
  };

  const saveModel = () => runAction('모델 저장', () => upsertCustomizeModel(modelForm));
  const saveCategory = () => runAction('카테고리 저장', () => upsertCustomizeCategory({ id: editingCategoryId, ...categoryForm }));
  const saveOption = () => runAction('옵션 저장', () => upsertCustomizeOption({ id: editingOptionId, ...optionForm }));
  const saveIncluded = () => runAction('포함 사양 저장', () => upsertCustomizeIncludedSpec({ id: editingIncludedId, ...includedForm }));

  // Required-field guards: disable Save until identifying fields are filled, so an
  // empty/whitespace-only upsert can't be submitted.
  const modelValid = Boolean(modelForm.id.trim() && modelForm.nameKo.trim());
  const categoryValid = Boolean(categoryForm.key.trim() && categoryForm.nameKo.trim());
  const optionValid = Boolean(optionForm.categoryId.trim() && optionForm.key.trim() && optionForm.nameKo.trim());
  const includedValid = Boolean(includedForm.key.trim() && includedForm.nameKo.trim());

  // Warn before refresh/close when any form holds in-progress edits (differs from
  // its empty baseline, or is in edit mode). Covers the browser beforeunload path.
  const isFormDirty =
    JSON.stringify(modelForm) !== JSON.stringify(emptyModel) ||
    JSON.stringify(categoryForm) !== JSON.stringify(emptyCategory) ||
    JSON.stringify(optionForm) !== JSON.stringify(emptyOption) ||
    JSON.stringify(includedForm) !== JSON.stringify(emptyIncludedSpec) ||
    Boolean(editingCategoryId || editingOptionId || editingIncludedId);
  useUnsavedChangesWarning(isFormDirty);

  const deleteWithConfirm = async (label: string, name: string, action: () => Promise<unknown>) => {
    if (!(await confirmToast(`${name} 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`, { confirmLabel: '삭제' }))) return;
    runAction(`${label} 삭제`, action);
  };

  return (
    <div className="space-y-6">
      <ConsolePageHeader
        eyebrow="CUSTOMIZE CATALOG"
        title="주문 구성 관리"
        description="모델, 옵션, 평면 오버레이와 상담 저장 흐름을 관리합니다."
        actions={
          isPending && (
            <div className="flex items-center gap-2 rounded-[9px] border border-admin-accent-line bg-admin-accent-soft px-3 py-1.5 text-xs font-bold text-admin-accent">
              <Loader2 className="h-4 w-4 animate-spin" />
              저장 중...
            </div>
          )
        }
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <ConsoleMetricCard
          label="활성 모델"
          value={`${overview.modelActive}/${overview.modelTotal}`}
          caption="주문 페이지에 노출되는 모델"
          icon={<Boxes className="h-5 w-5" />}
          tone={overview.modelActive === 0 ? 'warning' : 'dark'}
        />
        <ConsoleMetricCard
          label="활성 옵션"
          value={`${overview.optionActive}/${overview.optionTotal}`}
          caption={`카테고리 ${overview.categoryActive}/${overview.categoryTotal} 활성${
            overview.emptyActiveCategories > 0 ? ` · 빈 카테고리 ${overview.emptyActiveCategories}개` : ''
          }`}
          icon={<SlidersHorizontal className="h-5 w-5" />}
          tone={overview.emptyActiveCategories > 0 ? 'warning' : 'neutral'}
        />
        <ConsoleMetricCard
          label="정보 이미지 누락"
          value={overview.missingInfoImage}
          caption={`활성 옵션 기준 · 오버레이 ${overview.overlayCount}개 등록`}
          icon={<ImageIcon className="h-5 w-5" />}
          tone={overview.missingInfoImage > 0 ? 'warning' : 'neutral'}
        />
        <ConsoleMetricCard
          label="충돌 관계"
          value={overview.conflictCount}
          caption="동시 선택이 막히는 옵션 조합"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
      </div>

      <div className="space-y-5">
        <div className="overflow-x-auto">
          <div
            role="tablist"
            aria-label="주문 구성 관리 탭"
            className="inline-flex min-w-max items-center rounded-[9px] border border-admin-line-2 bg-[#f4f4f5] p-[3px]"
          >
            {TAB_ITEMS.map(({ value, label, Icon }) => {
              const selected = activeTab === value;
              const count = tabCounts[value];
              return (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  id={`customize-tab-${value}`}
                  aria-selected={selected}
                  aria-controls={`customize-panel-${value}`}
                  onClick={() => setActiveTab(value)}
                  className={cn(
                    'inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-[7px] px-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-admin-accent/20',
                    selected ? 'bg-white text-admin-accent shadow-sm' : 'text-[#71717a] hover:text-admin-ink'
                  )}
                >
                  <Icon className="size-3.5" />
                  {label}
                  {count !== null && <TabCount value={count} />}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === 'models' && (
        <div role="tabpanel" id="customize-panel-models" aria-labelledby="customize-tab-models">
          <AdminSection
            title="모델"
            description="주문 페이지에 노출되는 공간 모델과 기본가를 관리합니다."
            action={
              <button className={consoleSecondaryButtonClass} onClick={() => setModelForm(emptyModel)}>
                <Plus className="h-4 w-4" /> 새 모델
              </button>
            }
          >
            <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
              <ConsolePanel className="p-5">
                <FormStateHeader
                  editing={Boolean(modelForm.id && catalog.models.some((model) => model.id === modelForm.id))}
                  editLabel={`모델 수정: ${modelForm.nameKo || modelForm.id}`}
                  newLabel="새 모델 등록"
                />
                <ModelForm form={modelForm} setForm={setModelForm} onSave={saveModel} canSave={modelValid} />
              </ConsolePanel>
              <DataTable>
                {catalog.models.length === 0 && (
                  <EmptyListNote>등록된 모델이 없습니다. 왼쪽 폼에서 첫 모델을 추가하세요.</EmptyListNote>
                )}
                {catalog.models.map((model) => (
                  <TableRow key={model.id}>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-bold text-admin-ink">{model.nameKo}</p>
                        <span className="text-[10px] font-semibold text-[#a1a1aa]">{model.id}</span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-admin-muted">
                        {model.widthM}×{model.lengthM}m · {model.areaSqm}m² · ₩{model.basePrice.toLocaleString('ko-KR')}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <ConsoleStatusPill tone={model.isActive ? 'success' : 'neutral'}>
                        {model.isActive ? '활성' : '숨김'}
                      </ConsoleStatusPill>
                      <RowActions
                        onEdit={() => setModelForm(modelToForm(model))}
                        onToggle={() => runAction('모델 노출 변경', () => setCustomizeEntityActive('model', model.id, !model.isActive))}
                        onDelete={() => deleteWithConfirm('모델', model.nameKo, () => deleteCustomizeModel(model.id))}
                        deleteLabel={`${model.nameKo} 모델 삭제`}
                        active={model.isActive}
                      />
                    </div>
                  </TableRow>
                ))}
              </DataTable>
            </div>
          </AdminSection>
        </div>
        )}

        {activeTab === 'included' && (
        <div role="tabpanel" id="customize-panel-included" aria-labelledby="customize-tab-included">
          <AdminSection
            title="기본 포함 사양"
            description="기본가에 포함되어 옵션 선택 없이 제공되는 사양 안내 항목입니다."
            action={
              <button className={consoleSecondaryButtonClass} onClick={() => { setIncludedForm(emptyIncludedSpec); setEditingIncludedId(undefined); }}>
                <Plus className="h-4 w-4" /> 새 사양
              </button>
            }
          >
            <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
              <ConsolePanel className="p-5">
                <FormStateHeader
                  editing={Boolean(editingIncludedId)}
                  editLabel={`사양 수정: ${includedForm.nameKo || includedForm.key}`}
                  newLabel="새 포함 사양 등록"
                />
                <IncludedForm form={includedForm} setForm={setIncludedForm} models={catalog.models} onSave={saveIncluded} canSave={includedValid} />
              </ConsolePanel>
              <DataTable>
                {catalog.includedSpecs.length === 0 && (
                  <EmptyListNote>등록된 포함 사양이 없습니다. 골조·단열처럼 기본 제공되는 항목을 추가하세요.</EmptyListNote>
                )}
                {catalog.includedSpecs.map((spec) => (
                  <TableRow key={spec.id}>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-admin-ink">{spec.nameKo}</p>
                      <p className="mt-0.5 text-[11px] text-admin-muted">{spec.modelId || '공통'} · {spec.categoryKey || '-'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <ConsoleStatusPill tone={spec.isActive ? 'success' : 'neutral'}>
                        {spec.isActive ? '활성' : '숨김'}
                      </ConsoleStatusPill>
                      <RowActions
                        onEdit={() => { setEditingIncludedId(spec.id); setIncludedForm(includedToForm(spec)); }}
                        onToggle={() => runAction('포함 사양 노출 변경', () => setCustomizeEntityActive('includedSpec', spec.id, !spec.isActive))}
                        onDelete={() => deleteWithConfirm('포함 사양', spec.nameKo, () => deleteCustomizeIncludedSpec(spec.id))}
                        deleteLabel={`${spec.nameKo} 포함 사양 삭제`}
                        active={spec.isActive}
                      />
                    </div>
                  </TableRow>
                ))}
              </DataTable>
            </div>
          </AdminSection>
        </div>
        )}

        {activeTab === 'categories' && (
        <div role="tabpanel" id="customize-panel-categories" aria-labelledby="customize-tab-categories">
          <AdminSection
            title="옵션 카테고리"
            description="옵션을 묶는 분류와 단일/복수 선택 방식을 관리합니다."
            action={
              <button className={consoleSecondaryButtonClass} onClick={() => { setCategoryForm(emptyCategory); setEditingCategoryId(undefined); }}>
                <Plus className="h-4 w-4" /> 새 카테고리
              </button>
            }
          >
            <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
              <ConsolePanel className="p-5">
                <FormStateHeader
                  editing={Boolean(editingCategoryId)}
                  editLabel={`카테고리 수정: ${categoryForm.nameKo || categoryForm.key}`}
                  newLabel="새 카테고리 등록"
                />
                <CategoryForm form={categoryForm} setForm={setCategoryForm} onSave={saveCategory} canSave={categoryValid} />
              </ConsolePanel>
              <DataTable>
                {catalog.categories.length === 0 && (
                  <EmptyListNote>등록된 카테고리가 없습니다. 외장·창호처럼 옵션을 묶을 분류를 먼저 추가하세요.</EmptyListNote>
                )}
                {catalog.categories.map((category) => {
                  const optionCount = catalog.options.filter((option) => option.categoryId === category.id).length;
                  return (
                    <TableRow key={category.id}>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate text-sm font-bold text-admin-ink">{category.nameKo}</p>
                          <span className="text-[10px] font-semibold text-[#a1a1aa]">{category.key}</span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-admin-muted">
                          {category.selectionType === 'single' ? '단일 선택' : '복수 선택'}
                          {category.required ? ' · 필수' : ''}
                          {` · 옵션 ${optionCount}개`}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <ConsoleStatusPill tone={category.isActive ? 'success' : 'neutral'}>
                          {category.isActive ? '활성' : '숨김'}
                        </ConsoleStatusPill>
                        <RowActions
                          onEdit={() => { setEditingCategoryId(category.id); setCategoryForm(categoryToForm(category)); }}
                          onToggle={() => runAction('카테고리 노출 변경', () => setCustomizeEntityActive('category', category.id, !category.isActive))}
                          onDelete={() => deleteWithConfirm('카테고리', category.nameKo, () => deleteCustomizeCategory(category.id))}
                          deleteLabel={`${category.nameKo} 카테고리 삭제`}
                          active={category.isActive}
                        />
                      </div>
                    </TableRow>
                  );
                })}
              </DataTable>
            </div>
          </AdminSection>
        </div>
        )}

        {activeTab === 'options' && (
        <div role="tabpanel" id="customize-panel-options" aria-labelledby="customize-tab-options">
          <AdminSection
            title="옵션"
            description="카테고리별 옵션의 가격, 기본 선택, 모델 노출과 충돌 관계를 관리합니다."
            action={
              <button className={consoleSecondaryButtonClass} onClick={() => { setOptionForm({ ...emptyOption, categoryId: catalog.categories.find((category) => category.key !== 'model')?.id || '' }); setEditingOptionId(undefined); }}>
                <Plus className="h-4 w-4" /> 새 옵션
              </button>
            }
          >
            <div className="grid gap-6 xl:grid-cols-[460px_1fr]">
              <div className="space-y-5">
                <ConsolePanel className="p-5">
                  <FormStateHeader
                    editing={Boolean(editingOptionId)}
                    editLabel={`옵션 수정: ${optionForm.nameKo || optionForm.key}`}
                    newLabel="새 옵션 등록"
                  />
                  <OptionForm
                    form={optionForm}
                    setForm={setOptionForm}
                    categories={catalog.categories}
                    models={catalog.models}
                    onSave={saveOption}
                    canSave={optionValid}
                  />
                </ConsolePanel>
                <ConsolePanel className="p-5">
                  <h3 className="mb-1 text-sm font-bold text-admin-ink">충돌 옵션 등록</h3>
                  <p className="mb-4 text-[11px] text-admin-muted">두 옵션을 같이 선택할 수 없도록 묶습니다.</p>
                  <div className="space-y-3">
                    <SelectField value={conflictForm.optionId} onChange={(value) => setConflictForm((current) => ({ ...current, optionId: value }))}>
                      <option value="">기준 옵션</option>
                      {catalog.options.map((option) => <option key={option.id} value={option.id}>{option.nameKo}</option>)}
                    </SelectField>
                    <SelectField value={conflictForm.conflictsWithOptionId} onChange={(value) => setConflictForm((current) => ({ ...current, conflictsWithOptionId: value }))}>
                      <option value="">같이 선택 불가 옵션</option>
                      {catalog.options.map((option) => <option key={option.id} value={option.id}>{option.nameKo}</option>)}
                    </SelectField>
                    <input className={consoleInputClass + " w-full"} placeholder="충돌 사유" value={conflictForm.reasonKo} onChange={(event) => setConflictForm((current) => ({ ...current, reasonKo: event.target.value }))} />
                    <button
                      className={`${consolePrimaryButtonClass} w-full`}
                      onClick={() => runAction('충돌 관계 저장', () => createCustomizeOptionConflict(conflictForm.optionId, conflictForm.conflictsWithOptionId, conflictForm.reasonKo))}
                      disabled={!conflictForm.optionId || !conflictForm.conflictsWithOptionId}
                    >
                      <Save className="h-4 w-4" />
                      충돌 저장
                    </button>
                  </div>
                </ConsolePanel>
              </div>

              <div className="space-y-4">
                {catalog.categories.filter((category) => category.key !== 'model').map((category) => {
                  const options = catalog.options.filter((option) => option.categoryId === category.id);
                  const activeCount = options.filter((option) => option.isActive).length;
                  return (
                    <ConsolePanel key={category.id}>
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f1f1f3] px-3 py-2">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <h3 className="text-sm font-bold text-admin-ink">{category.nameKo}</h3>
                          <span className="text-[10px] font-semibold text-[#a1a1aa]">{category.key}</span>
                          <span className="rounded border border-admin-line-2 bg-white px-1.5 py-0.5 text-[10px] font-bold text-admin-muted">
                            {category.selectionType === 'single' ? '단일 선택' : '복수 선택'}
                          </span>
                          {!category.isActive && (
                            <span className="rounded bg-[#f4f4f5] px-1.5 py-0.5 text-[10px] font-bold text-[#a1a1aa]">카테고리 숨김</span>
                          )}
                        </div>
                        <span className="text-[11px] font-bold text-admin-muted">{activeCount}/{options.length} 활성</span>
                      </div>
                      {options.length === 0 ? (
                        <p className="px-3 py-5 text-center text-xs font-semibold text-[#a1a1aa]">
                          이 카테고리에 등록된 옵션이 없습니다. 주문 페이지에서는 빈 카테고리로 표시됩니다.
                        </p>
                      ) : (
                        <div className="divide-y divide-[#f4f4f5]">
                          {options.map((option) => (
                            <div
                              key={option.id}
                              className={cn(
                                'flex items-center justify-between gap-3 px-3 py-2 transition-colors hover:bg-[#fafafb]',
                                !option.isActive && 'opacity-55'
                              )}
                            >
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                                  <p className="truncate text-[13px] font-bold text-admin-ink">{option.nameKo}</p>
                                  <span className={cn('text-[11px] font-bold', option.priceType === 'fixed' ? 'text-admin-accent' : option.priceType === 'consult' ? 'text-[#a16207]' : 'text-[#a1a1aa]')}>
                                    {optionPriceLabel(option)}
                                  </span>
                                  {option.isDefault && (
                                    <span className="rounded bg-admin-ink px-1.5 py-0.5 text-[9px] font-bold text-white">기본 선택</span>
                                  )}
                                  {option.isActive && !option.imagePath?.trim() && (
                                    <span className="rounded bg-[#fff7ed] px-1.5 py-0.5 text-[9px] font-bold text-[#9a3412]">이미지 없음</span>
                                  )}
                                </div>
                                <p className="mt-0.5 truncate text-[11px] text-admin-muted">
                                  {option.key} · {modelScopeLabel(option, catalog.models)}
                                </p>
                              </div>
                              <RowActions
                                compact
                                onEdit={() => { setEditingOptionId(option.id); setOptionForm(optionToForm(option)); }}
                                onToggle={() => runAction('옵션 노출 변경', () => setCustomizeEntityActive('option', option.id, !option.isActive))}
                                onDelete={() => deleteWithConfirm('옵션', option.nameKo, () => deleteCustomizeOption(option.id))}
                                deleteLabel={`${option.nameKo} 옵션 삭제`}
                                active={option.isActive}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </ConsolePanel>
                  );
                })}

                <ConsolePanel>
                  <div className="flex items-center justify-between gap-3 border-b border-[#f1f1f3] px-3 py-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="size-3.5 text-[#9a3412]" />
                      <h3 className="text-sm font-bold text-admin-ink">등록된 충돌 관계</h3>
                    </div>
                    <span className="text-[11px] font-bold text-admin-muted">{catalog.conflicts.length}건</span>
                  </div>
                  {catalog.conflicts.length === 0 ? (
                    <p className="px-3 py-5 text-center text-xs font-semibold text-[#a1a1aa]">
                      등록된 충돌 관계가 없습니다. 왼쪽 아래 폼에서 추가할 수 있습니다.
                    </p>
                  ) : (
                    <div className="divide-y divide-[#f4f4f5]">
                      {catalog.conflicts.map((conflict) => (
                        <div key={`${conflict.optionId}-${conflict.conflictsWithOptionId}`} className="flex items-center justify-between gap-3 px-3 py-2">
                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-bold text-admin-ink">
                              {optionNameById.get(conflict.optionId)} ↔ {optionNameById.get(conflict.conflictsWithOptionId)}
                            </p>
                            <p className="mt-0.5 truncate text-[11px] text-admin-muted">{conflict.reasonKo || '동시 선택 불가'}</p>
                          </div>
                          <button
                            className={cn(consoleIconButtonClass, 'h-8 w-8 text-red-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700')}
                            onClick={() => runAction('충돌 관계 삭제', () => deleteCustomizeOptionConflict(conflict.optionId, conflict.conflictsWithOptionId))}
                            aria-label="충돌 관계 삭제"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </ConsolePanel>
              </div>
            </div>
          </AdminSection>
        </div>
        )}

        {activeTab === 'assets' && (
        <div role="tabpanel" id="customize-panel-assets" aria-labelledby="customize-tab-assets">
          <AdminSection title="이미지 자산" description="옵션 상세 모달 이미지와 평면 오버레이를 업로드합니다.">
            <div className="grid gap-6 lg:grid-cols-2">
              <ConsolePanel className="p-5">
                <h3 className="mb-2 text-sm font-bold text-admin-ink">정보 이미지 업로드</h3>
                <p className="mb-4 text-[11px] text-admin-muted">옵션 상세 모달에 사용할 이미지를 `images/customize/`에 업로드합니다.</p>
                <ImageUpload value={uploadedUrl} onChange={setUploadedUrl} bucket="images" pathPrefix="customize" quality="standard" />
                {uploadedUrl && <input className={`${consoleInputClass} w-full mt-4`} readOnly value={uploadedUrl} onFocus={(event) => event.currentTarget.select()} />}
              </ConsolePanel>
              <ConsolePanel className="p-5">
                <h3 className="mb-2 text-sm font-bold text-admin-ink">평면 오버레이 업로드</h3>
                <p className="mb-4 text-[11px] text-admin-muted">오버레이는 1000x420px 투명 PNG/WebP를 권장합니다. 크기가 달라도 업로드는 진행됩니다.</p>
                <ImageUpload value={uploadedUrl} onChange={setUploadedUrl} bucket="images" pathPrefix="customize" quality="high" recommendedSize={{ width: 1000, height: 420 }} />
              </ConsolePanel>
            </div>
          </AdminSection>
        </div>
        )}
      </div>
    </div>
  );
}

function AdminSection({ title, description, action, children }: { title: string; description?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <ConsoleSectionTitle>{title}</ConsoleSectionTitle>
          {description && <p className="-mt-2 text-xs font-medium text-admin-muted">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function FormStateHeader({ editing, editLabel, newLabel }: { editing: boolean; editLabel: string; newLabel: string }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 border-b border-[#f1f1f3] pb-3">
      <h3 className="min-w-0 truncate text-sm font-bold text-admin-ink">{editing ? editLabel : newLabel}</h3>
      <ConsoleStatusPill tone={editing ? 'dark' : 'neutral'}>{editing ? '수정 중' : '신규'}</ConsoleStatusPill>
    </div>
  );
}

function TabCount({ value }: { value: number }) {
  return <span className="rounded bg-white/80 px-1 text-[10px] font-bold text-[#a1a1aa]">{value}</span>;
}

function EmptyListNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center rounded-[9px] border border-dashed border-admin-line-2 bg-[#fafafb] px-4 py-8 text-center text-xs font-semibold leading-5 text-[#a1a1aa]">
      {children}
    </div>
  );
}

function optionPriceLabel(option: CustomizeOption) {
  if (option.priceType === 'included') return '기본 포함';
  if (option.priceType === 'consult') return '협의';
  return `+₩${option.price.toLocaleString('ko-KR')}`;
}

function modelScopeLabel(option: CustomizeOption, models: CustomizeModel[]) {
  if (option.availableModelIds.length === 0) return '모든 모델';
  return option.availableModelIds
    .map((id) => models.find((model) => model.id === id)?.nameKo ?? id)
    .join(', ');
}

function ModelForm({ form, setForm, onSave, canSave }: { form: typeof emptyModel; setForm: (value: typeof emptyModel) => void; onSave: () => void; canSave: boolean }) {
  return (
    <FormGrid>
      <TextField label="ID" value={form.id} onChange={(value) => setForm({ ...form, id: value })} />
      <TextField label="Code" value={form.code} onChange={(value) => setForm({ ...form, code: value })} />
      <TextField label="모델명" value={form.nameKo} onChange={(value) => setForm({ ...form, nameKo: value })} />
      <TextField label="영문명" value={form.nameEn} onChange={(value) => setForm({ ...form, nameEn: value })} />
      <NumberField label="폭(m)" value={form.widthM} onChange={(value) => setForm({ ...form, widthM: value })} />
      <NumberField label="길이(m)" value={form.lengthM} onChange={(value) => setForm({ ...form, lengthM: value })} />
      <NumberField label="면적(m²)" value={form.areaSqm} onChange={(value) => setForm({ ...form, areaSqm: value })} />
      <NumberField label="기본가" value={form.basePrice} onChange={(value) => setForm({ ...form, basePrice: value })} />
      <TextField label="평면 이미지" value={form.floorplanImagePath} onChange={(value) => setForm({ ...form, floorplanImagePath: value })} full />
      <TextField label="평면 오버레이" value={form.floorplanOverlayPath} onChange={(value) => setForm({ ...form, floorplanOverlayPath: value })} full />
      <NumberField label="정렬" value={form.displayOrder} onChange={(value) => setForm({ ...form, displayOrder: value })} />
      <CheckboxField label="활성" checked={form.isActive} onChange={(checked) => setForm({ ...form, isActive: checked })} />
      <SaveButton onSave={onSave} canSave={canSave} hint="ID와 모델명을 입력해야 저장할 수 있습니다." />
    </FormGrid>
  );
}

function CategoryForm({ form, setForm, onSave, canSave }: { form: typeof emptyCategory; setForm: (value: typeof emptyCategory) => void; onSave: () => void; canSave: boolean }) {
  return (
    <FormGrid>
      <TextField label="Key" value={form.key} onChange={(value) => setForm({ ...form, key: value })} />
      <TextField label="카테고리명" value={form.nameKo} onChange={(value) => setForm({ ...form, nameKo: value })} />
      <SelectField label="선택 방식" value={form.selectionType} onChange={(value) => setForm({ ...form, selectionType: value })}>
        <option value="single">single</option>
        <option value="multiple">multiple</option>
      </SelectField>
      <NumberField label="정렬" value={form.displayOrder} onChange={(value) => setForm({ ...form, displayOrder: value })} />
      <TextAreaField label="설명" value={form.descriptionKo} onChange={(value) => setForm({ ...form, descriptionKo: value })} full />
      <CheckboxField label="필수" checked={form.required} onChange={(checked) => setForm({ ...form, required: checked })} />
      <CheckboxField label="활성" checked={form.isActive} onChange={(checked) => setForm({ ...form, isActive: checked })} />
      <SaveButton onSave={onSave} canSave={canSave} hint="Key와 카테고리명을 입력해야 저장할 수 있습니다." />
    </FormGrid>
  );
}

function OptionForm({
  form,
  setForm,
  categories,
  models,
  onSave,
  canSave,
}: {
  form: typeof emptyOption;
  setForm: (value: typeof emptyOption) => void;
  categories: CustomizeCategory[];
  models: CustomizeModel[];
  onSave: () => void;
  canSave: boolean;
}) {
  const toggleModel = (modelId: string) => {
    const exists = form.availableModelIds.includes(modelId);
    setForm({
      ...form,
      availableModelIds: exists
        ? form.availableModelIds.filter((id) => id !== modelId)
        : [...form.availableModelIds, modelId],
    });
  };

  return (
    <FormGrid>
      <SelectField label="카테고리" value={form.categoryId} onChange={(value) => setForm({ ...form, categoryId: value })}>
        <option value="">선택</option>
        {categories.filter((category) => category.key !== 'model').map((category) => <option key={category.id} value={category.id}>{category.nameKo}</option>)}
      </SelectField>
      <TextField label="Key" value={form.key} onChange={(value) => setForm({ ...form, key: value })} />
      <TextField label="옵션명" value={form.nameKo} onChange={(value) => setForm({ ...form, nameKo: value })} />
      <SelectField label="가격 타입" value={form.priceType} onChange={(value) => setForm({ ...form, priceType: value })}>
        <option value="included">included</option>
        <option value="fixed">fixed</option>
        <option value="consult">consult</option>
      </SelectField>
      <NumberField label="가격" value={form.price} onChange={(value) => setForm({ ...form, price: value })} />
      <NumberField label="정렬" value={form.displayOrder} onChange={(value) => setForm({ ...form, displayOrder: value })} />
      <TextField label="짧은 설명" value={form.shortDescriptionKo} onChange={(value) => setForm({ ...form, shortDescriptionKo: value })} full />
      <TextAreaField label="상세 설명" value={form.detailDescriptionKo} onChange={(value) => setForm({ ...form, detailDescriptionKo: value })} full />
      <TextField label="정보 이미지 URL" value={form.imagePath} onChange={(value) => setForm({ ...form, imagePath: value })} full />
      <TextField label="오버레이 URL" value={form.overlayImagePath} onChange={(value) => setForm({ ...form, overlayImagePath: value })} full />
      <TextField label="평면 라벨" value={form.overlayLabelKo} onChange={(value) => setForm({ ...form, overlayLabelKo: value })} />
      <div className="md:col-span-2">
        <span className={labelClass}>모델 노출</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {models.map((model) => (
            <label key={model.id} className="inline-flex items-center gap-2 rounded-[9px] border border-admin-line-2 bg-white px-3 py-2 text-[11px] font-bold cursor-pointer text-admin-ink hover:border-[#d4d4d8] hover:bg-[#f4f4f5]">
              <input type="checkbox" checked={form.availableModelIds.includes(model.id)} onChange={() => toggleModel(model.id)} className="accent-admin-accent" />
              {model.nameKo}
            </label>
          ))}
        </div>
      </div>
      <CheckboxField label="기본 선택" checked={form.isDefault} onChange={(checked) => setForm({ ...form, isDefault: checked })} />
      <CheckboxField label="활성" checked={form.isActive} onChange={(checked) => setForm({ ...form, isActive: checked })} />
      <SaveButton onSave={onSave} canSave={canSave} hint="카테고리, Key, 옵션명을 입력해야 저장할 수 있습니다." />
    </FormGrid>
  );
}

function IncludedForm({
  form,
  setForm,
  models,
  onSave,
  canSave,
}: {
  form: typeof emptyIncludedSpec;
  setForm: (value: typeof emptyIncludedSpec) => void;
  models: CustomizeModel[];
  onSave: () => void;
  canSave: boolean;
}) {
  return (
    <FormGrid>
      <SelectField label="모델" value={form.modelId} onChange={(value) => setForm({ ...form, modelId: value })}>
        <option value="">공통</option>
        {models.map((model) => <option key={model.id} value={model.id}>{model.nameKo}</option>)}
      </SelectField>
      <TextField label="Key" value={form.key} onChange={(value) => setForm({ ...form, key: value })} />
      <TextField label="사양명" value={form.nameKo} onChange={(value) => setForm({ ...form, nameKo: value })} />
      <TextField label="카테고리 Key" value={form.categoryKey} onChange={(value) => setForm({ ...form, categoryKey: value })} />
      <TextField label="아이콘명" value={form.iconName} onChange={(value) => setForm({ ...form, iconName: value })} />
      <NumberField label="정렬" value={form.displayOrder} onChange={(value) => setForm({ ...form, displayOrder: value })} />
      <TextAreaField label="설명" value={form.descriptionKo} onChange={(value) => setForm({ ...form, descriptionKo: value })} full />
      <CheckboxField label="활성" checked={form.isActive} onChange={(checked) => setForm({ ...form, isActive: checked })} />
      <SaveButton onSave={onSave} canSave={canSave} hint="Key와 사양명을 입력해야 저장할 수 있습니다." />
    </FormGrid>
  );
}

function SaveButton({ onSave, canSave, hint }: { onSave: () => void; canSave: boolean; hint: string }) {
  return (
    <div className="md:col-span-2">
      <button className={`${consolePrimaryButtonClass} w-full`} onClick={onSave} disabled={!canSave}>
        <Save className="h-4 w-4" />저장
      </button>
      {!canSave && <p className="mt-1.5 text-[11px] font-semibold text-[#a16207]">{hint}</p>}
    </div>
  );
}

function FormGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function TextField({ label, value, onChange, full }: { label: string; value: string; onChange: (value: string) => void; full?: boolean }) {
  return (
    <label className={full ? 'md:col-span-2' : undefined}>
      <span className={labelClass}>{label}</span>
      <input className={`${consoleInputClass} w-full`} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label>
      <span className={labelClass}>{label}</span>
      <input className={`${consoleInputClass} w-full`} type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function TextAreaField({ label, value, onChange, full }: { label: string; value: string; onChange: (value: string) => void; full?: boolean }) {
  return (
    <label className={full ? 'md:col-span-2' : undefined}>
      <span className={labelClass}>{label}</span>
      <textarea className={textareaClass} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function SelectField({ label, value, onChange, children }: { label?: string; value: string; onChange: (value: string) => void; children: ReactNode }) {
  return (
    <label>
      {label && <span className={labelClass}>{label}</span>}
      <select className={`${consoleSelectClass} w-full`} value={value} onChange={(event) => onChange(event.target.value)}>
        {children}
      </select>
    </label>
  );
}

function CheckboxField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-xs font-bold text-[#3f3f46] cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="accent-admin-accent w-4 h-4" />
      {label}
    </label>
  );
}

function DataTable({ children }: { children: ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

function TableRow({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-between gap-4 rounded-[12px] border border-admin-line bg-white p-3 hover:border-[#d4d4d8] transition-colors">{children}</div>;
}

function RowActions({
  onEdit,
  onToggle,
  onDelete,
  active,
  compact = false,
  deleteLabel = '삭제',
}: {
  onEdit: () => void;
  onToggle: () => void;
  onDelete?: () => void;
  active: boolean;
  compact?: boolean;
  deleteLabel?: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <button className="px-2 py-1 text-xs font-bold text-admin-muted hover:text-admin-accent transition-colors" onClick={onEdit}>수정</button>
      <button
        className={cn(consoleIconButtonClass, compact && 'h-8 w-8')}
        onClick={onToggle}
        aria-label={active ? '숨기기' : '노출하기'}
        title={active ? '숨기기' : '노출하기'}
      >
        {active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
      {onDelete && (
        <button
          className={cn(consoleIconButtonClass, compact && 'h-8 w-8', 'text-red-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700')}
          onClick={onDelete}
          aria-label={deleteLabel}
          title="삭제"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function modelToForm(model: CustomizeModel) {
  return {
    id: model.id,
    code: model.code,
    nameKo: model.nameKo,
    nameEn: model.nameEn ?? '',
    widthM: model.widthM,
    lengthM: model.lengthM,
    areaSqm: model.areaSqm,
    basePrice: model.basePrice,
    floorplanImagePath: model.floorplanImagePath ?? '',
    floorplanOverlayPath: model.floorplanOverlayPath ?? '',
    displayOrder: model.displayOrder,
    isActive: model.isActive,
  };
}

function categoryToForm(category: CustomizeCategory) {
  return {
    key: category.key,
    nameKo: category.nameKo,
    nameEn: category.nameEn ?? '',
    descriptionKo: category.descriptionKo ?? '',
    descriptionEn: category.descriptionEn ?? '',
    selectionType: category.selectionType,
    required: category.required,
    displayOrder: category.displayOrder,
    isActive: category.isActive,
  };
}

function optionToForm(option: CustomizeOption) {
  return {
    categoryId: option.categoryId,
    key: option.key,
    nameKo: option.nameKo,
    nameEn: option.nameEn ?? '',
    shortDescriptionKo: option.shortDescriptionKo,
    shortDescriptionEn: option.shortDescriptionEn ?? '',
    detailDescriptionKo: option.detailDescriptionKo ?? '',
    detailDescriptionEn: option.detailDescriptionEn ?? '',
    priceType: option.priceType,
    price: option.price,
    isDefault: option.isDefault,
    availableModelIds: option.availableModelIds,
    imagePath: option.imagePath ?? '',
    overlayImagePath: option.overlayImagePath ?? '',
    overlayLabelKo: option.overlayLabelKo ?? '',
    overlayLabelEn: option.overlayLabelEn ?? '',
    displayOrder: option.displayOrder,
    isActive: option.isActive,
  };
}

function includedToForm(spec: CustomizeIncludedSpec) {
  return {
    modelId: spec.modelId ?? '',
    key: spec.key,
    nameKo: spec.nameKo,
    nameEn: spec.nameEn ?? '',
    descriptionKo: spec.descriptionKo ?? '',
    descriptionEn: spec.descriptionEn ?? '',
    categoryKey: spec.categoryKey ?? '',
    iconName: spec.iconName ?? '',
    displayOrder: spec.displayOrder,
    isActive: spec.isActive,
  };
}
