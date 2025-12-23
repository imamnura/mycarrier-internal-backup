export const getInvoiceStatus = (status) => {
  if (!status) {
    return undefined;
  }

  const label =
    {
      INPROGRESS: 'IN PROGRESS',
      INITIAL: 'REQUESTED',
      FINISH: 'COMPLETED',
    }[status] || 'COMPLETED';

  const variant =
    {
      REQUESTED: 'primary',
      'IN PROGRESS': 'warning',
      COMPLETED: 'success',
    }[label] || '';

  return {
    children: label,
    variant: variant,
  };
};

export const mappingTitleDocument = {
  invoiceDocument: 'Invoice',
  taxInvoice: 'Tax Invoice',
};
