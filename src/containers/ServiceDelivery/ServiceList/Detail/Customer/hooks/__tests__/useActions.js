import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import {
  getDetailCustomer,
  downloadList,
} from '@containers/ServiceDelivery/ServiceList/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('@containers/ServiceDelivery/ServiceList/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/containers/ServiceDelivery/ServiceList/Detail/Customer/useActions', () => {
  afterEach(cleanup);

  const resolvedDetail = {
    data: {
      address: 'JAKARTA,-',
      custAccntName: 'PT TELEKOMUNIKASI SELULAR',
      custAccntNum: '0003700008',
      isHaveProject: true,
    },
  };

  beforeAll(() => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    getDetailCustomer.mockResolvedValue(resolvedDetail);
    useRouter.mockReturnValue({
      query: { id: 'id', tab: 'serviceList' },
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
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      result.current.action();
      result.current.onClickDownload()();
      await waitForValueToChange(() => result.current.data);
      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run properly fail download', async () => {
    let res;
    downloadList.mockResolvedValue({
      data: {
        fileUrlDownload: null,
      },
    });

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      result.current.action();
      result.current.onClickDownload()();
      await waitForValueToChange(() => result.current.data);
      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run properly tab project', async () => {
    useRouter.mockReturnValue({
      query: { id: 'id', tab: 'project' },
      isReady: true,
    });
    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions({
          feature: ['read_detail_service_list'],
        }),
      );

      result.current.action();
      await waitForValueToChange(() => result.current.data);
      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('empty privilege', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions({ feature: [] }));

      res = await result;
    });

    await expect(res.current.data).toBeNull();
  });

  test('failed get detail', async () => {
    getDetailCustomer.mockRejectedValueOnce({ message: 'e' });
    downloadList.mockRejectedValueOnce({ message: 'e' });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      result.current.action();
      result.current.onClickDownload()();
      res = await result;
    });

    await expect(res.current.data).toBeNull();
  });

  test('empty id', async () => {
    useRouter.mockReturnValue({ query: { id: null }, isReady: false });

    const { result } = await renderHook(() => useActions(props));

    await expect(result.current.data).toBeNull();
  });
});
