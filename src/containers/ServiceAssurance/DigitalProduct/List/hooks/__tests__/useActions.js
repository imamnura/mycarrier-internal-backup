import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import { route } from '@configs';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getList,
  downloadList,
} from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';
import useActions from '../useActions';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock(
  '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories',
);

describe('src/containers/ServiceAssurance/DigitalProduct/List/hooks/useActions', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      pathname: route.digitalProduct('list'),
      push: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
  });

  const resolvedList = {
    data: [{}, {}],
    meta: {
      page: 1,
      totalPage: 2,
    },
  };

  const resolveDownload = {
    data: {
      fileUrl: 'url',
    },
  };

  test('run properly approval', async () => {
    getList.mockResolvedValue(resolvedList);
    downloadList.mockResolvedValue(resolveDownload);
    const props = {
      feature: [
        'read_detail_ticket_digital_product',
        'read_detail_history_ticket_digital_product',
      ],
    };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setTab('approval');
      await result.current.setFilterDateRange(['2023-02-21', '2023-02-22']);
      await result.current.setFilterStatus({
        value: 'tes',
        label: 'All Status',
      });
      // await waitForValueToChange(() => result.current.list.data);
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
        'read_detail_ticket_digital_product',
        'read_detail_history_ticket_digital_product',
      ],
    };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setTab('history');
      await result.current.setFilterDateRange(['2023-02-21', '2023-02-22']);
      await result.current.setFilterStatus({
        value: 'tes',
        label: 'All Status',
      });
      // await waitForValueToChange(() => result.current.list.data);
      await result.current.onClickRowTable(resolvedList.data[0]);

      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(2);
  });

  test('last page', async () => {
    getList.mockResolvedValue({
      data: [],
      meta: {
        page: 2,
        totalPage: 2,
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

  test('refresh tab approval', async () => {
    getList.mockResolvedValue(resolvedList);
    const props = {
      feature: [
        'read_detail_ticket_digital_product',
        'read_detail_history_ticket_digital_product',
      ],
    };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setTab('approval');
      await result.current.setFilterDateRange(['2023-02-14', '2023-02-15']);
      await result.current.setFilterStatus({
        value: 'tes',
        label: 'All Status',
      });
      // await waitForValueToChange(() => result.current.list.data);
      await result.current.onClickRefresh();
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(2);
  });

  test('refresh tab history', async () => {
    getList.mockResolvedValue(resolvedList);
    const props = {
      feature: [
        'read_detail_ticket_digital_product',
        'read_detail_history_ticket_digital_product',
      ],
    };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setTab('history');
      await result.current.setFilterDateRange(['2023-02-14', '2023-02-15']);
      await result.current.setFilterStatus({
        value: 'tes',
        label: 'All Status',
      });
      // await waitForValueToChange(() => result.current.list.data);
      await result.current.onClickRefresh();
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(2);
  });

  test('download with file url', async () => {
    getList.mockResolvedValue(resolvedList);
    downloadList.mockResolvedValue(resolveDownload);
    const props = { feature: [] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.onClickDownload();
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(2);
  });

  test('download no file url', async () => {
    getList.mockResolvedValue(resolvedList);
    downloadList.mockResolvedValue({ data: { fileUrl: null } });
    const props = { feature: [] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(2);
  });

  test('download other condition', async () => {
    getList.mockResolvedValue(resolvedList);
    downloadList.mockResolvedValue({ data: { fileUrl: null } });
    const props = { feature: [] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setTab('approval');
      await result.current.setFilterDateRange(['2023-02-14', '2023-02-15']);
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
