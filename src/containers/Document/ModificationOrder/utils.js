import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import { dateFormat } from '@utils/parser';

export const statusLabel = {
  'Downgrade Complete': 'Downgrade Complete',
  Rejected: 'Rejected',
  'BASO Sign': 'BASO Sign',
  Returned: 'Returned',
  'Service Upgrading': 'Service Upgrading',
  'Upgrade Request': 'Upgrade Request',
  'Review Bakes': 'Review BAKES',
  'Upgrade Complete': 'Upgrade Complete',
};

export const statusVariant = {
  Rejected: 'danger',
  Returned: 'danger',
  'BASO Sign': 'warning',
  'Downgrade Complete': 'success',
  'Review BAKES': 'warning',
  'Service Upgrading': 'warning',
  'Upgrade Request': 'primary',
  'Upgrade Complete': 'alert',
};

export const schema = [
  {
    cellStyle: {
      minWidth: 180,
      width: 180,
    },
    label: 'Order ID',
    name: 'orderId',
  },
  {
    cellStyle: {
      minWidth: 180,
    },
    label: 'Customer',
    name: 'customerName',
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
      minWidth: 45,
    },
    label: 'Service/Product Name',
    name: 'productOrServiceName',
  },
  {
    cellStyle: {
      minWidth: 45,
    },
    formatDate: 'date-time',
    label: 'Modify Date',
    name: 'modifyDate',
  },
  {
    cellStyle: {
      minWidth: 90,
    },
    label: 'Bakes Number',
    name: 'bakesNumber',
  },
  {
    cellStyle: {
      minWidth: 90,
    },
    label: 'Document',
    name: 'documents',
  },
  {
    cellStyle: {
      minWidth: 45,
    },
    label: 'Duration Left',
    name: 'duration',
  },
  {
    label: 'Status',
    name: 'status',
    schemaStatus: statusVariant,
  },
];

export const getModificationOrderStepper = (status) => {
  let active = 0;
  let errors = undefined;
  switch (status) {
    case 'Review Bakes':
    case 'Rejected':
    case 'Returned': {
      active = 1;
      break;
    }
    case 'Service Upgrading': {
      active = 2;
      break;
    }
    case 'BASO Sign': {
      active = 3;
      break;
    }
    case 'Upgrade Complete': {
      active = 4;
      break;
    }
    case 'Downgrade Complete': {
      active = 6;
      break;
    }
  }

  if (['Rejected', 'Returned'].includes(status)) {
    errors = status.toLowerCase();
  }

  return {
    active,
    errors,
  };
};

const generateWorklogNote = ({ caption, noteProgress }) => {
  if (noteProgress) {
    return (
      <>
        <Typography children={caption} color="general-mid" variant="caption" />
        <Box display="block">
          <Typography color="general-mid" variant="caption">
            Note: &ldquo;{noteProgress}&rdquo;
          </Typography>
        </Box>
      </>
    );
  } else if (caption) {
    return caption;
  } else {
    return '';
  }
};

export const getModificationOrderWorklog = (worklog) => {
  return worklog
    ?.map(({ title, date, caption, noteProgress }) => {
      const statusLabel = title || '';

      return {
        date: dateFormat({ date: date, type: 'date-time-full' }),
        note: generateWorklogNote({ caption, noteProgress }),
        status: statusLabel,
      };
    })
    .reverse();
};

export const boxMessage = {
  'Returned To Customer': {
    title: 'RETURNED TO CUSTOMER',
    variant: 'primary',
  },
  Rejected: {
    title: 'REJECTED',
    variant: 'primary',
  },
  'BASO REJECTED': {
    title: 'RETURNED TO CUSTOMER',
    variant: 'primary',
  },
};
