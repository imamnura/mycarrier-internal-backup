import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import { dateFormat } from '@utils/parser';

export const statusLabel = {
  checking: 'Customer Request',
  'checking order telkom': 'Checking Telkom',
  'checking order provider': 'Checking Provider',
  'input parameter': 'Input Parameter',
  completed: 'Completed',
  returned: 'Returned',
  rejected: 'Rejected',
  suspend: 'Suspend',
};

export const statusVariant = {
  'Customer Request': 'primary',
  'Checking Telkom': 'warning',
  'Checking Provider': 'warning',
  'Input Parameter': 'alert',
  Completed: 'success',
  Returned: 'danger',
  Rejected: 'danger',
  Suspend: 'danger',
};

export const getBulkStepper = (status) => {
  let active = 0;
  let errors = undefined;
  let errorsLabel = undefined;
  switch (status) {
    case 'checking': {
      active = 0;
      break;
    }
    case 'checking order telkom': {
      active = 1;
      break;
    }
    case 'checking order provider':
    case 'returned':
    case 'rejected': {
      active = 2;
      break;
    }
    case 'input parameter': {
      active = 3;
      break;
    }
    case 'completed': {
      active = 4;
      break;
    }
    case 'suspend': {
      active = 5;
      errorsLabel = 'Suspend';
      break;
    }
    default: {
      active = 4;
      break;
    }
  }

  if (['rejected', 'returned', 'suspend'].includes(status)) {
    errors = status.toLowerCase();
  }

  return {
    active,
    errors,
    errorsLabel,
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

export const getBulkkWorklog = (worklog) => {
  return worklog
    ?.map(({ status, dateTime, note, noteProgress }) => {
      const statusLabel =
        {
          checking: 'CUSTOMER',
          'checking order telkom': 'TELKOMREG-DDEL | CHECKED',
          'checking order provider': 'PROVIDER | CHECKING',
          'input parameter': 'TELKOMREG-DDEL | INPUT PARAMETER',
          completed: 'TELKOMREG-DSO | COMPLETED',
          updated: 'TELKOMREG-DDEL | UPDATED',
          returned: 'TELKOMREG-DDEL | RETURN',
          'returned-updated': 'TELKOMREG-DDEL | UPDATED',
          rejected: 'TELKOMREG-DDEL | REJECT',
          suspend: 'TELKOMREG-DDEL | SUSPEND',
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

export const boxMessage = {
  rejected: {
    title: 'Message Rejected',
    variant: 'primary',
  },
};
