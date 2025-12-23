import {
  downloadPdf,
  generateSettlement,
  getDetailUsers,
} from '@containers/BillsAndPayment/Settlement/_repositories/repositories';
import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import useAction from '../useAction';

jest.mock('@containers/BillsAndPayment/Settlement/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/BillsAndPayment/Settlement/Detail/Users/hooks/useAction', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({ query: { id: 'id' }, push: jest.fn() });
    usePopupAlert.mockReturnValue({
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });
    window.open = jest.fn();
  });

  test('run properly', async () => {
    const props = { feature: ['read_detail_user_settlement_cdm'] };
    getDetailUsers.mockResolvedValue({ data: {} });
    downloadPdf.mockResolvedValue({ data: {} });
    generateSettlement.mockResolvedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.handlePeriod();
      await result.current.handlePeriod(new Date());
      await result.current.onDownload();
      await result.current.onGenerateSettlement();
      await result.current.redirect('id')();
      await result.current.fetchDownload();
      await result.current.fetchGenerateSettlement();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('failed fetch', async () => {
    const props = { feature: ['read_detail_user_settlement_cdm'] };
    getDetailUsers.mockRejectedValue({ data: {} });
    downloadPdf.mockRejectedValue({ data: {} });
    generateSettlement.mockRejectedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.handlePeriod();
      await result.current.fetchDownload();
      await result.current.fetchGenerateSettlement();

      res = await result;
    });

    await expect(res.current.data).toBeNull();
  });

  test('empty id', async () => {
    useRouter.mockReturnValueOnce({ query: { id: '' }, push: jest.fn() });
    const { result } = await renderHook(() => useAction({}));
    await expect(result.current.data).toBeNull();
  });

  test('empty privileges', async () => {
    const { result } = await renderHook(() => useAction({ feature: [] }));
    await expect(result.current.data).toBeNull();
  });
});
