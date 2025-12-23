import { dateFormat } from '@utils/parser';

const baseSchema = [
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Ticket Number',
    name: 'ticketId',
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
      minWidth: 160,
    },
    label: 'Voucher Code',
    name: 'voucherCode',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Trouble Type',
    name: 'troubleType',
  },
  {
    cellStyle: {
      minWidth: 140,
    },
    label: 'Created Date',
    name: 'createdAt',
  },
];

const schemaApproval = [
  ...baseSchema,
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Status',
    name: 'status',
    schemaStatus: {
      'Report Checking': 'primary',
      'In Progress': 'warning',
      'Report Issued': 'warning',
      'Fault Analysis': 'warning',
      'Fault Handling': 'warning',
      'Fault Completion': 'alert',
      'On Hold': 'warning',
      Solved: 'warning',
      Closed: 'success',
    },
  },
];

const schemaHistory = [
  ...baseSchema,
  {
    cellStyle: {
      minWidth: 140,
    },
    label: 'TTR',
    name: 'ttrFab',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Status',
    name: 'status',
    schemaStatus: {
      'Report Completed': 'success',
      Closed: 'success',
      'Report Rejected': 'danger',
    },
  },
];

export const progressOptionsOld = [
  { label: 'All Status', value: '' },
  { label: 'Report Issued', value: 'Approved' },
  { label: 'Fault Analysis', value: 'Queued' },
  { label: 'Fault Handling', value: 'Backend' },
  { label: 'Report Completion', value: 'Finalchecked' },
  { label: 'Report Completed', value: 'Closed' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'On Hold', value: 'On Hold' },
  { label: 'Solved', value: 'Solved' },
  // { label:  'Closed', value: 'Closed' },
];

export const progressOptions = [
  { label: 'All Status', value: '' },
  { label: 'Report Checking', value: 'Checking' },
  { label: 'Report Issued', value: 'Approved' },
  { label: 'Fault Analysis', value: 'Queued' },
  { label: 'Fault Handling', value: 'Backend' },
  { label: 'Fault Completion', value: 'Finalchecked, Resolved, Salamsim' },
  { label: 'In Progress', value: 'Onprogress' },
  { label: 'On Hold', value: 'Onhold' },
  { label: 'Solved', value: 'Solved' },
  // { label:  'Closed', value: 'Closed' },
];

export const statusOptions = [
  { label: 'All Status', value: '' },
  // { label:  'Report Completed', value: 'Closed' },
  { label: 'Closed', value: 'Closed' },
  { label: 'Report Rejected', value: 'Rejected' },
];

export const schemaList = (activeTab) => {
  return (
    {
      approval: schemaApproval,
      history: schemaHistory,
    }[activeTab] || []
  );
};

const normalizeStatus = (status) => {
  return (
    {
      Checking: 'Report Checking',
      Onprogress: 'In Progress',
      Onhold: 'On Hold',
      Rejected: 'Report Rejected',
      Approved: 'Report Issued',
      Queued: 'Fault Analysis',
      Backend: 'Fault Handling',
      Finalchecked: 'Fault Completion',
      Resolved: 'Fault Completion',
      Salamsim: 'Fault Completion',
    }[status] || status
  );
};

export const normalizeList = (data) =>
  data.map((d) => ({
    ...d,
    createdAt: dateFormat({ date: d.createdAt, type: 'date-time' }),
    status: normalizeStatus(d?.status),
  }));
