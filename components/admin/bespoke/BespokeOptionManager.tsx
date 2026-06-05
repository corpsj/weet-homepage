'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Edit3, Eye, EyeOff, Plus, Save, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import {
  deleteBespokeOption,
  deleteBespokeOptionGroup,
  saveBespokeOption,
  saveBespokeOptionGroup,
} from '@/app/actions/bespoke-actions';
import { formatPriceDelta } from '@/lib/bespoke-options';
import { BespokeOption, BespokeOptionGroup, BespokeOptionGroupWithOptions } from '@/types/supabase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type GroupDraft = Pick<
  BespokeOptionGroup,
  'key' | 'title' | 'description' | 'selection_type' | 'required' | 'display_order' | 'is_active'
>;

type OptionDraft = Pick<
  BespokeOption,
  'label' | 'description' | 'price_delta' | 'lead_time_note' | 'badge' | 'display_order' | 'is_active'
>;

const emptyGroup: GroupDraft = {
  key: '',
  title: '',
  description: '',
  selection_type: 'single',
  required: true,
  display_order: 0,
  is_active: true,
};

const emptyOption: OptionDraft = {
  label: '',
  description: '',
  price_delta: 0,
  lead_time_note: '',
  badge: '',
  display_order: 0,
  is_active: true,
};

function groupToDraft(group?: BespokeOptionGroup): GroupDraft {
  if (!group) return emptyGroup;
  return {
    key: group.key,
    title: group.title,
    description: group.description || '',
    selection_type: group.selection_type,
    required: group.required,
    display_order: group.display_order,
    is_active: group.is_active,
  };
}

function optionToDraft(option?: BespokeOption): OptionDraft {
  if (!option) return emptyOption;
  return {
    label: option.label,
    description: option.description || '',
    price_delta: option.price_delta,
    lead_time_note: option.lead_time_note || '',
    badge: option.badge || '',
    display_order: option.display_order,
    is_active: option.is_active,
  };
}

function ToggleButton({
  active,
  onClick,
  activeLabel,
  inactiveLabel,
}: {
  active: boolean;
  onClick: () => void;
  activeLabel: string;
  inactiveLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
    >
      {active ? <Check className="h-4 w-4 text-emerald-600" /> : <X className="h-4 w-4 text-gray-400" />}
      {active ? activeLabel : inactiveLabel}
    </button>
  );
}

