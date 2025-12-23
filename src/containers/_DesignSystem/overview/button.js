import Add from '@assets/icon-v2/Add';
import Button from '@components/Button';

const buttonOverview = {
  component: Button,
  variant: [
    {
      name: 'Filled + Small',
      props: {
        children: 'Button Name',
        size: 'small',
        variant: 'filled',
      },
    },
    {
      name: 'Ghost + Small',
      props: {
        children: 'Button Name',
        size: 'small',
        variant: 'ghost',
      },
    },
    {
      name: 'Disabled',
      props: {
        children: 'Button Name',
        disabled: true,
        size: 'small',
      },
    },
    {
      name: 'Loading',
      props: {
        children: 'Button Name',
        loading: true,
        size: 'small',
        variant: 'filled',
      },
    },
    {
      name: 'Filled + Small + L Icon',
      props: {
        children: 'Button Name',
        leftIcon: Add,
        size: 'small',
        variant: 'filled',
      },
    },
    {
      name: 'Filled + Small + R Icon',
      props: {
        children: 'Button Name',
        rightIcon: Add,
        size: 'small',
        variant: 'filled',
      },
    },
    {
      name: 'Filled + Medium ',
      props: {
        children: 'Button Name',
        size: 'medium',
        variant: 'filled',
      },
    },
    {
      name: 'Filled + Large',
      props: {
        children: 'Button Name',
        size: 'large',
        variant: 'filled',
      },
    },
  ],
};

export default buttonOverview;
