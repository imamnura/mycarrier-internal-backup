import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  updateStatusLead,
  updateToOrder,
} from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock(
  '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories',
);

describe('src/pages/LeadManagementSystem/Dashboard/DetailPhase2/elements/ModalUploadAgreement/hooks/useAction', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({ query: { id: 'dashboardId' } });
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
  });

  const props = {
    show: true,
    onClose: jest.fn(),
  };

  test('run properly', async () => {
    updateStatusLead.mockResolvedValue({ data: {} });
    updateToOrder.mockResolvedValue({ data: {} });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      res = await result;

      await result.current.onNext();
      await result.current.onPrevious();
      await result.current.onSubmit();
      await result.current.fetchSubmit({
        revenue: 100,
        subscriptionPeriod: 1,
      })();
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('failed submit', async () => {
    updateStatusLead.mockRejectedValue({ data: {} });
    updateToOrder.mockRejectedValue({ data: {} });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      res = await result;

      await result.current.onNext();
      await result.current.onPrevious();
      await result.current.onSubmit();
      await result.current.fetchSubmit({
        revenue: 100,
        subscriptionPeriod: 1,
      })();
    });

    await expect(res.current.control).toBeTruthy();
  });
});
