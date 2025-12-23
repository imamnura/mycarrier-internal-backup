import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import {
  getDetailApprovalBillingReminder,
  putApprovalBillingReminder,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';

import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';

jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock('@utils/hooks/useDocumentViewer');

jest.mock('next/router');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/BillingReminder/Approval/hooks/useAction', () => {
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
    useDocumentViewer.mockReturnValue({
      setDocumentViewer: jest.fn(),
      closeDocumentViewer: jest.fn(),
    });

    useRouter.mockReturnValue({ query: { id: 'hash' }, push: jest.fn() });
  });

  const props = { feature: [] };

  test('run properly draft', async () => {
    getDetailApprovalBillingReminder.mockResolvedValue({
      data: { status: 'draft', reviewer: [{ status: 'reject' }] },
    });
    putApprovalBillingReminder.mockResolvedValue({
      data: {
        fileTemplate: 'test',
        status: 'draft',
        reviewer: [{ status: 'reject' }],
      },
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onApprovalAction('approved')();

      res = await result;
    });

    await expect(res.current.data).toBeFalsy();
  });

  test('run properly sent', async () => {
    getDetailApprovalBillingReminder.mockResolvedValue({
      data: { status: 'sent', reviewer: [{ status: 'reject' }] },
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onSubmitDocumentApproval();
      await result.current.redirect();
      await result.current.onApprovalAction('approved')();
      await result.current.setEditTemplate(true)();
      await result.current.setEditTemplate(false)();
      await result.current.onSubmitFormApproval('sent')({ reason: 'test' });
      await result.current.closeApprovalForm();
      await result.current.fetchUpdateStatus({})();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });
  test('run properly approve', async () => {
    getDetailApprovalBillingReminder.mockResolvedValue({
      data: {
        status: 'approve',
        reviewer: [{ status: 'reject' }],
      },
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onSubmitDocumentApproval();
      await result.current.redirect();
      await result.current.onApprovalAction('approved')();
      await result.current.setEditTemplate(true)();
      await result.current.setEditTemplate(false)();
      await result.current.onSubmitFormApproval('sent')({ reason: 'test' });
      await result.current.closeApprovalForm();
      await result.current.fetchUpdateStatus({})();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run fail fetch', async () => {
    getDetailApprovalBillingReminder.mockRejectedValue({ data: {} });
    putApprovalBillingReminder.mockRejectedValue({
      data: {},
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));
      await result.current.fetchUpdateStatus({})();
      res = await result;
    });

    await expect(res.current.data).toBeFalsy();
  });
});
