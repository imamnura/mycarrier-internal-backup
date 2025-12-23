import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { getListRole } from '@containers/Admin/Role/_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('@containers/Admin/Role/_repositories/repositories');
jest.mock('react-redux');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/pages/Admin/Role/List/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
    });
    useRouter.mockReturnValue({
      pathname: route.role('list'),
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
    getListRole.mockResolvedValue(resolvedList);

    const props = { feature: [] };

    const { hydrate, result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      // result.current.onBottomPage();
      result.current.onClickRowTable(resolvedList.data[0]);
      result.current.onClickAdd();
      result.current.filter.userType.onChange('test');
    });

    // await waitForValueToChange(() => result.current.list.data);

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run properly others state', async () => {
    getListRole.mockResolvedValue({
      data: [{}, {}],
      meta: { totalPages: 2, page: 5 },
    });

    const props = { feature: ['create_role', 'read_detail'] };

    const { hydrate, result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onClickAdd();
      result.current.onClickRowTable({ roleId: 1 });
      // result.current.onBottomPage();
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('wrong route', async () => {
    getListRole.mockResolvedValue({
      data: null,
      meta: { totalPages: 2, page: 5 },
    });

    const props = { feature: [''] };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    getListRole.mockRejectedValue({ messsage: '' });

    const props = { feature: [''] };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    expect(result.current.list.data).not.toBeUndefined();
  });
});
