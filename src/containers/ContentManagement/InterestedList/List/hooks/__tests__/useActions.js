import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import {
  getList,
  getSource,
  checkScIntegrationStatus,
} from '@containers/ContentManagement/InterestedList/_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

jest.mock(
  '@containers/ContentManagement/InterestedList/_repositories/repositories',
);
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/pages/ContentManagement/InterestedList/List/hooks/useActions', () => {
  afterEach(cleanup);

  const feature = [''];

  const resolvedList = {
    data: [{}, {}],
    meta: {
      page: 1,
      totalPages: 2,
    },
    hasMore: false,
  };

  const resolvedSource = {
    data: [
      { name: 'name1', value: 'value1' },
      { name: 'name2', value: 'value2' },
    ],
  };

  test('run properly', async () => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    useRouter.mockReturnValue({
      pathname: route.interested('list'),
      push: jest.fn(),
    });

    getList.mockResolvedValue(resolvedList);
    getSource.mockResolvedValue(resolvedSource);
    checkScIntegrationStatus.mockResolvedValue({ data: { status: true } });

    const props = { feature };

    const { result, hydrate, waitForNextUpdate, waitForValueToChange } =
      await renderHook(() => useActions(props));

    hydrate();

    await waitForNextUpdate();

    act(() => {
      // result.current.onBottomPage();
      result.current.onClickRowTable({ interestId: 1 });
      result.current.onClickRefresh();
      result.current.setModalDownload(true);
      result.current.setLoadingDownload(true);
      result.current.filter.source.onChange('test');
      result.current.filter.dateRange.onChange(['2023-02-07', '2023-02-01']);
      result.current.filter.status.onChange('valid');
      result.current.filter.starclickStatus.onChange('qualify');
      result.current.setScIntegrationStatus();
    });

    await waitForValueToChange(() => result.current.list.data);

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run properly others states', async () => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    useRouter.mockReturnValue({
      pathname: route.interested('detail', 'id'),
      push: jest.fn(),
    });

    getList.mockResolvedValue({
      data: null,
      meta: { totalPages: 2, page: 4 },
    });
    getSource.mockResolvedValue({
      data: [
        { name: 'name1', value: 'value1' },
        { name: 'name2', value: 'value2' },
      ],
    });
    checkScIntegrationStatus.mockResolvedValue({ data: { status: true } });

    const props = { feature: ['read_detail'] };

    const { result, hydrate, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      // result.current.onBottomPage();
      result.current.onClickRowTable({ interestId: 1 });
      result.current.onClickRefresh();
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('wrong route', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({ pathname: '/wrong-route', push: jest.fn() });
    getList.mockResolvedValue({
      data: null,
      meta: { totalPages: 2, page: 4 },
    });
    getSource.mockResolvedValue({
      data: [
        { name: 'name1', value: 'value1' },
        { name: 'name2', value: 'value2' },
      ],
    });
    checkScIntegrationStatus.mockResolvedValue({ data: { status: true } });

    const props = { feature };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.interested('list'),
      push: jest.fn(),
    });

    getList.mockRejectedValue();
    getSource.mockRejectedValue();
    checkScIntegrationStatus.mockRejectedValue();

    const props = { feature };

    const { result } = await renderHook(() => useActions(props));

    expect(result.current.list.data).not.toBeUndefined();
  });
});
