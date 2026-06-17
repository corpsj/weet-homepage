'use client';

import { useEffect } from 'react';

/**
 * Warns the user before leaving (refresh / tab close / hard navigation) while an
 * admin form has unsaved changes. App Router does not yet expose a stable
 * client-side route-change blocker, so this covers the browser `beforeunload`
 * path; pair it with explicit confirm dialogs for in-app navigations.
 * (review backlog F41)
 */
export function useUnsavedChangesWarning(isDirty: boolean) {
  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      // Required for some browsers to trigger the native prompt.
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);
}
