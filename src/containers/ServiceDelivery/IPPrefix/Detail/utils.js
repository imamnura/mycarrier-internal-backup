import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import { dateFormat } from '@utils/parser';

export const getIpPrefixStepper = (status) => {
  let active = 0;
  let errors = undefined;
  let errorsLabel = undefined;

  switch (status) {
    case 'checking':
    case 'eos approval':
    case 'returned':
    case 'delivery returned': {
      active = 1;
      break;
    }
    case 'on progress':
    case 'delivery approval':
    case 'triims returned': {
      active = 2;
      break;
    }
    case 'completed': {
      active = 3;
      break;
    }
  }

  if (['returned', 'triims returned'].includes(status)) {
    errors = 'returned';
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

export const getIpPrefixWorklog = (worklog) => {
  return worklog
    ?.map(({ status, dateTime, note, noteProgress }) => {
      const statusLabel =
        {
          submitted: 'CUSTOMER | SUBMITTED',
          checking: 'TELKOMREG-EOS | CHECKING',
          'eos returned': 'TELKOMREG-EOS | RETURNED',
          'delivery returned': 'TELKOMREG-EOS | RETURNED',
          'delivery approval': 'TRIIMS | ON PROGRESS',
          'triims on progress': 'TRIIMS | ON PROGRESS',
          'triims returned': 'TRIIMS | RETURNED',
          completed: 'TRIIMS | COMPLETED',
        }[status] || '';

      return {
        date: dateFormat({ date: dateTime, type: 'date-time-full' }),
        status: statusLabel,
        note: generateWorklogNote({ note, noteProgress }),
      };
    })
    .reverse();
};

export const statusLabel = {
  checking: 'eos approval',
  'eos approval': 'eos approval',
  'delivery approval': 'on progress',
  'on progress': 'on progress',
  'delivery returned': 'returned',
  'eos returned': 'returned',
  returned: 'returned',
  'triims returned': 'returned',
  completed: 'completed',
};

export const statusVariant = {
  'eos approval': 'primary',
  returned: 'danger',
  'eos returned': 'danger',
  'triims returned': 'danger',
  'on progress': 'warning',
  completed: 'success',
};
