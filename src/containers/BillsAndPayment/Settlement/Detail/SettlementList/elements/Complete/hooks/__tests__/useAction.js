import { updateStatusSettlementList } from '@containers/BillsAndPayment/Settlement/_repositories/repositories';
import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import useAction from '../useAction';

jest.mock('@containers/BillsAndPayment/Settlement/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/BillsAndPayment/Settlement/Detail/Users/elements/Complete/hooks/useAction', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({ query: { id: 'id' }, push: jest.fn() });
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
  });

  test('run properly', async () => {
    const props = { feature: [], onClose: jest.fn(), setDetailData: jest.fn() };
    updateStatusSettlementList.mockResolvedValue({ data: {} });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await act(async () => {
        await result.current.onSubmit({});
        await result.current.fetchComplete({})();
      });

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run empty response', async () => {
    const props = { feature: [], onClose: jest.fn(), setDetailData: jest.fn() };
    updateStatusSettlementList.mockResolvedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await act(async () => {
        await result.current.fetchComplete({})();
      });

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('failed fetch', async () => {
    const props = { feature: [], onClose: jest.fn(), setDetailData: jest.fn() };
    updateStatusSettlementList.mockRejectedValue({ data: {} });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await act(async () => {
        await result.current.fetchComplete({})();
      });

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
