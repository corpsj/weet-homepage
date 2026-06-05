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
