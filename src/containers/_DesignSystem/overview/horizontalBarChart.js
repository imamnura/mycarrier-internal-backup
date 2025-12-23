import HorizontalBarChart from '@components/HorizontalBarChart';

const data = [
  {
    companyName: 'PT NAMA PERUSAHAAN 1',
    value: 10,
  },
  {
    companyName: 'PT NAMA PERUSAHAAN 2',
    value: 50,
  },
  {
    companyName: 'PT NAMA PERUSAHAAN 3',
    value: 10,
  },
  {
    companyName: 'PT NAMA PERUSAHAAN 4',
    value: 80,
  },
  {
    companyName: 'PT NAMA PERUSAHAAN 5',
    value: 10,
  },
  {
    companyName: 'PT NAMA PERUSAHAAN 6',
    value: 30,
  },
  {
    companyName: 'PT. CIRCLECOM NUSANTARA INDONESIA',
    value: 80,
  },
  {
    companyName: 'PT NAMA PERUSAHAAN 8',
    value: 10,
  },
  {
    companyName: 'PT NAMA PERUSAHAAN 9',
    value: 30,
  },
  {
    companyName: 'PT NAMA PERUSAHAAN 10',
    value: 30,
  },
];

const horizontalBarChartOverview = {
  component: HorizontalBarChart,
  variant: [
    {
      grid: 12,
      name: 'Default',
      props: {
        data: data,
        indexBy: 'companyName',
        leftLabel: 'LABEL',
      },
    },
  ],
};

export default horizontalBarChartOverview;
