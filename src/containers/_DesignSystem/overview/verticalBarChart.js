import VerticalBarChart from '@components/VerticalBarChart';

const data = [
  {
    label: 'LABEL 1',
    value: 10,
  },
  {
    label: 'LABEL 2',
    value: 40,
  },
  {
    label: 'LABEL 3',
    value: 10,
  },
  {
    label: 'LABEL 4',
    value: 80,
  },
  {
    label: 'LABEL 5',
    value: 10,
  },
  {
    label: 'LABEL 6',
    value: 18,
  },
  {
    label: 'LABEL 7',
    value: 60,
  },
];

const dataGrouped = [
  {
    country: 'AD',
    'General Product': 181,
    'General ProductColor': '#3071D9',
    'A2P Non Consortium': 92,
    'A2P Non ConsortiumColor': '#FAB005',
    'A2P Consortium': 198,
    'A2P ConsortiumColor': '#DE1B1B',
  },
];

const verticalBarChartOverview = {
  component: VerticalBarChart,
  variant: [
    {
      grid: 12,
      name: 'Default',
      props: {
        data: data,
        leftLabel: 'LABEL',
        indexBy: 'label',
      },
    },
    {
      grid: 6,
      name: 'Grouped',
      props: {
        data: dataGrouped,
        leftLabel: 'LABEL',
        indexBy: 'country',
        groupMode: 'grouped',
        colors: ({ data, id }) => data[`${id}Color`],
        keys: ['General Product', 'A2P Non Consortium', 'A2P Consortium'],
        margin: { top: 40, right: 0, bottom: 10, left: 40 },
        axisBottom: null,
        padding: 0.6,
        legends: [
          { label: 'General Product', color: '#3071D9' },
          { label: 'A2P Non Consortium', color: '#FAB005' },
          { label: 'A2P Consortium', color: '#DE1B1B' },
        ],
      },
    },
  ],
};

export default verticalBarChartOverview;
