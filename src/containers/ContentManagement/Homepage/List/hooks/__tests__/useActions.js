import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { useRouter } from 'next/router';
import { route } from '@configs';
import {
  getList,
  deleteContent,
  fetchReorder,
  deletePopUp,
  updatePopUp,
} from '../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useSnackbar } from 'notistack';

jest.mock('../../../_repositories/repositories');
jest.mock('react-redux');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock('notistack');

describe('src/containers/ContentManagement/Homepage/List/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  const resolvedListBanner = {
    data: [
      {
        bannerId: 155,
        title: 'Banner baru',
        lang: 'id',
        type: 'banner',
        status: 'active',
        linkedTo: 'https://www.google.com/',
        createdAt: '2023-08-03T19:11:56+07:00',
        updatedAt: '2023-08-03T19:13:42+07:00',
      },
    ],
    meta: {
      page: 1,
      size: 10,
      totalPages: 1,
      totalData: 2,
    },
  };

  const resolvedListBrochure = {
    data: [
      {
        id: 'DOC-31814465',
        name: 'test213.jpg',
        size: '0.03 MB',
        fileType: 'jpg',
        createdAt: '2023-11-23T09:30:14.233Z',
        updatedAt: '2023-11-23T09:30:14.233Z',
      },
    ],
    meta: {
      page: 1,
      size: 10,
      totalPages: 1,
      totalData: 2,
    },
  };

  const resolvedListPopup = {
    data: [
      {
        id: 'a36a20fe-01a4-42dd-b6fe-d646ef9c2cf0',
        name: 'Aarron Heldian Darmawan',
        link: 'qwe',
        period: 'unlimited',
        startPeriod: null,
        endPeriod: null,
        status: 'active',
      },
    ],
    meta: {
      page: 1,
      size: 10,
      totalPages: 1,
      totalData: 2,
    },
  };

  const props = {
    feature: [
      'view_list',
      'read_detail_brochure',
      'read_detail_popup_banner',
      'delete_banner',
      'delete_popup_banner',
      'view_list_popup_banner',
      'update_banner',
      'update_popup_banner',
    ],
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
      pathname: route.homepageManagement('list'),
      query: {
        type: 'bannerHero',
      },
      push: jest.fn(),
    });
    useSnackbar.mockReturnValue({
      enqueueSnackbar: jest.fn(),
    });
  });

  test('run properly', async () => {
    getList.mockResolvedValue(resolvedListBanner);
    deleteContent.mockResolvedValue({ success: true });
    fetchReorder.mockResolvedValue({ success: true });

    let res;

    const { hydrate, result, waitForValueToChange } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await act(async () => {
      result.current.setTab('bannerHero');
      result.current.onUpdateBanner(1);
      result.current.setChoosedContent(1);
      result.current.onAddContent();
      result.current.addContent();
      result.current.confirmDeleteBanner(1);
      result.current.setOpenDialog(true);
      result.current.onCloseDialog();
      result.current.onReorderBanner();
      await waitForValueToChange(() => result.current.list.data);
      result.current.confirmSaveReorder();
      result.current.onClickRefresh();
      result.current.filter.dateRange.onChange(['2023-02-06', '2023-02-13']);
      result.current.filter.type.onChange('png');
      result.current.fetchDeleteBanner('1')();
      result.current.onSaveReorder()();
      result.current.onPaginationChange({}, 2);

      res = await result;
    });

    await expect(res.current.list.data).not.toBeUndefined();
  });

  test('run properly on brochure tab', async () => {
    useRouter.mockReturnValue({
      pathname: route.homepageManagement('list'),
      query: {
        type: 'brochure',
      },
      push: jest.fn(),
    });
    getList.mockResolvedValue(resolvedListBrochure);
    deleteContent.mockResolvedValue({ success: true });
    fetchReorder.mockResolvedValue({ success: true });

    let res;

    const { hydrate, result } = await renderHook(() => useActions(props));

    hydrate();

    await act(async () => {
      result.current.onClickRowTable({ id: 'BR123' });
      res = await result;
    });

    await expect(res.current.list.data).not.toBeUndefined();
  });

  test('run properly on and popup tab', async () => {
    useRouter.mockReturnValue({
      pathname: route.homepageManagement('list'),
      query: {
        type: 'popup',
      },
      push: jest.fn(),
    });
    getList.mockResolvedValue(resolvedListPopup);
    deletePopUp.mockResolvedValue({ success: true });
    updatePopUp.mockResolvedValue({ success: true });

    let res;

    const { hydrate, waitForValueToChange, result } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await act(async () => {
      result.current.onClickRowTable({ id: 'POPUP123' });
      result.current.onChangeStatusPopUp({ isActive: true })({
        stopPropagation: jest.fn(),
      });
      result.current.onDeletePopUp('PO123')({
        stopPropagation: jest.fn(),
      });
      result.current.fetchUpdate({
        id: 'PO123',
        popUpName: 'test',
        isActive: true,
      })();
      await waitForValueToChange(() => result.current.list.data);
      result.current.fetchUpdate({
        id: 'PO123',
        popUpName: 'test',
        isActive: false,
      })();
      result.current.normalizePeriod({
        period: 'unlimited',
      });
      result.current.onAddPopUp();
      result.current.onUpdatePopUp('PO123')({
        stopPropagation: jest.fn(),
      });
      res = await result;
    });

    await expect(res.current.list.data).not.toBeUndefined();
  });

  test('run properly on popup with other state', async () => {
    useRouter.mockReturnValue({
      pathname: route.homepageManagement('list'),
      query: {
        type: 'popup',
      },
      push: jest.fn(),
    });
    getList.mockResolvedValue(resolvedListPopup);
    deletePopUp.mockResolvedValue({ success: true });
    updatePopUp.mockResolvedValue({ success: true });

    let res;

    const { hydrate, waitForValueToChange, result } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await act(async () => {
      result.current.onClickRowTable({ id: 'POPUP123' });
      result.current.onDeletePopUp('PO123')({
        stopPropagation: jest.fn(),
      });
      await waitForValueToChange(() => result.current.list.data);
      result.current.fetchDeletePopUp('PO123')();
      result.current.normalizePeriod({
        period: 'by period',
      });
      result.current.onAddPopUp();
      result.current.onUpdatePopUp('PO123')({
        stopPropagation: jest.fn(),
      });
      res = await result;
    });

    await expect(res.current.list.data).not.toBeUndefined();
  });

  test('run properly without privilege to read detail in page brochure and popup', async () => {
    useRouter.mockReturnValue({
      pathname: route.homepageManagement('list'),
      query: {
        type: 'popup',
      },
      push: jest.fn(),
    });
    getList.mockResolvedValue(resolvedListPopup);
    deletePopUp.mockResolvedValue({ success: true });
    updatePopUp.mockResolvedValue({ success: true });

    let res;

    const { hydrate, result } = await renderHook(() =>
      useActions({ feature: [] }),
    );

    hydrate();

    await act(async () => {
      result.current.onClickRowTable({ id: 'POPUP123' });
      res = await result;
    });

    await expect(res.current.list.data).not.toBeUndefined();
  });

  test('run properly when delete a list with only 1 length on that page', async () => {
    getList.mockResolvedValue({
      data: [{ id: 'PO123' }],
      meta: {},
    });
    deletePopUp.mockResolvedValue({ success: true });
    deleteContent.mockResolvedValue({ success: true });

    let res;

    const { hydrate, waitForValueToChange, result } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await act(async () => {
      result.current.onPaginationChange({}, 2);
      await waitForValueToChange(() => result.current.list.data);
      result.current.fetchDeleteBanner('BA123')();
      result.current.fetchDeletePopUp('PO123')();
      res = await result;
    });

    await expect(res.current.list.data).not.toBeUndefined();
  });

  test('run properly without query type and privileges', async () => {
    useRouter.mockReturnValue({
      pathname: route.homepageManagement('list'),
      query: {
        type: '',
      },
      push: jest.fn(),
    });
    getList.mockResolvedValue(resolvedListPopup);
    deletePopUp.mockResolvedValue({ success: true });
    updatePopUp.mockResolvedValue({ success: true });

    const { hydrate, result } = await renderHook(() =>
      useActions({ feature: [] }),
    );

    let res;

    hydrate();

    await act(async () => {
      result.current.onUpdateBanner('BA123');
      result.current.onUpdatePopUp('PO123')({
        stopPropagation: jest.fn(),
      });
      result.current.confirmDeleteBanner('BA123');
      result.current.onDeletePopUp('PO123')({
        stopPropagation: jest.fn(),
      });
      result.current.onChangeStatusPopUp({ isActive: true })({
        stopPropagation: jest.fn(),
      });
      res = await result;
    });

    await expect(res.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    getList.mockRejectedValue({ message: 'Failed to fetch data' });
    deleteContent.mockRejectedValue({ message: 'Failed to delete banner' });
    deletePopUp.mockRejectedValue({ message: 'Failed to delete banner' });
    updatePopUp.mockRejectedValue({ message: 'Failed to delete banner' });
    fetchReorder.mockRejectedValue({
      message: 'Failed to reorder banner hero',
    });

    let res;

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    await act(async () => {
      await result.current.onReorderBanner();
      await result.current.fetchDeleteBanner('1')();
      await result.current.onSaveReorder()();
      await result.current.fetchDeletePopUp('PO123')();
      await result.current.fetchUpdate({
        id: 'PO123',
        popUpName: 'test',
        isActive: false,
      })();

      res = await result;
    });

    expect(res.current.list.data).not.toBeUndefined();
  });

  test('wrong route', async () => {
    useRouter.mockReturnValue({
      location: { pathname: '/wrong-route' },
      query: {},
      push: jest.fn(),
    });

    getList.mockResolvedValue({
      data: null,
      meta: { totalPage: 2, page: 4 },
    });

    const props = { feature: [] };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    expect(result.current.list.data).not.toBeUndefined();
  });
});
