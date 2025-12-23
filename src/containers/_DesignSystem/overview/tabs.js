/* eslint-disable no-alert */
import Tabs from '@components/Tabs';

const tabsOverview = {
  component: Tabs,
  variant: [
    {
      grid: 4,
      name: 'Default',
      props: {
        options: [
          { value: 'val1', label: 'Tab Name 1' },
          { value: 'val2', label: 'Tab Name 2' },
        ],
        value: 'val1',
        onChange: (x) => window.alert(x),
      },
    },
    {
      grid: 4,
      name: 'Center',
      props: {
        variant: 'centered',
        options: [
          { value: 'val1', label: 'Tab Name 1' },
          { value: 'val2', label: 'Tab Name 2' },
        ],
        value: 'val1',
        onChange: (x) => window.alert(x),
      },
    },
    {
      grid: 4,
      name: 'With Swap',
      props: {
        options: [
          { value: 'val1', label: 'Tab Name 1' },
          { value: 'val2', label: 'Tab Name 2' },
        ],
        value: 'val1',
        onSwap: () => {},
        onChange: (x) => window.alert(x),
      },
    },
  ],
};

export default tabsOverview;
