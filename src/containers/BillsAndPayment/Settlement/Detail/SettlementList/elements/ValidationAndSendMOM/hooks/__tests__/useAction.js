import {
  generateDocument,
  updateStatusSettlementList,
} from '@containers/BillsAndPayment/Settlement/_repositories/repositories';
import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import useAction from '../useAction';

jest.mock('@containers/BillsAndPayment/Settlement/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/BillsAndPayment/Settlement/Detail/Users/hooks/useAction', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({ query: { id: 'id' }, push: jest.fn() });
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    window.open = jest.fn();
  });

  test('run properly', async () => {
    const props = {
      defaultValues: {},
      onClose: jest.fn(),
      open: true,
      setDetailData: jest.fn(),
      detailData: { status: 'cdm_generate_settlement' },
    };
    generateDocument.mockResolvedValue({ data: {} });
    updateStatusSettlementList.mockResolvedValue({ data: {} });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await act(async () => {
        await result.current.onDownloadRawMom();
        await result.current.onCancel();
        await result.current.onSendDocument();
        await result.current.onPrevious();
        await result.current.closeAllPopUp();
        await result.current.onSubmitValidation({
          customerSign: [{ emailStatus: 'test', test: 'test' }],
        });
        await result.current.fetchSubmitDocument();
        await result.current.onAddCustomer();
        await result.current.onDeleteCustomer(1)();
      });

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('failed fetch', async () => {
    const props = {
      defaultValues: {},
      onClose: jest.fn(),
      open: true,
      setDetailData: jest.fn(),
    };
    generateDocument.mockRejectedValue({ data: {} });
    updateStatusSettlementList.mockRejectedValue({ data: {} });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await act(async () => {
        await result.current.onSubmitValidation({});
        await result.current.fetchSubmitDocument();
      });

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('empty default values', async () => {
    const props = {
      defaultValues: null,
      onClose: jest.fn(),
      open: true,
      setDetailData: jest.fn(),
    };

    const { result } = await renderHook(() => useAction(props));

    await expect(result.current.control).toBeTruthy();
  });

  test('open false', async () => {
    const props = {
      defaultValues: null,
      onClose: jest.fn(),
      open: false,
      setDetailData: jest.fn(),
    };

    const { result } = await renderHook(() => useAction(props));

    await expect(result.current.control).toBeTruthy();
  });
});
