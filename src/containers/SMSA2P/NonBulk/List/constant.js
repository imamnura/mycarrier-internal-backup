export const tableHeader = [
  {
    cellStyle: {
      minWidth: 100,
    },
    label: 'Order Number',
    name: 'orderNumber',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'Customer',
    name: 'customer',
  },
  {
    cellStyle: {
      minWidth: 150,
    },
    label: 'Campaign Name',
    name: 'campaignName',
  },
  {
    cellStyle: {
      minWidth: 150,
    },
    label: 'Campaign Type',
    name: 'campaignType',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    formatDate: 'date-time',
    label: 'Order Date',
    name: 'orderDate',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    formatDate: 'date-time',
    label: 'Last Update',
    name: 'lastUpdate',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'Status',
    name: 'status',
    schemaStatus: {
      'On Progress': 'warning',
      Completed: 'success',
    },
  },
];

export const optionsFilterCampaignType = [
  { value: '', label: 'All Campaign Type' },
  { value: 'targeted', label: 'Targeted' },
  { value: 'lba', label: 'LBA' },
];
