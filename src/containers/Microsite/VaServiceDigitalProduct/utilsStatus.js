export const maskDigitalProductStatus = (status) => {
  const schema = {
    CHECKING: 'CHECKING',
    'REPORT CHECKING': 'REPORT CHECKING',
    'ON PROGRESS': 'ON PROGRESS',
    'IN PROGRESS': 'IN PROGRESS',
    'ON HOLD': 'ON HOLD',
    OnHold: 'ON HOLD',
    ONHOLD: 'ON HOLD',
    SOLVED: 'SOLVED',
    'REPORT ISSUED': 'REPORT ISSUED',
    'FAULT ANALYSIS': 'FAULT ANALYSIS',
    'FAULT HANDLING': 'FAULT HANDLING',
    'FAULT COMPLETION': 'FAULT COMPLETION',
    'REPORT COMPLETED': 'REPORT COMPLETED',
    CLOSED: 'CLOSED',
    'REPORT REJECTED': 'REPORT REJECTED',
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

export const digitalProductStatus = (status) => {
  const schema = {
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

  return {
    children: status,
    variant: schema[status],
  };
};

export const updateStatusSchema = (label) => {
  const schema = {
    OnHold: 'warning',
    Solved: 'warning',
    Closed: 'success',
  };

  const name = {
    OnHold: 'ON HOLD',
    Solved: 'SOLVED',
    Closed: 'CLOSED',
  };

  return {
    children: name[label],
    variant: schema[label],
  };
};
