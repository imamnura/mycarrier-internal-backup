import {
  postAddCC,
  getListEmployeeCC,
} from '@containers/BillsAndPayment/Settlement/_repositories/repositories';
import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import useAction from '../useAction';

jest.mock('@containers/BillsAndPayment/Settlement/_repositories/repositories');
jest.mock('next/router');

describe('src/containers/BillsAndPayment/Settlement/Detail/Users/elements/AddCC/hooks/useAction', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({ query: { id: 'id' }, push: jest.fn() });
  });

  const props = {
    open: true,
    onClose: jest.fn(),
    setRecepientCC: jest.fn(),
    initialCCType: 1,
    recepientCC: ['Sdr. TEST'],
    // initialSelectedEmployee: ['TEST'],
    initialScroll: {
      scrollHeight: 20,
      scrollTop: 10,
      clientHeight: 50,
    },
  };

  test('run properly', async () => {
    postAddCC.mockResolvedValue({ data: [], success: true });
    getListEmployeeCC.mockResolvedValue({ data: [{}], hasMore: true });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await act(async () => {
        await result.current.onCancel();
        await result.current.onSubmitType();
        await result.current.onSubmit();
        await result.current.setSelectedEmployee({
          settlementId: 'ST-123',
          name: 'test',
          nik: '123',
        });
        await result.current.onSubmit();
        await result.current.onScrollList({
          target: {
            scrollTop: 10,
            scrollHeight: 40,
            clientHeight: 10,
          },
        });
      });

      res = await result;
    });

    await expect(res.current.open).toBeTruthy();
  });

  test('failed fetch', async () => {
    postAddCC.mockRejectedValue({ data: {} });
    getListEmployeeCC.mockRejectedValue({ data: [{}] });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await act(async () => {
        await result.current.onSubmit();
        await result.current.onSubmitType();
      });

      res = await result;
    });

    await expect(res.current.open).toBeTruthy();
  });

  test('ccType null', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({ ...props, initialCCType: null }),
      );

      await act(async () => {
        await result.current.onCancel();
      });

      res = await result;
    });

    await expect(res.current.open).toBeTruthy();
  });
});
