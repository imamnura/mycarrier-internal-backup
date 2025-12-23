import {
  generateDocument,
  getManagerPosition,
  updateStatusSettlementList,
  deleteCC,
} from '@containers/BillsAndPayment/Settlement/_repositories/repositories';
import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import useAction from '../useAction';

jest.mock('@containers/BillsAndPayment/Settlement/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock('@utils/hooks/useDocumentViewer');

describe('src/containers/BillsAndPayment/Settlement/Detail/Users/elements/SendNDE/hooks/useAction', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({ query: { id: 'id' }, push: jest.fn() });
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
    useDocumentViewer.mockReturnValue({
      closeDocumentViewer: jest.fn(),
      setDocumentViewer: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    window.open = jest.fn();
  });

  const props = {
    feature: [],
    onClose: jest.fn(),
    setDetailData: jest.fn(),
    recepientCC: [],
    setRecepientCC: jest.fn(),
  };

  test('run properly', async () => {
    deleteCC.mockResolvedValue({ data: {}, success: true });
    updateStatusSettlementList.mockResolvedValue({ data: {} });
    getManagerPosition.mockResolvedValue({ data: [{}] });
    generateDocument.mockResolvedValue({
      data: {
        fileName: '',
        fileTemplate: '',
        fileUrl: '',
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await act(async () => {
        await result.current.onDeleteReviewer(0)();
        await result.current.onAddRecipient();
        await result.current.onCancel();
        await result.current.closeAllPopUp();
        await result.current.onSubmitType();
        await result.current.onSubmit({ generalManager: {} });
        await result.current.onSubmitEdit({});
        await result.current.fileDownload({})();
        await result.current.setEdit({})();
        await result.current.onSendDocument({})();
        await result.current.fetchSubmitDocument({})();
        await result.current.fetchDeleteCC({})();
      });

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('failed fetch 1', async () => {
    deleteCC.mockRejectedValue({ data: {} });
    updateStatusSettlementList.mockRejectedValue({ data: {} });
    getManagerPosition.mockRejectedValue({ data: [{}] });
    generateDocument.mockRejectedValue({ data: {} });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await act(async () => {
        await result.current.onSubmit({ generalManager: {} });
        await result.current.onSubmitEdit({});
        await result.current.fetchSubmitDocument({})();
        await result.current.fetchDeleteCC({})();
      });

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('failed fetch 2', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ ...props, defaultApprovalType: '2' }),
      );

      await act(async () => {
        await result.current.onSubmit({ generalManager: {} });
      });

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
