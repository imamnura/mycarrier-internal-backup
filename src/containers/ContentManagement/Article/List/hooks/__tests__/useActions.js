import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { useRouter } from 'next/router';
import { route } from '@configs';
import {
  getList,
  deleteArticle,
} from '@containers/ContentManagement/Article/_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('@containers/ContentManagement/Article/_repositories/repositories');
jest.mock('react-redux');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/ContentManagement/Article/List/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    getList.mockResolvedValue({
      data: [{}],
      meta: { totalPages: 2, page: 1 },
    });
    useRouter.mockReturnValue({
      pathname: route.article('list'),
      push: jest.fn(),
    });
  });

  test('run properly', async () => {
    useRouter.mockReturnValue({
      pathname: route.article('list'),
      push: jest.fn(),
    });

    getList.mockResolvedValue({
      data: [{}],
      meta: { totalPages: 2, page: 1 },
    });
    deleteArticle.mockResolvedValue({ success: true });

    const props = { feature: [] };

    const { hydrate, result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onAddArticle();
      result.current.onDeleteArticle();
      result.current.onUpdateArticle();
      // result.current.onBottomPage();
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run properly/others states', async () => {
    useRouter.mockReturnValue({
      pathname: route.article('list'),
      push: jest.fn(),
    });

    getList.mockResolvedValue({
      data: null,
      meta: { totalPages: 2, page: 5 },
    });
    deleteArticle.mockResolvedValue({ success: true });

    const props = {
      feature: ['create_article', 'update_article', 'delete_article'],
    };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    act(() => {
      result.current.onAddArticle();
      result.current.onDeleteArticle();
      result.current.onUpdateArticle();
      // result.current.onBottomPage();
      result.current.fetchDeleteArticle(1)();
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('wrong route', async () => {
    useRouter.mockReturnValue({
      location: { pathname: '/wrong-route' },
      push: jest.fn(),
    });

    getList.mockResolvedValue({
      data: null,
      meta: { totalPages: 2, page: 4 },
    });
    deleteArticle.mockResolvedValue({ success: true });

    const props = { feature: [] };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    useRouter.mockReturnValue({
      location: { pathname: route.article('list') },
      push: jest.fn(),
    });

    getList.mockRejectedValue({ message: '' });
    deleteArticle.mockRejectedValue({ success: false });

    const props = { feature: [''] };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected have access delete_article', async () => {
    useRouter.mockReturnValue({
      location: { pathname: route.article('list') },
      push: jest.fn(),
    });

    getList.mockRejectedValue();
    deleteArticle.mockRejectedValue({ success: false });

    const props = { feature: ['delete_article'] };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    act(() => {
      result.current.onDeleteArticle();
      result.current.fetchDeleteArticle(1)();
    });

    expect(result.current.list.data).not.toBeUndefined();
  });
});
