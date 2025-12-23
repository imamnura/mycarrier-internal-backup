import Status from '@components/Status';

const statusOverview = {
  component: Status,
  variant: [
    {
      name: 'Primary',
      props: {
        variant: 'primary',
        children: 'status name',
      },
    },
    {
      name: 'Success',
      props: {
        variant: 'success',
        children: 'status name',
      },
    },
    {
      name: 'Alert',
      props: {
        variant: 'alert',
        children: 'status name',
      },
    },
    {
      name: 'Warning',
      props: {
        variant: 'warning',
        children: 'status name',
      },
    },
    {
      name: 'Tag',
      props: {
        variant: 'tag',
        children: 'status name',
      },
    },
    {
      name: 'Danger',
      props: {
        variant: 'danger',
        children: 'status name',
      },
    },
    {
      name: 'Danger + Medium',
      props: {
        variant: 'danger',
        size: 'medium',
        children: 'status name',
      },
    },
    {
      name: 'Danger + Laarge',
      props: {
        variant: 'danger',
        size: 'large',
        children: 'status name',
      },
    },
  ],
};

export default statusOverview;
