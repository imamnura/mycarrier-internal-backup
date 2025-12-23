export const optionStatus = [
  { label: 'All Status', value: '' },
  { label: 'Qualify', value: 'qualified' },
  { label: 'Delay Opportunity', value: 'delayOpportunity' },
  { label: 'Retired', value: 'retired' },
  { label: 'Opportunity', value: 'opportunity' },
  { label: 'Quote', value: 'quote' },
  { label: 'Drop Quote', value: 'dropQuote' },
  { label: 'Agreement', value: 'agreement' },
  { label: 'Order', value: 'order' },
  { label: 'Provisioning', value: 'provisioning' },
];

export const normalizeStatus = (_status) => {
  const status = _status.toLowerCase();

  return {
    valid: 'Valid',
    qualify: 'Qualify',
    delayOpportunity: 'Delay Opportunity',
    opportunity: 'Opportunity',
    quote: 'Quote',
    agreement: 'Agreement',
    order: 'Order',
    provisioning: 'Provisioning',
  }[status];
};
