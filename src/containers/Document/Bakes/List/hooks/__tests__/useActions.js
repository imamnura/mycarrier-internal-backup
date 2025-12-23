import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import {
  getFilterCompanyOptions,
  getListBakes,
} from '../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

jest.mock('../../../_repositories/repositories');
jest.mock('react-redux');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/pages/Document/Bakes/List/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  test('run properly', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.bakes('list'),
      push: jest.fn(),
    });
    getListBakes.mockResolvedValue({
      data: [{}],
      meta: { totalPage: 2, page: 1 },
    });
    getFilterCompanyOptions.mockResolvedValue({ data: ['name1'] });
    const props = { feature: [] };

    const { hydrate, result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onClickNewBakes();
      result.current.onClickRowTable({ status: 'draft' });
      result.current.onClickRowTable({ status: 'other' });
      // result.current.onBottomPage();
    });

    // await waitForValueToChange(() => result.current.list.data);

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run properly/others states', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.bakes('list'),
      push: jest.fn(),
    });
    getListBakes.mockResolvedValue({
      data: null,
      meta: { totalPage: 2, page: 4 },
    });
    getFilterCompanyOptions.mockResolvedValue({ data: ['name1'] });
    const props = {
      feature: ['read_detail', 'update_draft', 'read_bakes_approve'],
    };

    const { result, hydrate, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onClickRowTable({ status: 'draft' });
      result.current.onClickRowTable({ status: 'other' });
      // result.current.onBottomPage();
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('wrong route', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({ pathname: '/wrong-route', push: jest.fn() });
    getListBakes.mockResolvedValue({
      data: null,
      meta: { totalPage: 2, page: 4 },
    });
    getFilterCompanyOptions.mockResolvedValue({ data: ['name1'] });
    const props = { feature: [] };

    const { result, hydrate, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();
    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({ pathname: route.bakes('list') });
    getListBakes.mockRejectedValue({ message: '' });
    getFilterCompanyOptions.mockRejectedValue({ message: '' });
    const props = { feature: [] };

    const { result, hydrate, waitForValueToChange } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForValueToChange(() => result.current.list.data);

    expect(result.current.list.data).not.toBeUndefined();
  });
});
