'use client';

import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { confirmToast, undoToast } from '@/lib/ui/confirm';

/**
 * Result shape returned by the FAQ / Notice server actions.
 * `data` is the freshly-persisted row on success. The server actions return the
 * generated DB-row type ({@link TData}), whose columns may be nullable, while the
 * editor models items with non-nullable view types ({@link T}); the hook coerces
 * `TData -> T` at the single boundary below (matching the previous `as T` casts).
 */
export interface CrudActionResult<TData> {
    success: boolean;
    message?: string;
    data?: TData;
}

/**
 * Per-entity configuration for {@link useCrudDraftList}. This isolates the
 * genuinely entity-specific concerns (server actions, payload shaping, dirty
 * detection, copy) so FAQ and Notice can share one draft/save/delete/dirty
 * lifecycle without forcing a leaky unified type.
 */
export interface CrudDraftListConfig<T, TCreateInput, TUpdateInput, TData> {
    /** Stable identity for each item. */
    getId: (item: T) => string;
    /** Server action that creates a new item. */
    createAction: (input: TCreateInput) => Promise<CrudActionResult<TData>>;
    /** Server action that updates an existing item. */
    updateAction: (id: string, input: TUpdateInput) => Promise<CrudActionResult<TData>>;
    /** Server action that deletes an item. */
    deleteAction: (id: string) => Promise<CrudActionResult<unknown>>;
    /** Payload used when adding a brand-new item. */
    buildCreateInput: (items: T[]) => TCreateInput;
    /** Maps a draft into the update payload sent to the server. */
    buildUpdateInput: (draft: T) => TUpdateInput;
    /** Whether the draft differs from the persisted item. */
    isDirty: (item: T, draft: T) => boolean;
    /**
     * Where a newly-created item is inserted. FAQ appends ('end'),
     * Notice prepends ('start'). Defaults to 'end'.
     */
    insertPosition?: 'start' | 'end';
    /** Prefix for the per-item saving key (e.g. 'faq', 'notice'). */
    savingKeyPrefix: string;
    /** User-facing copy / confirmation messages. */
    messages: {
        addSuccess: string;
        addError: string;
        saveSuccess: string;
        saveError: string;
        saveErrorUnexpected: string;
        deleteConfirm: string;
        deleteConfirmLabel: string;
        deleteSuccess: string;
        genericError: string;
    };
    /** Shared loading flag setter (the global add/delete spinner). */
    setLoading: (value: boolean) => void;
    /** Invoked with the new item id after a successful add (e.g. to expand it). */
    onAdded?: (id: string) => void;
}

export interface CrudDraftListController<T> {
    items: T[];
    getDraft: (item: T) => T;
    isItemDirty: (item: T) => boolean;
    isAnyDirty: boolean;
    isSaving: (item: T) => boolean;
    changeDraft: <K extends keyof T>(id: string, field: K, value: T[K]) => void;
    resetDraft: (id: string) => void;
    add: () => Promise<void>;
    save: (item: T) => Promise<void>;
    remove: (id: string) => Promise<void>;
}

/**
 * Generic create/edit/save/delete + draft-dirty lifecycle shared by the FAQ
 * and Notice editors (review backlog F38). Holds the canonical item list, the
 * per-item draft map, per-item saving flags, and exposes handlers that preserve
 * the existing behavior: optimistic list updates, `confirmToast` deletes,
 * per-item dirty detection, and the exact toast copy.
 */
