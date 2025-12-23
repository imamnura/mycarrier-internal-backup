import React from 'react';
import { route } from '@configs';
import Typography from '@components/Typography';
import { Box } from '@material-ui/core';
import { dateFormat } from '@utils/parser';

export const breadcrumb = (custAccntNum, serviceId, projectId) => [
  { label: 'Service List', url: route.serviceList('list') },
  {
    label: custAccntNum,
    url: `${route.serviceList('detailCustomer', custAccntNum)}?tab=serviceList`,
  },
  ...(projectId
    ? [
        {
          label: projectId,
          url: route.serviceList('detailProject', custAccntNum, projectId),
        },
      ]
    : []),
  { label: serviceId },
];

export const schemaMTTR = [
  { name: 'billPeriode', label: 'Period' },
  { name: 'mttr', label: 'MTTR' },
];

export const handleStatus = (params) => {
  const type = {
    Active: {
      children: 'Active',
      variant: 'success',
    },
    'On Delivery': {
      children: 'On Delivery',
      variant: 'primary',
    },
    Suspend: {
      children: 'Suspend',
      variant: 'alert',
    },
    Disconnect: {
      children: 'Disconnect',
      variant: 'danger',
    },
    'Request To Open': {
      children: 'Request To Open',
      variant: 'alert',
    },
    REQUEST: {
      children: 'Request To Open',
      variant: 'alert',
    },
    Isolated: {
      children: 'Isolated',
      variant: 'alert',
    },
  };

  const children = type[params] ? type[params].children : '';
  const variant = type[params] ? type[params].variant : '';

  return { children, variant };
};

export const maskServiceStatus = (status) => {
  const maskedStatus = {
    need_validation: 'Need Validation',
    valid: 'Valid',
    qualify: 'Qualify',
    qualified: 'Qualify',
    lead: 'Qualify', // for activity on (activity list)
    delayOpportunity: 'Delay Opportunity',
    opportunity: 'Opportunity',
    checkFeasibility: 'Check Feasibility',
    cancelQuote: 'Cancel Quote',
    dropQuote: 'Drop Quote',
    auto_quote: 'Quote',
    quote: 'Quote',
    delayQuote: 'Delay Quote',
    agreement: 'Agreement',
    order: 'Order',
    provisioning: 'Provisioning',
    dispatchLead: 'Dispatch Lead',
    retired: 'Retired',
    retire: 'Retired',
    invalid: 'Invalid',
  }[status];

  return maskedStatus || 'Status Not Recognized';
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

export const getServiceWorklog = (worklog) => {
  return worklog
    ?.map(({ status, dateTime, note, noteProgress }) => {
      // const statusLabel = {
      //   'REVIEW ORDER': 'REVIEW ORDER',
      //   'VALIDATE': 'VALIDATE',
      //   'DISCONNECTED': 'DISCONNECTED',
      //   'READY TO TEST': 'READY TO TEST',
      //   'ACTIVATION LETTER STARTED': 'ACTIVATION LETTER STARTED',
      // }[status] || '';

      return {
        date: dateFormat({ date: dateTime, type: 'date-time-full' }),
        note: generateWorklogNote({ note, noteProgress }),
        status: status?.toUpperCase(),
      };
    })
    .reverse();
};
