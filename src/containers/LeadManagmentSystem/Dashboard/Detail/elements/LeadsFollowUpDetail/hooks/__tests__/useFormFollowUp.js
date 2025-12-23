import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  deleteFollowUp,
  addProductToQuote,
} from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';
import useFormFollowUp from '../useFormFollowUp';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import useQueryParams from '@utils/hooks/useQueryParams';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock(
  '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories',
);
jest.mock('@utils/hooks/useDocumentViewer');
jest.mock('@utils/hooks/useQueryParams');

const props = {
  variant: 'Quote',
};

describe('src/pages/LeadManagementSystem/Dashboard/DetailPhase2/elements/LeadsFollowUp/hooks/useFollowUp', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useDocumentViewer.mockReturnValue({ setDocumentViewer: jest.fn() });
    useRouter.mockReturnValue({
      query: { id: 'dashboardId' },
      replace: jest.fn(),
    });
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

  test('run properly', async () => {
    deleteFollowUp.mockResolvedValue({ data: {} });
    addProductToQuote.mockResolvedValue({ data: {} });
    useQueryParams.mockReturnValue({
      setQueryParams: jest.fn(),
      queryParams: {
        followUp: 'activities',
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useFormFollowUp(props));

      await result.current.setTab();
      await result.current.setCategoryForm()();
      await result.current.setPickupProductModal()();
      await result.current.fetchDelete()();
      await result.current.onDeleteFollowUp()();
      await result.current.onEditFollowUp()();
      await result.current.onPreviewDocument()({ stopPropagation: jest.fn() });
      await result.current.fetchDetail();
      await result.current.onAddProductToQuote();

      res = await result;
    });

    await expect(res.current.dashboardId).toBeTruthy();
  });

  test('failed fetch', async () => {
    deleteFollowUp.mockRejectedValue({});
    addProductToQuote.mockRejectedValue({});
    useQueryParams.mockReturnValue({
      setQueryParams: jest.fn(),
      queryParams: {
        followUp: 'product',
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useFormFollowUp(props));

      await result.current.fetchDelete()();
      await result.current.onEditFollowUp()();
      await result.current.onAddProductToQuote();

      res = await result;
    });

    await expect(res.current.dashboardId).toBeTruthy();
  });
});
