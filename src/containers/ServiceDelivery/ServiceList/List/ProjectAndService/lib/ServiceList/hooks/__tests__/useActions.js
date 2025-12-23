import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import {
  getListServices,
  getListDropdown,
  getSummary,
} from '@containers/ServiceDelivery/ServiceList/_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import useQueryParams from '@utils/hooks/useQueryParams';

jest.mock('@containers/ServiceDelivery/ServiceList/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/useQueryParams');

describe('src/containers/ServiceDelivery/ServiceList/List/ProjectAndService/lib/ServiceList/hooks/useActions', () => {
  afterEach(cleanup);

  beforeAll(() => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
  });

  const resolvedList = {
    data: [
      {
        projectId: '300105862-123',
      },
    ],
    meta: {
      page: 1,
      totalPage: 3,
    },
  };

  const resolvedDropdown = {
    data: [
      {
        value: '123',
        name: '123',
      },
    ],
  };

  const resolvedSummary = {
    data: [
      {
        summary: {},
        name: '123',
      },
    ],
  };

  const props = {
    feature: ['read_detail_service_list'],
    setLoadingRoot: jest.fn(),
    setData: jest.fn(),
  };

  test('run properly', async () => {
    useRouter.mockReturnValue({ asPath: 'detail-project', push: jest.fn() });
    useQueryParams.mockReturnValue({
      queryParams: { id: '123', params: '321' },
      isReady: true,
      setQueryParams: jest.fn(),
    });
    getListServices.mockResolvedValue(resolvedList);
    getListDropdown.mockResolvedValue(resolvedDropdown);
    getSummary.mockResolvedValue(resolvedSummary);

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      await result.current.onClickRowTable(resolvedList.data[0]);
      // await result.current.onBottomPage();
      await waitForValueToChange(() => result.current.list);
      // await result.current.onBottomPage();

      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(1);
  });

  test('run properly when isReady false', async () => {
    useRouter.mockReturnValue({ asPath: 'detail-project', push: jest.fn() });
    useQueryParams.mockReturnValue({
      queryParams: { id: '123', params: '321' },
      isReady: false,
      setQueryParams: jest.fn(),
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(1);
  });

  test('last page', async () => {
    useRouter.mockReturnValue({ asPath: 'detail-project', push: jest.fn() });
    useQueryParams.mockReturnValue({
      queryParams: { id: '123', params: '321' },
      isReady: true,
      setQueryParams: jest.fn(),
    });
    getListServices.mockResolvedValue({
      data: [],
      meta: {
        page: 2,
        totalPage: 2,
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('last page detail customer', async () => {
    useRouter.mockReturnValue({ asPath: 'detail-customer', push: jest.fn() });
    useQueryParams.mockReturnValue({
      queryParams: { id: '123', params: '321' },
      isReady: true,
      setQueryParams: jest.fn(),
    });
    getListServices.mockResolvedValue({
      data: [],
      meta: {
        page: 2,
        totalPage: 2,
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('empty privilege', async () => {
    useRouter.mockReturnValue({ asPath: 'detail-project', push: jest.fn() });
    useQueryParams.mockReturnValue({
      queryParams: { id: '123', params: '321' },
      isReady: true,
      setQueryParams: jest.fn(),
    });
    getListServices.mockResolvedValue(resolvedList);

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions({ feature: [] }));

      await result.current.onClickRowTable(resolvedList.data[0]);
      await result.current.setSearch('s');
      await result.current.filter.product.onChange({ value: 's' });
      await result.current.filter.regional.onChange({ value: 's' });
      await result.current.filter.status.onChange({ value: 's' });
      await result.current.filter.status.onChange({ value: 's' });
      await result.current.useOrderBy[1]('s');
      await result.current.useOrderDirection[1]('s');

      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(1);
  });

  test('failed fetch list', async () => {
    useRouter.mockReturnValue({ asPath: 'detail-project', push: jest.fn() });
    useQueryParams.mockReturnValue({
      queryParams: { id: '123', params: '321' },
      isReady: true,
      setQueryParams: jest.fn(),
    });
    getListServices.mockRejectedValue({});
    getListDropdown.mockRejectedValue({});
    getSummary.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('failed fetch list detail customer', async () => {
    useRouter.mockReturnValue({ asPath: 'detail-customer', push: jest.fn() });
    useQueryParams.mockReturnValue({
      queryParams: { id: '123', params: '321' },
      isReady: true,
      setQueryParams: jest.fn(),
    });
    getListServices.mockRejectedValue({});
    getListDropdown.mockRejectedValue({});
    getSummary.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });
});
