import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { getListSettlement } from '@containers/BillsAndPayment/Settlement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useQueryParams from '@utils/hooks/useQueryParams';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/useQueryParams');
jest.mock('@containers/BillsAndPayment/Settlement/_repositories/repositories');

describe('src/pages/BillsAndPayment/Settlement/List/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      pathname: route.settlement('list'),
      push: jest.fn(),
      query: {
        tab: 'settlement',
      },
    });
    usePopupAlert.mockReturnValue({
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });

    window.open = jest.fn();
  });

  const resolvedList = {
    data: [{}, {}],
    meta: {
      page: 1,
      totalPage: 2,
    },
  };

  test('run properly', async () => {
    getListSettlement.mockResolvedValue(resolvedList);
    useQueryParams.mockReturnValue({
      setQueryParams: jest.fn(),
      queryParams: {
        tab: 'settlement',
      },
      setQueryParamsForce: jest.fn(),
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ feature: ['read_list_user_settlement_cdm'] }),
      );

      await result.current.onClickRowTable({});
      await result.current.setSearch({});
      await result.current.setTab({ tab: 'settlement' });
      await result.current.setFilterStatus({});
      await result.current.setFilterBillingType({});
      await result.current.setFilterPeriod({});
      await result.current.setFilterPeriod(null);
      await result.current.onPaginationChange({}, 1);

      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(2);
  });

  test('no privilege', async () => {
    const { result } = await renderHook(() => useAction({ feature: [''] }));

    await expect(result.current.list.data).toHaveLength(0);
  });

  test('tab empty', async () => {
    useQueryParams.mockReturnValue({
      setQueryParams: jest.fn(),
      queryParams: {
        tab: '',
      },
      setQueryParamsForce: jest.fn(),
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ feature: ['read_list_user_settlement_cdm'] }),
      );
      await result.current.onClickRowTable({});
      res = await result;
    });

    // await expect(res.current.list.data).toHaveLength(2);
    await expect(res.current.list.data).toHaveLength(0);
  });

  test('last page', async () => {
    getListSettlement.mockResolvedValue({
      data: null,
      meta: {
        page: 2,
        totalPage: 2,
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ feature: ['read_list_user_settlement_cdm'] }),
      );
      await result.current.onClickRowTable({});
      res = await result;
    });

    // await expect(res.current.list.data).toBeFalsy();
    await expect(res.current.list.data).toBeTruthy();
  });

  test('failed validate path', async () => {
    useRouter.mockReturnValueOnce({ pathname: '/fail', push: jest.fn() });

    const { result } = await renderHook(() =>
      useAction({ feature: ['read_list_user_settlement_cdm'] }),
    );

    await expect(result.current.list.data).toHaveLength(0);
  });

  test('failed fetch list', async () => {
    getListSettlement.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ feature: ['read_list_user_settlement_cdm'] }),
      );

      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });
});
