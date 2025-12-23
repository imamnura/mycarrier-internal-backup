import { forgotPasssword } from '@containers/Authentication/_repositories/repositories';
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
    useRouter.mockReturnValue({ push: jest.fn() });
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
    forgotPasssword.mockResolvedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions());

      await result.current.onSubmit();
      await result.current.redirectLogin();
      await result.current.redirectPortal();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run error submit', async () => {
    forgotPasssword.mockRejectedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions());
      await result.current.onSubmit();
      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run error submit Email Not Found', async () => {
    forgotPasssword.mockRejectedValue({ message: 'Email Not Found' });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions());
      await result.current.onSubmit();
      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
