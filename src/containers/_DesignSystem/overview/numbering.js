import React from 'react';
import Numbering from '@components/Numbering';
import Status from '@components/Status';

const numberingOverview = {
  component: Numbering,
  variant: [
    {
      name: 'String',
      grid: 4,
      props: {
        data: 'Example of Numbering',
        number: '99',
      },
    },
    {
      name: 'With Schema',
      grid: 4,
      props: {
        alignItems: 'flex-start',
        data: {
          name: 'Example of Full Name',
          dob: '11/11/1111',
          pob: 'Seoul',
        },
        schema: [
          { name: 'name', label: 'Full Name', grid: 12 },
          { name: 'pob', label: 'Place of Birth', grid: 6 },
          { name: 'dob', label: 'Date of Birth', grid: 6 },
        ],
        number: '96',
      },
    },
    {
      name: 'Custom',
      grid: 4,
      props: {
        data: (
          <div style={{ display: 'flex' }}>
            <Status variant="success">Example of Custom Content</Status>
          </div>
        ),
        number: '69',
      },
    },
  ],
};

export default numberingOverview;
