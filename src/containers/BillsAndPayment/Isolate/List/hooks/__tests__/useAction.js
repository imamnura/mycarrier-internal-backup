import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import {
  getListIsolate,
  getOptionProduct,
} from '../../../_repositories/repositories';
import useActions from '../useAction';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import useQueryParams from '@utils/hooks/useQueryParams';

jest.mock('../../../_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/useQueryParams');

describe('src/containers/BillsAndPayment/Isolate/List/hooks/useActions', () => {
  afterEach(cleanup);

  beforeAll(() => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.isolate('list'),
      push: jest.fn(),
      query: {},
    });
    useQueryParams.mockReturnValue({
      queryParams: {},
      setQueryParams: jest.fn(),
    });
    getOptionProduct.mockResolvedValue({ data: ['Astinet'] });
  });

  const resolvedList = {
    data: [
      {
        id: '634ceb581a110e163f56e373',
        am: 'AGA CHRISTIE NUR VANTOKO',
        customer: 'PT. LAYANAN PRIMA DIGITAL',
        regional: 'REGION 2',
        sid: '300105862-0031060031',
        product: 'IP PBX',
        billing: 26310000,
        isolateBy: '900096',
        serviceLocation: 'C3001058626_HR RASUNA SAID_70',
        isolateDate: '2022-09-01T00:00:00.000Z',
        submitDate: '2022-10-17T05:42:48.462Z',
        status: 'Isolated',
      },
    ],
    meta: {
      page: 1,
      totalPage: 3,
    },
  };

  const feature = ['read_list_isolate_cdm', 'read_detail_isolate_cdm'];

  test('run properly', async () => {
    getListIsolate.mockResolvedValue(resolvedList);
    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.onClickRowTable(resolvedList.data[0]);
      await result.current.onPaginationChange({}, 1);

      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(1);
  });

  test('last page', async () => {
    getListIsolate.mockResolvedValue({
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

    await expect(res.current.list.data).toBeFalsy();
  });

  test('empty privilege', async () => {
    getListIsolate.mockResolvedValue(resolvedList);

    const props = { feature: [] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setSearch('s');
      await result.current.setFilterProduct({ value: 's' });

      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('failed validate path', async () => {
    useRouter.mockReturnValueOnce({
      pathname: '/fail',
      push: jest.fn(),
      query: { id: 'id' },
    });
    const props = { feature };
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('failed fetch list', async () => {
    getListIsolate.mockRejectedValue({});
    getOptionProduct.mockRejectedValue({});

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });
});
