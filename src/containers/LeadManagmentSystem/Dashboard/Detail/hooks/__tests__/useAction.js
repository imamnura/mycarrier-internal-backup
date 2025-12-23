import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  getDetail,
  getPrerequisite,
  updateStatusLead,
} from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock(
  '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories',
);

describe('src/pages/LeadManagementSystem/Dashboard/DetailPhase2/elements/FormValidate/hooks/useAction', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({ query: { id: 'dashboardId' } });
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

  const props = {
    feature: [],
  };

  test('run properly', async () => {
    updateStatusLead.mockResolvedValue({ data: {} });
    getDetail.mockResolvedValue({ data: {} });
    getPrerequisite.mockResolvedValue({ data: [{ status: false }] });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchDetail();
      await result.current.setPopUp({ type: 'log', open: true })();
      await result.current.isPopUpOpen('log');
      await result.current.isPopUpOpen();
      await result.current.fetchUpdateStatus(
        'Invalid',
        'Invalid',
        'test reason',
      )();
      await result.current.fetchUpdateStatus(
        'Invalid',
        'Retire',
        'test reason',
        'test note',
      )();
      await result.current.onUpdateStatus('Invalid')({ reason: 'test reason' });
      await result.current.caNumberConverter('123');

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('failed fetch detail', async () => {
    updateStatusLead.mockRejectedValue({});
    getDetail.mockRejectedValue({});
    getPrerequisite.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchDetail();
      await result.current.fetchUpdateStatus(
        'Invalid',
        'Invalid',
        'test reason',
      )();

      res = await result;
    });

    await expect(res.current.interestId).toBeTruthy();
  });

  test('failed fetch prequisite', async () => {
    updateStatusLead.mockRejectedValue({});
    getDetail.mockResolvedValue({ data: {} });
    getPrerequisite.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchDetail();
      await result.current.fetchUpdateStatus(
        'Invalid',
        'Invalid',
        'test reason',
      )();

      res = await result;
    });

    await expect(res.current.interestId).toBeTruthy();
  });
});
