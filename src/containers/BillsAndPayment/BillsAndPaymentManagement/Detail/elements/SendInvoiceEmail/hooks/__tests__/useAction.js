import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import { route } from '@configs';
import {
  getListInvoice,
  postSendInvoice,
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

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/elements/ListOfDocument/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: 'bpNumber' },
      asPath: route.billsAndPayment('detail', 'bpNumber'),
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

  const props = {
    type: 'billingReminder',
    onClose: jest.fn(),
    updateSendLog: jest.fn(),
    onPrevious: jest.fn(),
  };

  test('run properly', async () => {
    getListInvoice.mockResolvedValue(resolvedList);
    postSendInvoice.mockResolvedValue({
      data: {
        status: 'x',
        statusName: 'x',
      },
    });

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useAction(props),
      );

      await waitForValueToChange(() => result.current.table.data);
      await result.current.table.useSelectedRow[1](resolvedList.data[0]);
      // await result.current.filter[1].onChange({ value: new Date().toJSON() });
      // await result.current.filter[1].onChange({});
      // await result.current.filter[0].onChange({ value: new Date().toJSON() });
      await result.current.filter[0].onChange({});
      await result.current.onSubmit();
      await result.current.fetchSubmitInvoice();
      await result.current.onPreviewDocument({});
      await result.current.onPrevious();
      await result.current.table.onPaginationChange({}, 1);

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
      const { result } = await renderHook(() => useAction(props));
      res = await result;
    });

    await expect(res.current.table.data).toHaveLength(0);
  });

  test('failed validate path', async () => {
    useRouter.mockReturnValueOnce({
      pathname: '/fail',
      push: jest.fn(),
      query: { id: 'id' },
    });

    const { result } = await renderHook(() => useAction(props));

    await expect(result.current.table.data).toHaveLength(0);
  });

  test('failed fetch list', async () => {
    getListInvoice.mockRejectedValue({});
    postSendInvoice.mockRejectedValue({});
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.fetchSubmitInvoice();

      res = await result;
    });

    await expect(res.current.table.data).toHaveLength(0);
  });

  test('empty types', async () => {
    const { result } = await renderHook(() =>
      useAction({ ...props, type: '' }),
    );

    await expect(result.current.table.data).toHaveLength(0);
  });

  test('run type thanks letter', async () => {
    getListInvoice.mockResolvedValue(resolvedList);
    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ ...props, type: 'thanksLetter' }),
      );
      res = await result;
    });

    await expect(res.current.table.data).toHaveLength(2);
  });
});
