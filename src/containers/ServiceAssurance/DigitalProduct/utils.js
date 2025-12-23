export const maskDigitalProductStatus = (status) => {
  const schema = {
    CHECKING: 'CHECKING',
    CLOSED: 'CLOSED',
    'FAULT ANALYSIS': 'FAULT ANALYSIS',
    'FAULT COMPLETION': 'FAULT COMPLETION',
    'FAULT HANDLING': 'FAULT HANDLING',
    'IN PROGRESS': 'IN PROGRESS',
    'ON HOLD': 'ON HOLD',
    'ON PROGRESS': 'ON PROGRESS',
    OnHold: 'ON HOLD',
    ONHOLD: 'ON HOLD',
    'REPORT CHECKING': 'REPORT CHECKING',
    'REPORT COMPLETED': 'REPORT COMPLETED',
    'REPORT ISSUED': 'REPORT ISSUED',
    'REPORT REJECTED': 'REPORT REJECTED',
    RETURNED: 'RETURNED',
    SOLVED: 'SOLVED',
  };

  return schema[status] || status;
};

export const schemaDigitalProductStatus = {
  CHECKING: 'primary',
  CLOSED: 'success',
  'FAULT ANALYSIS': 'warning',
  'FAULT COMPLETION': 'warning',
  'FAULT HANDLING': 'warning',
  'IN PROGRESS': 'warning',
  'ON HOLD': 'warning',
  'ON PROGRESS': 'warning',
  'REPORT CHECKING': 'primary',
  'REPORT COMPLETED': 'success',
  'REPORT ISSUED': 'warning',
  'REPORT REJECTED': 'danger',
  SOLVED: 'warning',
  'STATUS NOT RECOGNIZED': 'tag',
  RETURNED: 'warning',
};

export const digitalProductStatus = (status) => {
  const schema = {
    CHECKING: 'primary',
    CLOSED: 'success',
    'FAULT ANALYSIS': 'warning',
    'FAULT COMPLETION': 'warning',
    'FAULT HANDLING': 'warning',
    'IN PROGRESS': 'warning',
    'ON HOLD': 'warning',
    'ON PROGRESS': 'warning',
    'REPORT CHECKING': 'primary',
    'REPORT COMPLETED': 'success',
    'REPORT ISSUED': 'warning',
    'REPORT REJECTED': 'danger',
    'REPORT RETURNED': 'danger',
    // RETURNED: 'danger',
    SOLVED: 'warning',
    'STATUS NOT RECOGNIZED': 'tag',
    RETURNED: 'warning',
  };

  return {
    children: status,
    variant: schema[status],
  };
};
