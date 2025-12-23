import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import { getDetailBrochure } from '@containers/ContentManagement/Brochure/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('@containers/ContentManagement/Brochure/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/containers/ContentManagement/Brochure/Detail/hooks/useActions', () => {
  afterEach(cleanup);

  const resolvedDetail = {
    data: {
      brochureId: 'BD-06654796',
      contactNumber: '081324008164',
      dateDownload: '2022-10-18T15:24:14.796Z',
      email: 'laras@getnada.com',
      location: '',
      name: 'laras',
      newsLetterStatus: true,
      product: 'Homepage',
      source: 'https://mycarrier-staging.telkomdigitalsolution.co/',
      typeOfLogin: 'After Login',
    },
  };

  beforeAll(() => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    getDetailBrochure.mockResolvedValue(resolvedDetail);
    useRouter.mockReturnValue({
      asPath: route.userDownloadBrochure('detail', 'id'),
      push: jest.fn(),
      query: { id: 'id' },
    });
  });

  const feature = ['read_detail_user_downloaded_brochure'];

  test('run properly', async () => {
    const props = { feature };

    let res;

    // const fetcherPromise = Promise.resolve(resolvedDetail);
    // const fetch = jest.fn(() => fetcherPromise);
    // const { result } = renderHook(() => useActions(props));
    // await act(() => fetcherPromise);
    // expect(result.current.detail).toBeTruthy();

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      await waitForValueToChange(() => result.current.detail);
      res = await result;
    });

    await expect(res.current.detail).toBeTruthy();
  });

  test('empty privilege', async () => {
    const props = { feature: [] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      res = await result;
    });

    await expect(res.current.detail).toEqual({});
  });

  test('failed get detail', async () => {
    getDetailBrochure.mockRejectedValueOnce();

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.detail).toEqual({});
  });

  test('empty id', async () => {
    useRouter.mockReturnValue({
      asPath: route.userDownloadBrochure('detail', 'id'),
      push: jest.fn(),
      query: { id: '' },
    });
    const props = { feature };

    const { result } = await renderHook(() => useActions(props));

    await expect(result.current.detail).toEqual({});
  });
});
