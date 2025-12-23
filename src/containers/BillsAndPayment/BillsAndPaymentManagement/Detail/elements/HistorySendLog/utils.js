export const statusLog = (status) => {
  const statusVariant = {
    progress: {
      children: 'Progress',
      variant: 'warning',
    },
    sent: {
      children: 'Sent',
      variant: 'success',
    },
    send: {
      children: 'Sent',
      variant: 'success',
    },
    failed: {
      children: 'Failed',
      variant: 'danger',
    },
    draft: {
      children: 'Draft',
      variant: 'primary',
    },
    discard: {
      children: 'Discard',
      variant: 'danger',
    },
    approval: {
      children: 'Approval',
      variant: 'alert',
    },
    rejected: {
      children: 'Reject',
      variant: 'danger',
    },
    reject: {
      children: 'Reject',
      variant: 'danger',
    },
  };

  return statusVariant[status] || null;
};
