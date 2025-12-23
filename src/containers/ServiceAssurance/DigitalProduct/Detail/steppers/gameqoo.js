export default function gameqooStepper({ status, networkType }) {
  let active;
  let errors = null;
  let errorsLabel = null;

  switch (status) {
    case 'REPORT CHECKING': {
      active = 0;
      break;
    }
    case 'IN PROGRESS':
    case 'ON PROGRESS': {
      active = 1;
      break;
    }
    case 'ON HOLD': {
      active = 2;
      break;
    }
    case 'SOLVED': {
      active = 3;
      break;
    }
    case 'CLOSED': {
      active = 5;
      break;
    }
    case 'REPORT ISSUED': {
      active = 1;
      break;
    }
    case 'FAULT ANALYSIS': {
      active = 2;
      break;
    }
    case 'FAULT HANDLING': {
      active = 3;
      break;
    }
    case 'FAULT COMPLETION': {
      active = 4;
      break;
    }
    case 'REPORT COMPLETED': {
      active = 5;
      break;
    }
    case 'REPORT REJECTED': {
      active = 1;
      errors = 'rejected';
      errorsLabel = 'Report Rejected';
      break;
    }
  }

  const steps = {
    nonNetwork: [
      'Report Checking',
      'In Progress',
      'On Hold',
      'Solved',
      'Closed',
    ],
    network: [
      'Report Checking',
      'Report Issued',
      'Fault Analysis',
      'Fault Handling',
      'Fault Completion',
      'Report Completed',
    ],
  }[networkType];

  return {
    active,
    errors,
    errorsLabel,
    steps,
  };
}
