export const getBroadcastInformationStatus = (status) => {
  if (!status) {
    return undefined;
  }

  let finalStatus = status.toLowerCase().replace('_', ' ');

  // if (status === 'on_schedule') {
  //   finalStatus = 'on schedule';
  // }

  const variant =
    {
      preparation: 'primary',
      'on schedule': 'warning',
      'need approval': 'warning',
      finish: 'success',
      returned: 'danger',
      rejected: 'danger',
    }[finalStatus] || '';

  return {
    children: finalStatus,
    variant: variant,
  };
};
