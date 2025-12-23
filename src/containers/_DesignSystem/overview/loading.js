import Loading from '@components/Loading';

const loadingOverview = {
  component: Loading,
  variant: [
    {
      name: 'Large + Inherit',
      props: {
        size: 'large',
      },
    },
    {
      name: 'Large + White',
      props: {
        color: 'white',
        size: 'large',
      },
    },
    {
      name: 'Large + Primary',
      props: {
        color: 'primary',
        size: 'large',
      },
    },
    {
      name: 'Medium',
      props: {
        color: 'primary',
        size: 'medium',
      },
    },
    {
      name: 'Small',
      props: {
        color: 'primary',
        size: 'small',
      },
    },
  ],
};

export default loadingOverview;
