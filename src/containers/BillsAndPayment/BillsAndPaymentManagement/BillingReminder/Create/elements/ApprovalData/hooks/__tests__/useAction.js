import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import { postDraftBillingReminder } from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';

import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useSnackbar } from 'notistack';
import { useForm, useFieldArray } from 'react-hook-form';

jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock('notistack');
jest.mock('react-hook-form');

jest.mock('next/router');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/BillingReminder/Create/elements/ApprovalData/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    usePopupAlert.mockReturnValue({
      setSuccessAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
    });

    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });

    useSnackbar.mockReturnValue({
      enqueueSnackbar: jest.fn(),
    });

    useFieldArray.mockReturnValue({
      fields: [{}, {}],
      append: jest.fn(),
      remove: jest.fn(),
      insert: jest.fn(),
      move: jest.fn(),
      update: jest.fn(),
      trigger: jest.fn(),
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
      trigger: jest.fn(),
    });

    useRouter.mockReturnValue({
      query: { bpNumber: '1', count: '2' },
      push: jest.fn(),
    });
  });

  const props = {
    data: {
      reviewer: [
        {
          name: 'test',
          email: 'test@gmail.com',
          position: 'mgr test',
          phoneNumber: '08111111',
        },
      ],
      carbonCopy: ['test'],
    },
    setTab: jest.fn(),
    updateData: jest.fn(),
    loading: false,
    onDiscard: jest.fn(),
  };

  test('run properly', async () => {
    postDraftBillingReminder.mockResolvedValue({
      data: {},
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.closePopUpCC();
      await result.current.onAddRecipient();
      await result.current.onDeleteReviewer(1)();
      await result.current.onAddCC();
      await result.current.onDeleteCC('test diff')();
      await result.current.onSubmit('draft');
      await result.current.onSubmit('cancel');
      await result.current.onSubmit('discard');
      await result.current.onSubmit('previous');
      await result.current.onSubmit('next');
      await result.current.onStepperClick(1);
      await result.current.redirect();
      await result.current.onDiscard();
      await result.current.onPrevious(1)();
      await result.current.setPrevious(1)();
      await result.current.onNext('draft', 2)();
      await result.current.fetchDraft('draft', 2)({});

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run properly cc null', async () => {
    postDraftBillingReminder.mockResolvedValue({
      data: {},
    });
    let res;
    const props2 = { data: { carbonCopy: null } };

    await act(async () => {
      const { result } = await renderHook(() => useAction(props2));

      await result.current.fetchDraft('next', 1)({});

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run properly previous with dirty form', async () => {
    postDraftBillingReminder.mockResolvedValue({
      data: {},
    });
    useForm.mockReturnValue({
      control: {},
      handleSubmit: jest.fn(),
      formState: {
        isDirty: true,
        isValid: false,
      },
      reset: jest.fn(),
      watch: jest.fn().mockReturnValue('test'),
      resetField: jest.fn(),
      trigger: jest.fn(),
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));
      await result.current.onSubmit('previous');

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });
});
