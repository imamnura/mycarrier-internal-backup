export const getNeucloudStepper = (status) => {
  let active = 0;
  let errors = undefined;
  let errorsLabel = undefined;

  switch (status) {
    case 'am approval':
    case 'am returned': {
      active = 1;
      break;
    }
    case 'delivery approval': {
      active = 2;
      break;
    }
    case 'provisioning': {
      active = 3;
      break;
    }
    case 'baso signed': {
      active = 4;
      break;
    }
    case 'completed': {
      active = 5;
      break;
    }
  }

  if (status?.includes('returned')) {
    errors = 'returned';
  }

  return {
    active,
    errors,
    errorsLabel,
  };
};
