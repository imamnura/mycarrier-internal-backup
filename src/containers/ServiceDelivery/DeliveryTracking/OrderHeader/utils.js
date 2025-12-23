export const schema = [
  {
    label: (
      <p>
        <strong>Order ID</strong>
      </p>
    ),
    name: 'orderId',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'Order Type',
    name: 'orderType',
  },
  {
    label: 'Order Date',
    name: 'orderDate',
    formatDate: 'date-time',
  },
  {
    label: 'Last Update',
    name: 'lastUpdate',
    formatDate: 'date-time',
    sort: true,
  },
  {
    label: 'Order Header Status',
    name: 'orderHeaderStatus',
    schemaStatus: {
      failed: 'danger',
      'in progress': 'warning',
      completed: 'success',
      submitted: 'primary',
      canceled: 'danger',
    },
  },
];

export const optionsFilterStatus = [
  { label: 'All Status', value: '' },
  { label: 'Submitted', value: 'Submitted' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Failed', value: 'Failed' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Canceled', value: 'Canceled' },
];

export const optionsFilterOrderType = [
  { label: 'All Order Type', value: '' },
  { label: 'New Install', value: 'New Install' },
  { label: 'Modify', value: 'Modify' },
  { label: 'Modify Price', value: 'Modify Price' },
  { label: 'Move', value: 'Move' },
  { label: 'Disconnect', value: 'Disconnect' },
  { label: 'Resume', value: 'Resume' },
  { label: 'Suspend', value: 'Suspend' },
  { label: 'Change Ownership', value: 'Change Ownership' },
];
