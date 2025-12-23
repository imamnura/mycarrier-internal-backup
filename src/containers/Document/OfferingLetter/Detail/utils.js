import React from 'react';
import { Box } from '@material-ui/core';
import { titleCapitalize } from '@utils/common';
import { dateFormat } from '@utils/parser';
import Typography from '@components/Typography/Typography';

export const getOfferingLetterStatus = (status) => {
  if (!status) {
    return undefined;
  }

  const variant =
    {
      completed: 'success',
      draft: 'primary',
      'signing on progress': 'success',
      'signing failed': 'danger',
    }[status] || '';

  return {
    children: status,
    variant: variant,
  };
};

export const getOfferingLetterStepper = (status) => {
  let active = 0;
  let errors = undefined;
  let errorsLabel = undefined;
  switch (status) {
    case 'draft': {
      active = 0;
      break;
    }
    case 'signing on progress': {
      active = 1;
      break;
    }
    case 'signing failed': {
      active = 1;
      break;
    }
    case 'completed': {
      active = 3;
      break;
    }
  }

  if (['signing failed'].includes(status)) {
    errors = 'rejected';
    errorsLabel = titleCapitalize(status);
  }

  return {
    active,
    errors,
    errorsLabel,
  };
};

export const generateWorklogNote = ({ note, noteProgress }) => {
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

export const getOfferingLetterWorklog = (worklog) => {
  return worklog
    ?.map(({ status, dateTime, note }) => {
      const statusLabel =
        {
          approved: 'TELKOMREG-AM | APPROVED',
          'signing on progress': 'TELKOMREG-AM | SUBMITTED',
          draft: 'DRAFT',
          'signing failed': 'SIGNING PROCCESS FAILED',
        }[status] || '';

      return {
        date: dateFormat({ date: dateTime, type: 'date-time-full' }),
        note: generateWorklogNote({ note, status }),
        status: statusLabel,
      };
    })
    .reverse();
};
