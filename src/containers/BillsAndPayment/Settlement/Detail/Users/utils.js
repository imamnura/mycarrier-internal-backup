export const vmSchema = [
  {
    cellStyle: {
      minWidth: 80,
      width: 80,
    },
    label: 'Id',
    name: 'id',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Hostname',
    name: 'vmHostname',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Detail',
    name: 'vmDetail',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Current Status',
    name: 'vmStatus',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Ram',
    name: 'ramCost',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Cpu',
    name: 'cpuCost',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Os License',
    name: 'osLicenseCost',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Volume',
    name: 'volumeCost',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Public Ip',
    name: 'publicIpCost',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Package',
    name: 'packageCost',
    currency: true,
  },
];

export const volumeSchema = [
  {
    cellStyle: {
      minWidth: 80,
      width: 80,
    },
    label: 'Id',
    name: 'id',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Name',
    name: 'name',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Type',
    name: 'type',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Size',
    name: 'size',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    formatDate: 'date-time',
    label: 'Created Date',
    name: 'createdDate',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Volume Cost',
    name: 'volumeCost',
    currency: true,
  },
];

export const publicIpSchema = [
  {
    cellStyle: {
      minWidth: 80,
      width: 80,
    },
    label: 'Id',
    name: 'id',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Public IP',
    name: 'publicIp',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Type',
    name: 'type',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    formatDate: 'date-time',
    label: 'Created Date',
    name: 'createdDate',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Ip Cost',
    name: 'ipCost',
    currency: true,
  },
];

export const licenseSchema = [
  {
    cellStyle: {
      minWidth: 80,
      width: 80,
    },
    label: 'Id',
    name: 'id',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Name',
    name: 'name',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Type',
    name: 'type',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Attach Type',
    name: 'attachType',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Billing Type',
    name: 'billingType',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    formatDate: 'date-time',
    label: 'Created Date',
    name: 'createdDate',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'License Cost',
    name: 'licenseCost',
    currency: true,
  },
];

export const serviceSchema = [
  {
    cellStyle: {
      minWidth: 80,
      width: 80,
    },
    label: 'Id',
    name: 'id',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Name',
    name: 'name',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Billing Type',
    name: 'billingType',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    formatDate: 'date-time',
    label: 'Created Date',
    name: 'createdDate',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Service Cost',
    name: 'serviceCost',
    currency: true,
  },
];

export const storageSchema = [
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    formatDate: 'date-time',
    label: 'Created Date',
    name: 'createdDate',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Bucket Size',
    name: 'bucketSize',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Bucket Cost',
    name: 'bucketCost',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Bandwidth Usage',
    name: 'bandwidthUsage',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Bandwdith Cost',
    name: 'bandwidthCost',
    currency: true,
  },
];
