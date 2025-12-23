import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import { route } from '@configs';
import {
  getDownloadDataUnsettle,
  getListDataUnsettle,
} from '@containers/BillsAndPayment/DataUnsettle/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useQueryParams from '@utils/hooks/useQueryParams';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/useQueryParams');
jest.mock(
  '@containers/BillsAndPayment/DataUnsettle/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/DataUnsettle/List/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useQueryParams.mockReturnValue({
      setQueryParams: jest.fn(),
      queryParams: {},
    });
    useRouter.mockReturnValue({
      pathname: route.dataUnsettle('list'),
      push: jest.fn(),
      query: {},
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
    getListDataUnsettle.mockResolvedValue(resolvedList);
    getDownloadDataUnsettle.mockResolvedValue({ data: {} });
    useQueryParams.mockReturnValueOnce({
      setQueryParams: jest.fn(),
      queryParams: {
        cutOffDate: new Date(),
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ feature: ['read_detail_data_unsettle'] }),
      );

      await result.current.setSearch({});
      await result.current.setFilterSegment({});
      // await result.current.setFilterDate({});
      await result.current.setSearch({});
      await result.current.useSort[1]({});
      await result.current.useOrderBy[1]({});
      await result.current.onClickRowTable(resolvedList.data[0]);
      await result.current.onDownload();
      await result.current.setFilterMonth({ label: 'All Month', value: '' });
      await result.current.setFilterYear({ label: 'All Year', value: '' });
      await result.current.setFilterYear({ label: '2024', value: '2024' });
      res = await result;
    });

    await expect(res.current.list).toHaveLength(0);
  });

  test('others', async () => {
    getListDataUnsettle.mockResolvedValue({
      data: [],
      meta: {
        page: 2,
        totalPage: 2,
      },
    });
    getDownloadDataUnsettle.mockResolvedValue({ data: {} });

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ feature: ['read_detail_data_unsettle'] }),
      );
      await result.current.onClickRowTable({});
      await result.current.onDownload();

      res = await result;
    });

    await expect(res.current.list).toHaveLength(0);
  });

  test('last page', async () => {
    getListDataUnsettle.mockResolvedValue({
      data: [],
      meta: {
        page: 2,
        totalPage: 2,
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction({ feature: [] }));
      await result.current.onClickRowTable({});
      res = await result;
    });

    await expect(res.current.list).toHaveLength(0);
  });

  test('failed validate path', async () => {
    useRouter.mockReturnValueOnce({ pathname: '/fail', push: jest.fn() });

    const { result } = await renderHook(() => useAction({ feature: [] }));

    await expect(result.current.list).toHaveLength(0);
  });

  test('failed fetch list', async () => {
    getListDataUnsettle.mockRejectedValue({});
    getDownloadDataUnsettle.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction({ feature: [] }));
      await result.current.onDownload();
      res = await result;
    });

    await expect(res.current.list).toHaveLength(0);
  });
});
