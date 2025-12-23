import { testLocatorGenerator } from '@utils/test-locator';

// input
const PREFIX = 'bill-and-payment-company-detail';

export const TEST_LOCATOR_MAIN = {
  sections: {
    customerInformation: {
      uploadCustomerLogo: '',
      osBalance: {
        download: {
          action: '',
          popup: {
            close: '',
            period: '',
            cancel: '',
            download: '',
            confirmation: {
              yes: '',
              no: '',
            },
          },
        },
      },
    },
    pic: {
      am: {
        addPic: '',
      },
      customer: {
        addPic: '',
      },
      cdm: {
        addPic: '',
      },
    },
    list: {
      actionButton: {
        updatePeriod: {
          popup: {
            period: '',
            cancel: '',
            update: '',
          },
        },
        sendThanksLetter: {
          popup: {
            filter: {
              period: '',
            },
            cancel: '',
            update: '',
            send: '',
            preview: '',
          },
        },
        createReconciliation: '',
        sendBillingReminder: {
          popup: {
            filter: {
              period: '',
            },
            cancel: '',
            previous: '',
            send: '',
            preview: '',
          },
        },
      },
      invoice: {
        tab: '',
        search: '',
        filter: {
          month: '',
          year: '',
          statusByTime: '',
          statusByPaid: '',
          lastUpdate: '',
          period: '',
        },
        table: {
          refetchInvoice: '',
        },
      },
      payment: {
        tab: '',
        search: '',
        filter: {
          month: '',
          year: '',
          period: '',
          lastUpdate: '',
        },
        table: '',
      },
      claim: {
        tab: '',
        search: '',
        filter: {
          claimCategory: '',
          claimStatus: '',
        },
        table: '',
      },
      dunning: {
        tab: '',
        search: '',
        filter: {
          period: '',
          type: '',
          status: '',
        },
        table: {
          invoice: '',
          moreInvoice: '',
          document: '',
        },
      },
      reconciliation: {
        tab: '',
        search: '',
        filter: {
          period: '',
          status: '',
        },
        table: '',
      },
    },
  },
};

export const LOCATOR = testLocatorGenerator(TEST_LOCATOR_MAIN, PREFIX);
