import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import { getListDetailStage } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';

jest.mock('next/router');
jest.mock(
  '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories',
);

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/ReassignSalesTeam/hooks/useActions', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({ query: { id: 'id', params: 'params' } });
  });

  const props = {
    feature: [],
  };

  test('run properly', async () => {
    getListDetailStage.mockResolvedValue({
      data: {},
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      res = await result;
    });

    await expect(res.current.list).toBeTruthy();
  });

  test('failed fetch', async () => {
    getListDetailStage.mockRejectedValue({
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
