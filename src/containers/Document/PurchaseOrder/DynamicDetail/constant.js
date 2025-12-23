export const tableHeader = {
  'billing-information': [
    {
      cellStyle: {
        minWidth: 160,
      },
      label: 'Usage Period',
      name: 'usagePeriod',
    },
    {
      cellStyle: {
        minWidth: 160,
      },
      label: 'Billing Period',
      name: 'billingPeriod',
    },
    {
      cellStyle: {
        minWidth: 160,
        textTransform: 'none',
      },
      currencyNumberOnly: true,
      label: 'GL Account',
      name: 'glAccount',
    },
    {
      cellStyle: {
        minWidth: 160,
      },
      label: 'Short Text',
      name: 'shortText',
    },
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'Currency',
      name: 'currency',
    },
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'Cycle',
      name: 'cycle',
    },
    {
      cellStyle: {
        minWidth: 160,
      },
      currencyNumberOnly: true,
      label: 'Full Amount',
      name: 'fullAmount',
    },
    {
      cellStyle: {
        minWidth: 160,
      },
      currencyNumberOnly: true,
      label: 'Billed Amount',
      name: 'billedAmount',
    },
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'Status',
      name: 'status',
      schemaStatus: {
        verified: 'success',
        'billing verified': 'primary',
        'partially paid': 'success',
        'fully paid': 'success',
        unpaid: 'warning',
      },
    },
  ],
};
