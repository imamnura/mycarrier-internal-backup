import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  submitArticle,
  getArticle,
  getListProduct,
} from '@containers/ContentManagement/Article/_repositories/repositories';

jest.mock('@containers/ContentManagement/Article/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/ContentManagement/Article/Create/hooks/useActions', () => {
  afterEach(cleanup);

  const resolvedDetail = {
    data: {
      id: 'id',
      imageUrl: {
        mediaId: 'mediaId',
        mediaName: 'mediaName',
        mediaPath: 'mediaPath',
      },
      isDisplay: true,
      keyword: ['test', 'test 2', 'test 3'],
      localizations: [
        {
          baseLanguage: true,
          caption: 'satu caption update',
          id: 'b9bf88ff7db7ebcf1b5fcc16906035b2',
          language: 'id',
          slug: 'satu-test',
          story: '<p>Ketik story konten di sini dalam Bahasa..id</p>',
          title: 'satu test',
        },
        {
          baseLanguage: false,
          caption: 'satu caption update en',
          id: 'b9bf88ff7db7ebcf1b5fcc16906035b3',
          language: 'en',
          slug: 'satu-test',
          story: '<p>Ketik story konten di sini dalam Bahasa..en</p>',
          title: 'satu test en',
        },
      ],
      relatedProduct: ['test1', 'test2'],
      type: 'article',
    },
  };

  const resolvedProduct = [
    {
      catId: 'a1',
      name: 'Cloud & Data Center',
    },
    {
      catId: 'a2',
      name: 'Cloud & Data Center B',
    },
  ];

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
    getListProduct.mockResolvedValue({ data: resolvedProduct });
    useRouter.mockReturnValue({
      asPath: route.article('edit'),
      push: jest.fn(),
      query: { id: '1' },
    });
  });

  const feature = [''];

  test('run properly tab id', async () => {
    useRouter.mockReturnValue({
      asPath: route.article('edit', 'id'),
      push: jest.fn(),
      query: { id: 'test' },
    });

    getArticle.mockResolvedValue(resolvedDetail);

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.onKeyDownKeyword({
        key: 'Enter',
        preventDefault: jest.fn(),
      });
      await result.current.onDeleteChipKeyword(['test 2']);
      await result.current.handleEditStory('test story tab id');
      await result.current.handleGetStory('test story tab id');
      await result.current.onDeleteChipRelatedProduct([
        'test 1',
        'test 2',
        'test 3',
      ]);
      await result.current.handleCancel();
      await result.current.handleSwap();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
    await expect(res.current.detail).toBeTruthy();
  });

  test('run get detail article failed', async () => {
    getArticle.mockRejectedValue({ message: 'error' });

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.detail).toEqual({});
  });

  test('run fetch create article', async () => {
    useRouter.mockReturnValue({
      asPath: route.article('create'),
      push: jest.fn(),
      query: { id: '' },
    });

    submitArticle.mockResolvedValue({});

    const props = { feature: ['create_article'] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.handleEditStory('');
      await result.current.onKeyDownKeyword({});
      await result.current.confirmAdd(resolvedDetail);
      await result.current.handleSubmit(resolvedDetail);

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run fetch edit article', async () => {
    useRouter.mockReturnValue({
      asPath: route.article('edit', 'id'),
      push: jest.fn(),
      query: { id: 'test' },
    });

    submitArticle.mockResolvedValue(resolvedDetail);

    const props = { feature: ['update_article'] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setTab('en');
      await result.current.handleEditStory('test story en');
      await result.current.handleSwap();
      await result.current.confirmAdd(resolvedDetail);
      await result.current.handleSubmit(resolvedDetail);

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('submit fail not has access label add', async () => {
    useRouter.mockReturnValue({
      asPath: route.article('edit', 'id'),
      push: jest.fn(),
      query: { id: '1' },
    });

    submitArticle.mockRejectedValue({ success: false });

    const props = { feature: [''] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setTab('en');
      await result.current.handleEditStory('');
      await result.current.confirmAdd({});

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('submit not has access label edit', async () => {
    useRouter.mockReturnValue({
      asPath: route.article('create'),
      push: jest.fn(),
      query: { id: '' },
    });

    submitArticle.mockRejectedValue({ success: false });

    const props = { feature: [''] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.confirmAdd({});

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('fetch list product failed', async () => {
    getListProduct.mockRejectedValue({ message: 'error' });

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
