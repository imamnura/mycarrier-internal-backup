import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import OTPInput from '../OTPInput';

describe('src/components-v2/elements/OTPInput', () => {
  const props = {
    onChange: jest.fn(),
    required: true,
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<OTPInput {...props} />);
    OTPInput.defaultProps.onChange();
    expect(tree).toMatchSnapshot();
  });
});
