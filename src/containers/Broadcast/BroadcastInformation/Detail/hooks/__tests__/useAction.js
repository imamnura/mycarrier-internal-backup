import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import useActions from '../useAction';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetailBroadcastInformation,
  updateStatusBroadcast,
} from '@containers/Broadcast/BroadcastInformation/_repositories/repositories';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock(
  '@containers/Broadcast/BroadcastInformation/_repositories/repositories',
);
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/Broadcast/BroadcastInformation/Detail/hooks/useActions', () => {
  afterEach(cleanup);

  const resolvedList = {
    data: {
      broadcastInfo: {
        message: {
          paragraph1: '1',
          paragraph2: '2',
          paragraph3: '3',
        },
      },
    },
  };

  beforeAll(() => {
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    getDetailBroadcastInformation.mockResolvedValue(resolvedList);
    useRouter.mockReturnValue({
      asPath: route.broadcastInformation('detail', 'id'),
      push: jest.fn(),
      query: { id: 'id' },
    });
  });

  const feature = [];

  test('run properly', async () => {
    const props = { feature };

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      await result.current.updateWithoutApproval();
      await waitForValueToChange(() => result.current.data);
      res = await result;
    });

    await expect(res.current.data.broadcastInfo.message).toBeTruthy();
  });

  test('resolved single message', async () => {
    getDetailBroadcastInformation.mockResolvedValue({
      data: { broadcastInfo: { message: 'message' } },
    });

    const props = { feature };

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      await waitForValueToChange(() => result.current.data);
      res = await result;
    });

    await expect(res.current.data.broadcastInfo.message).toBeTruthy();
  });

  test('failed get detail', async () => {
    getDetailBroadcastInformation.mockRejectedValueOnce();

    const props = { feature };

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      await waitForValueToChange(() => result.current.data);
      res = await result;
    });

    await expect(res.current.data.broadcastInfo.message).toBeFalsy();
  });

  test('others', () => {
    useRouter.mockReturnValue({ query: { id: '' } });
    const props = { feature };

    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.setApprovalForm({})();
      result.current.closeApprovalForm();
      result.current.onSubmitFormApproval({});
    });

    expect(result.current.data.broadcastInfo.message).toBeFalsy();

    const { setConfirmation } = usePopupConfirmation();
    expect(setConfirmation).toHaveBeenCalled();
  });

  test('fetchUpdateStatus', async () => {
    updateStatusBroadcast.mockResolvedValueOnce({ data: {} });
    useRouter.mockReturnValue({ query: { id: '' } });
    const props = { feature };

    const { result } = await renderHook(() => useActions(props));

    await act(async () => {
      await result.current.fetchUpdateStatus({ reason: '' })();
      await result.current.setApprovalForm({ type: 'reject' })();
      await updateStatusBroadcast.mockResolvedValueOnce({ data: null });
      await result.current.fetchUpdateStatus({ reason: '' })();
      await updateStatusBroadcast.mockRejectedValueOnce({ message: 'error' });
      await result.current.fetchUpdateStatus({ reason: '' })();
    });

    await expect(updateStatusBroadcast).toHaveBeenCalled();
  });

  test('updateFromReturned', async () => {
    updateStatusBroadcast.mockResolvedValueOnce({ data: {} });
    useRouter.mockReturnValue({ query: { id: '' }, push: jest.fn() });
    const props = { feature };

    const { result } = await renderHook(() => useActions(props));

    await act(async () => {
      await result.current.updateFromReturned();
      await updateStatusBroadcast.mockResolvedValueOnce({ data: null });
      await result.current.updateFromReturned();
      await updateStatusBroadcast.mockRejectedValueOnce({ message: 'error' });
      await result.current.updateFromReturned();
    });

    await expect(updateStatusBroadcast).toHaveBeenCalled();
  });
});
