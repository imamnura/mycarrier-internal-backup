export const filterOptions = [
  { label: 'All Customer', value: '' },
  { label: 'Jatis', value: '2-308859301' },
  { label: 'MDM', value: '2-352555911' },
  { label: 'IMS', value: '2-215192291' },
  { label: 'Mitracomm', value: '0003700244' },
];

export const statusOptions = (tab) =>
  tab === 'active'
    ? [
        { label: 'All Status', value: 'all-onprogress' },
        { label: 'Ticket Analyze', value: 'checking' },
        { label: 'Technical Handling', value: 'onprogress' },
        { label: 'Customer Review', value: 'customerreview' },
      ]
    : [
        { label: 'All Status', value: 'done' },
        { label: 'Closed', value: 'completed' },
        { label: 'Rejected', value: 'rejected' },
      ];

export const tableHeader = [
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'Ticket Number',
    name: 'ticketId',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'Customer',
    name: 'custAccName',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 100,
    },
    label: 'Service Category',
    name: 'category',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 100,
    },
    label: 'Provider',
    name: 'operatorTypeName',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 100,
    },
    label: 'Sender ID',
    name: 'senderTypeName',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 100,
    },
    formatDate: 'date-time',
    label: 'Created Date',
    name: 'createdAt',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 100,
    },
    formatDate: 'date-time',
    label: 'Last Update',
    name: 'updatedAt',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 100,
    },
    label: 'TTR Agent (Hour)',
    name: 'ttrAgent',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 100,
    },
    label: 'TTR (Hour)',
    name: 'ttr',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'Status',
    name: 'status',
    schemaStatus: {
      'Ticket Analyze': 'primary',
      'Technical Handling': 'warning',
      'Customer Review': 'alert',
      Closed: 'success',
      reject: 'danger',
      rejected: 'danger',
    },
    sort: true,
  },
];
