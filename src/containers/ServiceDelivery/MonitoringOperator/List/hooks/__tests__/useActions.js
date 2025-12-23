import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { getList } from '@containers/ServiceDelivery/MonitoringOperator/_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock(
  '@containers/ServiceDelivery/MonitoringOperator/_repositories/repositories',
);
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/containers/ServiceDelivery/MonitoringOperator/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.monitoringOperator('list'),
      push: jest.fn(),
    });
  });

  const feature = ['read_list_monitoring_operator'];

  test('run properly', async () => {
    getList.mockResolvedValue({
      data: [{}],
      meta: { totalPages: 2, page: 1 },
    });

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      // await result.current.onBottomPage();

      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('last page', async () => {
    getList.mockResolvedValue({
      data: null,
      meta: { totalPages: 2, page: 2 },
    });

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('empty privilege', async () => {
    getList.mockResolvedValue({
      data: null,
      meta: { totalPages: 2, page: 3 },
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions({ feature: [] }));

      await result.current.setSearch('sample');
      await result.current.filter.dateRange.onChange('2022-10-18');
      await result.current.filter.operator.onChange('amTelkomsel');
      await result.current.filter.poi.onChange('jakarta');

      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });

  test('fetch rejected', async () => {
    getList.mockRejectedValue({ message: '' });

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.list.data).toHaveLength(0);
  });
});
