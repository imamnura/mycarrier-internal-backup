import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import {
  getDetailDraftBillingReminder,
  postDraftBillingReminder,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';

import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

jest.mock('next/router');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/BillingReminder/Create/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    usePopupAlert.mockReturnValue({
      setSuccessAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
    });

    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });

    useRouter.mockReturnValue({
      query: { bpNumber: '1', count: '2', id: '3' },
      push: jest.fn(),
    });
  });

  const props = { feature: [] };

  test('run properly', async () => {
    getDetailDraftBillingReminder.mockResolvedValue({
      data: { step: 3 },
    });
    postDraftBillingReminder.mockResolvedValue({
      data: {},
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onDiscard();
      await result.current.fetchDiscard();
      await result.current.redirect();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run properly step null', async () => {
    getDetailDraftBillingReminder.mockResolvedValue({
      data: {},
    });
    postDraftBillingReminder.mockResolvedValue({
      data: {},
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onDiscard();
      await result.current.fetchDiscard();
      await result.current.redirect();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run fail fetch', async () => {
    getDetailDraftBillingReminder.mockRejectedValue({ data: {} });
    postDraftBillingReminder.mockRejectedValue({
      data: {},
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));
      await result.current.fetchDiscard();
      res = await result;
    });

    await expect(res.current.data).toBeFalsy();
  });

  test('run properly reminder id null', async () => {
    useRouter.mockReturnValue({
      query: { bpNumber: '1', count: '2' },
      push: jest.fn(),
    });
    getDetailDraftBillingReminder.mockResolvedValue({
      data: {},
    });
    postDraftBillingReminder.mockResolvedValue({
      data: {},
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onDiscard();
      await result.current.fetchDiscard();
      await result.current.redirect();

      res = await result;
    });

    await expect(res.current.data).toBeFalsy();
  });
});
