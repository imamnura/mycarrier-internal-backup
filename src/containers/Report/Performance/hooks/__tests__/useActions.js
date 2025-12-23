import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import {
  getChartData,
  getList,
  // downloadDetailData,
  getFilterCustomerOptions,
} from '../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

jest.mock('../../_repositories/repositories');
jest.mock('react-redux');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/pages/PerformanceReport/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  test('run properly', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.reportPerformance(),
      push: jest.fn(),
      query: { feature: [] },
      replace: jest.fn(),
    });
    getList.mockResolvedValue({
      data: [{}],
      meta: { totalPage: 2, page: 1 },
    });
    getFilterCustomerOptions.mockResolvedValue({ data: ['name1'] });
    getChartData.mockResolvedValue({});

    // const props = { tab: 'po' };

    const { hydrate, result, waitForValueToChange } = await renderHook(() =>
      useActions(),
    );

    hydrate();

    // await waitForNextUpdate();

    act(() => {
      result.current.onClickDownload();
      result.current.onClickRefresh();
      // result.current.onBottomPage();
      result.current.setFilterCustomer({ label: '', value: '' });
      result.current.setFilterPeriod([null, null]);
      result.current.setTab('po');
    });

    await waitForValueToChange(() => result.current.list.data);

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    // useRouter.mockReturnValue({ pathname: route.reportPerformance() });
    useRouter.mockReturnValue({
      pathname: route.reportPerformance(),
      push: jest.fn(),
      query: { feature: [''] },
      replace: jest.fn(),
    });
    getList.mockRejectedValue({ message: '' });
    getFilterCustomerOptions.mockRejectedValue({ message: '' });
    getChartData.mockRejectedValue({ message: '' });
    // const props = { feature: []};

    const { result, hydrate, waitForValueToChange } = await renderHook(() =>
      useActions(),
    );

    hydrate();

    act(() => {
      result.current.setTab('wrong');
    });

    await waitForValueToChange(() => result.current.list.data);

    expect(result.current.list.data).not.toBeUndefined();
  });
});
