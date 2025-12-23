import {
  changePassword,
  verifyCodeReset,
} from '@containers/Authentication/_repositories/repositories';
import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock('@containers/Authentication/_repositories/repositories');

describe('src/containers/Authentication/ForgotPasswordForm/hooks/useActions', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({ query: { code: '123' }, push: jest.fn() });
  });

  usePopupAlert.mockReturnValue({
    setLoadingAlert: jest.fn(),
    setFailedAlert: jest.fn(),
    setSuccessAlert: jest.fn(),
  });
  usePopupConfirmation.mockReturnValue({
    closeConfirmation: jest.fn(),
    setConfirmation: jest.fn(),
  });

  test('run properly', async () => {
    changePassword.mockResolvedValue({ data: {} });
    verifyCodeReset.mockResolvedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions());

      await result.current.onSubmit('123');
      await result.current.redirectForgotPassword();
      await result.current.redirectLogin();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run error submit', async () => {
    changePassword.mockRejectedValue({ data: {} });
    verifyCodeReset.mockRejectedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions());
      await result.current.onSubmit('123');
      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
