import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import { getListBroadcastInformation } from '../../../_repositories/repositories';
import useActions from '../useAction';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

jest.mock('../../../_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/containers/Broadcast/BroadcastInformation/List/hooks/useActions', () => {
  afterEach(cleanup);

  beforeAll(() => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.broadcastInformation('list'),
      push: jest.fn(),
      query: { id: 'id' },
    });
  });

  const resolvedList = {
    data: [
      {
        broadcastId: 123,
        contactGroup: 'Blasting WA RAFI MyCarrier Customer',
        createdDate: '2022-03-16T09:08:21.173Z',
        name: 'Ucapan Idul Fitri 2022_Cust',
        status: 'preparation',
      },
    ],
    meta: {
      page: 1,
      totalPage: 2,
    },
  };

  const feature = [
    'read_list_broadcast_information_cdm',
    'read_detail_broadcast_information_cdm',
    'create_broadcast_information_cdm',
  ];

  test('run properly', async () => {
    getListBroadcastInformation.mockResolvedValue(resolvedList);

    const props = { feature };

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      await waitForValueToChange(() => result.current.list);
      await result.current.onClickRowTable(resolvedList.data[0]);
      await result.current.onClickRowTable({
        ...resolvedList.data[0],
        status: 'complete',
      });
      await result.current.onClickCreateBroadcast();
      await result.current.setFilterCreatedDate(new Date().toJSON());
      await result.current.onPaginationChange({}, 1);
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(1);
  });

  test('last page', async () => {
    getListBroadcastInformation.mockResolvedValue({
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

    await expect(res.current.list.data).toBe(null);
  });

  test('empty privilege', async () => {
    getListBroadcastInformation.mockResolvedValue(resolvedList);

    const props = { feature: [] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.onClickRowTable({
        ...resolvedList.data[0],
        status: 'complete',
      });

      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(1);
  });

  test('failed validate path', async () => {
    useRouter.mockReturnValueOnce({
      pathname: '/fail',
      push: jest.fn(),
      query: { id: 'id' },
    });
    const props = { feature };

    const { result } = await renderHook(() => useActions(props));

    await expect(result.current.list.data).toHaveLength(0);
  });

  test('failed fetch list', async () => {
    getListBroadcastInformation.mockRejectedValue({});

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });
});
