import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import {
  getDetailApprovalSettlement,
  updateApprovalSettlement,
} from '@containers/BillsAndPayment/Settlement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('@containers/BillsAndPayment/Settlement/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/Broadcast/BroadcastInformation/Detail/hooks/useAction', () => {
  afterEach(cleanup);

  const resolvedDetail = {
    data: {
      reviewer: [{}, {}],
    },
  };

  beforeAll(() => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
    useRouter.mockReturnValue({
      asPath: route.settlement('detail', 'id'),
      push: jest.fn(),
      query: { id: 'hash' },
    });
  });

  const feature = [''];

  test('run properly', async () => {
    const props = { feature };

    getDetailApprovalSettlement.mockResolvedValue(resolvedDetail);
    updateApprovalSettlement.mockResolvedValue({ data: {} });

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useAction(props),
      );

      await waitForValueToChange(() => result.current.data);
      await result.current.redirect();
      await result.current.onApprovalAction('approved')();
      await result.current.onSubmitFormApproval('approve')({});
      await result.current.closeApprovalForm();
      await result.current.fetchUpdateStatus({})();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run fail fetch', async () => {
    const props = { feature };

    getDetailApprovalSettlement.mockRejectedValue({ data: null });
    updateApprovalSettlement.mockRejectedValue({ data: {} });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.fetchUpdateStatus({})();

      res = await result;
    });

    await expect(res.current.data).toBeFalsy();
  });

  test('empty id', async () => {
    useRouter.mockReturnValue({
      asPath: route.settlement('detail', 'id'),
      push: jest.fn(),
      query: { id: '' },
    });
    const props = { feature };

    const { result } = await renderHook(() => useAction(props));

    await expect(result.current.data).toBeNull();
  });
});