function GroupForm({
  group,
  onCancel,
}: {
  group?: BespokeOptionGroup;
  onCancel?: () => void;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<GroupDraft>(() => groupToDraft(group));
  const [isPending, startTransition] = useTransition();

  const title = group ? '옵션 그룹 수정' : '새 옵션 그룹';

  const submit = () => {
    startTransition(async () => {
      const result = await saveBespokeOptionGroup({
        ...(group ? { id: group.id } : {}),
        ...draft,
        display_order: Number(draft.display_order) || 0,
      });

      if (!result.success) {
        toast.error(result.message || '옵션 그룹 저장에 실패했습니다.');
        return;
      }

      toast.success(group ? '옵션 그룹이 수정되었습니다.' : '옵션 그룹이 추가되었습니다.');
      if (!group) setDraft(emptyGroup);
      onCancel?.();
      router.refresh();
    });
  };

  return (
    <form
      className="space-y-4 rounded-lg border border-gray-200 bg-white p-4"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-gray-950">{title}</h3>
        {onCancel && (
          <Button variant="ghost" size="icon" onClick={onCancel} aria-label="취소">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>그룹명</Label>
          <Input
            required
            value={draft.title}
            onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="예: 공간 용도"
          />
        </div>
        <div className="space-y-2">
          <Label>관리 키</Label>
          <Input
            required
            value={draft.key}
            onChange={(event) => setDraft((prev) => ({ ...prev, key: event.target.value }))}
            placeholder="space_type"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>설명</Label>
        <Textarea
          value={draft.description || ''}
          onChange={(event) => setDraft((prev) => ({ ...prev, description: event.target.value }))}
          placeholder="공개 페이지에서 옵션 그룹 아래에 표시됩니다."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_140px]">
        <div className="space-y-2">
          <Label>선택 방식</Label>
          <select
            value={draft.selection_type}
            onChange={(event) =>
              setDraft((prev) => ({ ...prev, selection_type: event.target.value as GroupDraft['selection_type'] }))
            }
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
          >
            <option value="single">단일 선택</option>
            <option value="multiple">복수 선택</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>정렬</Label>
          <Input
            type="number"
            min={0}
            value={draft.display_order}
            onChange={(event) => setDraft((prev) => ({ ...prev, display_order: Number(event.target.value) }))}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <ToggleButton
            active={draft.required}
            activeLabel="필수"
            inactiveLabel="선택"
            onClick={() => setDraft((prev) => ({ ...prev, required: !prev.required }))}
          />
          <ToggleButton
            active={draft.is_active}
            activeLabel="공개"
            inactiveLabel="비공개"
            onClick={() => setDraft((prev) => ({ ...prev, is_active: !prev.is_active }))}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          <Save className="h-4 w-4" />
          저장
        </Button>
      </div>
    </form>
  );
}

function OptionForm({
  groupId,
  option,
  onCancel,
}: {
  groupId: string;
  option?: BespokeOption;
  onCancel?: () => void;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<OptionDraft>(() => optionToDraft(option));
  const [isPending, startTransition] = useTransition();

  const submit = () => {
    startTransition(async () => {
      const result = await saveBespokeOption({
        ...(option ? { id: option.id } : {}),
        group_id: groupId,
        ...draft,
        price_delta: Number(draft.price_delta) || 0,
        display_order: Number(draft.display_order) || 0,
      });

      if (!result.success) {
        toast.error(result.message || '옵션 저장에 실패했습니다.');
        return;
      }

      toast.success(option ? '옵션이 수정되었습니다.' : '옵션이 추가되었습니다.');
      if (!option) setDraft(emptyOption);
      onCancel?.();
      router.refresh();
    });
  };

  return (
    <form
      className="space-y-4 border-t border-gray-100 bg-gray-50 p-4"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <div className="grid gap-4 md:grid-cols-[1fr_140px_120px]">
        <div className="space-y-2">
          <Label>옵션명</Label>
          <Input
            required
            value={draft.label}
            onChange={(event) => setDraft((prev) => ({ ...prev, label: event.target.value }))}
            placeholder="예: 스몰 카페"
          />
        </div>
        <div className="space-y-2">
          <Label>추가 금액</Label>
          <Input
            type="number"
            value={draft.price_delta}
            onChange={(event) => setDraft((prev) => ({ ...prev, price_delta: Number(event.target.value) }))}
          />
        </div>
        <div className="space-y-2">
          <Label>정렬</Label>
          <Input
            type="number"
            min={0}
            value={draft.display_order}
            onChange={(event) => setDraft((prev) => ({ ...prev, display_order: Number(event.target.value) }))}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>뱃지</Label>
          <Input
            value={draft.badge || ''}
            onChange={(event) => setDraft((prev) => ({ ...prev, badge: event.target.value }))}
            placeholder="COMMERCIAL"
          />
        </div>
        <div className="space-y-2">
          <Label>일정 메모</Label>
          <Input
            value={draft.lead_time_note || ''}
            onChange={(event) => setDraft((prev) => ({ ...prev, lead_time_note: event.target.value }))}
            placeholder="현장 실측 권장"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>설명</Label>
        <Textarea
          value={draft.description || ''}
          onChange={(event) => setDraft((prev) => ({ ...prev, description: event.target.value }))}
          placeholder="옵션 카드에 표시될 설명입니다."
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <ToggleButton
          active={draft.is_active}
          activeLabel="공개"
          inactiveLabel="비공개"
          onClick={() => setDraft((prev) => ({ ...prev, is_active: !prev.is_active }))}
        />
        <div className="flex gap-2">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              취소
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            <Save className="h-4 w-4" />
            저장
          </Button>
        </div>
      </div>
    </form>
  );
}

function OptionRow({ option }: { option: BespokeOption }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const remove = () => {
    if (!confirm('이 옵션을 삭제하시겠습니까?')) return;
    startTransition(async () => {
      const result = await deleteBespokeOption(option.id);
      if (!result.success) {
        toast.error(result.message || '옵션 삭제에 실패했습니다.');
        return;
      }
      toast.success('옵션이 삭제되었습니다.');
      router.refresh();
    });
  };

  if (isEditing) {
    return <OptionForm groupId={option.group_id} option={option} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <div className="grid gap-4 border-t border-gray-100 p-4 md:grid-cols-[1fr_130px_90px_96px] md:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-gray-950">{option.label}</p>
          {option.badge && <Badge variant="warning">{option.badge}</Badge>}
          <Badge variant={option.is_active ? 'success' : 'muted'}>
            {option.is_active ? '공개' : '비공개'}
          </Badge>
        </div>
        {option.description && <p className="mt-1 text-sm leading-6 text-gray-600">{option.description}</p>}
        {option.lead_time_note && <p className="mt-1 text-xs font-medium text-gray-500">{option.lead_time_note}</p>}
      </div>
      <p className="text-sm font-semibold text-gray-900">{formatPriceDelta(option.price_delta)}</p>
      <p className="text-sm text-gray-500">정렬 {option.display_order}</p>
      <div className="flex justify-end gap-1">
        <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} aria-label="옵션 수정">
          <Edit3 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" disabled={isPending} onClick={remove} aria-label="옵션 삭제">
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      </div>
    </div>
  );
}

function GroupPanel({ group }: { group: BespokeOptionGroupWithOptions }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingOption, setIsAddingOption] = useState(false);
  const [isPending, startTransition] = useTransition();

  const remove = () => {
    if (!confirm('이 그룹과 포함된 옵션을 모두 삭제하시겠습니까?')) return;
    startTransition(async () => {
      const result = await deleteBespokeOptionGroup(group.id);
      if (!result.success) {
        toast.error(result.message || '옵션 그룹 삭제에 실패했습니다.');
        return;
      }
      toast.success('옵션 그룹이 삭제되었습니다.');
      router.refresh();
    });
  };

  if (isEditing) {
    return <GroupForm group={group} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-gray-950">{group.title}</h2>
            <Badge variant="muted">{group.key}</Badge>
            <Badge variant={group.is_active ? 'success' : 'muted'}>
              {group.is_active ? '공개' : '비공개'}
            </Badge>
            <Badge variant="muted">{group.selection_type === 'single' ? '단일 선택' : '복수 선택'}</Badge>
            {group.required && <Badge variant="warning">필수</Badge>}
          </div>
          {group.description && <p className="mt-2 text-sm leading-6 text-gray-600">{group.description}</p>}
          <p className="mt-2 text-xs text-gray-400">정렬 {group.display_order} · 옵션 {group.options.length}개</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" onClick={() => setIsAddingOption((value) => !value)}>
            <Plus className="h-4 w-4" />
            옵션
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} aria-label="그룹 수정">
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" disabled={isPending} onClick={remove} aria-label="그룹 삭제">
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </div>

      {isAddingOption && <OptionForm groupId={group.id} onCancel={() => setIsAddingOption(false)} />}

      <div>
        {group.options.length > 0 ? (
          group.options.map((option) => <OptionRow key={option.id} option={option} />)
        ) : (
          <div className="border-t border-gray-100 p-5 text-sm text-gray-500">등록된 옵션이 없습니다.</div>
        )}
      </div>
    </section>
  );
}

