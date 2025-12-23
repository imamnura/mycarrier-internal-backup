export const tableHeader = [
  {
    cellStyle: {
      minWidth: 70,
    },
    label: 'PRODUCT ID',
    name: 'id',
  },
  {
    cellStyle: {
      minWidth: 180,
    },
    label: 'PRODUCT CATEGORY',
    name: 'name',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    formatDate: 'date-time',
    label: 'CREATED DATE',
    name: 'createdAt',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    formatDate: 'date-time',
    label: 'LAST UPDATE',
    name: 'updatedAt',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'Status',
    name: 'status',
    schemaStatus: {
      draft: 'primary',
      publish: 'success',
    },
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'ACTION',
    name: 'operations',
  },
];

export const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'publish', label: 'Publish' },
];
