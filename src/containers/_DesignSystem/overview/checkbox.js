import Checkbox from '@components/Checkbox';

const checkboxOverview = {
  component: Checkbox,
  variant: [
    {
      name: 'Default',
      props: {},
    },
    {
      name: 'Indeterminate',
      props: {
        indeterminate: true,
      },
    },
  ],
};

export default checkboxOverview;
