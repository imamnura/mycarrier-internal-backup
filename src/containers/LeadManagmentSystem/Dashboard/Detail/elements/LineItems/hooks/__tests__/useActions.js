import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import { getListLineItems } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';

jest.mock('next/router');
jest.mock(
  '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories',
);

describe('src/pages/LeadManagementSystem/Dashboard/DetailPhase2/elements/PickUpProductItems/hooks/useAction', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({ query: { id: 'dashboardId' } });
  });

  const props = {
    quoteId: 1,
  };

  test('run properly', async () => {
    getListLineItems.mockResolvedValue({
      data: [{}],
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      res = await result;
    });

    await expect(res.current.list).toBeTruthy();
  });

  test('failed fetch', async () => {
    getListLineItems.mockRejectedValue({
      data: [{}],
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      res = await result;
    });

    await expect(res.current.list).toBeTruthy();
  });
});
