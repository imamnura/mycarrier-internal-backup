import React from 'react';
import Component from '../component';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('src/containers/ServiceAssurance/Neucloud/Detail/elements/Evidence/component', () => {
  let props = {
    classes: {
      evidenceWrapper: '',
    },
    schema: {},
  };

  test('render image', () => {
    const customProps = {
      ...props,
      data: {
        status: '',
        evidence: [
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

  test('render no data', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render no evidence', () => {
    const customProps = {
      ...props,
      data: {
        status: '',
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
        evidence: [
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
