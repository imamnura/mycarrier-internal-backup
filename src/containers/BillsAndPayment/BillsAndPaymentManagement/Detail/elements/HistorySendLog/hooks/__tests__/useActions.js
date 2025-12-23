import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useAction';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import { useRouter } from 'next/router';

jest.mock('@utils/hooks/useDocumentViewer');
jest.mock('next/router');

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/elements/ListOfDocument/hooks/useActions', () => {
  afterEach(cleanup);

  const props = {
    onClose: jest.fn(),
    open: true,
    data: [
      {
        type: 'thanks-letter',
        status: 'sent',
        invoices: [
          {
            invoiceNumberFormat: '1',
          },
        ],
        documentAttachment: {},
      },
      {
        type: 'bill_reminder',
        status: 'sent',
        invoices: [
          {
            invoiceNumberFormat: '1',
          },
        ],
        documentAttachment: {},
      },
      {
        type: '',
        status: '',
        invoices: [
          {
            invoiceNumberFormat: '1',
          },
        ],
        documentAttachment: {},
      },
    ],
  };

  beforeAll(() => {
    useDocumentViewer.mockReturnValue({
      setDocumentViewer: jest.fn(),
    });
    useRouter.mockReturnValue({ query: { id: '0000000' }, push: jest.fn() });
  });

  test('run properly', async () => {
    const { result } = await renderHook(() => useActions(props));

    act(() => {
      result.current.onOpenDocument({ fileUrl: '', fileName: '' })();
      result.current.onRedirectReminder({
        reminderId: 'rid-1',
        stage: '1',
      })();
    });

    expect(result.current.data).toBeTruthy();
  });
});
