import React from 'react';
import Component from '../component';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('Component SMSA2P Detail-Evidence', () => {
  let props = {
    classes: {},
    schema: {},
  };

  test('render image', () => {
    const customProps = {
      ...props,
      data: {
        status: '',
        evidenceAttachment: [
          {
            evidenceToCustomer: '',
            fileName: '',
            fileUrl: '',
            fileType: 'image',
          },
        ],
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render pdf', () => {
    const customProps = {
      ...props,
      data: {
        status: '',
        evidenceAttachment: [
          {
            evidenceToCustomer: '',
            fileName: '',
            fileUrl: '',
            fileType: 'pdf',
          },
        ],
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
