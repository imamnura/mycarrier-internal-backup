import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useClaim from '../useClaim';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { getListClaim } from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';

jest.mock('next/router');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/elements/ListOfDocument/hooks/useClaim', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: 'bpNumber', type: 'claim' },
      asPath: route.billsAndPayment('detail', 'bpNumber') + `?type=claim`,
      push: jest.fn(),
    });
  });

  const resolvedList = {
    data: [
      {
        claimCategory: 'xx',
        status: '7',
      },
      {
        claimCategory: 'xx',
      },
    ],
    meta: {
      page: 1,
      totalPage: 2,
    },
  };

  test('run properly', async () => {
    getListClaim.mockResolvedValue(resolvedList);

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useClaim());

      await result.current.table.onPaginationChange({}, 1);

      await result.current.table.onClickRow(resolvedList.data[0]);
      res = await result;
    });

    await expect(res.current.table.data).toHaveLength(2);
  });

  test('last page', async () => {
    getListClaim.mockResolvedValue({
      data: null,
      meta: {
        page: 2,
        totalPage: 2,
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useClaim());
      res = await result;
    });

    await expect(res.current.table.data).toHaveLength(0);
  });

  test('failed validate path', async () => {
    useRouter.mockReturnValueOnce({
      pathname: '/fail',
      push: jest.fn(),
      query: { id: 'id', type: 'claim' },
    });

    const { result } = await renderHook(() => useClaim());

    await expect(result.current.table.data).toHaveLength(0);
  });

  test('failed fetch list', async () => {
    getListClaim.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useClaim());
      res = await result;
    });

    await expect(res.current.table.data).toHaveLength(0);
  });
});
