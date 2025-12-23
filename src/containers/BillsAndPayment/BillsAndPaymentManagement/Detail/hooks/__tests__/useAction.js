import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import { getDetailBillsAndPaymentManagement } from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';

jest.mock('next/router');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/Detail/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({ query: { id: 'bpNumber' }, push: jest.fn() });
  });

  const props = { feature: ['read_detail_company'] };

  test('run properly', async () => {
    getDetailBillsAndPaymentManagement.mockResolvedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.setSendInvoiceEmail({})();
      await result.current.updatePicProfile('cdm', []);
      await result.current.setUpdatePeriod({})();
      await result.current.setRemindingOption({})();
      await result.current.onSubmitRemindingOption('');
      await result.current.onSubmitRemindingOption('reminder1');
      await result.current.onSubmitRemindingOption('reminder2');
      await result.current.onSubmitRemindingOption('reminder3');

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run fail fetch', async () => {
    getDetailBillsAndPaymentManagement.mockRejectedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));
      res = await result;
    });

    await expect(res.current.data).toBeFalsy();
  });

  test('empty bpNumber', async () => {
    useRouter.mockReturnValue({ query: { id: '' }, push: jest.fn() });
    getDetailBillsAndPaymentManagement.mockRejectedValue({ data: {} });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));
      res = await result;
    });

    await expect(res.current.data).toBeFalsy();
  });
});
