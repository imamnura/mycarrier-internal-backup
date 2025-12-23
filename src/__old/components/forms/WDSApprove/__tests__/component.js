import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import WDSApprove from '../component';

describe('src/components/forms/WDSApprove', () => {
  const props = {
    handleSubmit: jest.fn(),
    maxLength: 10,
    onClose: jest.fn(),
    onSubmit: jest.fn(),
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<WDSApprove {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
