import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import {
  deleteBillingReminderAttachment,
  postDraftBillingReminder,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useSnackbar } from 'notistack';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import useQueryParams from '@utils/hooks/useQueryParams';

jest.mock('next/router');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('notistack');
jest.mock('@utils/hooks/useDocumentViewer');
jest.mock('@utils/hooks/useQueryParams');

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/BillingReminder/Create/elements/EmailTextAndAttachment/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: '1' },
      push: jest.fn(),
    });
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
    useDocumentViewer.mockReturnValue({
      closeDocumentViewer: jest.fn(),
    });
    useQueryParams.mockReturnValue({
      setQueryParams: jest.fn(),
      queryParams: {},
    });
  });

  const props = {
    data: {
      fileTemplate: {},
      attachment: [{ fileName: 'one' }, { fileName: 'two' }],
    },
    setTab: jest.fn(),
    updateData: jest.fn(),
    loading: false,
    onDiscard: jest.fn(),
  };

  test('run properly', async () => {
    postDraftBillingReminder.mockResolvedValue({ data: {} });
    deleteBillingReminderAttachment.mockResolvedValue({
      data: {},
      success: true,
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onStepperClick(1);
      await result.current.onStepperClick(3);
      await result.current.onSubmit('cancel')();
      await result.current.onSubmit('discard')();
      await result.current.setValue('tes');
      await result.current.onSubmit('previous')();
      await result.current.onSubmit('next')();
      await result.current.onDeleteAttachment('path')();
      await result.current.fetchDeleteAttachment('path')();
      await result.current.onAddAttachment({ data: [{ fileName: 'wrong' }] });
      await result.current.onAddAttachment({ data: [{ fileName: 'one' }] });
      await result.current.closeConfirmationPrevious(1)();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run fail fetch', async () => {
    // postDraftBillingReminder.mockRejectedValue({ data: {} });
    postDraftBillingReminder.mockRejectedValue({ messsage: '' });
    deleteBillingReminderAttachment.mockRejectedValue({
      data: {},
      success: true,
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onStepperClick(3);
      await result.current.setValue('tes');
      await result.current.onSubmit('next')();
      await result.current.fetchDeleteAttachment('path')();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });
});
