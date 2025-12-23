import LeadManagementSystemContext from '@context/LeadManagementSystem';
import { Box } from '@material-ui/core';
import { dateFormat } from '@utils/parser';
import React, { useContext } from 'react';
import NoData from '@assets/ilustration-v2/NoData';
import Time from '@assets/ilustration-v2/Time';

const generateWorklogNote = ({
  status,
  reason,
  note,
  validBy,
  isNetworkConnectivity,
}) => {
  if (status === 'Waiting') {
    return 'Interested about product';
  } else if (status === 'Need_Validation') {
    return 'Marketing need to validate Lead';
  } else if (
    status === 'Valid' &&
    validBy === 'amMapping' &&
    !isNetworkConnectivity
  ) {
    return 'Assigning to Account Manager & Lead has been created on MyCarrier';
  } else if (
    status === 'Valid' &&
    validBy === 'other' &&
    !isNetworkConnectivity
  ) {
    return 'Assigning to Other Recipient & Lead has been created on MyCarrier';
  } else if (
    status === 'Valid' &&
    validBy === 'amMapping' &&
    isNetworkConnectivity
  ) {
    return 'Assigning to Account Manager & Lead has been created on Starclick';
  } else if (
    status === 'Valid' &&
    validBy === 'other' &&
    isNetworkConnectivity
  ) {
    return 'Assigning to Other Recipient & Lead has been created on Starclick';
    // } else if (status === 'Valid' && validBy === 'amMapping') {
    //   return 'Assigning to Acount Manager';
    // } else if (status === 'Valid' && validBy === 'other') {
    //   return 'Assigning to Other Recipient';
  } else if (status === 'Qualify') {
    return 'Lead has been created on Starclick';
  } else if (status === 'qualified') {
    return 'Lead has been created';
  } else if (status === 'dispatchLead') {
    return 'Account Manager has been created Customer Lead & status has been dispatched';
    // } else if (status === 'Convert') {
    //   return 'Lead has been converted on Starclick';
  } else if (status === 'Delayed_Convert') {
    return 'Lead has been delayed contract on Starclick, please wait a moment, \
    this status would be automatically converted';
  } else if (status === 'Create_Opportunity') {
    return 'Lead has been created opportunity on NCX';
  } else if (status === 'opportunity') {
    return 'Lead has been created';
  } else if (status === 'Auto_Quote') {
    return 'Lead get Quotation Document, generated on NCX';
  } else if (status === 'auto_quote') {
    return 'Lead get Quotation Document';
  } else if (status === 'Quote') {
    return 'Product has been auto quote';
  } else if (status === 'Delayed_Quote') {
    return 'Product has been auto quote, please wait to get Quote status';
  } else if (status === 'agreement') {
    return 'Sales Manager has been upload Child Agreement and set to Agreement';
  } else if (status === 'order') {
    return 'Account Manager has been picked child agreement document and set lead status to Order';
  } else if (status === 'Retire') {
    // return 'Lead has been retired on Starclick';
    return (
      <>
        Lead has been retired on Starclick
        {!!note && <Box display="block">Note: &ldquo;{note}&rdquo;</Box>}
      </>
    );
  } else if (status === 'retired') {
    return 'Lead has been retired';
  } else if (status === 'Drop_Quote') {
    return 'Lead get drop quote, updated on NCX';
  } else if (status === 'drop_quote') {
    return 'Lead get drop quote';
  } else if (status === 'Invalid') {
    return (
      <>
        Marketing has been followed up lead and set to invalid
        {(!!note || !!reason) && (
          <Box display="block">Note: &ldquo;{note || reason}&rdquo;</Box>
        )}
      </>
    );
  } else {
    return '';
  }
};

