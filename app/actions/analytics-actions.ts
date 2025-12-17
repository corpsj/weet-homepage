'use server';

import {
    getTrafficStats,
    getUserDemographics,
    getCityDemographics,
    getAcquisitionSources,
    getTopPages
} from '@/lib/analytics';
import { unstable_cache } from 'next/cache';

// Cache configuration
const CACHE_TIME = 3600; // 1 hour

export const fetchTrafficStats = unstable_cache(
    async (startDate?: string, endDate?: string) => {
        return await getTrafficStats(startDate, endDate);
    },
    ['analytics-traffic'],
    { revalidate: CACHE_TIME, tags: ['analytics'] }
);

export const fetchUserDemographics = unstable_cache(
    async (startDate?: string, endDate?: string) => {
        return await getUserDemographics(startDate, endDate);
    },
    ['analytics-demographics'],
    { revalidate: CACHE_TIME, tags: ['analytics'] }
);

export const fetchCityDemographics = unstable_cache(
    async (startDate?: string, endDate?: string) => {
        return await getCityDemographics(startDate, endDate);
    },
    ['analytics-city'],
    { revalidate: CACHE_TIME, tags: ['analytics'] }
);

export const fetchAcquisitionSources = unstable_cache(
    async (startDate?: string, endDate?: string) => {
        return await getAcquisitionSources(startDate, endDate);
    },
    ['analytics-acquisition'],
    { revalidate: CACHE_TIME, tags: ['analytics'] }
);

export const fetchTopPages = unstable_cache(
    async (startDate?: string, endDate?: string) => {
        return await getTopPages(startDate, endDate);
    },
    ['analytics-top-pages'],
    { revalidate: CACHE_TIME, tags: ['analytics'] }
);
