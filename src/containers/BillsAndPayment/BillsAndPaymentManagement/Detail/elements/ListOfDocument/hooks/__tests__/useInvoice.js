import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useInvoice from '../useInvoice';
import { useRouter } from 'next/router';
import { route } from '@configs';
import {
  getListInvoice,
  refreshInvoice,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('next/router');
jest.mock('@utils/hooks/useDocumentViewer');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/elements/ListOfDocument/hooks/useInvoice', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: 'bpNumber', type: 'invoice' },
      asPath: route.billsAndPayment('detail', 'bpNumber') + `?type=invoice`,
      push: jest.fn(),
    });
    useDocumentViewer.mockReturnValue({
      setDocumentViewer: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
  });

  const resolvedList = {
    data: [
      {
        status: 'Overdue',
        invoiceInternalFile: {
          fileUrl: '-',
          fileName: '-',
        },
      },
      {
        status: 'Other',
        invoiceIbssAttachment: {
          invoice: {
            fileUrl: '-',
          },
        },
      },
    ],
    meta: {
      page: 1,
      totalPage: 2,
    },
  };

  test('run properly', async () => {
    getListInvoice.mockResolvedValue(resolvedList);
    refreshInvoice.mockResolvedValue({
      data: {
        status: 'x',
        statusName: 'x',
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useInvoice());

      await result.current.table.onPaginationChange({}, 1);
      await result.current.table.onClickRow(resolvedList.data[0]);
      await result.current.table.useOrderDirection[1]('asc');
      await result.current.filter[3].onChange({ value: new Date().toJSON() });
      await result.current.filter[3].onChange({});
      await result.current.filter[2].onChange({ value: new Date().toJSON() });
      await result.current.filter[2].onChange({});
      await result.current.onPreviewDocument({})();
      await result.current.onClickRefresh({})({ stopPropagation: jest.fn() });
      res = await result;
    });

    await expect(res.current.table.data).toHaveLength(2);
  });

  test('last page', async () => {
    getListInvoice.mockResolvedValue({
      data: null,
      meta: {
        page: 2,
        totalPage: 2,
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useInvoice());
      res = await result;
    });

    await expect(res.current.table.data).toHaveLength(0);
  });

  test('failed validate path', async () => {
    useRouter.mockReturnValueOnce({
      pathname: '/fail',
      push: jest.fn(),
      query: { id: 'id', type: 'invoice' },
    });

    const { result } = await renderHook(() => useInvoice());

    await expect(result.current.table.data).toHaveLength(0);
  });

  test('failed fetch list', async () => {
    getListInvoice.mockRejectedValue({});
    refreshInvoice.mockResolvedValue({
      data: null,
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useInvoice());

      await result.current.onClickRefresh({})({ stopPropagation: jest.fn() });
      await result.current.redirectToPayment({ invoiceNumber: 'x' })();
      res = await result;
    });

    await expect(res.current.table.data).toHaveLength(0);
  });

  test('failed fetch refredh', async () => {
    getListInvoice.mockRejectedValue({});
    refreshInvoice.mockRejectedValue({
      data: null,
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useInvoice());

      await result.current.onClickRefresh({})({ stopPropagation: jest.fn() });
      res = await result;
    });

    await expect(res.current.table.data).toHaveLength(0);
  });
});
