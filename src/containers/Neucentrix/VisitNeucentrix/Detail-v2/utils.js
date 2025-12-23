import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import { dateFormat } from '@utils/parser';
import { isHaveAccess } from '@utils/common';
import { capitalize } from '@utils/text';
import { titleCapitalize } from '@utils/common';

export const pickStatus = {
  rejected: {
    children: 'Rejected',
    variant: 'danger',
  },
  'not visit': {
    children: 'Not Visit',
    variant: 'danger',
  },
  checking: {
    children: 'Checking',
    variant: 'warning',
  },
  approved: {
    children: 'Approved',
    variant: 'primary',
  },
  visiting: {
    children: 'Visiting',
    variant: 'primary',
  },
  completed: {
    children: 'Visit Completed',
    variant: 'success',
  },
};

export const getVisitNCXStepper = (status) => {
  let active = 0;
  let errors = undefined;
  let errorsLabel = undefined;

  switch (status) {
    case 'checking': {
      active = 0;
      break;
    }
    case 'approved': {
      active = 1;
      break;
    }
    case 'not visit': {
      active = 2;
      break;
    }
    case 'visiting': {
      active = 2;
      break;
    }
    case 'completed': {
      active = 4;
      break;
    }
    case 'rejected': {
      active = 1;
      break;
    }
  }

  if (['rejected', 'not visit'].includes(status)) {
    errors = 'rejected';
    errorsLabel = capitalize(status.toLowerCase());
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

export const getVisitNCXWorklog = (worklog) => {
  return worklog
    ?.map(({ status, dateTime, note, noteProgress }) => {
      const statusLabel =
        {
          'area approved': 'HEAD OPERATIONAL OF SIGMA | APPROVED',
          'assign to am': 'TELKOM MARKETING | ASSIGN TO AM',
          'am forwarded': 'TELKOM AM | FORWARDED',
          'am rejected': 'TELKOM AM | REJECTED',
          checking: 'CUSTOMER | SUBMIT VISIT',
          completed: 'CUSTOMER | VISIT COMPLETED',
          forwarded: 'TELKOM AM | FORWARDED',
          'marketing rejected': 'TELKOM MARKETING | REJECTED',
          'network approved': 'NETWORK AREA & IS OPERATION WITEL | APPROVED',
          'network rejected': 'NETWORK AREA & IS OPERATION WITEL | REJECTED',
          'not visit': 'CUSTOMER | NOT VISIT',
          'sigma approved': 'SIGMA | APPROVED',
          'sigma rejected': 'SIGMA | REJECTED',
          'occ forwarded': 'TELKOM OCC | FORWARDED',
          'occ rejected': 'TELKOM OCC | REJECTED',
          qrcode: 'SYSTEM | QR CODE',
          'witel approved': 'LOGISTIC & GENERAL SUPPORT WITEL | APPROVED',
          'witel rejected': 'LOGISTIC & GENERAL SUPPORT WITEL | REJECTED',
          'gs witel approved': 'LOGISTIC & GENERAL SUPPORT WITEL | APPROVED',
          'gs witel rejected': 'LOGISTIC & GENERAL SUPPORT WITEL | REJECTED',
        }[status?.toLowerCase()] || '';

      return {
        date: dateFormat({ date: dateTime, type: 'date-time-full' }),
        note: generateWorklogNote({ note, noteProgress }),
        status: statusLabel,
      };
    })
    .reverse();
};

export const schemaActivityHistory = [
  { name: 'date', label: 'DATE' },
  { name: 'name', label: 'NAME' },
  { name: 'activity', label: 'ACTIVITY' },
];

export const boxMessage = {
  rejected: {
    title: 'Message Rejected',
    variant: 'primary',
  },
};

export const privilege = (feature) => {
  const canApproveOcc = isHaveAccess(feature, 'update_forward_by_occ_visiting');
  const canApproveAm = isHaveAccess(
    feature,
    'update_forward_to_sigma_witel_arnet_visiting_neucentrix',
  );
  const canApproveMarketing = isHaveAccess(
    feature,
    'update_assign_to_am_visiting_neucentrix',
  );
  const canRejectOcc = isHaveAccess(feature, 'update_reject_by_occ_visiting');
  const canRejectAm = isHaveAccess(
    feature,
    'update_reject_visiting_neucentrix_am',
  );
  const canRejectMarketing = isHaveAccess(
    feature,
    'update_reject_visiting_neucentrix_marketing',
  );

  return {
    canApproveAm,
    canApproveMarketing,
    canApproveOcc,
    canRejectAm,
    canRejectOcc,
    canRejectMarketing,
  };
};

export const pickAlertCopywriting = (data) => {
  const needApproval = data.map((item, index) => {
    const andCondition = data.length > 1 && index === data.length - 1;
    const commaCondition =
      index !== data.length - 1 && data.length !== 2 && data.length > 1;
    return (
      <Typography color="yellow-main" key={index} variant="subtitle1">
        {' '}
        {andCondition ? ' dan ' : ''}{' '}
        <Typography variant="subtitle1" weight="bold">
          {titleCapitalize(item)}
        </Typography>
        {commaCondition ? ', ' : ''}
      </Typography>
    );
  });
  return (
    <Typography color="yellow-main" variant="subtitle1">
      You are already forwarded visit request to {needApproval}. Please contact
      {data.length > 1 ? ` them ` : needApproval} and wait approval from them
      then QR Code will generated automatically.
    </Typography>
  );
};
