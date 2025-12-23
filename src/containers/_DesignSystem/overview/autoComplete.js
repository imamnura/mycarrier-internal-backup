import AutoComplete from '@components/AutoComplete';

const attachmentOverview = {
  component: AutoComplete,
  variant: [
    {
      name: 'Default',
      grid: 3,
      props: {
        label: 'Label',
        options: ['options 1', 'options 2'],
      },
    },
  ],
};

export default attachmentOverview;
