export const tableHeader = [
  {
    cellStyle: {
      minWidth: 250,
    },
    label: 'CUSTOMER',
    name: 'customerAccountName',
  },
  {
    cellStyle: {
      minWidth: 100,
    },
    label: 'CA NUMBER',
    name: 'custAccntNum',
  },
  {
    cellStyle: {
      minWidth: 100,
    },
    label: 'CUSTOMER TYPE',
    name: 'customerAccountType',
  },
  {
    cellStyle: {
      minWidth: 80,
    },
    label: 'TOTAL AM HANDLED',
    name: 'totalAmHandled',
  },
  {
    cellStyle: {
      minWidth: 100,
    },
    label: 'STATUS',
    name: 'status',
    schemaStatus: {
      unhandled: 'warning',
      handled: 'success',
    },
  },
];
