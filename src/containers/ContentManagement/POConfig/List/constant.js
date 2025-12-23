export const schema = [
  {
    cellStyle: {
      minWidth: 180,
    },
    label: 'PRODUCT CATEGORY',
    name: 'categoryName',
  },
  {
    cellStyle: {
      minWidth: 180,
    },
    label: 'PRODUCT NAME',
    name: 'productName',
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
    label: 'ACTION',
    name: 'operations',
  },
];

export const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'true', label: 'Published' },
  { value: 'false', label: 'Not Published' },
];
