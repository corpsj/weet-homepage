import { BetaAnalyticsDataClient } from '@google-analytics/data';

const propertyId = process.env.GA_PROPERTY_ID;
const GA_TIMEOUT_MS = Number(process.env.GA_TIMEOUT_MS ?? 6000);

// Initialize client only if credentials exist
const analyticsDataClient = (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY)
    ? new BetaAnalyticsDataClient({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
    })
    : null;

async function withGaTimeout<T>(request: Promise<T>, label: string): Promise<T> {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const timeoutPromise = new Promise<never>((_, reject) => {
        timeout = setTimeout(() => reject(new Error(`${label} request timed out after ${GA_TIMEOUT_MS}ms`)), GA_TIMEOUT_MS);
    });

    try {
        return await Promise.race([request, timeoutPromise]);
    } finally {
        if (timeout) clearTimeout(timeout);
    }
}

export async function getTrafficStats(startDate = '7daysAgo', endDate = 'today') {
    if (!analyticsDataClient || !propertyId) return null;

    try {
        const [response] = await withGaTimeout(analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate }],
            metrics: [
                { name: 'activeUsers' },
                { name: 'sessions' },
                { name: 'screenPageViews' },
                { name: 'averageSessionDuration' }
            ],
            dimensions: [{ name: 'date' }],
            orderBys: [{ dimension: { dimensionName: 'date' } }],
        }), 'GA4 traffic stats');

        return response;
    } catch (error) {
        console.error('GA4 Traffic Stats Error:', error);
        const message = error instanceof Error ? error.message : String(error);
        return { error: message || 'Unknown error' };
    }
}

export async function getUserDemographics(startDate = '30daysAgo', endDate = 'today') {
    if (!analyticsDataClient || !propertyId) return null;

    try {
        const [countryResponse] = await withGaTimeout(analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'country' }],
            metrics: [{ name: 'activeUsers' }],
            limit: 5,
        }), 'GA4 country demographics');

        const [deviceResponse] = await withGaTimeout(analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'deviceCategory' }],
            metrics: [{ name: 'activeUsers' }],
        }), 'GA4 device demographics');

        return {
            countries: countryResponse,
            devices: deviceResponse
        };
    } catch (error) {
        console.error('GA4 Demographics Error:', error);
        return null;
    }
}

export async function getCityDemographics(startDate = '30daysAgo', endDate = 'today') {
    if (!analyticsDataClient || !propertyId) return null;

    try {
        const [response] = await withGaTimeout(analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'city' }, { name: 'region' }],
            metrics: [{ name: 'activeUsers' }],
            limit: 10,
            orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        }), 'GA4 city demographics');

        return response;
    } catch (error) {
        console.error('GA4 City Stats Error:', error);
        return null;
    }
}

export async function getAcquisitionSources(startDate = '30daysAgo', endDate = 'today') {
    if (!analyticsDataClient || !propertyId) return null;

    try {
        const [response] = await withGaTimeout(analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'sessionSource' }],
            metrics: [{ name: 'sessions' }],
            limit: 5,
            orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        }), 'GA4 acquisition sources');

        return response;
    } catch (error) {
        console.error('GA4 Acquisition Error:', error);
        return null;
    }
}

export async function getTopPages(startDate = '30daysAgo', endDate = 'today') {
    if (!analyticsDataClient || !propertyId) return null;

    try {
        const [response] = await withGaTimeout(analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
            metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
            limit: 10,
            orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        }), 'GA4 top pages');

        return response;
    } catch (error) {
        console.error('GA4 Top Pages Error:', error);
        return null;
    }
}
