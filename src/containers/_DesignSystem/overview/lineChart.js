import React from 'react';
import LineChart from '@components/LineChart';
import { Box } from '@material-ui/core';

const data = [
  {
    id: 'Yang Kuning',
    color: '#FAB005',
    data: [
      {
        x: '',
        y: null,
      },
      {
        x: '23 Dec',
        y: 50,
      },
      {
        x: '24 Dec',
        y: 25,
      },
      {
        x: '25 Dec',
        y: 25,
      },
      {
        x: '26 Dec',
        y: 50,
      },
      {
        x: '27 Dec',
        y: 0,
      },
      {
        x: '  ',
        y: null,
      },
    ],
  },
  {
    id: 'Yang Merah',
    color: '#DE1B1B',
    data: [
      {
        x: '',
        y: null,
      },
      {
        x: '23 Dec',
        y: 75,
      },
      {
        x: '24 Dec',
        y: 50,
      },
      {
        x: '25 Dec',
        y: 50,
      },
      {
        x: '26 Dec',
        y: 75,
      },
      {
        x: '27 Dec',
        y: 25,
      },
      {
        x: '  ',
        y: null,
      },
    ],
  },
  {
    id: 'Yang Biru',
    color: '#3071D9',
    data: [
      {
        x: '',
        y: null,
      },
      {
        x: '23 Dec',
        y: 100,
      },
      {
        x: '24 Dec',
        y: 75,
      },
      {
        x: '25 Dec',
        y: 75,
      },
      {
        x: '26 Dec',
        y: 100,
      },
      {
        x: '27 Dec',
        y: 50,
      },
      {
        x: '  ',
        y: null,
      },
    ],
  },
];

const Wrapper = (props) => (
  <Box sx={{ width: '100%' }}>
    <LineChart {...props} />
  </Box>
);

const LineChartOverview = {
  component: Wrapper,
  variant: [
    {
      grid: 5,
      name: 'Default',
      props: {
        data: data,
        leftLabel: 'LABEL',
        indexBy: 'id',
        legends: true,
      },
    },
  ],
};

export default LineChartOverview;
