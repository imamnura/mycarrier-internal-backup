import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { getListProject } from '@containers/ServiceDelivery/ServiceList/_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

jest.mock('@containers/ServiceDelivery/ServiceList/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/containers/ServiceDelivery/ServiceList/List/ProjectAndService/lib/ProjectList/hooks/useActions', () => {
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

  const feature = ['read_detail_service_list'];

  test('run properly', async () => {
    useRouter.mockReturnValue({
      query: { id: '123' },
      push: jest.fn(),
      isReady: true,
    });
    getListProject.mockResolvedValue(resolvedList);
    const props = { feature };

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
    useRouter.mockReturnValue({
      query: { id: '123' },
      push: jest.fn(),
      isReady: false,
    });
    getListProject.mockResolvedValue(resolvedList);
    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('last page', async () => {
    useRouter.mockReturnValue({
      query: { id: '123' },
      push: jest.fn(),
      isReady: true,
    });
    getListProject.mockResolvedValue({
      data: null,
      meta: {
        page: 2,
        totalPage: 2,
      },
    });

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('empty privilege', async () => {
    useRouter.mockReturnValue({
      query: { id: '123' },
      push: jest.fn(),
      isReady: true,
    });
    getListProject.mockResolvedValue(resolvedList);

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions({ feature: [] }));

      await result.current.onClickRowTable(resolvedList.data[0]);
      await result.current.setSearch('s');

      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('failed fetch list', async () => {
    useRouter.mockReturnValue({
      query: { id: '123' },
      push: jest.fn(),
      isReady: true,
    });
    getListProject.mockRejectedValue({});

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });
});
