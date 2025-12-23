import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { submitFollowUp } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';
import useAction from '../useAction';

jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock(
  '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories',
);

describe('src/pages/LeadManagementSystem/Dashboard/DetailPhase2/elements/LeadsFollowUp/elemets/FormFollowUpDetail/hooks/useAction', () => {
  afterEach(cleanup);

  beforeAll(() => {
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
    categoryForm: {},
    dashboardId: 123,
    fetchDetail: jest.fn(),
    followUpForm: {
      type: 'activities',
      formProps: {
        variant: 'add',
      },
    },
    onCloseCategory: jest.fn(),
    setFollowUpForm: jest.fn(),
    status: 'Opportunity',
  };

  test('run properly', async () => {
    submitFollowUp.mockResolvedValue({ data: {}, success: true });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onSubmitCategory();
      await result.current.onCloseFollowUp();
      await result.current.onSubmitFollowUp();
      await result.current.fetchSubmit()();
      await result.current.Empty();

      res = await result;
    });

    await expect(res.current.status).toBeTruthy();
  });

  test('failed submit', async () => {
    submitFollowUp.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({
          ...props,
          followUpForm: {
            type: 'product',
            formProps: {
              variant: 'add',
            },
          },
        }),
      );

      await result.current.fetchSubmit()();

      res = await result;
    });

    await expect(res.current.status).toBeTruthy();
  });

  test('failed submit case Auto Quote', async () => {
    submitFollowUp.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({
          ...props,
          followUpForm: {
            type: undefined,
            formProps: {
              variant: 'add',
            },
          },
          status: 'Auto Quote',
        }),
      );

      await result.current.fetchSubmit()();

      res = await result;
    });

    await expect(res.current.status).toBeTruthy();
  });
});
