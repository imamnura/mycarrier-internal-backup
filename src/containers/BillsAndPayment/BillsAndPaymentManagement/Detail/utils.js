import React from 'react';
import moment from 'moment';
import { Box, Grid } from '@material-ui/core';
import Typography from '@components/Typography';
import Status from '@components/Status';
import Note from '@components/Note';
import ArrowKeyboardRight from '@assets/icon-v2/ArrowKeyboardRight';
import color from '@styles/color';

export const filterMonthOptions = [
  { label: 'All Month', value: '' },
  ...moment.months().map((monthName, i) => {
    return { value: String(`0${i + 1}`.slice(-2)), label: monthName };
  }),
];

export const filterYearOptions = () => {
  let startYear = moment().year() + 1;

  const output = [];

  for (let i = 5; i > 0; i = i - 1) {
    startYear -= 1;
    output.push(`${startYear}`);
  }

  return [
    { label: 'All Year', value: '' },
    ...output.map((year) => ({ label: year, value: year })),
  ];
};

export const filterStatusTimeOptions = [
  { label: 'All Status By Time', value: '' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Current', value: 'current' },
  { label: 'Overdue', value: 'overdue' },
];

export const filterLastUpdatePaymentOptions = [
  { label: 'Last Update', value: '' },
  { label: 'Newest Invoice date', value: 'newestInvoice' },
  { label: 'Oldest Invoice date', value: 'oldestInvoice' },
  { label: 'Newest clearing date', value: 'newestClearing' },
  { label: 'Oldest clearing date', value: 'oldestClearing' },
];

export const filterLastUpdateInvoiceOptions = [
  { label: 'Last Update', value: '' },
  { label: 'Newest Invoice date', value: 'newestInvoice' },
  { label: 'Oldest Invoice date', value: 'oldestInvoice' },
  { label: 'Newest due date', value: 'newestDue' },
  { label: 'Oldest due date', value: 'oldestDue' },
];

export const filterStatusPaidOptions = [
  { label: 'All Status By Paid', value: 'partially_and_unpaid' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Partially Paid', value: 'partially_paid' },
];

export const filterClaimCategoryOptions = [
  { label: 'All Claim Category', value: '' },
  // { label: 'Dispute by Time', value: 'time' },
  // { label: 'Dispute by Price', value: 'price' },
  { label: 'Invoice document is not completed', value: 'document' },
  { label: 'Invoice nominal is not correct', value: 'nominal' },
];

export const filterClaimStatusOptions = [
  { label: 'All Claim Status', value: '' },
  { label: 'Checking By CDM', value: 'submitted' },
  { label: 'Checking By AM', value: 'cdm_checked' },
  { label: 'Approved', value: 'approved' },
  { label: 'Completed', value: 'completed' },
  { label: 'Returned', value: 'returned' },
  { label: 'Rejected', value: 'rejected' },
];

export const filterReconciliationStatusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Draft', value: 'draft' },
  { label: 'Cancel', value: 'cancel' },
  { label: 'Returned', value: 'returned' },
  { label: 'Telkom Review', value: 'telkomReview' },
  { label: 'Telkom Sign', value: 'telkomSign' },
  { label: 'Customer Sign', value: 'customerSign' },
  { label: 'Completed', value: 'completed' },
];

export const filterDunningStatusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Draft', value: 'draft' },
  { label: 'Approval', value: 'approval' },
  { label: 'Return', value: 'return' },
  { label: 'Reject', value: 'reject' },
  { label: 'Discard', value: 'discard' },
  { label: 'Sent', value: 'sent' },
  { label: 'Completed', value: 'completed' },
];

export const statusVariant = {
  Unpaid: 'warning',
  'Partially Paid': 'success',
  'Fully Paid': 'success',
};

// eslint-disable-next-line react/prop-types
export const RefreshNote = ({ invoiceNumber, oldStatus, newStatus = '' }) => (
  <Note variant="general">
    <Grid container spacing={2} style={{ textAlign: 'left' }}>
      <Grid item>
        <Box mb={1}>
          <Typography
            children="Invoice Number"
            color="general-mid"
            variant="subtitle2"
            weight="normal"
          />
        </Box>
        <Typography
          children={invoiceNumber}
          color="general-mid"
          variant="subtitle2"
          weight="bold"
        />
      </Grid>
      <Grid item>
        <Box mb={1}>
          <Typography
            children={newStatus ? 'Old Status' : 'Status'}
            color="general-mid"
            variant="subtitle2"
            weight="normal"
          />
        </Box>
        <Status children={oldStatus} variant={statusVariant[oldStatus]} />
      </Grid>
      {!!newStatus && (
        <Grid item>
          <Box children="&nbsp;" />
          <Box
            children={ArrowKeyboardRight}
            color={color.general.light}
            height={24}
            width={24}
          />
        </Grid>
      )}
      {!!newStatus && (
        <Grid item>
          <Box mb={1}>
            <Typography
              children="New Status"
              color="general-mid"
              variant="subtitle2"
              weight="normal"
            />
          </Box>
          <Status children={newStatus} variant={statusVariant[newStatus]} />
        </Grid>
      )}
    </Grid>
  </Note>
);

