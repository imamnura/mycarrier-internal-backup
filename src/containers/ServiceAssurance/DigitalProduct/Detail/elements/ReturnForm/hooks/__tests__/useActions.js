import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { rejectTicket } from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';

jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock(
  '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories',
);

describe('src/containers/ServiceAssurance/DigitalProduct/Detail/elements/ReturnForm/hooks/useActions', () => {
  afterEach(cleanup);
  beforeAll(() => {
    usePopupAlert.mockReturnValue({
      setSuccessAlert: jest.fn(),
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
    });
    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });
  });

  const props = {
    fetchDetail: jest.fn(),
    modalReturn: {},
    setModalReturn: jest.fn(),
    idOGD: 'id',
    refId: 'ref',
  };
  const submitValues = {
    note: 'note',
    media: {
      file: '',
    },
  };

  test('run properly', async () => {
    rejectTicket.mockResolvedValue({ message: 'success' });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.handleSubmit();
      await result.current.fetchUpdateStatus('', submitValues);
      await result.current.handleUpdateStatus();
      await result.current.onClose();

      res = await result;
    });

    await expect(res.current.formState).toMatchObject({
      isDirty: false,
      isValid: false,
    });
  });

  test('run fail fetch', async () => {
    rejectTicket.mockRejectedValue({ message: 'failed' });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchUpdateStatus('', submitValues);

      res = await result;
    });

    await expect(res.current.formState).toMatchObject({
      isDirty: false,
      isValid: false,
    });
  });
});
