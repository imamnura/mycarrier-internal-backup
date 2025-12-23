import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import {
  getDownloadListInvoiceSummary,
  getDownloadSummaryReminderLetter,
  getDownloadSummaryThanksLetter,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('@utils/hooks/usePopupAlert');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/Dashboard/elements/PaymentHistorical/elements/PopUpListSubmittedPIC/hooks/useAction', () => {
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
    type: 'invoice',
    staticFilter: {
      status: '',
    },
    api: jest.fn().mockReturnValue({
      data: [{}],
    }),
  };

  test('run properly', async () => {
    getDownloadListInvoiceSummary.mockResolvedValue({
      data: {
        fileUrlDownload: '',
      },
    });
    getDownloadSummaryReminderLetter.mockResolvedValue({
      data: {
        fileUrlDownload: '',
      },
    });
    getDownloadSummaryThanksLetter.mockResolvedValue({
      data: {
        fileUrlDownload: '',
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onPaginationChange({}, 1);
      await result.current.onDownload();

      res = await result;
    });

    await expect(res.current.list.data).toBeTruthy();
  });

  test('failed fetch list', async () => {
    getDownloadListInvoiceSummary.mockRejectedValue({});
    getDownloadSummaryReminderLetter.mockRejectedValue({});
    getDownloadSummaryThanksLetter.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({
          ...props,
          api: jest.fn().mockRejectedValue({
            data: {},
          }),
        }),
      );

      await result.current.onDownload();
      res = await result;
    });

    await expect(res.current.list.data).toBeTruthy();
  });
});
