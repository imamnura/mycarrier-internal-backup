import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import NewPasswordForm from '../index';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/Authentication/NewPasswordForm', () => {
  test('render', () => {
    useActions.mockReturnValueOnce({
      control: {},
      handleSubmit: jest.fn(),
      loading: false,
      message: '',
      onSubmit: jest.fn(),
      loadingPage: false,
      redirectForgotPassword: jest.fn(),
      validCode: '123',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<NewPasswordForm />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading page', () => {
    useActions.mockReturnValueOnce({
      control: {},
      handleSubmit: jest.fn(),
      loading: false,
      message: '',
      onSubmit: jest.fn(),
      loadingPage: true,
      redirectForgotPassword: jest.fn(),
      validCode: {},
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<NewPasswordForm />);
    expect(tree).toMatchSnapshot();
  });

  test('render without valid code', () => {
    useActions.mockReturnValueOnce({
      control: {},
      handleSubmit: jest.fn(),
      loading: false,
      message: '',
      onSubmit: jest.fn(),
      loadingPage: false,
      redirectForgotPassword: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<NewPasswordForm />);
    expect(tree).toMatchSnapshot();
  });
});
