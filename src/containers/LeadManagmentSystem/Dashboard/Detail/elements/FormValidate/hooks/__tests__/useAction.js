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
    onClose: jest.fn(),
    initialActiveStep: 0,
  };

  test('run properly', async () => {
    updateStatusLead.mockResolvedValue({
      data: {},
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.formProps.onSubmit();
      await result.current.formProps.fetchAssign({})();

      res = await result;
    });

    await expect(res.current.formProps.control).toBeTruthy();
  });

  test('step 1', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ ...props, initialActiveStep: 1 }),
      );

      await act(async () => {
        await result.current.formProps.onSubmit();
      });

      res = await result;
    });

    await expect(res.current.formProps.control).toBeTruthy();
  });

  test('step 2 sales team', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ ...props, initialActiveStep: '2SalesTeam' }),
      );

      await act(async () => {
        await result.current.formProps.onSubmit();
      });

      res = await result;
    });

    await expect(res.current.formProps.control).toBeTruthy();
  });

  test('step 2 other recepient', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ ...props, initialActiveStep: '2OtherRecepient' }),
      );

      await act(async () => {
        await result.current.formProps.onSubmit();
      });

      res = await result;
    });

    await expect(res.current.formProps.control).toBeTruthy();
  });

  test('case isOtherCustomer true', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ ...props, initialOtherCustomer: true }),
      );

      await act(async () => {
        await result.current.formProps.onSubmit();
      });

      res = await result;
    });

    await expect(res.current.formProps.control).toBeTruthy();
  });

  test('failed fetch', async () => {
    updateStatusLead.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.formProps.onSubmit();
      await result.current.formProps.fetchAssign({})();

      res = await result;
    });

    await expect(res.current.formProps.control).toBeTruthy();
  });

  test('case failed fetch validBy dispatchMyTens', async () => {
    updateStatusLead.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.formProps.onSubmit();
      await result.current.formProps.fetchAssign({
        validBy: 'dispatchMyTens',
      })();

      res = await result;
    });

    await expect(res.current.formProps.control).toBeTruthy();
  });
});
