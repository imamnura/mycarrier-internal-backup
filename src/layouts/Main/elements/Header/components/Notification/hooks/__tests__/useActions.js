import { renderHook, act } from '@testing-library/react-hooks';
import {
  clickNotificationBell,
  getListNotification,
  readNotification,
} from '../../_repositories/repositories';
import useActions from '../useActions';

jest.mock('../../_repositories/repositories');

describe('src/layouts/Main/elements/Header/components/Notification/hooks/useActions', () => {
  test('run properly', async () => {
    getListNotification.mockResolvedValue({
      data: [{}],
      meta: {},
    });
    const props = { open: true };

    const { result, waitForNextUpdate } = renderHook(() => useActions(props));

    await waitForNextUpdate();
    expect(result.current.list).not.toBeUndefined();
  });

  test('run properly not open', async () => {
    getListNotification.mockResolvedValue({
      data: [{}],
      meta: {
        page: 1,
        totalPage: 0,
      },
    });
    const props = { open: false };

    const { result, waitForNextUpdate } = renderHook(() => useActions(props));

    await waitForNextUpdate();
    expect(result.current.list).not.toBeUndefined();
  });

  test('fetchClickNotificationBell failed', async () => {
    clickNotificationBell.mockRejectedValue({
      message: 'aasdsad',
    });
    getListNotification.mockResolvedValue({
      data: null,
      meta: {},
    });
    const props = { open: true };

    const { result, waitForNextUpdate } = renderHook(() => useActions(props));

    await waitForNextUpdate();
    expect(result.current.list).not.toBeUndefined();
  });

  test('onRead', async () => {
    getListNotification.mockResolvedValue({
      data: [
        {
          notificationId: 'id',
        },
      ],
      meta: {},
    });
    readNotification.mockResolvedValueOnce({});
    const props = { open: true };
    const { result, waitForNextUpdate } = renderHook(() => useActions(props));
    await waitForNextUpdate();

    await act(async () => {
      await result.current.onRead('id');
      await readNotification.mockResolvedValueOnce(null);
      await result.current.onRead('id');
      await readNotification.mockRejectedValue(null);
      await result.current.onRead('id');
    });

    expect(result.current.list).not.toBeUndefined();
  });

  test('onScrollContainer', async () => {
    getListNotification.mockResolvedValue({
      data: [
        {
          notificationId: 'id',
        },
      ],
      meta: {
        totalPage: 10,
      },
    });
    const props = { open: true };
    const { result, waitForNextUpdate } = renderHook(() => useActions(props));
    await waitForNextUpdate();

    const e = {
      target: {
        scrollTop: 1,
        clientHeight: 1000,
        scrollHeight: 3,
      },
    };

    await act(async () => {
      await getListNotification.mockRejectedValue({});
      await result.current.onScrollContainer(e);
      await result.current.onScrollContainer(e);
      await result.current.onScrollContainer({
        target: {
          scrollTop: 1,
          clientHeight: 0,
          scrollHeight: 3000,
        },
      });
    });

    expect(result.current.list).not.toBeUndefined();
  });
});
