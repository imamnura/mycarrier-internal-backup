import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import { getList } from '../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

jest.mock('../../../_repositories/repositories');
jest.mock('react-redux');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/pages/ServiceAssurance/SMSA2P/List/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  test('run tab done', async () => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    useRouter.mockReturnValue({
      pathname: route.smsa2p('list'),
      push: jest.fn(),
    });
    getList.mockResolvedValue({
      data: [],
      meta: {
        page: 1,
        size: 10,
        totalPages: 20,
        totalData: 200,
      },
    });

    const props = {
      feature: [
        'read_detail',
        'read_detailHistory',
        'read_active',
        'read_history',
      ],
    };

    const { hydrate, result } = await renderHook(() => useActions(props));

    hydrate();

    act(() => {
      result.current.setTab('done');
    });
    act(() => {
      result.current.onClickDownload();
      result.current.onClickRefresh();
      result.current.onClickRowTable({ ticketId: 'tes' });
    });
  });

  test('run tab active', async () => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    useRouter.mockReturnValue({
      pathname: route.smsa2p('list'),
      push: jest.fn(),
    });
    getList.mockResolvedValue({
      data: [],
      meta: {
        page: 1,
        size: 10,
        totalPages: 20,
        totalData: 200,
      },
    });

    const props = {
      feature: [
        'read_detail',
        'read_detailHistory',
        'read_active',
        'read_history',
      ],
    };

    const { hydrate, result } = await renderHook(() => useActions(props));

    hydrate();

    act(() => {
      result.current.setTab('active');
    });
    act(() => {
      result.current.onClickDownload();
      result.current.onClickRefresh();
      result.current.onClickRowTable({ ticketId: 'tes' });
    });
  });

  test('run no tab', async () => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    useRouter.mockReturnValue({
      pathname: route.smsa2p('list'),
      push: jest.fn(),
    });
    getList.mockResolvedValue({
      data: [],
      meta: {
        page: 1,
        size: 10,
        totalPages: 20,
        totalData: 200,
      },
    });

    const props = {
      feature: [
        'read_detail',
        'read_detailHistory',
        'read_active',
        'read_history',
      ],
    };

    const { hydrate, result } = await renderHook(() => useActions(props));

    hydrate();

    act(() => {
      result.current.setTab('');
    });
    act(() => {
      result.current.onClickDownload();
      result.current.onClickRefresh();
      result.current.onClickRowTable({ ticketId: 'tes' });
    });
  });

  test('wrong route', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({ pathname: '/wrong-route', push: jest.fn() });
    getList.mockResolvedValue({
      data: null,
      meta: { totalPage: 2, page: 4 },
    });
    const props = {
      feature: [
        'read_detail',
        'read_detailHistory',
        'read_active',
        'read_history',
      ],
    };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    act(() => {
      result.current.setTab('done');
    });
  });

  test('fetch rejected', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({ pathname: route.bakes('list') });
    getList.mockRejectedValue({ message: '' });
    const props = {
      feature: [
        'read_detail',
        'read_detailHistory',
        'read_active',
        'read_history',
      ],
    };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    act(() => {
      result.current.setTab('done');
    });
  });
});
