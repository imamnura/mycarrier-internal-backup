import React from 'react';
import Component from '../component';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('Component SMSA2P Detail-NPS', () => {
  let props = {
    classes: {},
    schema: {},
  };

  test('render', () => {
    const customProps = {
      ...props,
      data: {
        status: 'completed',
        worklog: [
          {
            step: 2,
            status: 'customerreview',
            dateTime: null,
            note: null,
            createdBy: null,
            rating: {
              message: ['test1', 'test2'],
            },
          },
          {
            step: 3,
            status: 'completed',
            dateTime: null,
            note: null,
            createdBy: null,
            rating: 'test',
          },
        ],
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
