import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import {
  getInvoiceSummary,
  getListInvoiceSummary,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('@utils/hooks/usePopupAlert');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/Dashboard/elements/PaymentHistorical/elements/SummayInvoice/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    usePopupAlert.mockReturnValue({
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    window.open = jest.fn();
  });

  let props = {
    feature: ['read_dashboard_bills_and_payment'],
    setPopUpList: jest.fn(),
  };
  let ref = { current: null };

  test('run properly', async () => {
    getInvoiceSummary.mockResolvedValue({
      data: {
        fileUrlDownload: '',
      },
    });
    getListInvoiceSummary.mockResolvedValue({
      data: {
        fileUrlDownload: '',
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props, ref));

      await result.current.setPeriod('2023-11-23T03:56:24.402Z');
      await result.current.onViewAll('completed')();
      await result.current.onViewAll('all')();
      await result.current.refSummaryInvoice.current.onRefresh();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('failed fetch list', async () => {
    getInvoiceSummary.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props, ref));

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run without privileges', async () => {
    getInvoiceSummary.mockResolvedValue({
      data: {
        fileUrlDownload: '',
      },
    });
    getListInvoiceSummary.mockResolvedValue({
      data: {
        fileUrlDownload: '',
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ feature: [''] }, ref),
      );

      await result.current.refSummaryInvoice.current.onRefresh();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });
});
