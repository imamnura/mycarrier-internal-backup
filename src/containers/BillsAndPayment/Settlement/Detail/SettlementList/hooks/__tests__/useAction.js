import {
  getDetailSettlementList,
  updateStatusSettlementList,
} from '@containers/BillsAndPayment/Settlement/_repositories/repositories';
import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import { useRouter } from 'next/router';
import useAction from '../useAction';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('@containers/BillsAndPayment/Settlement/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/useDocumentViewer');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/BillsAndPayment/Settlement/Detail/Users/hooks/useAction', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({ query: { id: 'id' }, push: jest.fn() });
    useDocumentViewer.mockReturnValue({
      setDocumentViewer: jest.fn(),
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
  });

  test('run properly', async () => {
    const props = { feature: [] };
    getDetailSettlementList.mockResolvedValue({
      data: {
        attachment: [
          { type: 'mom', fileUrl: 'x', fileName: 'x' },
          { type: 'mom_signed', fileUrl: 'x', fileName: 'x' },
          { type: 'nde', fileUrl: 'x', fileName: 'x' },
          { type: 'invoice', fileUrl: 'x', fileName: 'x' },
        ],
      },
    });
    updateStatusSettlementList.mockResolvedValue({
      data: {
        attachment: [{}],
      },
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.setDocumentViewer({})();
      await result.current.setPopUp({})();
      await result.current.onClosePopUp();
      await result.current.fetchComplete();
      await result.current.onCompleted();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('empty data', async () => {
    const props = { feature: [] };
    getDetailSettlementList.mockResolvedValue({
      data: {
        attachment: [],
      },
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('failed fetch', async () => {
    const props = { feature: [] };
    getDetailSettlementList.mockRejectedValue({
      data: {},
    });
    updateStatusSettlementList.mockRejectedValue({
      data: {},
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.fetchComplete();

      res = await result;
    });

    await expect(res.current.data).toBeFalsy();
  });

  test('empty id', async () => {
    useRouter.mockReturnValue({ query: { id: '' }, push: jest.fn() });
    const { result } = await renderHook(() => useAction({}));
    await expect(result.current.data).toBeFalsy();
  });
});
