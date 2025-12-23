import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { getList, getProduct } from '../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('../../../_repositories/repositories');
jest.mock('react-redux');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/containers/ContentManagement/Brochure/List/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  const dataProduct = {
    data: [{ name: 'product 1' }, { name: 'product 2' }],
  };

  test('run properly', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.userDownloadBrochure('list'),
      push: jest.fn(),
    });
    getList.mockResolvedValue({
      data: [
        {
          afterLogin: false,
          allowNewsletter: true,
          brochureDownloadId: 'BD-31306495',
          dateDownload: '2022-10-13T03:21:46.495Z',
          email: 'laras@getnada.com',
          name: 'Tytan',
          product: 'Homepage',
          source: 'https://mycarrier-dev.telkomdigitalsolution.co/',
        },
      ],
      meta: { totalPages: 2, page: 1 },
    });
    getProduct.mockResolvedValue(dataProduct);

    const props = { feature: [] };

    const { hydrate, result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onClickRowTable({ brochureDownloadId: '123' });
      // result.current.onBottomPage();
      result.current.onClickRefresh();
      result.current.filter.datePick.onChange(['2022-10-18', '2022-10-19']);
      result.current.filter.product.onChange('test');
      result.current.filter.newsletter.onChange('true');
      result.current.filter.loginType.onChange('true');
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run properly/others state', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.userDownloadBrochure('list'),
      push: jest.fn(),
    });
    getList.mockResolvedValue({
      data: [{}, {}],
      meta: { totalPages: 2, page: 2 },
    });
    getProduct.mockResolvedValue(dataProduct);

    const props = { feature: ['read_detail_user_downloaded_brochure'] };

    const { hydrate, result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onClickRowTable({ brochureDownloadId: '123' });
      // result.current.onBottomPage();
      result.current.onClickRefresh();
      result.current.filter.datePick.onChange(['2022-10-18', '2022-10-19']);
      result.current.filter.product.onChange('test');
      result.current.filter.newsletter.onChange('true');
      result.current.filter.loginType.onChange('true');
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('wrong route', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      location: { pathname: '/wrong-route' },
      push: jest.fn(),
    });
    getList.mockResolvedValue({
      data: null,
      meta: { totalPages: 2, page: 2 },
    });
    getProduct.mockResolvedValue(dataProduct);

    const props = { feature: [] };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.userDownloadBrochure('list'),
      push: jest.fn(),
    });
    getList.mockRejectedValue({ message: '' });

    getProduct.mockRejectedValue({ success: false });

    const props = { feature: [] };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    expect(result.current.list.data).not.toBeUndefined();
  });
});
