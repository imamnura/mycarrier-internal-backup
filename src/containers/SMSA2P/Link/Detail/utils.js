import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import { dateFormat } from '@utils/parser';

export const statusLabel = {
  customerrequest: 'Customer Request',
  approval_am: 'Customer Request',
  checking: 'Checking',
  approval_provider: 'Checking Order',
  customerreview: 'Customer Review',
  rejected: 'Rejected',
  completed: 'Completed',
};

export const statusVariant = {
  'Customer Request': 'primary',
  approval_am: 'primary',
  'Checking Order': 'warning',
  customerreview: 'alert',
  'Customer Review': 'alert',
  Completed: 'success',
  Rejected: 'danger',
};

export const getLinkStepper = (status) => {
  let active = 0;
  let errors = undefined;
  switch (status) {
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
    case 'customerreview': {
      active = 3;
      break;
    }
    case 'completed': {
      active = 5;
      break;
    }
    case 'rejected': {
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
  } else {
    return note || '';
  }
};

export const getLinkWorklog = (worklog) => {
  const filteredWorklog = worklog?.filter(({ dateTime }) => Boolean(dateTime));
  return filteredWorklog
    ?.map(({ activationStatus, dateTime, note, noteProgress }) => {
      const statusLabel =
        {
          customerrequest: 'CUSTOMER',
          approval_am: 'TELKOMREG-AM | CHECKED',
          checking: 'TELKOMREG-AM | CHECKED',
          approval_provider: 'TELKOMREG-DDELIVERY | CHECKED',
          customerreview: 'CUSTOMER | REVIEW',
          rejected: 'TELKOMREG-AM | REJECT',
          completed: 'CUSTOMER | COMPLETED',
        }[activationStatus] || '';

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
