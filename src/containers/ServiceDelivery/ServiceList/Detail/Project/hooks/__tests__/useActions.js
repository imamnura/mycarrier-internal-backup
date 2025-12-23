import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import { downloadList } from '@containers/ServiceDelivery/ServiceList/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('@containers/ServiceDelivery/ServiceList/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/containers/ServiceDelivery/ServiceList/Detail/Project/hooks/useActions', () => {
  afterEach(cleanup);

  beforeAll(() => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    useRouter.mockReturnValue({
      query: { id: 'id', params: 'params' },
      isReady: true,
    });
  });
  const props = {
    feature: ['read_detail_service_list', 'read_download_service_list'],
  };

  test('run properly', async () => {
    let res;
    downloadList.mockResolvedValue({
      data: {
        fileUrlDownload: '123',
      },
    });

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      result.current.action();
      result.current.onClickDownload()();
      res = await result;
    });

    await expect(res.current.action()).toBeTruthy();
  });

  test('run properly fail download', async () => {
    let res;
    downloadList.mockResolvedValue({
      data: {
        fileUrlDownload: null,
      },
    });

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      result.current.action();
      result.current.onClickDownload()();
      res = await result;
    });

    await expect(res.current.action()).toBeTruthy();
  });

  test('run properly without privilage download', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useActions({
          feature: ['read_detail_service_list'],
        }),
      );

      result.current.action();
      res = await result;
    });

    await expect(res.current.action()).toBeTruthy();
  });

  test('empty privilege', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions({ feature: [] }));

      res = await result;
    });

    await expect(res.current.action()).toBeTruthy();
  });

  test('failed get detail', async () => {
    downloadList.mockRejectedValueOnce({ message: 'e' });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      result.current.action();
      result.current.onClickDownload()();
      res = await result;
    });

    await expect(res.current.action()).toBeTruthy();
  });
});