export const getDashboardWorklog = (
  worklog,
  validBy,
  isNetworkConnectivity,
) => {
  return worklog
    ?.map(({ status, timestamp, note, reason }) => {
      const statusLabel =
        {
          Waiting: 'CUSTOMER',
          need_validation: 'TELKOM-DWS-MARKETING | NEED VALIDATION',
          Need_Validation: 'TELKOM-DWS-MARKETING | NEED VALIDATION',
          Valid: 'TELKOM-DWS-MARKETING | VALID',
          valid: 'TELKOM-DWS-MARKETING | VALID',
          Qualify: 'STARCLICK | QUALIFY',
          qualified: 'TELKOMDWS-MARKETING | QUALIFY',
          dispatchLead: 'TELKOM-DWS-ACCOUNT MANAGER | DISPATCH LEAD',
          // Convert: 'STARCLICK | CONVERT',
          Delayed_Convert: 'STARCLICK | DELAY OPPORTUNITY',
          Create_Opportunity: 'NCX | CREATE OPPORTUNITY',
          opportunity: 'TELKOMDWS-MARKETING | CREATE OPPORTUNITY',
          Auto_Quote: 'NCX | AUTO QUOTE',
          auto_quote: 'TELKOMDWS-MARKETING | AUTO QUOTE',
          Invalid: 'TELKOMDWS-MARKETING | INVALID',
          invalid: 'TELKOMDWS-MARKETING | INVALID',
          Retire: 'STARCLICK | RETIRE',
          retired: 'TELKOMDWS-MARKETING | RETIRE',
          Failed_Convert: 'STARCLICK | RETIRE',
          Drop_Quote: 'NCX | DROP QUOTE',
          drop_quote: 'TELKOMDWS-MARKETING | DROP QUOTE',
          Quote: 'TELKOMDWS-ACCOUNT MANAGER | QUOTE',
          Delayed_Quote: 'TELKOMDWS-ACCOUNT MANAGER | DELAY QUOTE',
          Agreement: 'TELKOM-DWS-SALES MANAGER | AGREEMENT',
          Order: 'TELKOM-DWS-ACCOUNT MANAGER | ORDER',
        }[status] || '';

      return {
        date: dateFormat({ date: timestamp, type: 'date-time-full' }),
        note: generateWorklogNote({
          reason,
          note,
          status,
          validBy,
          isNetworkConnectivity,
        }),
        status: statusLabel,
      };
    })
    .reverse()
    .filter(({ status }) => !!status);
};

export const tableTTRHeader = [
  {
    cellStyle: {
      minWidth: 240,
    },
    label: 'STATUS',
    name: 'status',
  },
  {
    label: 'TTR (decimal)',
    name: 'decimal',
  },
  {
    label: 'TTR (date)',
    name: 'date',
  },
];

const pickValidate = (stage) => {
  let positive = [];
  let negative = [];
  switch (stage) {
    case 'Qualify':
      positive = ['Need Validation'];
      negative = ['Invalid'];
      break;
    case 'Opportunity':
      positive = ['Need Validation', 'Valid', 'Qualify', 'Delay Opportunity'];
      negative = ['Invalid', 'Retired'];
      break;
    case 'Quote':
      positive = [
        'Need Validation',
        'Valid',
        'Qualify',
        'Delay Opportunity',
        'Opportunity',
        'Delay Quote',
      ];
      negative = ['Invalid', 'Retired'];
      break;
    case 'Agreement':
      positive = [
        'Need Validation',
        'Valid',
        'Qualify',
        'Delay Opportunity',
        'Opportunity',
        'Quote',
        'Delay Quote',
      ];
      negative = ['Invalid', 'Retired', 'Drop Quote'];
      break;
    case 'Order':
      positive = [
        'Need Validation',
        'Valid',
        'Qualify',
        'Delay Opportunity',
        'Opportunity',
        'Quote',
        'Delay Quote',
        'Agreement',
      ];
      negative = ['Invalid', 'Retired', 'Drop Quote'];
      break;
    case 'Provisioning':
      positive = [
        'Need Validation',
        'Valid',
        'Qualify',
        'Delay Opportunity',
        'Opportunity',
        'Quote',
        'Delay Quote',
        'Agreement',
        'Order',
      ];
      negative = ['Invalid', 'Retired', 'Drop Quote'];
      break;
  }
  return { positive, negative };
};

export const noDataStageInformation = (status, stage, retireOnOpportunity) => {
  let res = null;
  let validate = pickValidate(stage);
  if (retireOnOpportunity) validate.negative = ['Invalid'];
  if (validate.positive.includes(status)) {
    res = {
      message: `The status of this lead just on ${status}`,
      ilustration: Time,
      description: 'The data will appear if this lead on next status',
    };
  } else if (validate.negative.includes(status)) {
    res = {
      message: `This lead set to ${status}`,
      ilustration: NoData,
      description: `The data will not appear because the status was ${status}`,
    };
  }
  return res;
};

export const useDetailData = () => {
  return useContext(LeadManagementSystemContext);
};
