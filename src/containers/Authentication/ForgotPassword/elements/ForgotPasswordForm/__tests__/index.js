import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ForgotPasswordForm from '../index';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/Authentication/ForgotPasswordForm', () => {
  test('render', () => {
    useActions.mockReturnValueOnce({
      control: {},
      handleSubmit: jest.fn(),
      loading: false,
      message: '',
      onSubmit: jest.fn(),
      redirectLogin: jest.fn(),
      redirectPortal: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ForgotPasswordForm />);
    expect(tree).toMatchSnapshot();
  });
});
