import Stepper from '@components/Stepper';

const stepperOverview = {
  component: Stepper,
  variant: [
    {
      name: 'Default',
      grid: 6,
      props: {
        steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
        active: 1,
      },
    },
    {
      name: 'Return',
      grid: 6,
      props: {
        steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
        active: 1,
        errors: 'returned',
      },
    },
    {
      name: 'Reject',
      grid: 6,
      props: {
        steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
        active: 2,
        errors: 'rejected',
      },
    },
    {
      name: 'Complete All',
      grid: 6,
      props: {
        steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
        active: 3,
      },
    },
  ],
};

export default stepperOverview;
