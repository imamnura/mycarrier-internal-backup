import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { useForm } from 'react-hook-form';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  updateTicket,
  getCategory,
  getSubcategory,
} from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';
import useActions from '../useActions';

jest.mock('react-hook-form');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock(
  '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories',
);

describe('src/containers/ServiceAssurance/DigitalProduct/Detail/elements/ChooseCategoryForm/hooks/useActions', () => {
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
      formState: {
        isDirty: false,
        isValid: false,
      },
      reset: jest.fn(),
      watch: jest.fn().mockReturnValue('test'),
      resetField: jest.fn(),
    });
  });

  const props = {
    fetchDetail: jest.fn(),
    modalChooseCategory: { title: 'title' },
    setModalChooseCategory: jest.fn(),
    referenceId: 'referenceId',
  };

  test('run properly', async () => {
    updateTicket.mockResolvedValue({});
    getCategory.mockResolvedValue({ data: [{}] });
    getSubcategory.mockResolvedValue({ data: [{}] });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.handleUpdateStatus({});
      await result.current.fetchUpdateStatus('refrenceId', {
        category: 'cat',
        subcategory: 'subcat',
      });
      await result.current.handleSubmit();
      await result.current.onClose();

      res = await result;
    });

    await expect(res.current.categoryOptions).toBeTruthy();
    await expect(res.current.subcategoryOptions).toBeTruthy();
  });

  test('run properly other condition', async () => {
    useForm.mockReturnValueOnce({
      control: {},
      handleSubmit: jest.fn(),
      formState: {
        isDirty: false,
        isValid: false,
      },
      reset: jest.fn(),
      watch: jest.fn(),
      resetField: jest.fn(),
    });
    updateTicket.mockResolvedValue({});
    getCategory.mockResolvedValue({ data: [{}] });
    getSubcategory.mockResolvedValue({ data: [{}] });

    let nProps = {
      ...props,
      modalChooseCategory: null,
    };
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(nProps));

      await result.current.onClose();

      res = await result;
    });

    await expect(res.current.categoryOptions).toBeTruthy();
    await expect(res.current.subcategoryOptions).toBeTruthy();
  });

  test('run properly rejected error', async () => {
    updateTicket.mockRejectedValue({ message: '' });
    getCategory.mockRejectedValue({ message: '' });
    getSubcategory.mockRejectedValue({ message: '' });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchUpdateStatus('refrenceId', {
        category: 'cat',
        subcategory: 'subcat',
      });

      res = await result;
    });

    await expect(res.current.categoryOptions).toBeTruthy();
    await expect(res.current.subcategoryOptions).toBeTruthy();
  });
});
