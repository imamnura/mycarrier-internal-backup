import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import {
  getPaymentHistoryList,
  postPaymentHistoryFile,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('@utils/hooks/usePopupAlert');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/Dashboard/elements/PaymentHistorical/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    usePopupAlert.mockReturnValue({
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
  });

  test('run properly', async () => {
    getPaymentHistoryList.mockResolvedValue({
      data: [{}],
      meta: { page: 1, totalPage: 10 },
    });
    postPaymentHistoryFile.mockResolvedValue({
      data: {},
    });

    let res;

    let ref = { current: null };
    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useAction({ feature: ['create_upload_historical_payment'] }, ref),
      );

      await result.current.fetchList(false);
      await result.current.onUpload('Payment')({});
      await result.current.onUpload('')({});
      await result.current.onClosePopUpListSubmit();
      // await result.current.onBottomPage();
      await waitForValueToChange(() => result.current.list);
      // await result.current.onBottomPage();
      await result.current.refPaymentHistorical.current.onRefresh();

      res = await result;
    });

    await expect(res.current.list.data).toBeTruthy();
  });

  test('failed fetch list', async () => {
    getPaymentHistoryList.mockRejectedValue({});
    postPaymentHistoryFile.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ feature: ['create_upload_historical_payment'] }),
      );
      await result.current.onUpload('')({});
      res = await result;
    });

    await expect(res.current.list.data).toBeTruthy();
  });

  test('run without privileges', async () => {
    getPaymentHistoryList.mockResolvedValue({
      data: [{}],
      meta: { page: 1, totalPage: 10 },
    });
    postPaymentHistoryFile.mockResolvedValue({
      data: {},
    });

    let res;

    let ref = { current: null };
    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ feature: [''] }, ref),
      );

      await result.current.fetchList(false);

      res = await result;
    });

    await expect(res.current.list.data).toBeTruthy();
  });
});
