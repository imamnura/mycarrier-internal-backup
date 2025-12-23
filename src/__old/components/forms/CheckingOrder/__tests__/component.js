import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CheckingOrder from '../component';

describe('src/components/forms/CheckingOrder', () => {
  const props = {
    handleSubmit: jest.fn(),
    onClose: jest.fn(),
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CheckingOrder {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render submitting', () => {
    const customProps = {
      ...props,
      invalid: false,
      isLoading: true,
      submiting: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CheckingOrder {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