export const parsingStatus = (status) => {
  const _status = parseInt(status);
  if (_status <= 7) {
    return { children: status, variant: 'warning' };
  } else if (_status >= 8) {
    return { children: status, variant: 'primary' };
  }
};

export const maskStatusTitle = (title) => {
  let maskStatus = {
    submitted: 'CHECKING BY CDM',
    cdm_checked: 'CHECKING BY AM',
    am_checked: 'APPROVED',
    cdm_returned: 'RETURNED',
    am_returned: 'RETURNED',
    cdm_rejected: 'REJECTED',
    am_rejected: 'REJECTED',
  };
  return maskStatus[title] || title;
};

export const maskStatusReconciliation = (status) => {
  let maskStatus = {
    customerSign: 'CUSTOMER SIGN',
    telkomSign: 'TELKOM SIGN',
    telkomReview: 'TELKOM REVIEW',
  };
  return maskStatus[status] || status;
};

export const schemaInvoice = ({ mdClient }) => [
  {
    cellStyle: {
      maxWidth: 64,
      minWidth: 64,
      width: 64,
      position: 'sticky',
      left: 0,
    },
    label: 'No',
    name: 'number',
  },
  {
    cellStyle: {
      minWidth: 240,
      width: 240,
      position: 'sticky',
      left: 64,
    },
    label: 'Invoice',
    name: 'invoiceNumberFormat',
  },
  {
    cellStyle: {
      minWidth: 130,
      width: 130,
      position: 'sticky',
      left: 64 + 240,
      borderRight: mdClient ? '4px solid #B3C3CA' : '',
    },
    label: 'Invoice Date',
    name: 'invoiceDate',
    formatDate: 'date',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 180,
      width: 180,
      position: mdClient ? '' : 'sticky',
      left: 64 + 240 + 130,
    },
    label: 'Invoice Read Status',
    name: 'invoiceReadStatus',
    schemaStatus: {
      read: 'primary',
      unread: 'danger',
      downloaded: 'success',
    },
  },
  {
    cellStyle: {
      minWidth: 180,
      width: 180,
      position: mdClient ? '' : 'sticky',
      left: 64 + 240 + 130 + 180,
      borderRight: mdClient ? '' : '4px solid #B3C3CA',
    },
    label: 'Total Bills',
    name: 'invoiceBill',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 180,
      width: 180,
    },
    label: 'Already Paid',
    name: 'invoicePaid',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 180,
      width: 180,
    },
    label: 'Outstanding Balance',
    name: 'invoiceOsBalance',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Due Dates',
    name: 'invoiceDueDate',
    formatDate: 'date',
  },
  // {
  //   cellStyle: {
  //     minWidth: 200,
  //     width: 200
  //   },
  //   label: 'Document',
  //   name: 'document'
  // },
  {
    cellStyle: {
      minWidth: 160,
      width: 160,
    },
    label: 'Last Update',
    name: 'updatedAt',
    formatDate: 'date-time',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Status By Time',
    name: 'status',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Status By Paid',
    name: 'paidStatus',
    schemaStatus: {
      Unpaid: 'warning',
      'Partially Paid': 'success',
    },
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Document Stage',
    name: 'ibssStatus',
  },
  {
    cellStyle: {
      minWidth: 216,
      width: 216,
    },
    label: 'Reminding Letter Status',
    name: 'rlStatus',
  },
  {
    cellStyle: {
      minWidth: 100,
      width: 100,
    },
    label: ' ',
    name: 'refresh',
  },
];

export const schemaPayment = ({ mdClient }) => [
  {
    cellStyle: {
      maxWidth: 64,
      minWidth: 64,
      width: 64,
      position: 'sticky',
      left: 0,
    },
    label: 'No',
    name: 'number',
  },
  {
    cellStyle: {
      minWidth: 240,
      width: 240,
      position: 'sticky',
      left: 64,
    },
    label: 'Invoice',
    name: 'invoiceNumberFormat',
  },
  {
    cellStyle: {
      minWidth: 130,
      width: 130,
      position: 'sticky',
      left: 64 + 240,
      borderRight: mdClient ? '4px solid #B3C3CA' : '',
    },
    label: 'Invoice Date',
    name: 'invoiceDate',
    formatDate: 'date',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 180,
      width: 180,
      position: mdClient ? '' : 'sticky',
      left: 64 + 240 + 130,
      borderRight: mdClient ? '' : '4px solid #B3C3CA',
    },
    label: 'Total Bills',
    name: 'invoiceBill',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 180,
      width: 180,
    },
    label: 'Clearing Dates',
    name: 'invoicePaidDate',
    formatDate: 'date',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 180,
      width: 180,
    },
    label: 'Total Payment',
    name: 'invoicePaid',
    currency: true,
  },
  // {
  //   cellStyle: {
  //     minWidth: 180,
  //     width: 180,
  //   },
  //   label: 'Cash Payment',
  //   name: 'cashPayment',
  //   currency: true,
  // },
  // {
  //   cellStyle: {
  //     minWidth: 180,
  //     width: 180,
  //   },
  //   label: 'PPH23',
  //   name: 'pph23',
  //   currency: true,
  // },
  {
    cellStyle: {
      minWidth: 180,
      width: 180,
    },
    label: 'Outstanding Balance',
    name: 'invoiceOsBalance',
    currency: true,
  },
  // {
  //   cellStyle: {
  //     minWidth: 200,
  //     width: 200
  //   },
  //   label: 'Document',
  //   name: 'document'
  // },
  {
    cellStyle: {
      minWidth: 160,
      width: 160,
    },
    label: 'Last Update',
    name: 'updatedAt',
    formatDate: 'date-time',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Status',
    name: 'paidStatus',
    schemaStatus: {
      'Fully Paid': 'success',
    },
  },
];

