import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import useActions from '../useAction';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetailBroadcastInformation,
  getOptionContactGroup,
  postBroadcastInformation,
} from '@containers/Broadcast/BroadcastInformation/_repositories/repositories';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useSnackbar } from 'notistack';

jest.mock(
  '@containers/Broadcast/BroadcastInformation/_repositories/repositories',
);
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock('notistack');

describe('src/containers/Broadcast/BroadcastInformation/Create/hooks/useActions', () => {
  afterEach(cleanup);

  beforeAll(() => {
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    useSnackbar.mockReturnValue({
      enqueueSnackbar: jest.fn(),
    });
    getOptionContactGroup.mockResolvedValue({ data: ['a'] });
    useRouter.mockReturnValue({
      asPath: route.broadcastInformation('create'),
      push: jest.fn(),
      query: {
        broadcastId: 'id',
        keep: false,
      },
    });
  });

  const feature = [];

  test('run properly', async () => {
    getDetailBroadcastInformation.mockResolvedValue({
      data: {
        broadcastInfo: {
          broadcastName: '',
          message: ['1', '2', '3'],
          contactGroup: ['1'],
          scheduleTime: '',
        },
        attachment: {},
      },
    });
    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setValue('isSendNow', false);
      await result.current.onSubmit('submit')({
        contactGroup: [{ value: 'x' }],
        media: {},
      });

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('empty media', async () => {
    getDetailBroadcastInformation.mockResolvedValue({
      data: {
        broadcastInfo: {
          broadcastName: '',
          message: ['1', '2', '3'],
          contactGroup: ['1'],
          scheduleTime: '',
        },
      },
    });
    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('failed get options', async () => {
    useRouter.mockReturnValue({
      asPath: route.broadcastInformation('create'),
      push: jest.fn(),
      query: {
        broadcastId: 'id',
        keep: false,
      },
    });
    getOptionContactGroup.mockRejectedValue({ message: 'error' });
    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('failed get detail & submit', async () => {
    useRouter.mockReturnValue({
      asPath: route.broadcastInformation('create'),
      push: jest.fn(),
      query: {
        broadcastId: 'id',
        keep: false,
      },
    });

    getDetailBroadcastInformation.mockRejectedValue({ message: 'error' });
    postBroadcastInformation.mockRejectedValue({ message: '' });

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchSubmit({
        isSubmit: true,
        values: { contactGroup: [{ value: 'x' }], media: {} },
      })();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('fetchSubmit', async () => {
    useRouter.mockReturnValue({
      asPath: route.broadcastInformation('create'),
      push: jest.fn(),
      query: {
        broadcastId: 'id',
        keep: true,
        edit: true,
      },
    });
    postBroadcastInformation.mockResolvedValue({ data: {} });
    const props = {
      feature: [
        'update_broadcast_information_without_status_need_approval_cdm',
      ],
    };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.onSubmit('submit')({
        contactGroup: [{ value: 'x' }],
        media: {},
      });
      await result.current.onSubmit('other')({
        contactGroup: [{ value: 'x' }],
        media: {},
      });
      await result.current.fetchSubmit({
        isSubmit: true,
        values: { contactGroup: [{ value: 'x' }], media: {} },
      })();
      await result.current.redirectToDetail('id')();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
