export const tableHeader = [
  {
    cellStyle: {
      minWidth: 100,
    },
    label: 'ID ROLE',
    name: 'roleId',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'ROLE NAME',
    name: 'roleName',
  },
  {
    cellStyle: {
      minWidth: 100,
    },
    label: 'USER TYPE',
    name: 'type',
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
