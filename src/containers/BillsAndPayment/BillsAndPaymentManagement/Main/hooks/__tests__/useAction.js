import useAction from '../useAction';
import { useRouter } from 'next/router';
import { renderHook, act, cleanup } from '@testing-library/react-hooks';

jest.mock('next/router');

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/Main/hooks', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({ query: { tab: 'dashboard' }, push: jest.fn() });
  });

  const props = { feature: [] };

  test('run properly', async () => {
    let res;
    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.setTab();
      await result.current.onRefresh();

      res = await result;
    });

    await expect(res.current.tab).toBeTruthy();
  });
});
