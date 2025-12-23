import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import {
  getListSummaryReminderLetter,
  getListSummaryThanksLetter,
  getSummaryReminderLetter,
  getSummaryThanksLetter,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('@utils/hooks/usePopupAlert');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/Dashboard/elements/PaymentHistorical/elements/SummaryLetter/hooks/useAction', () => {
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
    getListSummaryReminderLetter.mockResolvedValue({
      data: [{}],
    });
    getListSummaryThanksLetter.mockResolvedValue({
      data: [{}],
    });
    getSummaryReminderLetter.mockResolvedValue({
      data: {
        summary: [
          {
            total: 1,
            label: 'satu',
          },
        ],
      },
    });
    getSummaryThanksLetter.mockResolvedValue({
      data: {
        summary: [
          {
            total: 1,
            label: 'satu',
          },
        ],
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props, ref));

      await result.current.sorting({ value: 1 }, { value: 2 });
      await result.current.setReminderPeriod('2023-11-23T03:56:24.402Z');
      await result.current.setThanksPeriod('2023-11-23T03:56:24.402Z');
      await result.current.refSummaryLetter.current.onRefresh();
      await result.current.onOpenReminder('thanksLetter')();
      await result.current.onOpenThanks('thanksLetter')();

      res = await result;
    });

    await expect(res.current.thanksLetter).toBeTruthy();
  });

  test('failed fetch list', async () => {
    getSummaryReminderLetter.mockRejectedValue({});
    getSummaryThanksLetter.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props, ref));

      res = await result;
    });

    await expect(res.current.thanksLetter).toBeTruthy();
  });

  test('run without privileges', async () => {
    getListSummaryReminderLetter.mockResolvedValue({
      data: [{}],
    });
    getListSummaryThanksLetter.mockResolvedValue({
      data: [{}],
    });
    getSummaryReminderLetter.mockResolvedValue({
      data: {
        summary: [
          {
            total: 1,
            label: 'satu',
          },
        ],
      },
    });
    getSummaryThanksLetter.mockResolvedValue({
      data: {
        summary: [
          {
            total: 1,
            label: 'satu',
          },
        ],
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ feature: [''] }, ref),
      );

      await result.current.refSummaryLetter.current.onRefresh();

      res = await result;
    });

    await expect(res.current.thanksLetter).toBeTruthy();
  });
});
