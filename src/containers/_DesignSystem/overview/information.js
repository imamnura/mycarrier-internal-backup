import React from 'react';
import Information from '@components/Information';
import Status from '@components/Status';

const informationOverview = {
  component: Information,
  variant: [
    {
      name: 'String',
      grid: 2,
      props: {
        value: 'Example Value',
        label: 'Example Label',
      },
    },
    {
      name: 'Component',
      grid: 2,
      props: {
        value: (
          <div style={{ display: 'flex' }}>
            <Status children="Example Value" variant="success" />
          </div>
        ),
        label: 'Example Label',
      },
    },
    {
      name: 'Array of String',
      grid: 2,
      props: {
        value: ['Example Value 1', 'Example Value 2'],
        label: 'Example Label',
      },
    },
    {
      name: 'Array of Component',
      grid: 2,
      props: {
        value: [
          <div key={1} style={{ display: 'flex' }}>
            <Status children="Example Value" variant="success" />
          </div>,
          <div key={2} style={{ display: 'flex', marginTop: 8 }}>
            <Status children="Example Value" variant="alert" />
          </div>,
        ],
        label: 'Example Label',
      },
    },
  ],
};

export default informationOverview;
