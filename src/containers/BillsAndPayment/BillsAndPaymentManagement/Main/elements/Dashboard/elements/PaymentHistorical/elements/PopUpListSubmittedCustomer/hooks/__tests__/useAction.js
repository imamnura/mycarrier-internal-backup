import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import {
  getListBillsAndPaymentManagement,
  postAttachmentPaymentHistory,
  postSendPaymentHistory,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useSnackbar } from 'notistack';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('notistack');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/Dashboard/elements/PaymentHistorical/elements/PopUpListSubmittedPIC/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useSnackbar.mockReturnValue({
      enqueueSnackbar: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });
  });

  let props = { data: [[]], onClose: jest.fn() };

  test('run properly', async () => {
    postSendPaymentHistory.mockResolvedValue({
      data: {},
    });
    postAttachmentPaymentHistory.mockResolvedValue({
      data: {},
    });
    getListBillsAndPaymentManagement.mockResolvedValue({
      data: [{}],
      meta: { page: 1, totalPage: 10 },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onDeleteData(0)();
      await result.current.onDeleteData(1)();
      await result.current.fetchOptionCompanyName('', [{}], { page: 1 });
      await result.current.onAddNewData();
      await result.current.setCompanyName({ data: {} });
      await result.current.onSubmitNewData();
      await result.current.onSend();
      await result.current.fetchSendData();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('failed fetch list', async () => {
    postSendPaymentHistory.mockRejectedValue({});
    postAttachmentPaymentHistory.mockRejectedValue({});
    getListBillsAndPaymentManagement.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.fetchOptionCompanyName('', [{}], { page: 1 });
      await result.current.fetchSendData();
      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });
});
