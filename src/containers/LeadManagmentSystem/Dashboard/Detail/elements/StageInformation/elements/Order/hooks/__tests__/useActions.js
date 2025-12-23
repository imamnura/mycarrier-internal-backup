import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import { getOrderList } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';

jest.mock('next/router');
jest.mock(
  '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories',
);

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/StageInformation/elements/Order/hooks/useActions', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: 'id', params: 'params' },
      push: jest.fn(),
    });
  });

  const props = {
    feature: [],
  };

  test('run properly', async () => {
    getOrderList.mockResolvedValue({
      data: [{}],
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.onClickRowTable({ orderNumber: '123' });

      res = await result;
    });

    await expect(res.current.list).toBeTruthy();
  });

  test('failed fetch', async () => {
    getOrderList.mockRejectedValue({
      data: {},
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      res = await result;
    });

    await expect(res.current.list).toBeTruthy();
  });
});
