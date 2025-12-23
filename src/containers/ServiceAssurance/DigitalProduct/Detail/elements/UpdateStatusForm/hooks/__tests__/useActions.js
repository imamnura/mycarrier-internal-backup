import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import useActions from '../useActions';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { fetchApproveTicket } from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock(
  '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories',
);

describe('src/containers/ServiceAssurance/DigitalProduct/Detail/elements/UpdateStatusForm/hooks/useActions', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      push: jest.fn(),
      query: { id: '1' },
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
  });

  const props = {
    setModalStatus: jest.fn(),
    detail: { status: 'success' },
  };

  test('handleUpdateStatus success', async () => {
    let res;

    fetchApproveTicket.mockResolvedValue();

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.confirmationStatus({ note: 'test' });
      await result.current.confirmationProgress({ note: 'test' });
      await result.current.handleSubmit();
      await result.current.handleUpdateStatus('updateStatus', 'note test')();
      await result.current.handleUpdateStatus('updateProgress', 'note test')();
      await result.current.onClose();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
  });

  test('handleUpdateStatus failed', async () => {
    let res;

    fetchApproveTicket.mockRejectedValue();

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.confirmationStatus({ note: 'test' });
      await result.current.confirmationProgress({ note: 'test' });
      await result.current.handleSubmit();
      await result.current.handleUpdateStatus('updateStatus', 'note test')();
      await result.current.handleUpdateStatus('updateProgress', 'note test')();
      await result.current.onClose();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
  });
});
