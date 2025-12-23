import { capitalize } from '@utils/text';

export const getTrialStepper = (status) => {
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
    case 'completed':
    case 'approved':
    case 'wds approved': {
      active = 4;
      break;
    }
  }

  if (['rejected', 'not visit'].includes(status)) {
    errors = 'rejected';
    errorsLabel = capitalize(status.toLowerCase());
  }

  if (['am returned', 'customer returned'].includes(status)) {
    errors = 'returned';
  }

  return {
    active,
    errors,
    errorsLabel,
  };
};
