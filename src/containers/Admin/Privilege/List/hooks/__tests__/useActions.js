import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { getList } from '@containers/Admin/Privilege/_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('@containers/Admin/Privilege/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('src/pages/Admin/Privilege/List/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
    });
    useRouter.mockReturnValue({
      pathname: route.privilege('list'),
      push: jest.fn(),
    });
  });

  const resolvedList = {
    data: [{}, {}],
    meta: {
      page: 1,
      totalPages: 2,
    },
  };

  test('run properly', async () => {
    getList.mockResolvedValue(resolvedList);

    const props = { feature: [''], dispatch: jest.fn() };

    const { hydrate, result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onClickRowTable();
      // result.current.onBottomPage();
      result.current.filter.userType.onChange('test');
    });

    // await waitForValueToChange(() => result.current.list.data);

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run properly others state', async () => {
    getList.mockResolvedValue({
      data: [{}, {}],
      meta: { totalPage: 2, page: 5 },
    });

    const props = {
      feature: ['read_detail_privilege_management'],
      dispatch: jest.fn(),
    };

    const { hydrate, result, waitForValueToChange } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    act(() => {
      result.current.onClickRowTable({ journeyId: 1 });
      // result.current.onBottomPage();
    });

    await waitForValueToChange(() => result.current.list.data);

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('wrong route', async () => {
    useRouter.mockReturnValue({
      location: { pathname: '/wrong-route' },
      push: jest.fn(),
    });
    getList.mockResolvedValue({
      data: null,
      meta: { totalPage: 2, page: 5 },
    });

    const props = { feature: [''], dispatch: jest.fn() };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    getList.mockRejectedValue({});

    const props = { feature: [''] };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    expect(result.current.list.data).not.toBeUndefined();
  });
});
