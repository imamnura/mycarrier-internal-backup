import { testLocatorGenerator } from '@utils/test-locator';

const PREFIX = 'billsAndPaymentBanner-list';

const TEST_LOCATOR_BILLSANDPAYMENTBANNER_LIST = {
  addBanner: '',
  action: {
    showHide: '',
    edit: '',
    delete: '',
  },
  filter: {
    status: '',
    date: '',
  },
  search: '',
  reorderBanner: '',
  tableRow: '',
};

export const LOCATOR = testLocatorGenerator(
  TEST_LOCATOR_BILLSANDPAYMENTBANNER_LIST,
  PREFIX,
);
