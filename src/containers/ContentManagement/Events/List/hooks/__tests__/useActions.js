import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { useRouter } from 'next/router';
import { route } from '@configs';
import {
  getList,
  deleteEvent,
} from '@containers/ContentManagement/Events/_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('@containers/ContentManagement/Events/_repositories/repositories');
jest.mock('react-redux');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/ContentManagement/Events/List/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

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
  });

  test('run properly', async () => {
    useRouter.mockReturnValue({
      pathname: route.events('list'),
      push: jest.fn(),
    });
    getList.mockResolvedValue({
      data: [{}],
      meta: { totalPages: 2, page: 1 },
    });
    deleteEvent.mockResolvedValue({ success: true });

    const props = { classes: {}, feature: [] };

    const { hydrate, result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.addEvents();
      result.current.onClickRowTable({ id: '123' });
      // result.current.onBottomPage();
      result.current.filter.dateRange.onChange(['2022-10-18', '2022-10-19']);
      result.current.filter.eventsStatus.onChange('upcoming');
      result.current.filter.contentStatus.onChange('draft');

      //if didn't have feature update_event & delete_event
      result.current.onUpdateEvents();
      result.current.confirmDeleteEvents();
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run properly/others state', async () => {
    // const e = { stopPropagation: jest.fn() };

    useRouter.mockReturnValue({
      pathname: route.events('list'),
      push: jest.fn(),
    });
    getList.mockResolvedValue({
      data: [{}],
      meta: { totalPages: 2, page: 1 },
    });
    deleteEvent.mockResolvedValue({ success: true });

    const props = { classes: {}, feature: ['update_event', 'delete_event'] };

    const { hydrate, result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onUpdateEvents({ stopPropagation: jest.fn() }, '123');
      result.current.onClickRowTable({ id: '123' });
      result.current.confirmDeleteEvents({ stopPropagation: jest.fn() }, '123');
      result.current.handleDeleteEvents('id')();
      // result.current.onBottomPage();
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('wrong route', async () => {
    useRouter.mockReturnValue({
      location: { pathname: '/wrong-route' },
      push: jest.fn(),
    });
    getList.mockResolvedValue({
      data: null,
      meta: { totalPages: 2, page: 3 },
    });
    deleteEvent.mockResolvedValue({ success: true });

    const props = { classes: {}, feature: [] };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    useRouter.mockReturnValue({
      pathname: route.events('list'),
      push: jest.fn(),
    });
    getList.mockRejectedValue({ message: '' });

    deleteEvent.mockRejectedValue({ message: 'error' });
    deleteEvent.mockRejectedValue(); //for message error 'Failed to delete event'

    const props = { classes: {}, feature: [] };

    const { result, hydrate } = await renderHook(() => useActions(props));

    act(() => {
      result.current.confirmDeleteEvents();
      result.current.handleDeleteEvents('id')();
    });
    hydrate();

    expect(result.current.list.data).not.toBeUndefined();
  });
});
