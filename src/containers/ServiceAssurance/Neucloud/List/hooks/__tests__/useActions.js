import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import {
  getList,
  // updateTicket
} from '../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

jest.mock('../../../_repositories/repositories');
jest.mock('react-redux');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/pages/ServiceAssurance/Neucloud/List/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  test('run properly', async () => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
    });
    useRouter.mockReturnValue({
      pathname: route.neucloud('list'),
      push: jest.fn(),
    });
    getList.mockResolvedValue({
      data: [{}],
      meta: { totalPage: 2, page: 1 },
    });
    const props = {
      feature: [
        'read_detail_ticket_neucloud',
        'update_status_ticket_neucloud',
        'read_list_ticket_neucloud',
      ],
    };

    const { hydrate, result, waitForNextUpdate, waitForValueToChange } =
      await renderHook(() => useActions(props));

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onClickRowTable({ referenceId: 'tes' });
      result.current.onClickDownload();
      result.current.handleRefresh();
      result.current.handleFormTicketNumber('');
      result.current.updateTicketNumber({ ticketId: '' });
    });

    await waitForValueToChange(() => result.current.list.data);

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run properly no feature', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.neucloud('list'),
      push: jest.fn(),
    });
    getList.mockResolvedValue({
      data: [{}],
      meta: { totalPages: 2, page: 1 },
    });
    const props = { feature: [''] };

    const { hydrate, result } = await renderHook(() => useActions(props));

    hydrate();

    act(() => {
      result.current.onClickRowTable({ referenceId: 'tes' });
    });
  });

  // test('run properly/others states', async () => {
  //   usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
  //   useRouter.mockReturnValue({ pathname: route.bakes('list') }, push: jest.fn() });
  //   getList.mockResolvedValue({
  //     data: null,
  //     meta: { totalPage: 2, page: 4 }
  //   });
  //   const props = { feature: ['read_detail_ticket_neucloud',
  //   'update_status_ticket_neucloud', 'read_list_ticket_neucloud']};

  //   const { result, hydrate, waitForNextUpdate } = await renderHook(() => useActions(props));

  //   hydrate();

  //   await waitForNextUpdate();

  //   act(() => {
  //     result.current.onClickRowTable({ referenceId: 'tes' });
  //
  //   });

  //   expect(result.current.list.data).not.toBeUndefined();
  // });

  test('wrong route', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({ pathname: '/wrong-route', push: jest.fn() });
    getList.mockResolvedValue({
      data: null,
      meta: { totalPage: 2, page: 1 },
    });
    const props = {
      feature: [
        'read_detail_ticket_neucloud',
        'update_status_ticket_neucloud',
        'read_list_ticket_neucloud',
      ],
    };

    const { hydrate } = await renderHook(() => useActions(props));

    hydrate();

    act(() => {});
  });

  test('fetch rejected', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({ pathname: route.neucloud('list') });
    getList.mockRejectedValue({ message: '' });
    const props = {
      feature: [
        'read_detail_ticket_neucloud',
        'update_status_ticket_neucloud',
        'read_list_ticket_neucloud',
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
