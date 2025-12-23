export const statusFilter = [
  { label: 'All Status', value: '' },
  { label: 'Checking', value: 'checking' },
  { label: 'On Progress', value: 'onprogress' },
  { label: 'Closed', value: 'completed' },
];

export const tableHeader = [
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Ticket Number',
    name: 'ticketId',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Reference ID',
    name: 'referenceId',
  },
  {
    cellStyle: {
      minWidth: 140,
    },
    label: 'Username',
    name: 'usernameTicket',
  },
  {
    cellStyle: {
      minWidth: 140,
    },
    label: 'Trouble Type',
    name: 'troubleType',
  },
  {
    cellStyle: {
      minWidth: 140,
    },
    formatDate: 'date',
    label: 'Created Date',
    name: 'createdAt',
    sort: true,
  },
  {
    label: 'Status',
    name: 'status',
    schemaStatus: {
      closed: 'success',
      'on progress': 'warning',
      checking: 'primary',
    },
  },
];
