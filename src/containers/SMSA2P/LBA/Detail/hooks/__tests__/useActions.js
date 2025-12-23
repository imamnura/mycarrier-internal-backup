import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import { useRouter } from 'next/router';
import {
  getDetailLBA,
  updateStatusLBA,
  resendEmailNotif,
} from '../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import useActions from '../useActions';

jest.mock('../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock('next/router');

describe('src/containers/SMSA2P/LBA/Detail/hooks/useActions', () => {
  afterEach(cleanup);

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-10-12T13:37:00+07:00'));

    usePopupAlert.mockReturnValue({
      setSuccessAlert: jest.fn(),
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
    });

    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });

    useRouter.mockReturnValue({
      query: { id: 'LBA123' },
      asPath: route.lba('detail', 'LBA123'),
      push: jest.fn(),
    });
  });

  const props = {
    feature: ['update_customerRequest', 'update_checkingTelkom'],
  };

  const resolvedValue = {
    data: {
      orderNumber: 'LBA123',
      activationStatus: 'completed',
      notification: {
        email: {
          isSent: false,
          retryExpiredAt: '2023-10-12T13:45:00+07:00',
        },
      },
    },
  };

  test('run properly', async () => {
    getDetailLBA.mockResolvedValue(resolvedValue);

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      result.current.action();
      result.current.onClickResend();
      const confirmation = result.current.onConfirm({ confirmMessage: 'Test' });
      confirmation.action[1].onClick();
      result.current.onChangeInterval();
      res = await result;
    });

    expect(res.current.data).not.toBeNull();
  });

  test('run properly with button resend enabled', async () => {
    getDetailLBA.mockResolvedValue(resolvedValue);
    jest.useFakeTimers().setSystemTime(new Date('2023-10-12T13:46:00+07:00'));

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      result.current.onClickResend();
      res = await result;
    });

    expect(res.current.data).not.toBeNull();
  });

  test('run properly with status checking', async () => {
    getDetailLBA.mockResolvedValue({
      data: {
        activationStatus: 'checking',
      },
    });

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );
      await waitForValueToChange(() => result.current.data);
      const actions = result.current.action();
      actions[0].onClick();

      res = await result;
    });

    expect(res.current.data).not.toBeNull();
  });

  test('run properly with status onprogress', async () => {
    getDetailLBA.mockResolvedValue({
      data: {
        activationStatus: 'onprogress',
      },
    });

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );
      await waitForValueToChange(() => result.current.data);
      const actions = result.current.action();
      actions[0].onClick();

      res = await result;
    });
    expect(res.current.data).not.toBeNull();
  });

  test('fetch rejected', async () => {
    getDetailLBA.mockRejectedValue({ message: 'error' });
    updateStatusLBA.mockRejectedValue({ message: 'error' });
    resendEmailNotif.mockRejectedValue({ message: 'error' });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      result.current.onClickResend();
      const confirmation = result.current.onConfirm({ confirmMessage: 'Test' });
      confirmation.action[1].onClick();
      res = result;
    });

    expect(res.current.data).toBeNull();
  });

  test('run with wrong path', async () => {
    useRouter.mockReturnValue({
      query: { id: 'LBA123' },
      asPath: route.lba('detail', 'LBA253'),
      push: jest.fn(),
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    expect(res.current.data).toBeNull();
  });
});
