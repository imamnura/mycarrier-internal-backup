import { useRouter } from 'next/router';
import useAction from '../useAction';
import { renderHook, act, cleanup } from '@testing-library/react-hooks';

jest.mock('next/router');

// Mock the useRef hook
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn().mockReturnValue({
    current: {
      onRefresh: jest.fn(),
    },
  }),
}));

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/Main/Dashboard/index', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({ push: jest.fn(), query: { id: 'tes' } });
  });
  afterEach(cleanup);

  const props = { feature: [] };

  test('run properly', async () => {
    let res;
    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.setPopUpList();
      await result.current.onClosePopUpList();
      await result.current.setTab();
      await result.current.onClickRefresh();

      res = await result;
    });

    await expect(res.current.popUpList).toBeTruthy();
  });
});
