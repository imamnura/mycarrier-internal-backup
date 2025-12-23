import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import {
  getListCustomer,
  getListDropdown,
} from '../../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

jest.mock('../../../../_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/containers/ServiceDelivery/ProductList/List/hooks/useActions', () => {
  afterEach(cleanup);

  beforeAll(() => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.serviceList('list'),
      push: jest.fn(),
    });
    getListDropdown.mockResolvedValue({
      data: [{ value: '', label: 'All Customer' }],
    });
  });

  const resolvedList = {
    data: [
      {
        custAccntNum: '300105862-123',
      },
    ],
    meta: {
      page: 1,
      totalPage: 3,
    },
  };

  const feature = ['read_list_service_list', 'read_detail_service_list'];

  test('run properly', async () => {
    getListCustomer.mockResolvedValue(resolvedList);
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

  test('last page', async () => {
    getListCustomer.mockResolvedValue({
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
    getListCustomer.mockResolvedValue(resolvedList);

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions({ feature: [] }));

      await result.current.onClickRowTable(resolvedList.data[0]);
      await result.current.setSearch('s');
      await result.current.filter.company.onChange({ value: 's' });
      await result.current.filter.date.onChange('test');

      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('failed fetch list', async () => {
    getListCustomer.mockRejectedValue({});
    getListDropdown.mockRejectedValue({});

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });
});
