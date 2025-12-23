import { testLocatorGenerator } from '@utils/test-locator';

const PREFIX = 'umb-list';

const TEST_LOCATOR_UMB_LIST = {
  refresh: '',
  filters: {
    status: '',
    customer: '',
    date: '',
  },
  tab: {
    request: '',
    active: '',
  },
  search: '',
  tableRow: '',
};

export const LOCATOR = testLocatorGenerator(TEST_LOCATOR_UMB_LIST, PREFIX);
