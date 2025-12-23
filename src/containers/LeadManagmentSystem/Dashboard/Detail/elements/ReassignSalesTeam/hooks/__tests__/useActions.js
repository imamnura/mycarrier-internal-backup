import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import { reAssignSalesTeam } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('next/router');
jest.mock(
  '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories',
);
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/ReassignSalesTeam/hooks/useAction', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({ query: { id: 'id', params: 'params' } });
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
    onClose: jest.fn(),
  };

  test('run properly', async () => {
    reAssignSalesTeam.mockResolvedValue({
      data: {},
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.reAssignProps.onSubmit();
      await result.current.reAssignProps.fetchReAssign('amMapping')();

      res = await result;
    });

    await expect(res.current.reAssignProps).toBeTruthy();
  });

  test('failed fetch', async () => {
    reAssignSalesTeam.mockRejectedValue({
      data: {},
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.reAssignProps.onSubmit();
      await result.current.reAssignProps.fetchReAssign('amMapping')();

      res = await result;
    });

    await expect(res.current.reAssignProps).toBeTruthy();
  });
});
