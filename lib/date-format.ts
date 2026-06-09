export function formatKstDate(dateString: string | null | undefined, fallback = '미지정') {
  if (!dateString) return fallback;

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return fallback;

  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const year = kstDate.getUTCFullYear();
  const month = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(kstDate.getUTCDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}
