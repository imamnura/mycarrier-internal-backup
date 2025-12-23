import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import { dateFormat } from '@utils/parser';

export const statusLabel = {
  checking: 'Customer Request',
  onprogress: 'Checking Order',
  completed: 'Completed',
  rejected: 'Rejected',
};

export const statusVariant = {
  'Customer Request': 'primary',
  'Checking Order': 'warning',
  Completed: 'success',
  Rejected: 'danger',
};

export const getKeywordStepper = (status) => {
  let active = 0;
  let errors = undefined;
  switch (status) {
    case 'checking': {
      active = 0;
      break;
    }
    case 'onprogress':
    case 'rejected': {
      active = 1;
      break;
    }
    case 'completed': {
      active = 2;
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

export const getKeywordWorklog = (worklog) => {
  return worklog
    ?.map(({ status, dateTime, note, noteProgress }) => {
      const statusLabel =
        {
          checking: 'CUSTOMER',
          onprogress: 'TELKOMREG-DDEL | CHECKED',
          completed: 'CUSTOMER | COMPLETED',
          rejected: 'TELKOMREG-DDEL | REJECT',
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
