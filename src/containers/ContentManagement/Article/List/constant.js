export const tableHeader = [
  {
    cellStyle: {
      minWidth: 30,
      width: 30,
    },
    label: 'ID',
    name: 'id',
  },
  {
    cellStyle: {
      minWidth: 250,
      width: 250,
    },
    label: 'ARTICLE NAME',
    name: 'title',
  },
  {
    cellStyle: {
      minWidth: 300,
      width: 300,
    },
    label: 'IMAGE NAME',
    name: 'image',
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
      minWidth: 200,
      width: 200,
    },
    label: 'ACTION',
    name: 'operations',
  },
];
