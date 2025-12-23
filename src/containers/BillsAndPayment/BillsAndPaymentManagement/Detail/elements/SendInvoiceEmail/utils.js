import moment from 'moment';

export const captions = {
  billingReminder:
    'Once the invoice has been send, customer will get an email billing reminder',
  thanksLetter:
    'Once the invoice has been send, customer will get an email about thanks letter',
};

export const mainButtonLabel = {
  billingReminder: 'send billing reminder',
  thanksLetter: 'send thanks letter',
};

export const confirmationMessage = {
  billingReminder: 'Are you sure want to send this billing reminder?',
  thanksLetter: 'Are you sure want to send this thanks letter?',
};

export const successMessage = {
  billingReminder: 'Billing reminder successfully sended',
  thanksLetter: 'Thanks letter successfully sended',
};

export const schema = {
  billingReminder: [
    {
      cellStyle: {
        minWidth: 240,
        width: 240,
      },
      label: 'Invoice',
      name: 'invoiceNumberFormat',
    },
    {
      cellStyle: {
        minWidth: 100,
        width: 100,
      },
      label: 'Invoice Date',
      name: 'invoiceDate',
      formatDate: 'date',
    },
    {
      cellStyle: {
        minWidth: 160,
        width: 160,
      },
      label: 'DPP',
      name: 'invoiceBillBeforePpn',
      currency: true,
    },
    {
      cellStyle: {
        minWidth: 160,
        width: 160,
      },
      label: 'PPN',
      name: 'invoicePpn',
      currency: true,
    },
    {
      cellStyle: {
        minWidth: 160,
        width: 160,
      },
      label: 'Total Bills',
      name: 'invoiceBill',
      currency: true,
    },
    {
      cellStyle: {
        minWidth: 160,
        width: 160,
      },
      label: 'Already Paid',
      name: 'invoicePaid',
      currency: true,
    },
    {
      cellStyle: {
        minWidth: 160,
        width: 160,
      },
      label: 'Outstanding Balance',
      name: 'invoiceOsBalance',
      currency: true,
    },
    {
      cellStyle: {
        minWidth: 100,
        width: 100,
      },
      label: 'Due Dates',
      name: 'invoiceDueDate',
      formatDate: 'date',
    },
    // {
    //   cellStyle: {
    //     minWidth: 200,
    //     width: 200
    //   },
    //   label: 'Document',
    //   name: 'document'
    // }
  ],
  thanksLetter: [
    {
      cellStyle: {
        minWidth: 240,
        width: 240,
      },
      label: 'Invoice',
      name: 'invoiceNumberFormat',
    },
    {
      cellStyle: {
        minWidth: 100,
        width: 100,
      },
      label: 'Invoice Date',
      name: 'invoiceDate',
      formatDate: 'date',
      sort: true,
    },
    {
      cellStyle: {
        minWidth: 160,
        width: 160,
      },
      label: 'Total Bills',
      name: 'invoiceBill',
      currency: true,
    },
    {
      cellStyle: {
        minWidth: 160,
        width: 160,
      },
      label: 'Clearing Dates',
      name: 'invoicePaidDate',
      formatDate: 'date',
      sort: true,
    },
    {
      cellStyle: {
        minWidth: 160,
        width: 160,
      },
      label: 'Total Payment',
      name: 'invoicePaid',
      currency: true,
    },
    {
      cellStyle: {
        minWidth: 160,
        width: 160,
      },
      label: 'Outstanding Balance',
      name: 'invoiceOsBalance',
      currency: true,
    },
    // {
    //   cellStyle: {
    //     minWidth: 200,
    //     width: 200
    //   },
    //   label: 'Document',
    //   name: 'document'
    // }
  ],
};

export const defaultValueFilterPeriodTL = {
  checkbox: false,
  clearingDate: true,
  invoiceDate: false,
  period: moment().subtract(1, 'months').toISOString(),
};
