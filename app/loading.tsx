/**
 * Top-level loading fallback shown while a route segment streams. (F32)
 */
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="로딩 중">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
      <span className="sr-only">로딩 중…</span>
    </div>
  );
}
