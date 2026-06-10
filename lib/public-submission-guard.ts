import 'server-only';

import { headers } from 'next/headers';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;
const MAX_TRACKED_BUCKETS = 5000;
const DEFAULT_VERCEL_CLIENT_IP_HEADER = 'x-forwarded-for';

declare global {
  // Best-effort per-instance throttle. Production should still use WAF/edge limits.
  var __weetPublicSubmissionBuckets: Map<string, number[]> | undefined;
}

function getBucketStore() {
  if (!globalThis.__weetPublicSubmissionBuckets) {
    globalThis.__weetPublicSubmissionBuckets = new Map<string, number[]>();
  }
  return globalThis.__weetPublicSubmissionBuckets;
}

function normalizeClientId(value: string | null) {
  const clientId = (value || 'unknown')
    .split(',')[0]
    .trim()
    .replace(/[^a-zA-Z0-9:._-]/g, '')
    .slice(0, 80);

  return clientId || 'unknown';
}

function getTrustedClientHeaderName() {
  const configuredHeader = process.env.TRUSTED_CLIENT_IP_HEADER?.trim().toLowerCase();
  if (configuredHeader) return configuredHeader;
  if (process.env.VERCEL === '1') return DEFAULT_VERCEL_CLIENT_IP_HEADER;
  return null;
}

export async function assertPublicSubmissionAllowed(scope: string) {
  const headerStore = await headers();
  const trustedClientHeader = getTrustedClientHeaderName();
  const rawClientId = trustedClientHeader
    ? headerStore.get(trustedClientHeader)
    : process.env.NODE_ENV === 'production'
      ? null
      : 'local-dev';
  const clientId = normalizeClientId(rawClientId);
  const key = `${scope}:${clientId}`;
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const buckets = getBucketStore();

  if (buckets.size >= MAX_TRACKED_BUCKETS) {
    for (const [bucketKey, timestamps] of buckets) {
      if (!timestamps.some((timestamp) => timestamp >= cutoff)) {
        buckets.delete(bucketKey);
      }
    }
  }

  if (!buckets.has(key) && buckets.size >= MAX_TRACKED_BUCKETS) {
    throw new Error('요청이 일시적으로 많습니다. 잠시 후 다시 시도해주세요.');
  }

  const recent = (buckets.get(key) || []).filter((timestamp) => timestamp >= cutoff);
  if (recent.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    throw new Error('요청이 너무 많습니다. 잠시 후 다시 시도해주세요.');
  }

  recent.push(now);
  buckets.set(key, recent);
}
