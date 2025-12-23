import { renderHook, act } from '@testing-library/react-hooks';
import { updateStatusBaso } from '../../../../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('../../../../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

const props = {
  fetchDetail: jest.fn(),
  setModalUpdateStatus: jest.fn(),
  id: '123',
};

describe('src/containers/Document/Baso/Detail/lib/forms/UpdateStatusForm/hooks', () => {
  beforeEach(() => {
    usePopupAlert.mockReturnValue({
      setSuccessAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
    });

    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });

    jest.useFakeTimers();
  });

  test('run properly', async () => {
    updateStatusBaso.mockResolvedValue({ data: {} });

    const { result } = await renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.onClose();
      result.current.handleUpdateStatus();
      await result.current.fetchUpdateStatus({})();
      result.current.fetchDetail('')();
    });

    await expect(result.current.control).toBeTruthy();
  });

  test('fetch error', async () => {
    updateStatusBaso.mockRejectedValue({ message: 'xx' });

    const { result } = await renderHook(() => useActions({ ...props }));

    await act(async () => {
      await result.current.fetchUpdateStatus({})();
    });

    await expect(result.current.control).toBeTruthy();
  });
});
