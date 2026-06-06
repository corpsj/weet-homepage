'use client';

import { useEffect, useMemo, useState, useTransition, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2, Plus, Save, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/admin/media/ImageUpload';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  createCustomizeOptionConflict,
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

interface CustomizeManagerProps {
  initialCatalog: CustomizeCatalog;
}

const fieldClass = 'h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:ring-2 focus:ring-black/20';
const textareaClass = 'min-h-20 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20';
const labelClass = 'mb-1 block text-xs font-bold text-gray-600';

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

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-950">주문 구성 관리</h1>
          <p className="mt-1 text-sm text-gray-500">모델, 옵션, 평면 오버레이와 상담 저장 흐름을 관리합니다.</p>
        </div>
        {isPending && <Loader2 className="h-5 w-5 animate-spin text-gray-500" />}
      </div>

      <Tabs defaultValue="models" className="space-y-5">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="included">Included Specs</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
          <TabsTrigger value="assets">Image Assets</TabsTrigger>
        </TabsList>

        <TabsContent value="models">
          <AdminSection title="Models" action={<Button onClick={() => setModelForm(emptyModel)}><Plus className="h-4 w-4" />새 모델</Button>}>
            <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <ModelForm form={modelForm} setForm={setModelForm} onSave={saveModel} />
              </div>
              <DataTable>
                {catalog.models.map((model) => (
                  <TableRow key={model.id}>
                    <div>
                      <p className="font-bold">{model.nameKo}</p>
                      <p className="text-xs text-gray-500">{model.id} · {model.widthM}x{model.lengthM}m · ₩{model.basePrice.toLocaleString('ko-KR')}</p>
                    </div>
                    <StatusBadge active={model.isActive} />
                    <RowActions
                      onEdit={() => setModelForm(modelToForm(model))}
                      onToggle={() => runAction('모델 노출 변경', () => setCustomizeEntityActive('model', model.id, !model.isActive))}
                      active={model.isActive}
                    />
                  </TableRow>
                ))}
              </DataTable>
            </div>
          </AdminSection>
        </TabsContent>

        <TabsContent value="included">
          <AdminSection title="Included Specs" action={<Button onClick={() => { setIncludedForm(emptyIncludedSpec); setEditingIncludedId(undefined); }}><Plus className="h-4 w-4" />새 사양</Button>}>
            <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <IncludedForm form={includedForm} setForm={setIncludedForm} models={catalog.models} onSave={saveIncluded} />
              </div>
              <DataTable>
                {catalog.includedSpecs.map((spec) => (
                  <TableRow key={spec.id}>
                    <div>
                      <p className="font-bold">{spec.nameKo}</p>
                      <p className="text-xs text-gray-500">{spec.modelId || '공통'} · {spec.categoryKey || '-'}</p>
                    </div>
                    <StatusBadge active={spec.isActive} />
                    <RowActions
                      onEdit={() => { setEditingIncludedId(spec.id); setIncludedForm(includedToForm(spec)); }}
                      onToggle={() => runAction('포함 사양 노출 변경', () => setCustomizeEntityActive('includedSpec', spec.id, !spec.isActive))}
                      active={spec.isActive}
                    />
                  </TableRow>
                ))}
              </DataTable>
            </div>
          </AdminSection>
        </TabsContent>

        <TabsContent value="categories">
          <AdminSection title="Categories" action={<Button onClick={() => { setCategoryForm(emptyCategory); setEditingCategoryId(undefined); }}><Plus className="h-4 w-4" />새 카테고리</Button>}>
            <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <CategoryForm form={categoryForm} setForm={setCategoryForm} onSave={saveCategory} />
              </div>
              <DataTable>
                {catalog.categories.map((category) => (
                  <TableRow key={category.id}>
                    <div>
                      <p className="font-bold">{category.nameKo}</p>
                      <p className="text-xs text-gray-500">{category.key} · {category.selectionType}</p>
                    </div>
                    <StatusBadge active={category.isActive} />
                    <RowActions
                      onEdit={() => { setEditingCategoryId(category.id); setCategoryForm(categoryToForm(category)); }}
                      onToggle={() => runAction('카테고리 노출 변경', () => setCustomizeEntityActive('category', category.id, !category.isActive))}
                      active={category.isActive}
                    />
                  </TableRow>
                ))}
              </DataTable>
            </div>
          </AdminSection>
        </TabsContent>

        <TabsContent value="options">
          <AdminSection title="Options" action={<Button onClick={() => { setOptionForm({ ...emptyOption, categoryId: catalog.categories[0]?.id || '' }); setEditingOptionId(undefined); }}><Plus className="h-4 w-4" />새 옵션</Button>}>
            <div className="grid gap-6 xl:grid-cols-[460px_1fr]">
              <div className="space-y-5">
                <div className="rounded-lg border border-gray-200 bg-white p-5">
                  <OptionForm
                    form={optionForm}
                    setForm={setOptionForm}
                    categories={catalog.categories}
                    models={catalog.models}
                    onSave={saveOption}
                  />
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-5">
                  <h3 className="mb-4 text-base font-bold">충돌 옵션</h3>
                  <div className="space-y-3">
                    <SelectField value={conflictForm.optionId} onChange={(value) => setConflictForm((current) => ({ ...current, optionId: value }))}>
                      <option value="">기준 옵션</option>
                      {catalog.options.map((option) => <option key={option.id} value={option.id}>{option.nameKo}</option>)}
                    </SelectField>
                    <SelectField value={conflictForm.conflictsWithOptionId} onChange={(value) => setConflictForm((current) => ({ ...current, conflictsWithOptionId: value }))}>
                      <option value="">같이 선택 불가 옵션</option>
                      {catalog.options.map((option) => <option key={option.id} value={option.id}>{option.nameKo}</option>)}
                    </SelectField>
                    <input className={fieldClass} placeholder="충돌 사유" value={conflictForm.reasonKo} onChange={(event) => setConflictForm((current) => ({ ...current, reasonKo: event.target.value }))} />
                    <Button
                      className="w-full"
                      onClick={() => runAction('충돌 관계 저장', () => createCustomizeOptionConflict(conflictForm.optionId, conflictForm.conflictsWithOptionId, conflictForm.reasonKo))}
                      disabled={!conflictForm.optionId || !conflictForm.conflictsWithOptionId}
                    >
                      <Save className="h-4 w-4" />
                      충돌 저장
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {catalog.categories.filter((category) => category.key !== 'model').map((category) => {
                  const options = catalog.options.filter((option) => option.categoryId === category.id);
                  return (
                    <div key={category.id} className="rounded-lg border border-gray-200 bg-white p-4">
                      <h3 className="mb-3 font-bold text-gray-950">{category.nameKo}</h3>
                      <div className="space-y-2">
                        {options.map((option) => (
                          <TableRow key={option.id}>
                            <div>
                              <p className="font-bold">{option.nameKo}</p>
                              <p className="text-xs text-gray-500">{option.key} · {option.priceType} · {option.availableModelIds.join(', ') || 'all'}</p>
                            </div>
                            <StatusBadge active={option.isActive} />
                            <RowActions
                              onEdit={() => { setEditingOptionId(option.id); setOptionForm(optionToForm(option)); }}
                              onToggle={() => runAction('옵션 노출 변경', () => setCustomizeEntityActive('option', option.id, !option.isActive))}
                              active={option.isActive}
                            />
                          </TableRow>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <h3 className="mb-3 font-bold text-gray-950">등록된 충돌 관계</h3>
                  <div className="space-y-2">
                    {catalog.conflicts.map((conflict) => (
                      <TableRow key={`${conflict.optionId}-${conflict.conflictsWithOptionId}`}>
                        <div>
                          <p className="font-bold">{optionNameById.get(conflict.optionId)} ↔ {optionNameById.get(conflict.conflictsWithOptionId)}</p>
                          <p className="text-xs text-gray-500">{conflict.reasonKo || '동시 선택 불가'}</p>
                        </div>
                        <Button variant="ghost" size="icon-sm" onClick={() => runAction('충돌 관계 삭제', () => deleteCustomizeOptionConflict(conflict.optionId, conflict.conflictsWithOptionId))}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableRow>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AdminSection>
        </TabsContent>

        <TabsContent value="assets">
          <AdminSection title="Image Assets">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <h3 className="mb-2 font-bold">정보 이미지 업로드</h3>
                <p className="mb-4 text-sm text-gray-500">옵션 상세 모달에 사용할 이미지를 `images/customize/`에 업로드합니다.</p>
                <ImageUpload value={uploadedUrl} onChange={setUploadedUrl} bucket="images" pathPrefix="customize" quality="standard" />
                {uploadedUrl && <input className={`${fieldClass} mt-4`} readOnly value={uploadedUrl} onFocus={(event) => event.currentTarget.select()} />}
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <h3 className="mb-2 font-bold">평면 오버레이 업로드</h3>
                <p className="mb-4 text-sm text-gray-500">오버레이는 1000x420px 투명 PNG/WebP를 권장합니다. 크기가 달라도 업로드는 진행됩니다.</p>
                <ImageUpload value={uploadedUrl} onChange={setUploadedUrl} bucket="images" pathPrefix="customize" quality="high" recommendedSize={{ width: 1000, height: 420 }} />
              </div>
            </div>
          </AdminSection>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AdminSection({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-gray-950">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function ModelForm({ form, setForm, onSave }: { form: typeof emptyModel; setForm: (value: typeof emptyModel) => void; onSave: () => void }) {
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
      <Button className="md:col-span-2" onClick={onSave}><Save className="h-4 w-4" />저장</Button>
    </FormGrid>
  );
}

function CategoryForm({ form, setForm, onSave }: { form: typeof emptyCategory; setForm: (value: typeof emptyCategory) => void; onSave: () => void }) {
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
      <Button className="md:col-span-2" onClick={onSave}><Save className="h-4 w-4" />저장</Button>
    </FormGrid>
  );
}

function OptionForm({
  form,
  setForm,
  categories,
  models,
  onSave,
}: {
  form: typeof emptyOption;
  setForm: (value: typeof emptyOption) => void;
  categories: CustomizeCategory[];
  models: CustomizeModel[];
  onSave: () => void;
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
      <div>
        <span className={labelClass}>모델 노출</span>
        <div className="flex flex-wrap gap-2">
          {models.map((model) => (
            <label key={model.id} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm">
              <input type="checkbox" checked={form.availableModelIds.includes(model.id)} onChange={() => toggleModel(model.id)} />
              {model.nameKo}
            </label>
          ))}
        </div>
      </div>
      <CheckboxField label="기본 선택" checked={form.isDefault} onChange={(checked) => setForm({ ...form, isDefault: checked })} />
      <CheckboxField label="활성" checked={form.isActive} onChange={(checked) => setForm({ ...form, isActive: checked })} />
      <Button className="md:col-span-2" onClick={onSave}><Save className="h-4 w-4" />저장</Button>
    </FormGrid>
  );
}

function IncludedForm({
  form,
  setForm,
  models,
  onSave,
}: {
  form: typeof emptyIncludedSpec;
  setForm: (value: typeof emptyIncludedSpec) => void;
  models: CustomizeModel[];
  onSave: () => void;
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
      <Button className="md:col-span-2" onClick={onSave}><Save className="h-4 w-4" />저장</Button>
    </FormGrid>
  );
}

function FormGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function TextField({ label, value, onChange, full }: { label: string; value: string; onChange: (value: string) => void; full?: boolean }) {
  return (
    <label className={full ? 'md:col-span-2' : undefined}>
      <span className={labelClass}>{label}</span>
      <input className={fieldClass} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label>
      <span className={labelClass}>{label}</span>
      <input className={fieldClass} type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} />
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
      <select className={fieldClass} value={value} onChange={(event) => onChange(event.target.value)}>
        {children}
      </select>
    </label>
  );
}

function CheckboxField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      {label}
    </label>
  );
}

function DataTable({ children }: { children: ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

function TableRow({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4">{children}</div>;
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-bold ${active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
      {active ? '활성' : '숨김'}
    </span>
  );
}

function RowActions({ onEdit, onToggle, active }: { onEdit: () => void; onToggle: () => void; active: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <Button variant="outline" size="sm" onClick={onEdit}>수정</Button>
      <Button variant="ghost" size="icon-sm" onClick={onToggle}>
        {active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
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
