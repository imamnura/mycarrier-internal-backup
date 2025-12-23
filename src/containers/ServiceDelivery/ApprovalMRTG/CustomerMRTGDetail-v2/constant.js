export const tableHeader = {
  'request-mrtg': [
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'REQUEST ID',
      name: 'requestId',
    },
    {
      cellStyle: {
        minWidth: 160,
      },
      formatDate: 'date-time',
      label: 'REQUEST DATE',
      name: 'orderDate',
    },
    {
      cellStyle: {
        minWidth: 160,
      },
      formatDate: 'date-time',
      label: 'ACTIVATED DATE',
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
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'Status',
      name: 'status',
      schemaStatus: {
        'CUSTOMER REQUEST': 'warning',
        INTEGRATED: 'success',
      },
    },
  ],
  'login-data': [
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'REQUEST ID',
      name: 'loginDataId',
    },
    {
      label: 'USERNAME',
      name: 'username',
    },
    {
      label: 'PASSWORD',
      name: 'password',
    },
    {
      cellStyle: {
        minWidth: 160,
      },
      formatDate: 'date-time',
      label: 'REQUEST DATE',
      name: 'orderDate',
    },
    {
      cellStyle: {
        minWidth: 160,
      },
      formatDate: 'date-time',
      label: 'LAST UPDATE',
      name: 'lastUpdate',
    },
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'Status',
      name: 'status',
      schemaStatus: {
        'ON PROGRESS': 'warning',
        COMPLETED: 'success',
      },
    },
  ],
};

export const optionsFilterStatus = {
  'request-mrtg': [
    { value: '', label: 'All Status' },
    { value: 'CUSTOMER REQUEST', label: 'Customer Request' },
    { value: 'INTEGRATED', label: 'Integrated' },
  ],
  'login-data': [
    { value: '', label: 'All Status' },
    { value: 'REQUESTED', label: 'On Progress' },
    { value: 'COMPLETED', label: 'Completed' },
  ],
};

export const statusLabel = {
  REQUESTED: 'ON PROGRESS',
};
