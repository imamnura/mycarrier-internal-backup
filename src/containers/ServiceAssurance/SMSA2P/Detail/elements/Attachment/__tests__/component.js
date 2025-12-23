import React from 'react';
import Component from '../component';
import ShallowRenderer from 'react-test-renderer/shallow';

jest.mock('moment', () => () => ({ format: () => '2021-05-06T09:28:35.202Z' }));

describe('Component SMSA2P Detail-Attachment', () => {
  let props = {
    classes: {},
  };

  test('render', () => {
    const customProps = {
      ...props,
      data: {
        troubleOccurs: [
          {
            file: [
              {
                fileUrl: '',
                fileName: '',
              },
            ],
            dateTime: '2021-05-06T09:28:35.202Z',
          },
        ],
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
