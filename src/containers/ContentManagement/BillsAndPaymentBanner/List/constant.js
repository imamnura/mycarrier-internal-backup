export const schema = [
  {
    cellStyle: {
      minWidth: 80,
    },
    label: 'BANNER ID',
    name: 'bannerId',
  },
  {
    cellStyle: {
      minWidth: 180,
    },
    label: 'TITLE',
    name: 'title',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    formatDate: 'date-time',
    label: 'CREATED DATE',
    name: 'createdAt',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    formatDate: 'date-time',
    label: 'LAST UPDATE',
    name: 'updatedAt',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'STATUS',
    name: 'operations',
  },
];

export const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Non-active' },
];
