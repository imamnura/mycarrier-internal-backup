import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';
import { GOOGLE_ANALYTIC_KEY } from '@constants/env';

const analytics = Analytics({
  app: 'mycarrier',
  plugins: [
    googleAnalytics({
      measurementIds: [GOOGLE_ANALYTIC_KEY],
      debug: true,
      gtagName: 'MyCarrier Internal',
    }),
  ],
});

export default analytics;
