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
      minWidth: 100,
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
      completed: 'success',
      rejected: 'danger',
    },
  },
];

export const optionsFilterStatus = (tab) => {
  const status = [{ value: '', label: 'All Status' }];

  const statusTabRequest = [
    { value: 'checking', label: 'Customer Request' },
    { value: 'onprogress', label: 'Checking Order' },
  ];

  const statusTabActive = [
    { value: 'completed', label: 'Completed' },
    { value: 'rejected', label: 'Rejected' },
  ];

  if (tab === 'progress') status.push(...statusTabRequest);
  else status.push(...statusTabActive);

  return status;
};
