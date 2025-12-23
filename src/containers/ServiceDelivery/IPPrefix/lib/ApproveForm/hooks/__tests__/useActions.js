import { renderHook, act } from '@testing-library/react-hooks';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { getOptionForm } from '@containers/ServiceDelivery/IPPrefix/_repositories/repositories';

jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock('@containers/ServiceDelivery/IPPrefix/_repositories/repositories');

const props = {
  content: {
    open: true,
    autofill: {
      node: true,
    },
  },
  fetchUpdateStatus: jest.fn(),
  setContent: jest.fn(),
  id: '123',
};

describe('src/containers/ServiceDelivery/IPPrefix/lib/ApproveForm/hooks', () => {
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
    getOptionForm.mockResolvedValue({ data: ['test'] });

    const { result } = await renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.onClose();
      result.current.onSubmit()();
      result.current.handleUpdateStatus();
    });

    await expect(result.current.control).toBeTruthy();
  });

  test('run properly other props', async () => {
    getOptionForm.mockResolvedValue({ data: ['test'] });

    const otherProps = {
      ...props,
      content: {
        open: false,
        autofill: {
          node: false,
        },
      },
    };

    const { result } = await renderHook(() => useActions({ ...otherProps }));

    await act(async () => {
      result.current.onClose();
      result.current.onSubmit()();
      result.current.handleUpdateStatus();
    });

    await expect(result.current.control).toBeTruthy();
  });

  test('fetch error', async () => {
    getOptionForm.mockRejectedValue({ message: '' });
    const { result } = await renderHook(() => useActions({ ...props }));

    await act(async () => {});

    await expect(result.current.control).toBeTruthy();
  });
});
