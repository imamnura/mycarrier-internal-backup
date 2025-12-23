import React from 'react';
import useActions from '../hooks/useActions';
import ShallowRenderer from 'react-test-renderer/shallow';
import LoginForm from '../LoginForm';
import { LOCATOR } from '../../../test-locator';

jest.mock('../hooks/useActions');

describe('src/pages/Authentication/Login/elements/LoginForm', () => {
  const testLocator = LOCATOR;

  test('render', () => {
    useActions.mockReturnValueOnce({
      control: {},
      handleSubmit: jest.fn(),
      loading: false,
      message: '',
      onSubmit: jest.fn(),
      redirectForgotPassword: jest.fn(),
      testLocator,
    });

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LoginForm useMessage={['', jest.fn()]} />);
    expect(tree).toMatchSnapshot();
  });
});
