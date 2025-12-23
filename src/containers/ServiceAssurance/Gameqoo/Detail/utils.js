import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import { dateFormat } from '@utils/parser';
import { isHaveAccess } from '@utils/common';

export const pickStatus = {
  nonNetwork: {
    Checking: {
      children: 'REPORT CHECKING',
      variant: 'primary',
    },
    Onprogress: {
      children: 'IN PROGESS',
      variant: 'warning',
    },
    Onhold: {
      children: 'ON HOLD',
      variant: 'warning',
    },
    Solved: {
      children: 'SOLVED',
      variant: 'warning',
    },
    Closed: {
      children: 'CLOSED',
      variant: 'success',
    },
    Rejected: {
      children: 'REPORT REJECTED',
      variant: 'danger',
    },
  },
  network: {
    Checking: {
      children: 'REPORT CHECKING',
      variant: 'primary',
    },
    Approved: {
      children: 'REPORT ISSUED',
      variant: 'warning',
    },
    Queued: {
      children: 'FAULT ANALYSIS',
      variant: 'warning',
    },
    Backend: {
      children: 'FAULT HANDLING',
      variant: 'warning',
    },
    Finalchecked: {
      children: 'FAULT COMPLETION',
      variant: 'alert',
    },
    Resolved: {
      children: 'FAULT COMPLETION',
      variant: 'alert',
    },
    Salamsim: {
      children: 'FAULT COMPLETION',
      variant: 'alert',
    },
    Closed: {
      children: 'REPORT COMPLETED',
      variant: 'success',
    },
    Rejected: {
      children: 'REPORT REJECTED',
      variant: 'danger',
    },
  },
};

export const pickUrgency = {
  1: 'Normal',
  2: 'Medium',
  3: 'Hard',
  4: 'Emergency',
};

export const pickHardComplaint = {
  1: 'Ramah',
  2: 'Agak Marah',
  3: 'Marah',
};

export const getGameqooStepper = (status, networkType) => {
  let active;
  let errors = null;
  let errorsLabel = null;

  switch (networkType) {
    case 'nonNetwork':
      switch (status) {
        case 'Checking': {
          active = 0;
          break;
        }
        case 'Onprogress': {
          active = 1;
          break;
        }
        case 'Onhold': {
          active = 2;
          break;
        }
        case 'Solved': {
          active = 3;
          break;
        }
        case 'Closed': {
          active = 5;
          break;
        }
        case 'Rejected': {
          active = 1;
          errors = 'rejected';
          errorsLabel = 'Report Rejected';
          break;
        }
      }
      break;
    default:
      switch (status) {
        case 'Checking': {
          active = 0;
          break;
        }
        case 'Approved': {
          active = 1;
          break;
        }
        case 'Queued': {
          active = 2;
          break;
        }
        case 'Backend': {
          active = 3;
          break;
        }
        case 'Finalchecked': {
          active = 4;
          break;
        }
        case 'Resolved': {
          active = 4;
          break;
        }
        case 'Salamsim': {
          active = 4;
          break;
        }
        case 'Closed': {
          active = 6;
          break;
        }
        case 'Rejected': {
          active = 1;
          errors = 'rejected';
          errorsLabel = 'Report Rejected';
          break;
        }
      }
      break;
  }

  return {
    active,
    errors,
    errorsLabel,
  };
};

export const getGameqooSteps = (networkType) => {
  const defaultSteps = [
    'Report Checking',
    'Report Issued',
    'Fault Analysis',
    'Fault Handling',
    'Report Completion',
    'Report Completed',
  ];

  return (
    {
      nonNetwork: [
        'Report Checking',
        'In Progress',
        'On Hold',
        'Solved',
        'Closed',
      ],
    }[networkType] || defaultSteps
  );
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
              See{' '}
              <Typography
                color="blue-main"
                onClick={onPreviewWorklog(file)}
                style={{ cursor: 'pointer' }}
                variant="caption"
              >
                attachment here.
              </Typography>
            </Typography>
          </Box>
        )}
      </>
    );
  } else if (note) {
    return note;
  } else if (description) {
    return description;
  } else {
    return '';
  }
};

export const getGameqooWorklog = (worklog, onPreviewWorklog, networkType) => {
  return worklog
    ?.map(
      ({
        status,
        dateTime,
        note,
        description,
        noteProgress,
        class: subfix,
        file,
      }) => {
        const subfixText = subfix ? `| ${subfix}` : '';
        const statusLabel =
          {
            network: {
              Checking: `REPORT CHECKING ${subfixText}`,
              Approved: `REPORT ISSUED ${subfixText}`,
              Queued: `FAULT ANALYSIS ${subfixText}`,
              Backend: `FAULT HANDLING ${subfixText}`,
              Finalchecked: `FAULT COMPLETION ${subfixText}`,
              Resolved: `FAULT COMPLETION ${subfixText}`,
              Salamsim: `FAULT COMPLETION ${subfixText}`,
              'Closed Before Rating': `REPORT COMPLETED ${subfixText}`,
              Closed: `REPORT COMPLETED ${subfixText}`,
              Rejected: `REJECTED ${subfixText}`,
            },
            nonNetwork: {
              Checking: `REPORT CHECKING`,
              Onprogress: `IN PROGRESS`,
              Onhold: `ON HOLD`,
              Solved: `SOLVED`,
              Closed: `CLOSED`,
              Rejected: `REJECTED ${subfixText}`,
            },
          }[networkType || 'network'][status] || '';

        return {
          date: dateFormat({ date: dateTime, type: 'date-time-full' }),
          note: generateWorklogNote(
            { note, noteProgress, description, file },
            onPreviewWorklog,
          ),
          status: statusLabel,
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
  const canDetail = isHaveAccess(feature, 'read_detail_ticket_gameqoo');
  const canDetailHistory = isHaveAccess(
    feature,
    'read_detail_history_ticket_gameqoo',
  );
  const canReject = isHaveAccess(feature, 'update_reject_ticket_gameqoo');
  const canValidate = isHaveAccess(feature, 'update_approve_ticket_gameqoo');

  return { canDetail, canDetailHistory, canReject, canValidate };
};
