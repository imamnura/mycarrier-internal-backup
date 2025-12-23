export const getGeneralNewInstallStepper = (status) => {
  let active = 0;
  let errors = undefined;

  switch (status) {
    case 'submitted':
    case 'am approval':
    case 'rejected':
    case 'returned': {
      active = 1;
      break;
    }
    case 'approved': {
      active = 3;
      break;
    }
  }

  if (status?.includes('returned')) {
    errors = 'returned';
  } else if (status?.includes('rejected')) {
    errors = 'rejected';
  }

  return { active, errors };
};
