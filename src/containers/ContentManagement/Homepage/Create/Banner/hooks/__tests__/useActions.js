import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  fetchSubmitContent,
  getDetailBanner,
  getListProduct,
  getSlugByCatId,
} from '@containers/ContentManagement/Homepage/_repositories/repositories';
import { ASSETS_URL } from '@constants/env';

jest.mock('@containers/ContentManagement/Homepage/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/ContentManagement/Homepage/Create/Banner/hooks/useActions', () => {
  afterEach(cleanup);

  const resolvedDetail = {
    data: {
      bannerId: 'id',
      imageUrl: {
        desktop: `${ASSETS_URL}/ewz-mycarrier-pub-dev/catalogpublic/`,
        mobile: `${ASSETS_URL}/ewz-mycarrier-pub-dev/catalogpublic/`,
      },
      isDisplay: true,
      linkedTo: 'test',
      localizations: [
        {
          baseLanguage: true,
          description: 'satu caption update',
          id: 'b9bf88ff7db7ebcf1b5fcc16906035b2',
          language: 'id',
          title: 'satu test',
        },
        {
          baseLanguage: false,
          description: 'satu caption update en',
          id: 'b9bf88ff7db7ebcf1b5fcc16906035b3',
          language: 'en',
          title: 'satu test en',
        },
      ],
      productId: 'product id',
      type: 'banner',
      urlType: 'internal',
    },
  };

  const payloadSubmit = {
    imageUrl: {
      desktop: `${ASSETS_URL}/ewz-mycarrier-pub-dev/catalogpublic/`,
      mobile: `${ASSETS_URL}/ewz-mycarrier-pub-dev/catalogpublic/`,
    },
    isDisplay: true,
    linkedTo: 'test',
    localizations: [
      {
        baseLanguage: true,
        description: 'satu caption update',
        id: 'b9bf88ff7db7ebcf1b5fcc16906035b2',
        language: 'id',
        title: 'satu test',
      },
      {
        baseLanguage: false,
        description: 'satu caption update en',
        id: 'b9bf88ff7db7ebcf1b5fcc16906035b3',
        language: 'en',
        title: 'satu test en',
      },
    ],
    productId: 'product id',
    type: 'banner',
    urlType: 'internal',
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
      asPath: route.banner('edit'),
      push: jest.fn(),
      query: { id: '1' },
    });
  });

  const feature = [''];

  test('run properly tab id', async () => {
    useRouter.mockReturnValue({
      asPath: route.banner('edit', 'id'),
      push: jest.fn(),
      query: { id: 'test' },
    });

    getDetailBanner.mockResolvedValue(resolvedDetail);

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.confirmAdd(resolvedDetail);
      await result.current.handleSubmit(resolvedDetail);
      await result.current.handleCancel();
      await result.current.handleSwap();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run get detail banner failed', async () => {
    useRouter.mockReturnValue({
      asPath: route.banner('edit', 'id'),
      push: jest.fn(),
      query: { id: '1' },
    });

    getDetailBanner.mockRejectedValue({ message: 'error' });

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run fetch create banner', async () => {
    useRouter.mockReturnValue({
      asPath: route.banner('create'),
      push: jest.fn(),
      query: { id: '' },
    });

    fetchSubmitContent.mockResolvedValue(payloadSubmit);
    getSlugByCatId.mockResolvedValue({ data: 'test' });

    const props = { feature: ['create_banner'] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.confirmAdd(resolvedDetail);
      await result.current.handleSubmit(resolvedDetail);

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run fetch edit banner', async () => {
    useRouter.mockReturnValue({
      asPath: route.banner('edit', 'id'),
      push: jest.fn(),
      query: { id: 'test' },
    });

    fetchSubmitContent.mockResolvedValue(payloadSubmit);
    getSlugByCatId.mockResolvedValue({ data: 'tests' });

    const props = { feature: ['update_banner'] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setTab('en');
      await result.current.handleSwap();
      await result.current.confirmAdd(resolvedDetail);
      await result.current.handleSubmit(resolvedDetail);

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('submit fail not has access label add', async () => {
    useRouter.mockReturnValue({
      asPath: route.banner('edit', 'id'),
      push: jest.fn(),
      query: { id: '1' },
    });

    fetchSubmitContent.mockRejectedValue({ success: false });

    const props = { feature: [''] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setTab('en');
      await result.current.confirmAdd({});

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('submit not has access label edit', async () => {
    useRouter.mockReturnValue({
      asPath: route.banner('create'),
      push: jest.fn(),
      query: { id: '' },
    });

    fetchSubmitContent.mockRejectedValue({ success: false });

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

    await expect(res.current.optionsProduct).toBeTruthy();
  });
});
