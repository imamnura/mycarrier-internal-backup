import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import RetireForm from '../RetireForm';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  open: true,
  onClose: jest.fn(),
};

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/RetireForm', () => {
  test('run properly', () => {
    useAction.mockReturnValueOnce({
      control: {},
      onSubmit: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RetireForm {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
