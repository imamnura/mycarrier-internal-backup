export const getModifyDisconnectStepper = (status) => {
  let active = 0;
  let errors = undefined;

  switch (status) {
    case 'submitted':
    case 'am approval':
    case 'rejected':
    case 'returned':
    case 'customer returned': {
      active = 1;
      break;
    }
    case 'provisioning':
    case 'am returned': {
      active = 2;
      break;
    }
    case 'approved':
    case 'fab returned':
    case 'baso signed': {
      active = 3;
      break;
    }
    case 'completed':
    case 'actived': {
      active = 5;
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
