import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import {
  getListRequest,
  getDetailCustomer,
} from '../../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

jest.mock('../../../../_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/useQueryParams');

describe('src/containers/ServiceDelivery/IPPrefix/List/Request/hooks/useActions', () => {
  afterEach(cleanup);

  beforeAll(() => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      asPath: route.ipPrefix('request', '0003700007'),
      query: { id: '0003700007' },
      push: jest.fn(),
    });
  });

  const resolvedList = {
    data: [
      {
        requestId: 'LOA652208289',
        createdAt: '2023-10-06T06:34:12.069Z',
        asNumber: 'Edit4321sd',
        originAsNumber: 'Edit4321sd',
        status: 'on progress',
      },
      {
        requestId: 'LOA340721418',
        createdAt: '2023-10-06T02:03:23.248Z',
        asNumber: '54321',
        originAsNumber: '54321',
        status: 'completed',
      },
    ],
    meta: {
      page: 1,
      totalPage: 2,
    },
  };

  const resolvedDetail = {
    data: {
      custAccntNum: '0003700007',
      custAccntName: 'PT INDOSAT TBK',
      lastUpdate: '2023-10-11T01:05:36.847Z',
    },
  };

  const props = {
    feature: ['read_detail_customer_ip_prefix', 'read_detail_ip_prefix'],
  };

  test('run properly', async () => {
    getListRequest.mockResolvedValue(resolvedList);
    getDetailCustomer.mockResolvedValue(resolvedDetail);

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      result.current.onClickRowTable(resolvedList.data[0]);
      // result.current.onBottomPage();
      await waitForValueToChange(() => result.current.list);
      // result.current.onBottomPage();

      res = result;
    });

    expect(res.current.list.data).toHaveLength(2);
  });

  test('last page & has no access to detail request', async () => {
    const props = {
      feature: ['read_detail_customer_ip_prefix'],
    };

    getListRequest.mockResolvedValue({
      data: [],
      meta: {
        page: 2,
        totalPages: 2,
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      result.current.onClickRowTable(resolvedList.data[0]);
      res = result;
    });

    expect(res.current.list.data).toHaveLength(0);
  });

  test('empty privilege', async () => {
    getListRequest.mockResolvedValue(resolvedList);

    const props = { feature: [] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      res = result;
    });

    expect(res.current.list.data).toHaveLength(2);
  });

  test('failed validate path', async () => {
    useRouter.mockReturnValue({
      asPath: '/wrong-path',
      query: { id: '365' },
      push: jest.fn(),
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = result;
    });

    expect(res.current.list.data).toHaveLength(0);
  });

  test('fail to fetch', async () => {
    getListRequest.mockRejectedValue({ code: 400, message: 'Bad Request' });
    getDetailCustomer.mockRejectedValue({ code: 400, message: 'Bad Request' });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      result.current.onClickRowTable(resolvedList.data[0]);
      res = result;
    });

    expect(res.current.list.data).toHaveLength(0);
  });
});
