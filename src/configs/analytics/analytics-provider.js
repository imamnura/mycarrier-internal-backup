'use client';

import analytics, { AnalyticsProvider as Provider } from './index';
import { AnalyticsProvider as ProviderPlugin } from 'use-analytics';

const AnalyticsProvider = ({ children }) => {
  if (process.env.NODE_ENV === 'development') {
    return children;
  }

  return (
    <ProviderPlugin instance={analytics}>
      <Provider>{children}</Provider>
    </ProviderPlugin>
  );
};

export default AnalyticsProvider;
