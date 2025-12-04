'use server';

import {
    getTrafficStats,
    getUserDemographics,
    getAcquisitionSources,
    getTopPages
} from '@/lib/analytics';

export async function fetchTrafficStats(startDate?: string, endDate?: string) {
    return await getTrafficStats(startDate, endDate);
}

export async function fetchUserDemographics(startDate?: string, endDate?: string) {
    return await getUserDemographics(startDate, endDate);
}

export async function fetchAcquisitionSources(startDate?: string, endDate?: string) {
    return await getAcquisitionSources(startDate, endDate);
}

export async function fetchTopPages(startDate?: string, endDate?: string) {
    return await getTopPages(startDate, endDate);
}
