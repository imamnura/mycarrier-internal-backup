import PieChart from '@components/PieChart';
import color from '@styles/color';

const data = [
  {
    label: 'IP Transit',
    value: 8,
    color: color.yellow.main,
  },
  {
    label: 'BASO Completed',
    value: 4,
    color: color.primary.main,
  },
  {
    label: 'Neucentrix',
    value: 2,
    color: color.green.main,
  },
];

const PieChartOverview = {
  component: PieChart,
  variant: [
    {
      grid: 6,
      name: 'Default',
      props: {
        data: data,
        indexBy: 'label',
      },
    },
    {
      grid: 6,
      name: 'Without Legend + Custom Size Pie',
      props: {
        data: data,
        indexBy: 'label',
        legends: false,
        height: 340,
      },
    },
  ],
};

export default PieChartOverview;
