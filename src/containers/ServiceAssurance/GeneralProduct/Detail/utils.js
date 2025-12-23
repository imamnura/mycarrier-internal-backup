import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import { isHaveAccess } from '@utils/common';
import { dateFormat } from '@utils/parser';

export const pickStatus = {
  Rejected: {
    children: 'Rejected',
    variant: 'danger',
  },
  'report checking': {
    children: 'Report Checking',
    variant: 'primary',
  },
  'report issued': {
    children: 'Report Isssued',
    variant: 'warning',
  },
  'fault analysis': {
    children: 'Fault Analysis',
    variant: 'warning',
  },
  'fault handling': {
    children: 'Fault Handling',
    variant: 'warning',
  },
  'fault completion': {
    children: 'Fault Completion',
    variant: 'alert',
  },
  'report completed': {
    children: 'Fault Completed',
    variant: 'success',
  },
  'report rejected': {
    children: 'Rejected',
    variant: 'danger',
  },
};

export const getGPStepper = (status) => {
  let active;
  let errors = null;
  switch (status) {
    case 'report checking': {
      active = 0;
      break;
    }
    case 'report issued': {
      active = 1;
      break;
    }
    case 'fault analysis': {
      active = 2;
      break;
    }
    case 'fault handling': {
      active = 3;
      break;
    }
    case 'fault completion': {
      active = 4;
      break;
    }
    case 'report completed': {
      active = 6;
      break;
    }
    case 'report rejected': {
      active = 1;
      errors = 'rejected';
      break;
    }
    default: {
      active = 0;
      break;
    }
  }

  return {
    active,
    errors,
  };
};

const generateWorklogNote = (
  { note, noteProgress, description, file },
  onPreviewWorklog,
) => {
  if (noteProgress || file?.fileUrl) {
    return (
      <>
        <Typography
          children={note || description}
          color="general-mid"
          variant="caption"
        />
        {noteProgress && (
          <Box display="block">
            <Typography color="general-mid" variant="caption">
              Note: &ldquo;{noteProgress}&rdquo;
            </Typography>
          </Box>
        )}
        {file?.fileUrl && (
          <Box display="block">
            <Typography color="general-mid" variant="caption">
              See&nbsp;
            </Typography>
            <Typography
              color="blue-main"
              onClick={onPreviewWorklog(file)}
              style={{ cursor: 'pointer' }}
              variant="caption"
            >
              attachment here.
            </Typography>
          </Box>
        )}
      </>
    );
  } else {
    return note || description || '';
  }
};

const generateWorklogFile = (file, onPreviewWorklog) => {
  if (file?.fileUrl) {
    return (
      <Box display="block" mt={1}>
        <Typography color="general-mid" variant="body2">
          See&nbsp;
        </Typography>
        <Typography
          color="blue-main"
          onClick={onPreviewWorklog(file)}
          style={{ cursor: 'pointer' }}
          variant="body2"
        >
          attachment here.
        </Typography>
      </Box>
    );
  } else {
    return '';
  }
};

export const getGPWorklog = (historyWorklog, onPreviewWorklog) => {
  return historyWorklog
    ?.map(
      ({
        status,
        dateTime,
        note,
        description,
        noteProgress,
        class: subfix,
        child,
        file,
      }) => {
        const subfixText = subfix ? `| ${subfix}` : '';
        const statusLabel =
          {
            Validasi: `REPORT CHECKING ${subfixText}`,
            Approved: `REPORT ISSUED ${subfixText}`,
            Queued: `FAULT ANALYSIS ${subfixText}`,
            Backend: `FAULT HANDLING ${subfixText}`,
            Finalchecked: `FAULT COMPLETION ${subfixText}`,
            'Closed Before Rating': `REPORT COMPLETED ${subfixText}`,
            Closed: `REPORT COMPLETED ${subfixText}`,
            Rejected: `REJECTED ${subfixText}`,
          }[status] || '';

        return {
          date: dateFormat({ date: dateTime, type: 'date-time-full' }),
          note: generateWorklogNote(
            { note, noteProgress, description, file },
            onPreviewWorklog,
          ),
          status: statusLabel,
          child: child?.map(({ dateTime: date, description, file }) => ({
            activity: description,
            date: dateFormat({ date, type: 'date-time-full' }),
            file: generateWorklogFile(file, onPreviewWorklog),
          })),
        };
      },
    )
    .reverse();
};

export const boxMessage = {
  rejected: {
    title: 'Message Rejected',
    variant: 'primary',
  },
};

export const priviledge = (feature) => {
  const canDetail = isHaveAccess(feature, 'read_detail_ticket_general_product');
  const canDetailHistory = isHaveAccess(
    feature,
    'read_detail_history_ticket_general_product',
  );
  const canReject = isHaveAccess(
    feature,
    'update_reject_ticket_general_product',
  );
  const canValidate = isHaveAccess(
    feature,
    'update_validate_ticket_general_product',
  );

  return { canDetail, canDetailHistory, canReject, canValidate };
};
