export const tableHeader = [
  {
    cellStyle: {
      minWidth: 350,
      width: 350,
    },
    label: 'PRODUCT NAME',
    name: 'productName',
  },
  {
    cellStyle: {
      minWidth: 70,
    },
    label: 'PRODUCT ID',
    name: 'productId',
  },
  {
    cellStyle: {
      minWidth: 180,
    },
    label: 'PRODUCT CATEGORY',
    name: 'category',
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
      minWidth: 200,
      width: 200,
    },
    label: 'ACTION',
    name: 'operations',
  },
];
