import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { updateStatusLead } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock(
  '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories',
);

describe('src/pages/LeadManagementSystem/Dashboard/DetailPhase2/elements/PickUpProductItems/hooks/useAction', () => {
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
    onClosePickupProduct: jest.fn(),
    open: true,
  };

  test('run properly', async () => {
    updateStatusLead.mockResolvedValue({
      data: {},
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onSubmit();
      await result.current.onClosePickupProduct();
      await result.current.fetchSubmitPickupProduct()();

      res = await result;
    });

    await expect(res.current.optionProduct).toBeTruthy();
  });
});
