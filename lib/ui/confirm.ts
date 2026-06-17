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
