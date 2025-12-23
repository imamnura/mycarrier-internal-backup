import { testLocatorGenerator } from '@utils/test-locator';
import { TEST_LOCATOR_MAIN } from '../../test-locator';

const PREFIX = 'bill-and-payment-company-list';

const TEST_LOCATOR_COMPANY_LIST = {
  ...TEST_LOCATOR_MAIN,
  search: 'search',
  filters: {
    profile: 'filter-profile',
    lastUpdate: 'filter-last-update',
  },
  table: 'data',
  rootId: 'root',
};

export const LOCATOR = testLocatorGenerator(TEST_LOCATOR_COMPANY_LIST, PREFIX);
