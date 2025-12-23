import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import useActions from '../useAction';
import { useRouter } from 'next/router';
import { getListOfDetailBroadcastInformation } from '@containers/Broadcast/BroadcastInformation/_repositories/repositories';

jest.mock(
  '@containers/Broadcast/BroadcastInformation/_repositories/repositories',
);
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/containers/Broadcast/BroadcastInformation/Detail/elements/ListOfDetail/hooks/useActions', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({
      asPath: route.broadcastInformation('detail', 'id'),
      push: jest.fn(),
      query: { id: 'id' },
    });
  });

  const resolvedList = {
    data: [{}],
    meta: {
      page: 1,
      totalPage: 2,
    },
  };

  const feature = [];

  test('run properly', async () => {
    getListOfDetailBroadcastInformation.mockResolvedValue(resolvedList);

    const props = { feature };

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      await waitForValueToChange(() => result.current.list);
      await result.current.onPaginationChange({}, 1);
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(1);
  });

  test('last page', async () => {
    getListOfDetailBroadcastInformation.mockResolvedValue({
      data: null,
      meta: { page: 2, totalPage: 2 },
    });

    const props = { feature };

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      await waitForValueToChange(() => result.current.list);

      res = await result;
    });

    await expect(res.current.list.data).toBe(null);
  });

  test('failed validate path', async () => {
    useRouter.mockReturnValueOnce({
      asPath: '/fail',
      push: jest.fn(),
      query: { id: 'id' },
    });
    const props = { feature };

    const { result } = await renderHook(() => useActions(props));

    await expect(result.current.list.data).toHaveLength(0);
  });

  test('failed fetch list', async () => {
    getListOfDetailBroadcastInformation.mockRejectedValue({});

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('empty broadcast id', async () => {
    useRouter.mockReturnValueOnce({ query: { id: '' } });
    const props = { feature };

    const { result } = await renderHook(() => useActions(props));

    await expect(result.current.list.data).toHaveLength(0);
  });
});
