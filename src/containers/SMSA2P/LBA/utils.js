import React from 'react';
import Typography from '@components/Typography';
import { Box } from '@material-ui/core';
import { dateFormat } from '@utils/parser';
import { dateFormatConverter } from '@utils/converter';
import { titleCapitalize } from '@utils/common';

export const statusVariant = {
  'Customer Request': 'primary',
  'Checking Order': 'warning',
  Completed: 'success',
  Rejected: 'danger',
  Failed: 'danger',
  Sent: 'success',
};

export const statusLabel = {
  'customer request': 'Customer Request',
  checking: 'Customer Request',
  onprogress: 'Checking Order',
  rejected: 'Rejected',
  completed: 'Completed',
  'rate us': 'Completed',
};

export const optionsFilterOperator = [
  { value: '', label: 'All Operator' },
  { label: 'Telkomsel', value: 'telkomsel' },
  { label: 'XL', value: 'xl' },
  { label: 'Indosat', value: 'indosat' },
];

export const optionsFilterStatus = [
  { value: '', label: 'All Status' },
  { label: 'Customer Request', value: 'checking' },
  { label: 'Checking Order', value: 'onprogress' },
];

export const tableHeader = [
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'Customer',
    name: 'custAccntName',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'Sender Id',
    name: 'senderId',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'Order Number',
    name: 'orderNumber',
  },
  {
    cellStyle: {
      minWidth: 80,
    },
    label: 'Operator',
    name: 'provider',
  },
  {
    cellStyle: {
      minWidth: 80,
    },
    label: 'Service Category',
    name: 'serviceCategory',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    formatDate: 'date-time',
    label: 'Order Date',
    name: 'createdAt',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    formatDate: 'date-time',
    label: 'Last Update',
    name: 'updatedAt',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'Status',
    name: 'status',
    schemaStatus: statusVariant,
  },
];

export const detailSchema = (data, notificationStatus) => [
  {
    gridProps: { xs: 12, md: 6 },
    content: [
      {
        type: 'information',
        title: 'Order Information',
        properties: {
          data: data,
          schema: [
            { name: 'orderNumber', label: 'Order Number' },
            { name: 'custAccntName', label: 'Company Name' },
            {
              name: 'orderDate',
              label: 'Order Date',
              converter: dateFormatConverter({ type: 'date-time', empty: '-' }),
            },
            {
              name: 'updateAt',
              label: 'Last Update',
              converter: dateFormatConverter({ type: 'date-time', empty: '-' }),
            },
          ],
        },
      },
      {
        type: 'information',
        title: 'LBA Activation Order',
        properties: {
          data: data,
          schema: [
            { name: 'senderId', label: 'Sender ID' },
            {
              name: 'lbaCategory',
              label: 'LBA Category',
              converter: (v) => v?.join(', '),
            },
            {
              name: 'campaignName',
              label: 'Campaign Name',
              converter: titleCapitalize,
            },
            {
              name: 'provider',
              label: 'Operator',
              converter: titleCapitalize,
            },
            {
              name: 'campaignStartDate',
              label: 'Campaign Start Date',
              converter: dateFormatConverter({ type: 'date-time', empty: '-' }),
            },
            {
              name: 'campaignEndDate',
              label: 'Campaign End Date',
              converter: dateFormatConverter({ type: 'date-time', empty: '-' }),
            },
            { name: 'requestNotes', label: 'Notes' },
          ],
        },
      },
      {
        hidden: (data?.activationStatus !== 'completed' || data?.provider !== 'telkomsel'),
        type: 'custom',
        title: 'Notification Status',
        render: notificationStatus,
      },
      {
        type: 'attachment',
        title: 'Document Attachment',
        properties: {
          data: data,
          schema: [{ name: 'document', label: 'LBA' }],
        },
      },
    ],
  },
  {
    gridProps: { xs: 12, md: 6 },
    stickRight: true,
    content: [
      {
        type: 'stepper',
        title: 'Order Step',
        properties: {
          ...getLBAStepper(data?.activationStatus),
          steps: ['Customer Request', 'Checking Order', 'Completed'],
        },
      },
      {
        type: 'worklog',
        title: 'History Work Log',
        properties: {
          data: getLBAWorklog(data?.worklog),
        },
      },
    ],
  },
];

export const getLBAStepper = (status) => {
  let active = 0;
  let errors = undefined;

  switch (status) {
    case 'checking':
    case 'customer request': {
      active = 0;
      break;
    }
    case 'onprogress': {
      active = 1;
      break;
    }
    case 'completed': {
      active = 3;
      break;
    }
    case 'rejected': {
      active = 3;
      break;
    }
    case 'rate us': {
      active = 3;
    }
  }

  if (['rejected'].includes(status)) {
    errors = status.toLowerCase();
  }

  return {
    active,
    errors,
  };
};

const generateWorklogNote = ({ note, noteProgress }) => {
  if (noteProgress) {
    return (
      <>
        <Typography children={note} color="general-mid" variant="caption" />
        <Box display="block">
          <Typography color="general-mid" variant="caption">
            Note: &ldquo;{noteProgress}&rdquo;
          </Typography>
        </Box>
      </>
    );
  } else if (note) {
    return note;
  } else {
    return '';
  }
};

export const getLBAWorklog = (worklog) => {
  return worklog
    ?.map(({ status, dateTime, note, noteProgress }) => {
      const statusLabel =
        {
          checking: 'CUSTOMER',
          'customer request': 'CUSTOMER',
          onprogress: 'TELKOMREG-DDEL | CHECKED',
          completed: 'CUSTOMER | COMPLETED',
          rejected: 'REJECTED',
          'rate us': 'CUSTOMER | RATE US',
        }[status] || '';

      return {
        date: dateFormat({ date: dateTime, type: 'date-time-full' }),
        note: generateWorklogNote({ note, noteProgress }),
        status: statusLabel,
      };
    })
    .reverse();
};
