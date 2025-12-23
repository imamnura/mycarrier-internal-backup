export const statusLabel = {
  checking: 'eos approval',
  'eos approval': 'eos approval',
  'delivery approval': 'on progress',
  'on progress': 'on progress',
  'delivery returned': 'returned',
  returned: 'returned',
  'triims returned': 'returned',
  completed: 'completed',
};

export const statusVariant = {
  'eos approval': 'primary',
  returned: 'danger',
  'on progress': 'warning',
  completed: 'success',
};

export const schema = [
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'Request Id',
    name: 'requestId',
  },
  {
    cellStyle: {
      minWidth: 180,
    },
    formatDate: 'date-time',
    label: 'Request Date',
    name: 'createdAt',
  },
  {
    cellStyle: {
      minWidth: 150,
    },
    label: 'AsNumber',
    name: 'asNumber',
  },
  {
    cellStyle: {
      minWidth: 180,
    },
    label: 'Origin As Number',
    name: 'originAsNumber',
  },
  {
    label: 'Status',
    name: 'status',
  },
];
