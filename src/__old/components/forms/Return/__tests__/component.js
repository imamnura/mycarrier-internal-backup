import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Return from '../component';

describe('src/components/forms/Return', () => {
  const props = {
    classes: {},
    handleSubmit: jest.fn(),
    onClear: jest.fn(),
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Return {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
