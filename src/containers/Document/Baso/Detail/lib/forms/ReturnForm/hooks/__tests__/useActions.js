import { renderHook, act } from '@testing-library/react-hooks';
import {
  updateStatusBaso,
  uploadFile,
} from '../../../../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('../../../../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

const props = {
  setProgress: jest.fn(),
  setModalProgressUpload: jest.fn(),
  fetchDetail: jest.fn(),
  setModalReturn: jest.fn(),
  id: 'VST123',
};

describe('src/containers/Document/Baso/Detail/lib/forms/ReturnForm/hooks', () => {
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
    uploadFile.mockResolvedValue({ data: {} });
    updateStatusBaso.mockResolvedValue({ data: {} });

    const { result } = await renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.onClose();
      result.current.handleUpdateStatus();
      result.current.fetchUpdateStatus();
      result.current.fetchDetail('')();
      await result.current.fetchUploadDocument({})();
      await jest.advanceTimersByTime(10000);
    });

    await expect(result.current.control).toBeTruthy();
  });

  test('uploadFile empty response', async () => {
    uploadFile.mockResolvedValue({});

    const { result } = await renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.fetchUploadDocument({})();
    });

    await expect(result.current.control).toBeTruthy();
  });

  test('fetch error', async () => {
    uploadFile.mockRejectedValue({ message: 'xx' });
    updateStatusBaso.mockRejectedValue({ message: 'xx' });

    const { result } = await renderHook(() => useActions({ ...props }));

    await act(async () => {
      await result.current.fetchUpdateStatus();
      await result.current.fetchUploadDocument({})();
    });

    await expect(result.current.control).toBeTruthy();
  });
});
