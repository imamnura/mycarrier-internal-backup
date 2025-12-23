import React from 'react';
import Typography from '@components/Typography';
import { Box } from '@material-ui/core';
import { dateFormat } from '@utils/parser';

export const statusVariant = {
  'On Progress': 'warning',
  Completed: 'success',
};

export const statusLabel = {
  'On Progress': 'On Progress',
  Completed: 'Completed',
};

export const getNonBulkStepper = (status) => {
  let active = 0;
  let errors = undefined;

  switch (status) {
    case 'On Progress': {
      active = 1;
      break;
    }
    case 'Completed': {
      active = 3;
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

export const getNonBulkWorklog = (worklog) => {
  return worklog
    ?.map(({ status, dateTime, note, noteProgress }) => {
      const statusLabel =
        {
          'On Progress': 'CUSTOMER',
          Edit: 'TELKOMREG-DDEL | EDIT',
          Completed: 'CUSTOMER | COMPLETED',
        }[status] || '';

      return {
        date: dateFormat({ date: dateTime, type: 'date-time-full' }),
        note: generateWorklogNote({ note, noteProgress }),
        status: statusLabel,
      };
    })
    .reverse();
};
