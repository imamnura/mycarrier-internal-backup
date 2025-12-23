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

export const getBasoStepper = (status) => {
  let active = 0;
  let errors = undefined;
  switch (status) {
    case 'submitted': {
      active = 0;
      break;
    }
    case 'customerrequest': {
      active = 1;
      break;
    }
    case 'approval_am': {
      active = 1;
      break;
    }
    case 'approval_provider': {
      active = 2;
      break;
    }
    case 'BA customerreview': {
      active = 3;
      break;
    }
    case 'completed': {
      active = 5;
      break;
    }
    case 'rejected': {
      active = 6;
      break;
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
