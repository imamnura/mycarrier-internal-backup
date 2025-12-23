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
      minWidth: 150,
    },
    label: (
      <p>
        <strong>CA Number</strong>
      </p>
    ),
    name: 'custAccntNum',
  },
  {
    cellStyle: {
      minWidth: 360,
    },
    label: 'ADDRESS',
    name: 'address',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'TOTAL ORDER',
    name: 'totalOrder',
  },
  {
    cellStyle: {
      minWidth: 180,
    },
    label: 'LAST UPDATE',
    name: 'lastUpdate',
    formatDate: 'date-time',
    sort: true,
  },
];
