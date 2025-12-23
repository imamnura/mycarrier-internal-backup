export const tableHeader = [
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'Customer',
    name: 'custAccntName',
  },
  {
    cellStyle: {
      minWidth: 155,
    },
    label: 'Order Number',
    name: 'orderNumber',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    formatDate: 'date-time',
    label: 'Order Date',
    name: 'orderDate',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    formatDate: 'date-time',
    label: 'Last Update',
    name: 'updatedAt',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'Status',
    name: 'status',
    schemaStatus: {
      'Customer Request': 'primary',
      'Checking Order': 'warning',
      Completed: 'success',
      Rejected: 'danger',
    },
  },
];

export const optionsFilterStatus = (tab) => {
  const status = [{ value: '', label: 'All Status' }];

  const statusTabRequest = [
    { label: 'Customer Request', value: 'checking' },
    { label: 'Checking Order', value: 'onprogress' },
  ];

  const statusTabActive = [
    { label: 'Completed', value: 'completed' },
    { label: 'Rejected', value: 'rejected' },
  ];

  if (tab === 'progress') status.push(...statusTabRequest);
  else status.push(...statusTabActive);

  return status;
};
