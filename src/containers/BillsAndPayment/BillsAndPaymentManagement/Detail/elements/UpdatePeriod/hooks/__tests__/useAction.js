import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { getPeriodUpdated } from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/elements/UpdatePeriod/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({ query: { id: 'bpNumber' }, push: jest.fn() });
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
  });

  const props = {
    open: true,
    onClose: jest.fn(),
  };

  test('run properly', async () => {
    getPeriodUpdated.mockResolvedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      result.current.onSubmit({});
      result.current.fetchUpdatePeriod({ period: new Date() })();

      res = await result;
    });

    await expect(res.current.open).toBeTruthy();
  });

  test('run submit failed', async () => {
    getPeriodUpdated.mockRejectedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      result.current.fetchUpdatePeriod({ period: new Date() })();

      res = await result;
    });

    await expect(res.current.open).toBeTruthy();
  });
});
