import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SendEmailAmMapping from '../component';

describe('src/components/forms/SendEmailAmMapping', () => {
  const props = {
    handleSubmit: jest.fn(),
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SendEmailAmMapping {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
