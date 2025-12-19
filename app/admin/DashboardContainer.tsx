import {
    fetchTrafficStats,
    fetchUserDemographics,
    fetchAcquisitionSources,
    fetchTopPages,
    fetchCityDemographics
} from '@/app/actions/analytics-actions';
import AnalyticsDashboard from '@/components/admin/insights/AnalyticsDashboard';

export default async function DashboardContainer() {
    const [trafficStats, demographics, acquisition, topPages, cityStats] = await Promise.all([
        fetchTrafficStats(),
        fetchUserDemographics(),
        fetchAcquisitionSources(),
        fetchTopPages(),
        fetchCityDemographics()
    ]);

    return (
        <AnalyticsDashboard
            trafficStats={trafficStats}
            demographics={demographics}
            acquisition={acquisition}
            topPages={topPages}
            cityStats={cityStats}
        />
    );
}
