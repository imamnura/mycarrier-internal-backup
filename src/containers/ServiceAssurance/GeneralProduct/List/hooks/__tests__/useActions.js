import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import { route } from '@configs';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getList,
  downloadList,
} from '@containers/ServiceAssurance/GeneralProduct/_repositories/repositories';
import useActions from '../useActions';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock(
  '@containers/ServiceAssurance/GeneralProduct/_repositories/repositories',
);

describe('src/containers/ServiceAssurance/GeneralProduct/List/hooks/useActions', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      pathname: route.generalProduct('list'),
      push: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
    });
  });

  const resolvedList = {
    data: [{}, {}],
    meta: {
      page: 1,
      totalPages: 2,
    },
  };

  const resolveDownload = {
    data: {
      fileUrlDownload: 'url',
    },
  };

  test('run properly approval', async () => {
    getList.mockResolvedValue(resolvedList);
    downloadList.mockResolvedValue(resolveDownload);
    const props = {
      feature: [
        'read_detail_ticket_general_product',
        'read_detail_history_ticket_general_product',
      ],
    };

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      await result.current.setTab('approval');
      await waitForValueToChange(() => result.current.list.data);
      await result.current.onClickDownload();
      await result.current.onClickRowTable(resolvedList.data[0]);
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(2);
  });

  test('run properly history', async () => {
    getList.mockResolvedValue(resolvedList);
    downloadList.mockResolvedValue(resolveDownload);
    const props = {
      feature: [
        'read_detail_ticket_general_product',
        'read_detail_history_ticket_general_product',
      ],
    };
    const jsdomOpen = window.open;
    window.open = () => {};

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setTab('history');
      await result.current.setFilterDateRange(['2023-02-14', '2023-02-15']);
      await result.current.setFilterProgress({
        value: 'tes',
        label: 'All Progress',
      });
      await result.current.setFilterStatus({
        value: 'tes',
        label: 'All Status',
      });
      // await waitForValueToChange(() => result.current.list.data);
      await result.current.onClickDownload();
      await result.current.onClosePreview()();
      await result.current.onClickDownloadEvidence()();
      await result.current.onClickRowTable(resolvedList.data[0]);
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(2);
    window.open = jsdomOpen;
  });

  test('last page', async () => {
    getList.mockResolvedValue({
      data: [],
      meta: {
        page: 2,
        totalPages: 2,
      },
    });
    const props = { feature: [] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.onClickRowTable({});
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('refresh page', async () => {
    getList.mockResolvedValue(resolvedList);
    const props = {
      feature: [
        'read_detail_ticket_general_product',
        'read_detail_history_ticket_general_product',
      ],
    };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setTab('approval');
      await result.current.setFilterDateRange(['2023-02-14', '2023-02-15']);
      await result.current.setFilterProgress({
        value: 'tes',
        label: 'All Progress',
      });
      await result.current.setFilterStatus({
        value: 'tes',
        label: 'All Status',
      });
      // await waitForValueToChange(() => result.current.list.data);
      await result.current.onClickDownload();
      await result.current.onClickRefresh();
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(2);
  });

  test('download no file url', async () => {
    getList.mockResolvedValue(resolvedList);
    downloadList.mockResolvedValue({ data: { fileUrlDownload: null } });
    const props = { feature: [] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.onClickDownload();
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(2);
  });

  test('wrong route', async () => {
    useRouter.mockReturnValueOnce({
      pathname: '/wrong-route',
      push: jest.fn(),
    });
    const props = { feature: [''] };

    const { result } = await renderHook(() => useActions(props));

    await expect(result.current.list.data).toHaveLength(0);
  });

  test('fetch rejected', async () => {
    getList.mockRejectedValue({ message: '' });
    const props = { feature: [] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('download rejected', async () => {
    getList.mockResolvedValue(resolvedList);
    downloadList.mockRejectedValue({ message: '' });
    const props = { feature: [] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.onClickDownload();
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(2);
  });
});
