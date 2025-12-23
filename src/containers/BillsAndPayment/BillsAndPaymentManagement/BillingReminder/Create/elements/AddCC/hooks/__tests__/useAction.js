import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import { getListEmployeeCC } from '@containers/BillsAndPayment/Settlement/_repositories/repositories';

jest.mock('next/router');
jest.mock('@containers/BillsAndPayment/Settlement/_repositories/repositories');

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/BillingReminder/Create/elements/AddCC/hooks/useAction', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: '1' },
      push: jest.fn(),
    });
  });

  const props = {
    open: true,
    onClose: jest.fn(),
    initialCCType: 1,
    recepientCC: [{}],
    setRecepientCC: jest.fn(),
  };

  test('run properly', async () => {
    getListEmployeeCC.mockResolvedValue({ data: [{}] });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onCancel();
      await result.current.onSubmit();
      await result.current.onSubmitType();
      await result.current.onScrollList({
        target: { scrollHeight: 40, clientHeight: 10, scrollTop: 10 },
      });

      res = await result;
    });

    await expect(res.current.list).toBeTruthy();
  });

  test('run properly cctype null & selected recepient', async () => {
    getListEmployeeCC.mockResolvedValue({ data: [{}] });
    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({
          ...props,
          initialCCType: null,
          recepientCC: [{ name: 'test' }],
        }),
      );

      await result.current.setSelectedEmployee({ name: 'test' });
      await result.current.onCancel();
      await result.current.onSubmit();
      await result.current.onSubmitType();
      await result.current.onScrollList({
        target: { scrollHeight: 40, clientHeight: 10, scrollTop: 10 },
      });

      res = await result;
    });

    await expect(res.current.list).toBeTruthy();
  });

  test('run fail fetch', async () => {
    getListEmployeeCC.mockRejectedValue({ data: [{}] });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction({ ...props }));
      res = await result;
    });

    await expect(res.current.list).toBeTruthy();
  });
});
