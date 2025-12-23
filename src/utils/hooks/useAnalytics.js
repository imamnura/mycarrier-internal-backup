import { AnalyticsContext } from '@configs/analytics/analytics.context';
import { useContext } from 'react';

const useAnalytics = () => useContext(AnalyticsContext);

export default useAnalytics;
