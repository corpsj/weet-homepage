import { useEffect } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// 모달 공통 동작: ESC로 닫기 + 본문 스크롤 잠금 + 포커스 트랩(Tab 순환)·초기 포커스·복귀.
// 시그니처는 (onClose)로 고정 — 소비처(OptionInfoModal·FloorplanZoomModal)가 그대로 동작해야 함.
// 컨테이너는 모달이 렌더하는 [role="dialog"][aria-modal="true"] 중 가장 마지막(최상단) 요소를 사용한다.
export function useModalDismiss(onClose: () => void) {
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialogs = document.querySelectorAll<HTMLElement>('[role="dialog"][aria-modal="true"]');
    const dialog = dialogs.length ? dialogs[dialogs.length - 1] : null;

    const focusable = () =>
      Array.from(dialog?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );

    // 열릴 때 첫 focusable(보통 닫기 버튼)로 초기 포커스. 없으면 다이얼로그 자체.
    const items = focusable();
    if (items.length) {
      items[0].focus();
    } else if (dialog) {
      dialog.setAttribute('tabindex', '-1');
      dialog.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialog) return;

      const list = focusable();
      if (list.length === 0) {
        event.preventDefault();
        return;
      }
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement;
      if (event.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      // 닫힐 때 직전 activeElement로 포커스 복귀.
      previouslyFocused?.focus?.();
    };
  }, [onClose]);
}
