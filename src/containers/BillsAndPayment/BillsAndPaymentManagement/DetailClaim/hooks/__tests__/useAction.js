import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import {
  putStatusClaim,
  getDetailClaim,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/DetailClaim/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: 'bpNumber', params: 'claimId' },
      push: jest.fn(),
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

  const props = { feature: [] };

  const resolveData = {
    data: {
      customerDocument: [
        { documents: [{}] },
        { documents: [{}] },
        { documents: [{}] },
      ],
      internalDocument: {},
    },
  };

  test('run properly', async () => {
    getDetailClaim.mockResolvedValue(resolveData);
    putStatusClaim.mockResolvedValue(resolveData);

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.setApprovalForm({})();
      await result.current.closeApprovalForm();
      await result.current.setCompleteForm({})();
      await result.current.closeCompleteForm();
      await result.current.onSubmitFormComplete({});
      await result.current.onSubmitFormApproval({});
      await result.current.fetchUpdateStatus('approval', {})();
      await result.current.fetchUpdateStatus('complete', { evidence: {} })();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run fail fetch', async () => {
    getDetailClaim.mockRejectedValue({ data: {} });
    putStatusClaim.mockRejectedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.fetchUpdateStatus('xxxx', {})();

      res = await result;
    });

    await expect(res.current.data).toBeFalsy();
  });

  test('empty bpNumber', async () => {
    useRouter.mockReturnValue({ query: { params: '' }, push: jest.fn() });
    getDetailClaim.mockRejectedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));
      res = await result;
    });

    await expect(res.current.data).toBeFalsy();
  });
});
