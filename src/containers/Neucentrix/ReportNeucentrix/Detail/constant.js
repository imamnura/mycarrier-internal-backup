import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import { dateFormat } from '@utils/parser';

export const statusLabel ={
  'Forwarded to WDM': 'Forwarded To WDM',
  'Send to Customer': 'Send To Customer',
  'Creating Report': 'Creating Report',
  'Filled Form': 'WDM Filled Form',
  'Reupload Document': 'Reupload Document',
};

export const statusVariant = {
  'Forwarded To WDM': 'primary',
  'Send To Customer': 'success',
  'Creating Report': 'primary',
  'Filled Form': 'success',
  'Reupload Document': 'success',
};

export const getReportNcxStepper = (status) => {
  let active = 0;
  let errors = undefined;
  switch (status) {
    case 'Creating Report': {
      active = 0;
      break;
    }
    case 'Forwarded to WDM': {
      active = 1;
      break;
    }
    case 'Filled Form': 
    case 'Send to Customer':
    {
      active = 2;
      break;
    }
  }

  if (['rejected', 'returned'].includes(status)) {
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

export const getReportNcxWorklog = (worklog) => {
  return worklog
    ?.map(({ status, dateTime, note, noteProgress }) => {
      const statusLabel =
        {
          'Forwarded to WDM': 'Forwarded To WDM',
          'Send to Customer': 'PARTNER | CREATING REPORT',
          'Creating Report': 'Creating Report',
          'Filled Form': 'WDM | FILLED FORM',
          'Reupload Document': 'PARTNER | REUPLOAD DOCUMENT',
        }[status] || '';

      return {
        date: dateFormat({ date: dateTime, type: 'date-time-full' }),
        note: generateWorklogNote({ note, noteProgress }),
        status: statusLabel,
      };
    })
    .reverse();
};
