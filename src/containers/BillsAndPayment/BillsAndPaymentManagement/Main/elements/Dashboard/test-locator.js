import { testLocatorGenerator } from '@utils/test-locator';
import { TEST_LOCATOR_MAIN } from '../../test-locator';

const PREFIX = 'bill-and-payment-dashboard';

const TEST_LOCATOR_DASHBOARD = {
  ...TEST_LOCATOR_MAIN,
  sections: {
    summaryInvoice: {
      filters: {
        period: '',
        requestTime: '',
      },
      all: {
        viewAll: '',
        popup: {
          search: '',
          filter: '',
          close: '',
          download: '',
          table: '',
        },
      },
      requested: {
        viewAll: '',
        popup: {
          search: '',
          filter: '',
          close: '',
          download: '',
          table: '',
        },
      },
      inProgress: {
        viewAll: '',
        popup: {
          search: '',
          filter: '',
          close: '',
          download: '',
          table: '',
        },
      },
      completed: {
        viewAll: '',
        popup: {
          search: '',
          filter: '',
          close: '',
          download: '',
        },
      },
    },
    summaryReminderLetter: {
      period: '',
      openDetail: '',
      popup: {
        search: '',
        filter: '',
        close: '',
        download: '',
        table: '',
      },
    },
    summaryThanksLetter: {
      period: '',
      openDetail: '',
      popup: {
        search: '',
        filter: '',
        close: '',
        download: '',
        table: '',
      },
    },
    paymentHistory: {
      rootId: '',
      formula: '',
      uploadBni: '',
      uploadMandiri: '',
      calendar: '',
    },
  },
};

export const LOCATOR = testLocatorGenerator(TEST_LOCATOR_DASHBOARD, PREFIX);
