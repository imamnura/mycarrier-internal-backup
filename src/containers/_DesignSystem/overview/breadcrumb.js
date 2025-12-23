import Breadcrumb from '@components/Breadcrumb';

const breadcrumbOverview = {
  component: Breadcrumb,
  variant: [
    {
      name: 'Large',
      props: {
        data: [
          { label: 'Root Name', url: '/root' },
          { label: 'Sub-Root Name 1' },
          { label: 'Sub-Root Name 2' },
        ],
        size: 'large',
      },
    },
    {
      name: 'Medium',
      props: {
        data: [
          { label: 'Root Name', url: '/root' },
          { label: 'Sub-Root Name 1' },
          { label: 'Sub-Root Name 2' },
        ],
        size: 'medium',
      },
    },
    {
      name: 'Small',
      props: {
        data: [
          { label: 'Root Name', url: '/root' },
          { label: 'Sub-Root Name 1' },
          { label: 'Sub-Root Name 2' },
        ],
        size: 'small',
      },
    },
  ],
};

export default breadcrumbOverview;
