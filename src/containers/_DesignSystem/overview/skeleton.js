import Skeleton from '@components/Skeleton';

const skeletonOverview = {
  component: Skeleton,
  variant: [
    {
      name: 'Square (rect)',
      props: {
        variant: 'rect',
        height: 40,
        width: 100,
      },
    },
    {
      name: 'Circle (circle)',
      props: {
        variant: 'circle',
        height: 40,
        width: 40,
      },
    },
  ],
};

export default skeletonOverview;
