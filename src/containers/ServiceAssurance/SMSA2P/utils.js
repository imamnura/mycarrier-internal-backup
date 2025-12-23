export const maskSmsa2pStatus = (status) => {
  const schema = {
    checking: 'Ticket Analyze',
    onprogress: 'Technical Handling',
    customerreview: 'Customer Review',
    completed: 'Closed',
    rejected: 'Rejected',
  };

  return schema[status] || status;
};

export const schemaDigitalProductStatus = {
  CHECKING: 'primary',
  'REPORT CHECKING': 'primary',
  'ON PROGRESS': 'warning',
  'IN PROGRESS': 'warning',
  'ON HOLD': 'warning',
  SOLVED: 'warning',
  'REPORT ISSUED': 'warning',
  'FAULT ANALYSIS': 'warning',
  'FAULT HANDLING': 'warning',
  'FAULT COMPLETION': 'warning',
  'REPORT COMPLETED': 'success',
  CLOSED: 'success',
  'REPORT REJECTED': 'danger',
  'STATUS NOT RECOGNIZED': 'tag',
};

export const smsa2pStatus = (status) => {
  const schema = {
    checking: 'primary',
    onprogress: 'warning',
    customerreview: 'alert',
    completed: 'success',
    rejected: 'danger',
  };

  return {
    children: maskSmsa2pStatus(status),
    variant: schema[status],
  };
};
