import { testLocatorGenerator } from '@utils/test-locator';

// input
const PREFIX = 'bill-and-payment-dashboard';

export const TEST_LOCATOR_MAIN = {
  refresh: 'refresh',
  tab: {
    dashboard: 'tab-dashboard',
    companyList: 'tab-company-list',
  },
};

export const LOCATOR = testLocatorGenerator(TEST_LOCATOR_MAIN, PREFIX);
