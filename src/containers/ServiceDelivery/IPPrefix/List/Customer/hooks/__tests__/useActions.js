import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import { getListCustomerIPPrefix } from '../../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

jest.mock('../../../../_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/useQueryParams');

describe('src/containers/ServiceDelivery/IPPrefix/List/Customer/hooks/useActions', () => {
  afterEach(cleanup);

  beforeAll(() => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.ipPrefix('list-customer'),
      push: jest.fn(),
    });
  });

  const resolvedList = {
    data: [
      {
        custAccntNum: '0003700029',
        custAccntName: 'GRATIKA',
        lastUpdate: '10/05/2019 01:05',
        isNewRequest: false,
      },
      {
        custAccntNum: '0003700029',
        custAccntName: 'GRATIKA',
        lastUpdate: '10/05/2019 01:05',
        isNewRequest: true,
      },
    ],
    meta: {
      page: 1,
      totalPage: 2,
    },
  };

  const feature = [
    'read_list_customer_ip_prefix',
    'read_detail_customer_ip_prefix',
  ];

  test('run properly', async () => {
    getListCustomerIPPrefix.mockResolvedValue(resolvedList);
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
      await result.current.onClickModalDownload()();

      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(2);
  });

  test('last page', async () => {
    getListCustomerIPPrefix.mockResolvedValue({
      data: null,
      meta: {
        page: 2,
        totalPage: 2,
      },
    });

    const props = { feature: ['read_list_customer_ip_prefix'] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      await result.current.onClickRowTable(resolvedList.data[0]);
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('empty privilege', async () => {
    getListCustomerIPPrefix.mockResolvedValue(resolvedList);

    const props = { feature: [] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setSearch('s');
      await result.current.filter.dateRange.onChange([
        '2022-10-18',
        '2022-10-19',
      ]);

      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(2);
  });

  test('failed validate path', async () => {
    useRouter.mockReturnValueOnce({ pathname: '/fail', push: jest.fn() });
    const props = { feature };
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('failed fetch list', async () => {
    getListCustomerIPPrefix.mockRejectedValue({});

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });
});
