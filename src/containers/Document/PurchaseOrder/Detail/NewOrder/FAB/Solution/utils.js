import React from 'react';
import { capitalize } from '@utils/text';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import { dateFormat } from '@utils/parser';

export const additionalInformation = {
  antares: [
    { name: 'antaresPackage.packageName', label: 'Antares IoT Pack' },
    { name: 'antaresPackage.description', label: 'Antares IoT Games' },
    { name: 'antaresPackage.quantity', label: 'Antares IoT Quantity' },
    { name: 'antaresPackage.price', label: 'Antares IoT Price' },
  ],
  gameqoo: [
    { name: 'gameQooPackage.packageName', label: 'GameQoo Pack' },
    { name: 'gameQooPackage.description', label: 'GameQoo Games' },
    { name: 'gameQooPackage.quantity', label: 'GameQoo Quantity' },
    { name: 'gameQooPackage.price', label: 'GameQoo Price' },
  ],
};

export const getSolutionsStepper = (status) => {
  let active = 0;
  let errors = undefined;
  let errorsLabel = undefined;

  switch (status) {
    case 'draft':
    case 'am approval':
    case 'am returned':
    case 'returned': {
      active = 1;
      break;
    }
    case 'segment approval':
    case 'segment returned': {
      active = 2;
      break;
    }
    case 'delivery approval': {
      active = 3;
      break;
    }
    case 'provisioning': {
      active = 4;
      break;
    }
    case 'baso signed': {
      active = 5;
      break;
    }
    case 'completed': {
      active = 6;
      break;
    }
  }

  if (status?.includes('rejected')) {
    errors = 'rejected';
    errorsLabel = capitalize(status.toLowerCase());
  }

  if (status?.includes('returned')) {
    errors = 'returned';
  }

  return {
    active,
    errors,
    errorsLabel,
  };
};

export const schemaTable = [
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'ITEM',
    name: 'packageName',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'PAYMENT TYPE',
    name: 'paymentType',
  },
  {
    cellStyle: {
      minWidth: 300,
    },
    label: 'DESCRIPTION',
    name: 'description',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'QUANTITY',
    name: 'quantity',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'PRICE/ITEM',
    name: 'price',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'DISCOUNT',
    name: 'discount',
  },
  {
    cellStyle: {
      minWidth: 120,
    },
    label: 'SUB TOTAL',
    name: 'subTotal',
    currency: true,
  },
];

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

export const getPurchaseOrderWorklog = (worklog, productName = '') => {
  return worklog
    ?.map(({ status, dateTime, note, noteProgress }) => {
      const statusLabel =
        {
          checking: 'TELKOMREG-AM  | CHECKING',
          submitted: 'CUSTOMER | SUBMITTED',
          'am approval': 'TELKOMREG-AM  | APPROVED',
          'am checking': 'TELKOMREG-AM  | CHECKING',
          'am returned': 'TELKOMREG-AM | RETURNED',
          'segment approval': 'TELKOMREG-AM-GM-SEGMENT | APPROVED',
          'segment returned': 'TELKOMREG-AM-GM-SEGMENT | RETURNED',
          'baso signed': 'BASO SIGNED | DELIVERY UPLOAD BASO',
          'baso completed': 'BASO SIGNED | BASO COMPLETED',
          'delivery approval': 'TELKOMREG-DELIVERY | APPROVED',
          'FAB checked': `PROVISIONING | FAB CHECKED ${productName?.toUpperCase()}`,
          'FAB installed': 'PROVISIONING | FAB INSTALLATION GAMEQOO',
          'FAB completed': `PROVISIONING | FAB COMPLETED ${productName?.toUpperCase()}`,
          completed: 'BASO SIGNED | CUSTOMER UPLOAD ACTIVATION LETTER',
        }[status] || '';

      return {
        date: dateFormat({ date: dateTime, type: 'date-time-full' }),
        note: generateWorklogNote({ note, noteProgress }),
        status: statusLabel,
      };
    })
    .reverse();
};
