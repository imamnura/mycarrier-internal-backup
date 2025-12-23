export const tableHeader = [
  {
    cellStyle: {
      minWidth: 240,
    },
    label: 'Customer',
    name: 'custAccName',
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
      minWidth: 155,
    },
    label: 'Service Category',
    name: 'category',
  },
  {
    cellStyle: {
      minWidth: 155,
    },
    label: 'IP Customer',
    name: 'ip',
  },
  {
    cellStyle: {
      minWidth: 155,
    },
    formatDate: 'date',
    label: 'Request Active',
    name: 'activeDate',
  },
  {
    cellStyle: {
      minWidth: 155,
    },
    formatDate: 'date-time',
    label: 'Order Date',
    name: 'createdAt',
  },
  {
    cellStyle: {
      minWidth: 155,
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
      Checking: 'warning',
      'Checking Order': 'warning',
      'Customer Review': 'alert',
      Completed: 'success',
      Rejected: 'danger',
    },
  },
];

export const optionsFilterStatus = (tab) => {
  const status = [{ value: '', label: 'All Status' }];

  const statusTabRequest = [
    { label: 'Customer Request', value: 'customerrequest' },
    { label: 'Checking Order', value: 'approval_provider' },
    { label: 'Customer Review', value: 'customerreview' },
  ];

  const statusTabActive = [
    { label: 'Completed', value: 'completed' },
    { label: 'Rejected', value: 'rejected' },
  ];

  if (tab === 'progress') status.push(...statusTabRequest);
  else status.push(...statusTabActive);

  return status;
};
