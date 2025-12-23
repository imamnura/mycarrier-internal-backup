import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import { getQuoteHeader } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';

jest.mock('next/router');
jest.mock(
  '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories',
);

describe('src/pages/LeadManagementSystem/Dashboard/DetailPhase2/elements/PickUpProductItems/hooks/useAction', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: 'dashboardId', params: 'scQuoteId' },
    });
  });

  const props = {
    feature: [],
  };

  test('run properly', async () => {
    getQuoteHeader.mockResolvedValue({
      data: [{}],
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      res = await result;
    });

    await expect(res.current.dashboardId).toBeTruthy();
  });

  test('failed fetch', async () => {
    getQuoteHeader.mockRejectedValue({
      data: [{}],
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      res = await result;
    });

    await expect(res.current.dashboardId).toBeTruthy();
  });
});
