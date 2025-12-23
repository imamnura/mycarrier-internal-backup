export const getSettlementStatus = (status) => {
  if (!status) {
    return undefined;
  }

  const label =
    {
      completed: 'COMPLETED',
      am_approved: 'SETTLEMENT COMPLETED',
      customer_approved: 'AM SEND NDE',
      customer_returned: 'RETURNED',
      am_send_mom: 'CUSTOMER APPROVAL',
      cdm_generate_settlement: 'AM SEND MOM',
      reviewer_approval: 'NDE APPROVAL',
      reviewer_approved: 'SETTLEMENT COMPLETED',
      nde_rejected: 'NDE REJECTED',
      nde_returned: 'NDE RETURNED',
      returned: 'RETURNED',
    }[status] || '';

  const variant =
    {
      COMPLETED: 'success',
      'SETTLEMENT COMPLETED': 'alert',
      'AM SEND NDE': 'warning',
      RETURNED: 'danger',
      'CUSTOMER APPROVAL': 'warning',
      'AM SEND MOM': 'warning',
      'NDE APPROVAL': 'warning',
      'NDE REJECTED': 'danger',
      'NDE RETURNED': 'danger',
      'NDE APPROVED': 'primary',
    }[label] || '';

  return {
    children: label,
    variant: variant,
  };
};

export const getSettlementStepper = ({ status, reviewer }) => {
  let active = 0;
  let errors = undefined;
  let errorsLabel = undefined;

  const additionalStatus = reviewer?.length > 0 ? 1 : 0;

  switch (status) {
    case 'cdm_generate_settlement': {
      active = 0;
      break;
    }
    case 'am_send_mom': {
      active = 1;
      break;
    }
    case 'customer_approved': {
      active = 2;
      break;
    }
    case 'reviewer_approval': {
      active = 3;
      break;
    }
    case 'am_approved': {
      active = 3 + additionalStatus;
      break;
    }
    case 'reviewer_approved': {
      active = 3 + additionalStatus;
      break;
    }
    case 'completed': {
      active = 4 + additionalStatus;
      break;
    }
    case 'customer_returned': {
      active = 1;
      break;
    }
    case 'nde_rejected': {
      active = 3;
      break;
    }
    case 'nde_returned': {
      active = 3;
      break;
    }
  }

  if ('customer_returned' === status) {
    errors = 'returned';
    errorsLabel = 'Customer Returned';
  }

  if ('nde_returned' === status) {
    errors = 'returned';
    errorsLabel = 'NDE Returned';
  }

  if (['nde_rejected'].includes(status)) {
    errors = 'rejected';
    errorsLabel = 'NDE Rejected';
  }

  let steps = [
    'AM Sended MOM',
    'Customer Approval',
    'AM Send NDE',
    'Settlement Completed',
    'Completed',
  ];
  if (reviewer?.length > 0) {
    steps = [
      'AM Sended MOM',
      'Customer Approval',
      'AM Send NDE',
      'Reviewer Approval',
      'Settlement Completed',
      'Completed',
    ];
  }

  return {
    active,
    errors,
    errorsLabel,
    steps,
  };
};