export function useCrudDraftList<T, TCreateInput, TUpdateInput, TData>(
    initialItems: T[],
    config: CrudDraftListConfig<T, TCreateInput, TUpdateInput, TData>
): CrudDraftListController<T> {
    const {
        getId,
        createAction,
        updateAction,
        deleteAction,
        buildCreateInput,
        buildUpdateInput,
        isDirty,
        insertPosition = 'end',
        savingKeyPrefix,
        messages,
        setLoading,
        onAdded,
    } = config;

    const [items, setItems] = useState<T[]>(initialItems);
    const [drafts, setDrafts] = useState<Record<string, T>>({});
    const [savingItems, setSavingItems] = useState<Record<string, boolean>>({});

    const savingKey = useCallback((id: string) => `${savingKeyPrefix}:${id}`, [savingKeyPrefix]);

    const getDraft = useCallback((item: T) => drafts[getId(item)] ?? item, [drafts, getId]);

    const isItemDirty = useCallback(
        (item: T) => isDirty(item, drafts[getId(item)] ?? item),
        [drafts, getId, isDirty]
    );

    const isAnyDirty = useMemo(() => items.some(isItemDirty), [items, isItemDirty]);

    const isSaving = useCallback(
        (item: T) => Boolean(savingItems[savingKey(getId(item))]),
        [savingItems, savingKey, getId]
    );

    const changeDraft = useCallback(
        <K extends keyof T>(id: string, field: K, value: T[K]) => {
            const source = items.find(item => getId(item) === id);
            if (!source) return;
            setDrafts(prev => ({
                ...prev,
                [id]: { ...(prev[id] ?? source), [field]: value },
            }));
        },
        [items, getId]
    );

    const dropDraft = useCallback((id: string) => {
        setDrafts(prev => {
            if (!(id in prev)) return prev;
            const next = { ...prev };
            delete next[id];
            return next;
        });
    }, []);

    const resetDraft = useCallback((id: string) => dropDraft(id), [dropDraft]);

    const add = useCallback(async () => {
        setLoading(true);
        try {
            const result = await createAction(buildCreateInput(items));
            if (result.success && result.data) {
                // DB-row (TData) -> view type (T); mirrors the previous `as T` cast.
                const created = result.data as unknown as T;
                setItems(prev => (insertPosition === 'start' ? [created, ...prev] : [...prev, created]));
                onAdded?.(getId(created));
                toast.success(messages.addSuccess);
            } else {
                toast.error(result.message || messages.addError);
            }
        } catch (e) {
            console.error(e);
            toast.error(messages.genericError);
        } finally {
            setLoading(false);
        }
    }, [setLoading, createAction, buildCreateInput, items, insertPosition, onAdded, getId, messages]);

    const save = useCallback(
        async (item: T) => {
            const id = getId(item);
            const draft = drafts[id] ?? item;
            const key = savingKey(id);
            setSavingItems(prev => ({ ...prev, [key]: true }));
            try {
                const result = await updateAction(id, buildUpdateInput(draft));
                if (result.success && result.data) {
                    // DB-row (TData) -> view type (T); mirrors the previous `as T` cast.
                    const updated = result.data as unknown as T;
                    setItems(prev => prev.map(current => (getId(current) === id ? updated : current)));
                    dropDraft(id);
                    toast.success(messages.saveSuccess);
                } else {
                    toast.error(result.message || messages.saveError);
                }
            } catch (e) {
                console.error(e);
                toast.error(messages.saveErrorUnexpected);
            } finally {
                setSavingItems(prev => ({ ...prev, [key]: false }));
            }
        },
        [getId, drafts, savingKey, updateAction, buildUpdateInput, dropDraft, messages]
    );

    const remove = useCallback(
        async (id: string) => {
            if (!(await confirmToast(messages.deleteConfirm, { confirmLabel: messages.deleteConfirmLabel }))) return;

            // Optimistically remove now, but defer the server delete until the undo
            // window closes so '되돌리기' can restore the row at its original spot
            // without needing a re-create action. (review backlog: undo on delete)
            let removed: { item: T; index: number } | undefined;
            setItems(prev => {
                const index = prev.findIndex(current => getId(current) === id);
                if (index === -1) return prev;
                removed = { item: prev[index], index };
                return [...prev.slice(0, index), ...prev.slice(index + 1)];
            });
            if (!removed) return;

            // ponytail: undo restores local state only; the deferred delete is fired
            // on commit. If the page unmounts mid-window the row simply survives on
            // next load (no data loss) — restore-after-commit would need a server
            // re-create action, which doesn't exist yet.
            undoToast(messages.deleteSuccess, {
                onUndo: () => {
                    setItems(prev => {
                        if (!removed || prev.some(current => getId(current) === id)) return prev;
                        const next = prev.slice();
                        next.splice(Math.min(removed.index, next.length), 0, removed.item);
                        return next;
                    });
                },
                onCommit: () => {
                    void (async () => {
                        try {
                            const result = await deleteAction(id);
                            if (result.success) {
                                dropDraft(id);
                            } else {
                                // Server rejected the delete: put the row back and surface why.
                                setItems(prev => {
                                    if (!removed || prev.some(current => getId(current) === id)) return prev;
                                    const next = prev.slice();
                                    next.splice(Math.min(removed.index, next.length), 0, removed.item);
                                    return next;
                                });
                                toast.error(result.message);
                            }
                        } catch (e) {
                            console.error(e);
                            setItems(prev => {
                                if (!removed || prev.some(current => getId(current) === id)) return prev;
                                const next = prev.slice();
                                next.splice(Math.min(removed.index, next.length), 0, removed.item);
                                return next;
                            });
                            toast.error(messages.genericError);
                        }
                    })();
                },
            });
        },
        [messages, deleteAction, getId, dropDraft]
    );

    return {
        items,
        getDraft,
        isItemDirty,
        isAnyDirty,
        isSaving,
        changeDraft,
        resetDraft,
        add,
        save,
        remove,
    };
}
