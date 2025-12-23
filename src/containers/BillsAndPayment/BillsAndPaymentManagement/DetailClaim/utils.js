import React from 'react';
import { dateFormat } from '@utils/parser';
import Typography from '@components/Typography';

export const getClaimStatus = (status) => {
  if (!status) {
    return undefined;
  }

  const statusProps =
    {
      submitted: {
        children: 'CHECKING BY CDM',
        variant: 'warning',
      },
      cdm_checked: {
        children: 'CHECKING BY AM',
        variant: 'warning',
      },
      am_checked: {
        children: 'APPROVED',
        variant: 'primary',
      },
      approved: {
        children: 'APPROVED',
        variant: 'primary',
      },
      completed: {
        children: 'COMPLETED',
        variant: 'success',
      },
      temp_completed: {
        children: 'COMPLETED',
        variant: 'success',
      },
      cdm_rejected: {
        children: 'REJECTED',
        variant: 'danger',
      },
      am_rejected: {
        children: 'REJECTED',
        variant: 'danger',
      },
      cdm_returned: {
        children: 'RETURNED',
        variant: 'danger',
      },
      am_returned: {
        children: 'RETURNED',
        variant: 'danger',
      },
    }[status] || '';

  return statusProps;
};

export const getClaimStepper = (status) => {
  let active = 0;
  let errors = undefined;

  switch (status) {
    case 'submitted': {
      active = 1;
      break;
    }
    case 'cdm_checked': {
      active = 2;
      break;
    }
    case 'am_checked': {
      active = 3;
      break;
    }
    case 'approved': {
      active = 3;
      break;
    }
    case 'completed': {
      active = 4;
      break;
    }
    case 'am_returned': {
      active = 2;
      break;
    }
    case 'am_rejected': {
      active = 2;
      break;
    }
    case 'cdm_returned': {
      active = 1;
      break;
    }
    case 'cdm_rejected': {
      active = 1;
      break;
    }
  }

  if (['cdm_returned', 'am_returned'].includes(status)) {
    errors = 'returned';
  }

  if (['cdm_rejected', 'am_rejected'].includes(status)) {
    errors = 'rejected';
  }

  return {
    active,
    errors,
  };
};

export const getClaimWorklog = (worklog) => {
  const labels = {
    submitted: {
      status: 'CUSTOMER | SUBMIT CLAIM',
      description: 'Customer has been submitted claim.',
    },
    cdm_checked: {
      status: 'CDM | CHECKED',
      description: 'Claim has been checked',
    },
    am_checked: {
      status: 'AM | CHECKED',
      description: 'Claim has been checked',
    },
    approved: {
      status: 'AM | APPROVED',
      description: 'Claim has been approved',
    },
    completed: {
      status: 'COMPLETED',
      description: 'Claim has been completed',
    },
    cdm_rejected: {
      status: 'CDM | REJECTED',
      description: 'Claim has been rejected',
    },
    am_rejected: {
      status: 'AM | REJECTED',
      description: 'Claim has been rejected',
    },
    cdm_returned: {
      status: 'CDM | RETURNED',
      description: 'Claim has been returned',
    },
    am_returned: {
      status: 'AM | RETURNED',
      description: 'Claim has been returned',
    },
  };

  return worklog
    ?.map(({ subStatus, dateTime, note }) => ({
      date: dateFormat({ date: dateTime, type: 'date-time-full' }),
      note: (
        <>
          <Typography color="general-mid" variant="caption">
            {labels[subStatus].description}
          </Typography>
          {note && (
            <Typography
              color="general-mid"
              inline
              variant="caption"
            >{`Note: "${note}"`}</Typography>
          )}
        </>
      ),
      status: labels[subStatus].status,
    }))
    .reverse();
};
