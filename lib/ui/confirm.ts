import { toast } from 'sonner';

interface ConfirmOptions {
  /** Confirm button label (default: 확인). */
  confirmLabel?: string;
  /** Cancel button label (default: 취소). */
  cancelLabel?: string;
  /** Optional secondary description line. */
  description?: string;
}

/**
 * Promise-based confirmation built on sonner, replacing native `confirm()` so
 * destructive admin actions follow the toast convention instead of blocking
 * browser dialogs. Resolves `true` only when the user explicitly confirms.
 * (review backlog F42)
 *
 * Usage: `if (!(await confirmToast('정말 삭제하시겠습니까?', { confirmLabel: '삭제' }))) return;`
 */
export function confirmToast(message: string, opts: ConfirmOptions = {}): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false;
    const settle = (value: boolean) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    toast(message, {
      description: opts.description,
      duration: Infinity,
      action: {
        label: opts.confirmLabel ?? '확인',
        onClick: () => settle(true),
      },
      cancel: {
        label: opts.cancelLabel ?? '취소',
        onClick: () => settle(false),
      },
      onDismiss: () => settle(false),
      onAutoClose: () => settle(false),
    });
  });
}

interface UndoOptions {
  /** Undo button label (default: 되돌리기). */
  undoLabel?: string;
  /** How long the undo window stays open, in ms (default: 6000). */
  duration?: number;
  /** Optional secondary description line. */
  description?: string;
}

/**
 * Success toast that offers a time-boxed "undo" affordance. Use for actions
 * whose effect can be reverted by the caller within the window (e.g. an
 * optimistically-removed row that is only committed server-side after the
 * window closes).
 *
 * `onUndo` fires if the user clicks undo before the toast closes; otherwise
 * `onCommit` fires exactly once when the window elapses (or the toast is
 * dismissed/auto-closed). Exactly one of the two callbacks runs.
 *
 * This is additive — it does not touch {@link confirmToast}'s signature.
 *
 * Usage:
 * ```
 * undoToast('항목을 삭제했습니다.', {
 *   onUndo: () => restoreLocally(),
 *   onCommit: () => deleteOnServer(),
 * });
 * ```
 */
export function undoToast(
  message: string,
  handlers: { onUndo: () => void; onCommit: () => void },
  opts: UndoOptions = {}
): void {
  let settled = false;
  const settle = (undone: boolean) => {
    if (settled) return;
    settled = true;
    (undone ? handlers.onUndo : handlers.onCommit)();
  };

  toast.success(message, {
    description: opts.description,
    duration: opts.duration ?? 6000,
    action: {
      label: opts.undoLabel ?? '되돌리기',
      onClick: () => settle(true),
    },
    // No explicit cancel button: letting the toast elapse commits the action.
    onAutoClose: () => settle(false),
    onDismiss: () => settle(false),
  });
}
