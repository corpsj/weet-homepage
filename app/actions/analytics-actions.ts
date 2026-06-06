'use server';

import {
    getTrafficStats,
    getUserDemographics,
    getCityDemographics,
    getAcquisitionSources,
    getTopPages
} from '@/lib/analytics';
import { unstable_cache } from 'next/cache';
import { requireAdmin } from '@/lib/admin-auth';

// Cache configuration
const CACHE_TIME = 3600; // 1 hour
const DEFAULT_DASHBOARD_TIMEOUT_MS = 7000;
const MIN_DASHBOARD_TIMEOUT_MS = 1000;
const MAX_DASHBOARD_TIMEOUT_MS = 30000;
const configuredDashboardTimeout = Number(process.env.GA_DASHBOARD_TIMEOUT_MS);
const DASHBOARD_TIMEOUT_MS = Number.isFinite(configuredDashboardTimeout)
    ? Math.min(Math.max(configuredDashboardTimeout, MIN_DASHBOARD_TIMEOUT_MS), MAX_DASHBOARD_TIMEOUT_MS)
    : DEFAULT_DASHBOARD_TIMEOUT_MS;

const cachedTrafficStats = unstable_cache(
    async (startDate?: string, endDate?: string) => {
        return await getTrafficStats(startDate, endDate);
    },
    ['analytics-traffic'],
    { revalidate: CACHE_TIME, tags: ['analytics'] }
);

const cachedUserDemographics = unstable_cache(
    async (startDate?: string, endDate?: string) => {
        return await getUserDemographics(startDate, endDate);
    },
    ['analytics-demographics'],
    { revalidate: CACHE_TIME, tags: ['analytics'] }
);

const cachedCityDemographics = unstable_cache(
    async (startDate?: string, endDate?: string) => {
        return await getCityDemographics(startDate, endDate);
    },
    ['analytics-city'],
    { revalidate: CACHE_TIME, tags: ['analytics'] }
);

const cachedAcquisitionSources = unstable_cache(
    async (startDate?: string, endDate?: string) => {
        return await getAcquisitionSources(startDate, endDate);
    },
    ['analytics-acquisition'],
    { revalidate: CACHE_TIME, tags: ['analytics'] }
);

const cachedTopPages = unstable_cache(
    async (startDate?: string, endDate?: string) => {
        return await getTopPages(startDate, endDate);
    },
    ['analytics-top-pages'],
    { revalidate: CACHE_TIME, tags: ['analytics'] }
);

export async function fetchTrafficStats(startDate?: string, endDate?: string) {
    await requireAdmin();
    return cachedTrafficStats(startDate, endDate);
}

export async function fetchUserDemographics(startDate?: string, endDate?: string) {
    await requireAdmin();
    return cachedUserDemographics(startDate, endDate);
}

export async function fetchCityDemographics(startDate?: string, endDate?: string) {
    await requireAdmin();
    return cachedCityDemographics(startDate, endDate);
}

export async function fetchAcquisitionSources(startDate?: string, endDate?: string) {
    await requireAdmin();
    return cachedAcquisitionSources(startDate, endDate);
}

export async function fetchTopPages(startDate?: string, endDate?: string) {
    await requireAdmin();
    return cachedTopPages(startDate, endDate);
}

function settledValue<T>(result: PromiseSettledResult<T>) {
    if (result.status === 'fulfilled') return result.value;

    return {
        error: result.reason instanceof Error ? result.reason.message : 'Analytics data failed to load',
    };
}

export async function fetchAnalyticsDashboard(startDate?: string, endDate?: string) {
    await requireAdmin();

    const loadDashboard = async () => {
        const [trafficStats, demographics, acquisition, topPages, cityStats] = await Promise.allSettled([
            cachedTrafficStats(startDate, endDate),
            cachedUserDemographics(startDate, endDate),
            cachedAcquisitionSources(startDate, endDate),
            cachedTopPages(startDate, endDate),
            cachedCityDemographics(startDate, endDate),
        ]);

        return {
            trafficStats: settledValue(trafficStats),
            demographics: settledValue(demographics),
            acquisition: settledValue(acquisition),
            topPages: settledValue(topPages),
            cityStats: settledValue(cityStats),
        };
    };

    const timeoutFallback = new Promise<Awaited<ReturnType<typeof loadDashboard>>>((resolve) => {
        setTimeout(() => {
            const error = { error: `Analytics dashboard timed out after ${DASHBOARD_TIMEOUT_MS}ms` };
            resolve({
                trafficStats: error,
                demographics: error,
                acquisition: error,
                topPages: error,
                cityStats: error,
            });
        }, DASHBOARD_TIMEOUT_MS);
    });

    return Promise.race([loadDashboard(), timeoutFallback]);
}
