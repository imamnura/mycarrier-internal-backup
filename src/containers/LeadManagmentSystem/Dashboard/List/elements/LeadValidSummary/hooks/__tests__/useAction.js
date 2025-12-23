import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import { getLeadValidSummary } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';

jest.mock('next/router');
jest.mock(
  '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories',
);

describe('src/pages/LeadManagementSystem/Dashboard/List/elements/LeadValidSummary/hooks/useAction', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: 'dashboardId' },
      push: jest.fn(),
    });
  });

  test('run properly', async () => {
    getLeadValidSummary.mockResolvedValue({
      data: {
        data: [{ count: 1, label: 'test' }],
      },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction());

      await result.current.redirectToReport();
      await result.current.setFilterDateSubmit('test');
      await result.current.setDotsActive('1')();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run failed fetch', async () => {
    getLeadValidSummary.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction());

      await result.current.setFilterDateSubmit([null, null]);

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });
});
