// Legacy - unused since October 22nd 2023
export default function neucloudStepper({ status }) {
  let active;
  let errors = null;
  let errorsLabel = null;

  switch (status) {
    case 'CHECKING': {
      active = 0;
      break;
    }
    case 'ON PROGRESS': {
      active = 1;
      break;
    }
    case 'CLOSED': {
      active = 2;
      break;
    }
    case 'REPORT REJECTED': {
      active = 1;
      errors = 'rejected';
      errorsLabel = 'Report Rejected';
      break;
    }
  }

  const steps = ['Checking', 'On Progress', 'Closed'];

  return {
    active,
    errors,
    errorsLabel,
    steps,
  };
}
