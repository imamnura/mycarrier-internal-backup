export const tableHeader = [
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'SERVICE ID',
    name: 'serviceId',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'PRODUCT & SERVICE',
    name: 'productName',
  },
  {
    cellStyle: {
      minWidth: 280,
    },
    label: 'SERVICE & LOCATION',
    name: 'serviceLocation',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'SITE ID',
    name: 'siteId',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    formatDate: 'date-time',
    label: 'ORDER DATE',
    name: 'activatedDate',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    formatDate: 'date-time',
    label: 'LAST UPDATE',
    name: 'lastUpdate',
  },
];

export const statusVariant = {
  'CUSTOMER REQUEST': 'warning',
  INTEGRATED: 'success',
};

export const statusLabel = {
  'CUSTOMER REQUEST': 'CUSTOMER REQUEST',
  INTEGRATED: 'INTEGRATED',
};
