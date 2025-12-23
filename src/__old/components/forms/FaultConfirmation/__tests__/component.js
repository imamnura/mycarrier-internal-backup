import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FaultConfirmation from '../component';

describe('src/components/forms/FaultConfirmation', () => {
  const props = {
    handleSubmit: jest.fn(),
    onClose: jest.fn(),
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FaultConfirmation {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render submitting', () => {
    const customProps = {
      ...props,
      invalid: false,
      submitting: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FaultConfirmation {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
