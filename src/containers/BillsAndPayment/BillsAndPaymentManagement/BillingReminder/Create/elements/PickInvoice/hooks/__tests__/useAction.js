import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import {
  getListInvoice,
  postDraftBillingReminder,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import { useSnackbar } from 'notistack';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import useQueryParams from '@utils/hooks/useQueryParams';

jest.mock('next/router');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);
jest.mock('notistack');
jest.mock('@utils/hooks/useDocumentViewer');
jest.mock('@utils/hooks/useQueryParams');

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/BillingReminder/Create/elements/PickInvoice/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { bpNumber: 'BP-123', count: 1 },
      push: jest.fn(),
    });
    useSnackbar.mockReturnValue({
      enqueueSnackbar: jest.fn(),
    });
    useDocumentViewer.mockReturnValue({
      closeDocumentViewer: jest.fn(),
      setDocumentViewer: jest.fn(),
    });
    useQueryParams.mockReturnValue({
      setQueryParams: jest.fn(),
      queryParams: {},
    });
  });

  const arrFile = [{ fileName: 'one' }, { fileName: 'two' }];

  const props = {
    data: {
      invoices: arrFile,
    },
    setTab: jest.fn(),
    updateData: jest.fn(),
    loading: false,
    onDiscard: jest.fn(),
  };

  test('run properly', async () => {
    postDraftBillingReminder.mockResolvedValue({
      data: { reminderId: 'rid-1' },
    });
    getListInvoice.mockResolvedValue({
      data: [{}],
      success: true,
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.setFilterYear({ label: 'All Year', value: '' });
      await result.current.setFilterYear({ label: '2024', value: '2024' });
      await result.current.setFilterMonth({ label: 'All Month', value: '' });
      await result.current.onPaginationChange({}, 1);
      await result.current.onPreviewDocument({})({
        stopPropagation: jest.fn(),
      });
      await result.current.onStepperClick(1);
      await result.current.onSubmit('cancel')();
      await result.current.onSubmit('discard')();
      await result.current.setSelectedRow(arrFile);
      await result.current.onStepperClick(1);

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run fail fetch', async () => {
    postDraftBillingReminder.mockRejectedValue({ messsage: '' });
    getListInvoice.mockRejectedValue({
      data: [{}],
      success: false,
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onStepperClick(1);

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });
});
