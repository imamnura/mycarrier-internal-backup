export const alertLabel = (status) => {
  const labels = {
    Valid:
      'Please contact <strong>WDM</strong> for creating CA Number on Starclick.',
    'Delay Quote':
      'You are already set product to Quote, please wait to get data <strong>Quote Number</strong> and <strong>Line Items.</strong>',
  };

  return labels[status];
};

export const hideAlertHandler = (data) => {
  if (!alertLabel(data?.status)) {
    return true;
  } else if (data?.status === 'Valid') {
    if (
      !data?.companyDetail?.statusCa ||
      !data?.isNetworkConnectivity ||
      ['Need Validation', 'Invalid'].includes(data?.status) ||
      ['sendEmail', 'dispatchMyTens'].includes(data?.validBy)
    ) {
      return true;
    }
  }

  return false;
};
