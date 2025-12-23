export const maskLeadStatus = (status) => {
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

export const schemaLeadStatus = {
  'Need Validation': 'warning',
  Valid: 'success',
  Qualify: 'primary',
  'Delay Opportunity': 'warning',
  Opportunity: 'primary',
  'Check Feasibility': 'warning',
  'Cancel Quote': 'danger',
  'Delay Quote': 'warning',
  Quote: 'alert',
  Agreement: 'primary',
  Order: 'alert',
  Provisioning: 'success',
  'Dispatch Lead': 'success',
  'Drop Quote': 'danger',
  Retired: 'danger',
  Invalid: 'danger',
};

export const maskOrderHeaderStatus = (status) => {
  const maskedStatus = {
    Submitted: 'submitted',
  }[status];

  return maskedStatus || 'Status Not Recognized';
};

export const schemaOrderHeader = {
  submitted: 'success',
};
