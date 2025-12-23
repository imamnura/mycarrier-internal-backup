import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { getListUser } from '@containers/ContentManagement/AmMapping/_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('@containers/ContentManagement/AmMapping/_repositories/repositories');
jest.mock('react-redux');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/pages/ContentManagement/AmMapping/List/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });

    getListUser.mockResolvedValue({
      data: [{}],
      meta: { totalPages: 2, page: 1 },
    });

    useRouter.mockReturnValue({
      pathname: route.amMapping('list'),
      push: jest.fn(),
    });
  });

  test('run properly', async () => {
    useRouter.mockReturnValue({
      pathname: route.amMapping('list'),
      push: jest.fn(),
    });

    getListUser.mockResolvedValue({
      data: [{}],
      meta: { totalPages: 2, page: 1 },
    });

    const props = { feature: [''] };

    const { hydrate, result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onClickAdd();
      result.current.onClickRowTable();
      // result.current.onBottomPage();
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run properly/others states', async () => {
    useRouter.mockReturnValue({
      pathname: route.amMapping('list'),
      push: jest.fn(),
    });

    getListUser.mockResolvedValue({
      data: null,
      meta: { totalPages: 2, page: 5 },
    });

    const props = {
      feature: ['create_amMapping', 'read_detail'],
    };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    act(() => {
      result.current.onClickAdd();
      result.current.onClickRowTable({ userId: 1 });
      // result.current.onBottomPage();
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('wrong route', async () => {
    useRouter.mockReturnValue({
      location: { pathname: '/wrong-route' },
      push: jest.fn(),
    });

    getListUser.mockResolvedValue({
      data: null,
      meta: { totalPages: 2, page: 5 },
    });

    const props = { feature: [''] };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    useRouter.mockReturnValue({
      pathname: route.amMapping('list'),
      push: jest.fn(),
    });

    getListUser.mockRejectedValue();

    const props = { feature: [''] };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    expect(result.current.list.data).not.toBeUndefined();
  });
});
