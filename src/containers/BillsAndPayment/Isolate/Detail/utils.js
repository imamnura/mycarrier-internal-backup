export const getIsolateStatus = (status) => {
  if (!status) {
    return undefined;
  }

  const variant =
    {
      'Request Open': 'warning',
      Isolated: 'danger',
    }[status] || '';

  return {
    children: status,
    variant: variant,
  };
};
