import { maskDigitalProductStatus, schemaDigitalProductStatus } from '../utils';

export const schemaList = [
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Ticket Number',
    name: 'ticketNumber',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Reference Id',
    name: 'referenceId',
  },
  {
    cellStyle: {
      minWidth: 130,
    },
    label: 'Ticket Source',
    name: 'source',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Company Name',
    name: 'companyName',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Product',
    name: 'product',
  },
  {
    cellStyle: {
      minWidth: 140,
    },
    label: 'Created Date',
    name: 'createdDate',
    formatDate: 'date-time',
  },
  {
    cellStyle: {
      minWidth: 140,
    },
    label: 'Last Updated',
    name: 'lastUpdate',
    formatDate: 'date-time',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Status',
    name: 'status',
    schemaStatus: schemaDigitalProductStatus,
  },
];

export const schemaListHistory = [
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Ticket Number',
    name: 'ticketNumber',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Reference Id',
    name: 'referenceId',
  },
  {
    cellStyle: {
      minWidth: 130,
    },
    label: 'Ticket Source',
    name: 'source',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Company Name',
    name: 'companyName',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Product',
    name: 'product',
  },
  {
    cellStyle: {
      minWidth: 140,
    },
    label: 'Created Date',
    name: 'createdDate',
    formatDate: 'date-time',
  },
  {
    cellStyle: {
      minWidth: 140,
    },
    label: 'Last Updated',
    name: 'lastUpdate',
    formatDate: 'date-time',
  },
  {
    cellStyle: {
      minWidth: 140,
    },
    label: 'TTR',
    name: 'ttr',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Status',
    name: 'status',
    schemaStatus: schemaDigitalProductStatus,
  },
];

export const schema = (tab) => {
  const _schema = {
    approval: schemaList,
    history: schemaListHistory,
  }[tab];

  return _schema || [];
};

export const statusOptionsApproval = [
  { label: 'All Status', value: '' },
  { label: 'Checking', value: 'CHECKING' },
  { label: 'On Progress', value: 'ON PROGESS' },
  { label: 'Report Checking', value: 'REPORT CHECKING' },
  { label: 'In Progress', value: 'IN PROGESS' },
  { label: 'On Hold', value: 'ON HOLD' },
  { label: 'Report Issued', value: 'REPORT ISSUED' },
  { label: 'Fault Analysis', value: 'FAULT ANALYSIS' },
  { label: 'Fault Handling', value: 'FAULT HANDLING' },
  { label: 'Fault Completion', value: 'FAULT COMPLETION' },
  { label: 'Solved', value: 'SOLVED' },
];

export const statusOptionsHistory = [
  { label: 'All Status', value: '' },
  { label: 'Solved', value: 'SOLVED' },
  { label: 'Report Completed', value: 'REPORT COMPLETED' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'Report Rejected', value: 'REPORT REJECTED' },
];

export const normalizeList = (data) =>
  data.map((d) => ({
    ...d,
    status: maskDigitalProductStatus(d?.status),
  }));
