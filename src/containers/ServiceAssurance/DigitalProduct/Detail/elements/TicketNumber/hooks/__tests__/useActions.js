import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  searchTicketNumber,
  fetchApproveTicket,
} from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock(
  '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories',
);
jest.mock('next/router');
jest.mock('react-hook-form');

describe('src/containers/ServiceAssurance/DigitalProduct/Detail/elements/TicketNumber/hooks/useActions', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      push: jest.fn(),
      query: { id: 'tes' },
    });
    usePopupAlert.mockReturnValue({
      setSuccessAlert: jest.fn(),
      setFailedAlert: jest.fn(),
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
      watch: jest.fn().mockReturnValue('ticketId'),
      getValues: jest.fn().mockReturnValue('ticketId'),
    });
  });

  const props = {
    setModalTicketNumber: jest.fn(),
    type: {},
  };

  test('run properly', async () => {
    searchTicketNumber.mockResolvedValue({ data: {}, message: 'test' });
    fetchApproveTicket.mockResolvedValue();

    let res;
    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.onClose();
      await result.current.confirmation({ ticketId: 'test' });
      await result.current.handleAddTicketNumber({ ticketId: 'test' })();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
  });

  test('run properly searchTicketNumber data null', async () => {
    searchTicketNumber.mockResolvedValue({ data: null, message: 'test' });

    let res;
    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      res = await result;
    });

    await expect(res.current).toBeTruthy();
  });

  test('run properly failed', async () => {
    searchTicketNumber.mockRejectedValue({ message: 'error' });
    fetchApproveTicket.mockRejectedValue({ message: 'error' });

    let res;
    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.confirmation({ ticketId: 'test' });
      await result.current.handleAddTicketNumber({ ticketId: 'test' })();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
  });
});
