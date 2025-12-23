import { renderHook, act } from '@testing-library/react-hooks';
import { login } from '../../../../../_repositories/repositories';
import useActions from '../useActions';
import { isSubscribeFirebase } from '../../utils';
import generateToken from '@utils/generateToken';

jest.mock('../../../../../_repositories/repositories');
jest.mock('../../utils');
jest.mock('@utils/common');
jest.mock('@utils/generateToken');

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: {},
    handleSubmit: (callback) => {
      const formValue = { username: 'test', password: 'test' };
      callback(formValue);
      return jest.fn().mockResolvedValue(formValue);
    },
  }),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('src/pages/Authentication/Login/elements/LoginForm/hooks/useActions', () => {
  test('Form init success', () => {
    const props = { useMessage: ['', jest.fn()] };
    const { result } = renderHook(() => useActions(props));
    expect(result.current.control).not.toBeUndefined();
  });

  test('onSubmit success', async () => {
    login.mockResolvedValue({
      data: { privileges: [], accessToken: '', refreshToken: '' },
    });
    generateToken.mockResolvedValue('token');
    isSubscribeFirebase.mockReturnValue(true);

    const props = { useMessage: ['', jest.fn()] };
    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(result.current.onSubmit).not.toBeUndefined();
  });

  test('onSubmit success without subscribe firebase', async () => {
    login.mockResolvedValue({
      data: { privileges: [], accessToken: '', refreshToken: '' },
    });
    generateToken.mockResolvedValue('token');
    isSubscribeFirebase.mockReturnValue(false);

    const props = { useMessage: ['', jest.fn()] };
    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(result.current.onSubmit).not.toBeUndefined();
  });

  test('onSubmit failed', async () => {
    login.mockRejectedValue({ message: 'error' });
    generateToken.mockResolvedValue('token');

    const props = { useMessage: ['', jest.fn()] };
    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(result.current.onSubmit).not.toBeUndefined();
  });

  test('redirect forgot password', () => {
    const props = { useMessage: ['', jest.fn()] };
    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.redirectForgotPassword();
    });

    expect(result.current.redirectForgotPassword).not.toBeUndefined();
  });
});