export default function BespokeOptionManager({ groups }: { groups: BespokeOptionGroupWithOptions[] }) {
  const [showCreateForm, setShowCreateForm] = useState(groups.length === 0);

  const stats = useMemo(() => {
    const optionCount = groups.reduce((sum, group) => sum + group.options.length, 0);
    const activeGroupCount = groups.filter((group) => group.is_active).length;
    return { optionCount, activeGroupCount };
  }, [groups]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-950">주문제작 옵션 관리</h1>
          <p className="mt-1 text-sm text-gray-500">
            공개 그룹 {stats.activeGroupCount}개 · 전체 옵션 {stats.optionCount}개
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => window.open('/bespoke', '_blank')}>
            <Eye className="h-4 w-4" />
            공개 페이지
          </Button>
          <Button onClick={() => setShowCreateForm((value) => !value)}>
            {showCreateForm ? <EyeOff className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            그룹 추가
          </Button>
        </div>
      </div>

      {showCreateForm && <GroupForm onCancel={() => setShowCreateForm(false)} />}

      <div className="space-y-4">
        {groups.map((group) => (
          <GroupPanel key={group.id} group={group} />
        ))}
      </div>

      {groups.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          등록된 주문제작 옵션 그룹이 없습니다.
        </div>
      )}
    </div>
  );
}
