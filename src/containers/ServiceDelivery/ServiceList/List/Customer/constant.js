export const schema = [
  {
    cellStyle: {
      minWidth: 240,
    },
    label: 'CUSTOMER',
    name: 'custAccntName',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 140,
    },
    label: (
      <p>
        <b>CA Number</b>
      </p>
    ),
    name: 'custAccntNum',
  },
  {
    cellStyle: {
      minWidth: 420,
    },
    label: 'ADDRESS',
    name: 'address',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'TOTAL PROJECT',
    name: 'totalProject',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'TOTAL SERVICE',
    name: 'totalService',
  },
  {
    cellStyle: {
      minWidth: 180,
    },
    formatDate: 'date-time',
    label: 'LAST UPDATE',
    name: 'lastUpdate',
    sort: true,
  },
];
