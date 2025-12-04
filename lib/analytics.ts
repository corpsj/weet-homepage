import { BetaAnalyticsDataClient } from '@google-analytics/data';

const propertyId = process.env.GA_PROPERTY_ID;

// Initialize client only if credentials exist
const analyticsDataClient = (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY)
    ? new BetaAnalyticsDataClient({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
    })
    : null;

export async function getTrafficStats(startDate = '7daysAgo', endDate = 'today') {
    if (!analyticsDataClient || !propertyId) return null;

    try {
        const [response] = await analyticsDataClient.runReport({
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
        });

        return response;
    } catch (error: any) {
        console.error('GA4 Traffic Stats Error:', error);
        return { error: error.message || 'Unknown error' };
    }
}

export async function getUserDemographics(startDate = '30daysAgo', endDate = 'today') {
    if (!analyticsDataClient || !propertyId) return null;

    try {
        const [countryResponse] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'country' }],
            metrics: [{ name: 'activeUsers' }],
            limit: 5,
        });

        const [deviceResponse] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'deviceCategory' }],
            metrics: [{ name: 'activeUsers' }],
        });

        return {
            countries: countryResponse,
            devices: deviceResponse
        };
    } catch (error) {
        console.error('GA4 Demographics Error:', error);
        return null;
    }
}

export async function getAcquisitionSources(startDate = '30daysAgo', endDate = 'today') {
    if (!analyticsDataClient || !propertyId) return null;

    try {
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'sessionSource' }],
            metrics: [{ name: 'sessions' }],
            limit: 5,
            orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        });

        return response;
    } catch (error) {
        console.error('GA4 Acquisition Error:', error);
        return null;
    }
}

export async function getTopPages(startDate = '30daysAgo', endDate = 'today') {
    if (!analyticsDataClient || !propertyId) return null;

    try {
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
            metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
            limit: 10,
            orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        });

        return response;
    } catch (error) {
        console.error('GA4 Top Pages Error:', error);
        return null;
    }
}
