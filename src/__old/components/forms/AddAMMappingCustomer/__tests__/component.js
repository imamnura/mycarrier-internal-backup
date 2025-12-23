import React from 'react';
import Component from '../component';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('src/component/form/AddMappingCustomer/component', () => {
  const props = {
    action: {
      searchAMMappingCustomer: jest.fn(),
      submitAmMapping: jest.fn(),
    },
    classes: {},
    isLoading: false,
    listAmMappingCustomer: [],
    setCallback: null,
    amProfile: {},
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render is loading true', () => {
    const customProps = {
      ...props,
      isLoading: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
