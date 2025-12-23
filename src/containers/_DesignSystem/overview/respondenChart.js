import RespondenChart from '@components/RespondenChart';

const data = [
  {
    score: 0,
    value: 10,
  },
  {
    score: 1,
    value: 50,
  },
  {
    score: 2,
    value: 10,
  },
  {
    score: 3,
    value: 80,
  },
  {
    score: 4,
    value: 10,
  },
  {
    score: 5,
    value: 30,
  },
  {
    score: 6,
    value: 90,
  },
  {
    score: 7,
    value: 40,
  },
  {
    score: 8,
    value: 60,
  },
  {
    score: 9,
    value: 88,
  },
  {
    score: 10,
    value: 100,
  },
];

const respondenChartOverview = {
  component: RespondenChart,
  variant: [
    {
      grid: 6,
      name: 'Default',
      props: {
        data: data,
      },
    },
  ],
};

export default respondenChartOverview;
