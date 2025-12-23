import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Reject from '../component';
describe('src/components/forms/Reject', () => {
  const props = {
    handleSubmit: jest.fn(),
    maxLength: 10,
    onClose: jest.fn(),
    onSubmit: jest.fn(),
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Reject {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
