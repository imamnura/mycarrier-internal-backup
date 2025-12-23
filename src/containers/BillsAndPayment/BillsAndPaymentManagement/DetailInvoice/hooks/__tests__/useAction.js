import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import {
  deleteInvoiceAttachment,
  generateInvoice,
  getDetailInvoice,
  reBundlingDocument,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import useToast from '@utils/hooks/useToast';

jest.mock('next/router');
jest.mock('@utils/hooks/useDocumentViewer');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock('@utils/hooks/useToast');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/DetailInvoice/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: 'bpNumber', params: 'invoiceNumber' },
      push: jest.fn(),
    });
    useToast.mockReturnValue({
      setSuccessToast: jest.fn(),
      setErrorToast: jest.fn(),
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

  const props = {
    feature: ['read_detail_invoice', 'read_detail_payment'],
  };

  test('run properly', async () => {
    getDetailInvoice.mockResolvedValue({ data: {} });
    deleteInvoiceAttachment.mockResolvedValue({ data: {} });
    generateInvoice.mockResolvedValue({ data: {} });
    reBundlingDocument.mockResolvedValue({ data: {} });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.fetcherUploadAttachment({})({});
      await result.current.fetchDeleteAttachment()();
      await result.current.onDeleteAttachment()()();
      await result.current.onUploadAttachment();
      await result.current.onRegenerateInvoice();
      await result.current.onSwitch();
      // await result.current.fetchRebundlingDocument();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run fail fetch', async () => {
    getDetailInvoice.mockRejectedValue({ data: {} });
    deleteInvoiceAttachment.mockRejectedValue({ data: {} });
    generateInvoice.mockRejectedValue({ data: {} });
    reBundlingDocument.mockRejectedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onUploadAttachment();
      await result.current.onRegenerateInvoice();
      // await result.current.fetchRebundlingDocument();

      res = await result;
    });

    await expect(res.current.data).toBeFalsy();
  });

  test('empty bpNumber', async () => {
    useRouter.mockReturnValue({ query: { id: '' }, push: jest.fn() });
    getDetailInvoice.mockRejectedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));
      res = await result;
    });

    await expect(res.current.data).toBeFalsy();
  });
});
