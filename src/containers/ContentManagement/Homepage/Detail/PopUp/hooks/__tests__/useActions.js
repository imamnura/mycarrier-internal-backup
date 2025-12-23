import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  getDetailPopUp,
  deletePopUp,
  updatePopUp,
} from '../../../../_repositories/repositories';

jest.mock('../../../../_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/ContentManagement/Homepage/Detail/PopUp/hooks/useActions', () => {
  afterEach(cleanup);

  const props = { feature: ['read_detail_popup_banner'] };

  const resolvedDetail = {
    data: {
      id: 'a36a20fe-01a4-42dd-b6fe-d646ef9c2cf0',
      name: 'Pop Up',
      imageUrl: {
        mediaName: 'untitled.png',
        mediaPath: 'untitled.png',
      },
      link: 'qwe',
      period: 'unlimited',
      startPeriod: null,
      endPeriod: null,
      status: 'active',
      createdAt: '2023-11-23T03:56:24.402Z',
      buttonLabel: {
        id: 'q',
        en: 'we',
      },
    },
  };

  const resolvedDetailByPeriod = {
    data: {
      id: 'a36a20fe-01a4-42dd-b6fe-d646ef9c2cf0',
      name: 'Pop Up',
      imageUrl: {},
      link: 'qwe',
      period: 'by period',
      startPeriod: '2023-11-23T03:56:24.402Z',
      endPeriod: '2023-11-23T03:56:24.402Z',
      status: 'inactive',
      createdAt: '2023-11-23T03:56:24.402Z',
      buttonLabel: {
        id: 'q',
        en: 'we',
      },
    },
  };

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
    useRouter.mockReturnValue({
      asPath: route.popUp('detail', '1'),
      push: jest.fn(),
      query: { id: '1' },
    });
    getDetailPopUp.mockResolvedValue(resolvedDetail);
  });

  test('run properly', async () => {
    getDetailPopUp.mockResolvedValue(resolvedDetail);
    updatePopUp.mockResolvedValue({ success: true });
    deletePopUp.mockResolvedValue({ success: true });

    let res;

    const { result } = await renderHook(() => useActions(props));

    await act(async () => {
      await result.current.onClickUpdateStatus('PO123', 'active')();
      await result.current.fetchUpdateStatus('PO123', 'active')();
      await result.current.onClickDelete();
      await result.current.fetchDelete()();
      await result.current.onClickEdit();
      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run properly with period type', async () => {
    getDetailPopUp.mockResolvedValue(resolvedDetailByPeriod);
    updatePopUp.mockResolvedValue({ success: true });

    let res;

    const { result } = await renderHook(() => useActions(props));

    await act(async () => {
      await result.current.onClickUpdateStatus('PO123', 'inactive')();
      await result.current.fetchUpdateStatus('PO123', 'inactive')();
      await result.current.onClickDelete();
      await result.current.onClickEdit();
      await result.current.onCloseSuccess();
      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run properly without privilege', async () => {
    getDetailPopUp.mockResolvedValue(resolvedDetail);

    let res;

    const { result } = await renderHook(() => useActions({ feature: [] }));
    await act(async () => {
      res = await result;
    });

    await expect(res.current.data).toBeNull();
  });

  test('fetch rejected', async () => {
    getDetailPopUp.mockRejectedValue({ message: 'error' });
    updatePopUp.mockRejectedValue({ message: 'error' });
    deletePopUp.mockRejectedValue({ message: 'error' });

    let res;

    const { result } = await renderHook(() => useActions(props));

    await act(async () => {
      await result.current.fetchUpdateStatus('PO123', 'active')();
      await result.current.fetchDelete()();
      res = await result;
    });

    await expect(res.current.data).toBeNull();
  });
});
