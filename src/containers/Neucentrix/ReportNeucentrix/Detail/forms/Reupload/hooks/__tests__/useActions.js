import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import useActions from '../useActions';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('../../../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/pages/Document/ReportNeucentrix/Detail/forms/Reupload/hooks/useActions', () => {
  beforeAll(() => {
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

  afterEach(() => {
    cleanup();
  });

  const props = {
    feature: [],
    setConfirm: jest.fn(),
    setModalReupload: jest.fn(),
    clearConfirmation: jest.fn(),
  };

  test('run properly', async () => {
    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.handleReupload();
      result.current.onClose();
    });
  });
});
