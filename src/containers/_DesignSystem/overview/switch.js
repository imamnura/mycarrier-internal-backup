import Switch from '@components/Switch';

const switchOverview = {
  component: Switch,
  variant: [
    {
      name: 'Unchecked',
      props: {
        onChange: () => {},
        value: false,
      },
    },
    {
      name: 'Checked',
      props: {
        onChange: () => {},
        value: true,
      },
    },
  ],
};

export default switchOverview;