export const schemaClaim = [
  {
    cellStyle: {
      maxWidth: 64,
      minWidth: 64,
      width: 64,
      position: 'sticky',
      left: 0,
    },
    label: 'No',
    name: 'number',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
      position: 'sticky',
      left: 0 + 64,
    },
    label: 'Claim ID',
    name: 'claimId',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
      position: 'sticky',
      left: 0 + 64 + 200,
      borderRight: `4px solid #B3C3CA`,
    },
    label: 'Claim Date',
    name: 'claimDate',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'SID',
    name: 'sid',
  },
  {
    cellStyle: {
      minWidth: 160,
      width: 160,
    },
    label: 'Claim Category',
    name: 'claimCategory',
  },
  {
    cellStyle: {
      minWidth: 240,
      width: 240,
    },
    label: 'Invoice Number',
    name: 'invoiceNumberFormatted',
  },
  {
    cellStyle: {
      minWidth: 120,
      width: 120,
    },
    label: 'Invoice Date',
    name: 'invoiceDate',
    formatDate: 'date',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Status',
    name: 'subStatus',
    schemaStatus: {
      'CHECKING BY CDM': 'warning',
      'CHECKING BY AM': 'warning',
      approved: 'primary',
      returned: 'danger',
      RETURNED: 'danger',
      rejected: 'danger',
      REJECTED: 'danger',
      completed: 'success',
    },
  },
];

export const schemaReconciliation = [
  {
    cellStyle: {
      maxWidth: 64,
      minWidth: 64,
      width: 64,
      position: 'sticky',
      left: 0,
    },
    label: 'No',
    name: 'number',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
      position: 'sticky',
      left: 0 + 64,
    },
    label: 'ID',
    name: 'reconciliationId',
  },
  {
    cellStyle: {
      minWidth: 180,
      width: 180,
      position: 'sticky',
      left: 0 + 64 + 150,
      borderRight: `4px solid #B3C3CA`,
    },
    label: 'Reconciliation Date',
    name: 'reconciliationDate',
    formatDate: 'date',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Meeting Type',
    name: 'meetingType',
  },
  {
    cellStyle: {
      minWidth: 240,
      width: 240,
    },
    label: 'Discussion Title',
    name: 'discussionTitle',
  },
  {
    cellStyle: {
      minWidth: 240,
      width: 240,
    },
    label: 'Summary',
    name: 'summary',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Status',
    name: 'status',
    schemaStatus: {
      draft: 'primary',
      'CUSTOMER SIGN': 'warning',
      returned: 'danger',
      cancel: 'danger',
      completed: 'success',
      'TELKOM SIGN': 'warning',
      'TELKOM REVIEW': 'warning',
    },
  },
];

export const schemaDunning = [
  {
    cellStyle: {
      maxWidth: 64,
      minWidth: 64,
      width: 64,
      position: 'sticky',
      left: 0,
    },
    label: 'No',
    name: 'number',
  },
  {
    cellStyle: {
      minWidth: 180,
      width: 180,
      position: 'sticky',
      left: 0 + 64,
    },
    label: 'ID',
    name: 'id',
  },
  {
    cellStyle: {
      minWidth: 180,
      width: 180,
      position: 'sticky',
      left: 0 + 64 + 180,
      borderRight: `4px solid #B3C3CA`,
    },
    label: 'Created Date',
    name: 'createdAt',
    formatDate: 'date',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Type',
    name: 'childType',
  },
  {
    cellStyle: {
      minWidth: 240,
      width: 240,
    },
    label: 'Invoice',
    name: 'invoices',
  },
  {
    cellStyle: {
      minWidth: 240,
      width: 240,
    },
    label: 'Waiting for Approval',
    name: 'reviewer',
  },
  {
    cellStyle: {
      minWidth: 300,
      width: 300,
    },
    label: 'Document',
    name: 'documentAttachment',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Status',
    name: 'status',
    schemaStatus: {
      draft: 'primary',
      approval: 'warning',
      return: 'danger',
      reject: 'danger',
      discard: 'danger',
      sent: 'success',
      completed: 'success',
    },
  },
];
