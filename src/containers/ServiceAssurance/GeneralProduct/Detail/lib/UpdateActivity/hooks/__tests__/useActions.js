import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import {
  getListActivity,
  getListStatus,
  updateActivity,
} from '@containers/ServiceAssurance/GeneralProduct/_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useForm } from 'react-hook-form';

jest.mock(
  '@containers/ServiceAssurance/GeneralProduct/_repositories/repositories',
);
jest.mock('react-hook-form');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/ServiceAssurance/GeneralProduct/Detail/lib/UpdateActivity/hooks', () => {
  afterEach(cleanup);
  beforeAll(() => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
    });
    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });
    useForm.mockReturnValue({
      control: {},
      handleSubmit: jest.fn(),
      trigger: jest.fn(),
      formState: {
        isDirty: false,
        isValid: false,
      },
      watch: jest.fn().mockReturnValue('status'),
    });
  });

  const props = {
    open: true,
    onClose: jest.fn(),
    fetchDetail: jest.fn(),
    referenceId: 'referenceId',
    setVisibilityUpdateActivity: jest.fn(),
  };

  test('run properly', async () => {
    getListStatus.mockResolvedValue({ data: { label: '123', value: 'test' } });
    getListActivity.mockResolvedValue();
    updateActivity.mockResolvedValue();

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.onSubmit();
      await result.current.onClose();
      await result.current.setSelectedActivity('test')();
      await result.current.handleSubmit();
      await result.current.fetchSubmit({ status: 'test' })();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
  });

  test('run properly failed', async () => {
    getListStatus.mockRejectedValue({ data: { label: '123', value: 'test' } });
    getListActivity.mockRejectedValue({ message: 'Product is not eligible' });
    updateActivity.mockRejectedValue({ message: 'error' });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.onSubmit();
      await result.current.onClose();
      await result.current.setSelectedActivity('test')();
      await result.current.handleSubmit();
      await result.current.fetchSubmit({ status: 'test' })();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
  });
});
