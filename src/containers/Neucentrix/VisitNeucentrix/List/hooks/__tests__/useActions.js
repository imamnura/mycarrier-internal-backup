import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import { getListVisitNeucentrix } from '../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

jest.mock('../../../_repositories/repositories');
jest.mock('react-redux');
jest.mock('next/router');

jest.mock('@utils/hooks/usePopupAlert');

describe('src/containers/Neucentrix/VisitNeucentrix/List/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  test('run properly', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.visitNcx('list'),
      push: jest.fn(),
    });
    getListVisitNeucentrix.mockResolvedValue({
      data: [
        {
          companyName: 'PT TELEKOMUNIKASI SELULAR',
          location: 'Neucentrix Bandung',
          picVisitorName: 'Customer NeuCentrix',
          status: 'checking',
          visitEndDate: '2022-08-16T05:30:00.000Z',
          visitId: 'VST-0621173547',
          visitStartDate: '2022-08-16T04:00:00.000Z',
        },
      ],
      meta: { totalPages: 2, page: 1 },
    });
    const props = {
      feature: [
        'read_detail_visiting_neucentrix',
        'read_list_visiting_neucentrix_am',
      ],
    };

    const { hydrate, result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onClickRowTable({ visitId: '01' });
      // result.current.onBottomPage();
    });

    // await waitForValueToChange(() => result.current.list.data);

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run properly without access', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.visitNcx('list'),
      push: jest.fn(),
    });
    getListVisitNeucentrix.mockResolvedValue({});

    const props = { feature: [] };
    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.onClickRowTable({ visitId: '01' });
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run properly/others states', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.visitNcx('list'),
      push: jest.fn(),
    });
    getListVisitNeucentrix.mockResolvedValue({
      data: [
        {
          companyName: 'PT TELEKOMUNIKASI SELULAR',
          location: 'Neucentrix Bandung',
          picVisitorName: 'Customer NeuCentrix',
          status: 'checking',
          visitEndDate: '2022-08-16T05:30:00.000Z',
          visitId: 'VST-0621173547',
          visitStartDate: '2022-08-16T04:00:00.000Z',
        },
      ],
      meta: { totalPages: 2, page: 2 },
    });
    const props = {
      feature: [
        'read_list_visiting_neucentrix',
        'read_detail_visiting_neucentrix',
      ],
    };

    const { result, hydrate, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onClickRowTable({ visitId: '01' });
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run on wrong path', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({ pathname: '/wrong-path', push: jest.fn() });
    getListVisitNeucentrix.mockResolvedValue({
      data: [
        {
          companyName: 'PT TELEKOMUNIKASI SELULAR',
          location: 'Neucentrix Bandung',
          picVisitorName: 'Customer NeuCentrix',
          status: 'checking',
          visitEndDate: '2022-08-16T05:30:00.000Z',
          visitId: 'VST-0621173547',
          visitStartDate: '2022-08-16T04:00:00.000Z',
        },
      ],
      meta: { totalPages: 2, page: 2 },
    });
    const props = {
      feature: [
        'read_list_visiting_neucentrix',
        'read_detail_visiting_neucentrix',
      ],
    };

    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.onClickRowTable({ visitId: '01' });
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.visitNcx('list'),
      push: jest.fn(),
    });
    getListVisitNeucentrix.mockRejectedValue({ message: '' });

    const props = {
      feature: [
        'read_list_visiting_neucentrix',
        'read_detail_visiting_neucentrix',
        'read_list_visiting_neucentrix_am',
      ],
    };

    const { result, hydrate, waitForValueToChange } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForValueToChange(() => result.current.list.data);

    expect(result.current.list.data).not.toBeUndefined();
  });
});
