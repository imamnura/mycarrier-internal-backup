import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { getDetailDataUnsettle } from '@containers/BillsAndPayment/DataUnsettle/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useQueryParams from '@utils/hooks/useQueryParams';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/useQueryParams');
jest.mock(
  '@containers/BillsAndPayment/DataUnsettle/_repositories/repositories',
);

describe('src/containers/BillsAndPayment/DataUnsettle/Detail/element/ListOfDetail/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useQueryParams.mockReturnValue({
      setQueryParams: jest.fn(),
      queryParams: {
        cutOffDate: null,
      },
    });
    useRouter.mockReturnValue({
      pathname: route.dataUnsettle('list'),
      push: jest.fn(),
      query: {
        segment: 'id',
        invoiceGroup: 'id',
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
    getDetailDataUnsettle.mockResolvedValue(resolvedList);
    useQueryParams.mockReturnValueOnce({
      setQueryParams: jest.fn(),
      queryParams: {
        cutOffDate: new Date(),
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction({ feature: [] }));

      await result.current.setSearch({});
      await result.current.setFilterIddb({});
      await result.current.setFilterAging({});
      // await result.current.setFilterDate(new Date());
      await result.current.useSort[1]({});
      await result.current.useOrderBy[1]({});
      await result.current.setFilterMonth({ label: 'All Month', value: '' });
      await result.current.setFilterYear({ label: 'All Year', value: '' });
      await result.current.setFilterYear({ label: '2024', value: '2024' });
      res = await result;
    });

    await expect(res.current.list).toHaveLength(2);
  });

  test('others', async () => {
    getDetailDataUnsettle.mockResolvedValue({
      data: [],
      meta: {
        page: 2,
        totalPage: 2,
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction({ feature: [] }));
      res = await result;
    });

    await expect(res.current.list).toHaveLength(0);
  });

  test('empty id', async () => {
    useRouter.mockReturnValueOnce({
      query: {},
      pathname: '/fail',
      push: jest.fn(),
    });

    const { result } = await renderHook(() => useAction({ feature: [] }));

    await expect(result.current.list).toHaveLength(0);
  });

  test('failed fetch list', async () => {
    getDetailDataUnsettle.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction({ feature: [] }));
      res = await result;
    });

    await expect(res.current.list).toHaveLength(0);
  });
});
