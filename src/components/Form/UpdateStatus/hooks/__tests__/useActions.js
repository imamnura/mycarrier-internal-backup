import { renderHook, act } from '@testing-library/react-hooks';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

const props = {
  content: {},
  fetchUpdateStatus: jest.fn(),
  setContent: jest.fn(),
  id: '123',
};

describe('src/components-v2/Form/UpdateStatusForm/hooks', () => {
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
    const { result } = await renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.onClose();
      result.current.onSubmit()();
      result.current.handleUpdateStatus();
    });

    await expect(result.current.control).toBeTruthy();
  });

  test('fetch error', async () => {
    const { result } = await renderHook(() => useActions({ ...props }));

    await act(async () => {});

    await expect(result.current.control).toBeTruthy();
  });
});
