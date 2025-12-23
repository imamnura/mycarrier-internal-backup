export const tableHeader = [
  {
    cellStyle: {
      minWidth: 150,
    },
    label: 'ID PRIVILEGE',
    name: 'journeyId',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'PRIVILEGE NAME',
    name: 'journey',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'USER TYPE',
    name: 'type',
  },
  {
    cellStyle: {
      minWidth: 250,
    },
    label: 'CATEGORY',
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
];

export const optionsFilterUserType = [
  { label: 'All User Type', value: '' },
  { label: 'Customer', value: 'customer' },
  { label: 'Internal', value: 'internal' },
];
