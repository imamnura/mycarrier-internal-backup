import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import { dateFormat } from '@utils/parser';

export const statusLabel = {
  'NEED CUST SIGN': 'customer sign',
  'BA COMPLETE': 'baso complete',
  REJECTED: 'baso rejected',
  RETURNED: 'baso returned',
};

export const statusVariant = {
  'baso complete': 'success',
  'customer sign': 'warning',
  'baso rejected': 'danger',
  'baso returned': 'danger',
};

export const schema = [
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'Order Number',
    name: 'orderNumber',
  },
  {
    cellStyle: {
      width: 120,
    },
    label: 'Order Type',
    name: 'orderType',
  },
  {
    cellStyle: {
      width: 120,
    },
    label: 'Customer',
    name: 'custAccntName',
  },
  {
    cellStyle: {
      minWidth: 45,
    },
    label: 'Service/Product ID',
    name: 'sid',
  },
  {
    cellStyle: {
      width: 150,
    },
    label: 'Account Manager',
    name: 'accountManager',
  },
  {
    cellStyle: {
      width: 100,
    },
    label: 'Segment',
    name: 'segment',
  },
  {
    cellStyle: {
      width: 120,
    },
    formatDate: 'date',
    label: 'Received Date',
    name: 'receivedDate',
  },
  {
    cellStyle: {
      width: 120,
    },
    label: 'Product',
    name: 'productName',
  },
  {
    cellStyle: {
      width: 130,
    },
    label: 'Document',
    name: 'document',
  },
  {
    label: 'Status',
    name: 'status',
    schemaStatus: statusVariant,
  },
];

export const getBasoStepper = (status) => {
  let active = 0;
  let errors = undefined;
  switch (status) {
    case 'submitted': {
      active = 0;
      break;
    }
    case 'NEED CUST SIGN': {
      active = 1;
      break;
    }
    case 'BA COMPLETE': {
      active = 3;
      break;
    }
    case 'REJECTED': {
      active = 1;
      break;
    }
    case 'RETURNED': {
      active = 1;
      break;
    }
  }

  if (['REJECTED', 'RETURNED'].includes(status)) {
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

export const getBasoWorklog = (worklog) => {
  return worklog
    ?.map(({ status, dateTime, note, noteProgress }) => {
      const statusLabel =
        {
          'BA COMPLETE': 'CUSTOMER | BA Completed',
          SIGNED: 'CUSTOMER | SIGNED',
          'NEED CUST SIGN': 'RWS | SUBMITTED',
          RETURNED: 'CUSTOMER | RETURNED',
          'AM RETURNED': 'TELKOMREG-AM | RETURNED',
          REJECTED: 'TELKOMREG-AM | REJECTED',
        }[status] || '';

      return {
        date: dateFormat({ date: dateTime, type: 'date-time-full' }),
        note: generateWorklogNote({ note, noteProgress }),
        status: statusLabel,
      };
    })
    .reverse();
};
