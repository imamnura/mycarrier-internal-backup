import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActionAntares from '../useActionAntares';
import { useRouter } from 'next/router';
import { fetchApproveTicket } from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock(
  '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories',
);
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/ServiceAssurance/DigitalProduct/Detail/hooks/useActionAntares', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: 'referenceId' },
      push: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
    });
    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });
  });

  test('run properly', async () => {
    fetchApproveTicket.mockResolvedValue({ success: true });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActionAntares());

      await result.current.onApprove();
      await result.current.approveTicket();
      await result.current.onClickModalReturn();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
  });

  test('run properly failed', async () => {
    fetchApproveTicket.mockRejectedValue({ message: 'error' });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActionAntares());

      await result.current.onApprove();
      await result.current.approveTicket();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
  });

  test('run properly failed no message', async () => {
    fetchApproveTicket.mockRejectedValue();

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActionAntares());

      await result.current.onApprove();
      await result.current.approveTicket();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
  });
});
