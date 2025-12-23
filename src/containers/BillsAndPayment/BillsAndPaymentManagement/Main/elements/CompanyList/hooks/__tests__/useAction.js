import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { getListBillsAndPaymentManagement } from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/List/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: 'bpNumber' },
      asPath: route.billsAndPayment('list'),
      push: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
  });

  const resolvedList = {
    data: [{}, {}],
    meta: {
      page: 1,
      totalPage: 2,
    },
  };

  test('run properly', async () => {
    getListBillsAndPaymentManagement.mockResolvedValue(resolvedList);

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ feature: ['read_detail_company', 'read_list_company_am'] }),
      );

      await result.current.onPaginationChange({}, 2);
      await result.current.onClickRowTable(resolvedList.data[0]);
      await result.current.setTab('company-list');
      await result.current.setFilterProfileByAssessment('');
      await result.current.setFilterLastUpdate([null, null]);
      await result.current.onRefresh();

      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(2);
  });

  test('failed validate path', async () => {
    useRouter.mockReturnValueOnce({
      pathname: '/fail',
      push: jest.fn(),
      query: { id: 'id' },
    });

    const { result } = await renderHook(() => useAction({ feature: [] }));

    await result.current.onClickRowTable(resolvedList.data[0]);

    await expect(result.current.list.data).toHaveLength(0);
  });

  test('failed fetch list', async () => {
    getListBillsAndPaymentManagement.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ feature: ['read_list_company_am'] }),
      );
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });
});
