import { testLocatorGenerator } from '@utils/test-locator';

const PREFIX = 'link-list';

const TEST_LOCATOR_LINK_LIST = {
  refresh: '',
  tab: {
    request: '',
    active: '',
  },
  filters: {
    date: '',
    customer: '',
    status: '',
  },
  search: '',
  tableRow: '',
};

export const LOCATOR = testLocatorGenerator(TEST_LOCATOR_LINK_LIST, PREFIX);
