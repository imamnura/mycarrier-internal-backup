import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Approve from '../component';

describe('src/components/forms/Approve', () => {
  const props = {
    handleSubmit: jest.fn(),
    maxLength: 10,
    onClose: jest.fn(),
    onSubmit: jest.fn(),
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Approve {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
