import { useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { dateFormat } from '@utils/parser';
import { cleanObject } from '@utils/common';
import { isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { optionsFileType } from '../constant';
import {
  getList,
  deleteContent,
  fetchReorder,
  deletePopUp,
  updatePopUp,
  postBanner,
} from '@containers/ContentManagement/Homepage/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActions = (props) => {
  const router = useRouter();
  const { type } = router.query;
  const { feature } = props;
  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { enqueueSnackbar } = useSnackbar();

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [search, setSearch] = useState('');
  const [tab, _setTab] = useState('');
  const [openDialog, _setOpenDialog] = useState(false);
  const [openDialogReorder, setOpenDialogReorder] = useState(false);
  const [activeBtnGoAhead, _setActiveBtnGoAhead] = useState(false);
  const [choosedContent, _setChoosedContent] = useState(0);

  const [filterType, _setFilterType] = useState({
    label: 'All File Type',
    value: '',
  });
  const [filterDateRange, _setFilterDateRange] = useState([null, null]);

  const [loadingListBanner, setLoadingListBanner] = useState(false);
  const [listBannerActive, setListBannerActive] = useState([]);
  const [listBannerHide, setListBannerHide] = useState([]);

  const setTab = (val) => {
    setPage(1);
    setSort('asc');
    setOrderBy('');
    setSearch('');
    _setFilterType({ label: 'All File Type', value: '' });
    _setFilterDateRange([null, null]);
    _setTab(val);
    router.push(`${route.homepageManagement('list')}?type=${val}`);
  };

  const setFilterType = (val) => {
    setPage(1);
    _setFilterType(val);
  };

  const setFilterDateRange = (val) => {
    setPage(1);
    _setFilterDateRange(val);
  };

  const onAddContent = () => _setOpenDialog(true);
  const onCloseDialog = () => _setOpenDialog(false);
  const setOpenDialog = (val) => _setOpenDialog(val);
  const setChoosedContent = (val) => {
    _setChoosedContent(val);
    _setActiveBtnGoAhead(true);
  };

  const formatPeriod = (val) => {
    return moment(val).format('YYYY-MM-DD');
  };

  const addContent = () => {
    const pickRoute = {
      1: route.banner('create'),
      2: route.brochure('create'),
      3: route.popUp('create'),
    }[choosedContent];

    router.push(pickRoute);
  };

  const fetchList = async (newPage = page) => {
    let payload = {
      page: newPage,
      search,
      size,
      startDate: filterDateRange[0] && formatPeriod(filterDateRange[0]),
      endDate: filterDateRange[1] && formatPeriod(filterDateRange[1]),
    };

    if (tab === 'brochure') {
      payload = {
        ...payload,
        fileType: filterType.value,
        sort,
      };
    }
    if (tab === 'bannerHero') {
      payload = {
        ...payload,
        sort,
        type: 'banner',
      };
    }

    const params = cleanObject(payload);
    const validatePath = router.pathname === '/homepage-management';

    if (tab && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getList({ params, withCancel: true }, tab);
        const normalize = { data, meta };
        setList(normalize);
        setPage(newPage);
      } catch (error) {
        setList({
          data: [],
          meta: {},
        });
      } finally {
        setLoadingTable(false);
      }
    }
  };

  const fetchUpdateBanner = (params) => async () => {
    const { id, bannerTitle, isDisplay } = params;
    setConfirmation();

    try {
      const res = await postBanner({
        data: { id: id, isDisplay: !isDisplay },
        method: 'PUT',
      });

      if (res) {
        fetchList(1);

        if (!isDisplay) {
          enqueueSnackbar(`${bannerTitle} is successfully set to hide`);
        } else {
          enqueueSnackbar(`${bannerTitle} is successfully set to show`);
        }
      }
    } catch (error) {
      enqueueSnackbar('Unsuccessfully hide/unhide');
    }
  };

  const fetchUpdate = (params) => async () => {
    const { id, popUpName, isActive } = params;
    setConfirmation();

    const status = {
      false: 'active',
      true: 'inactive',
    }[isActive];

    try {
      const res = await updatePopUp(id, { status });

      if (res) {
        fetchList(1);

        if (!isActive) {
          enqueueSnackbar(`${popUpName} is successfully set to active`);
        } else {
          enqueueSnackbar(`${popUpName} is successfully set to inactive`);
        }
      }
    } catch (error) {
      enqueueSnackbar('Unsuccessfully hide/unhide');
    }
  };

  const fetchDeleteBanner = (id) => async () => {
    setConfirmation();
    setLoadingAlert();

    try {
      await deleteContent(id);
      setSuccessAlert({ message: 'Banner successfully deleted.' });
      fetchList(list?.data?.length === 1 && page > 1 ? page - 1 : page);
    } catch (error) {
      setFailedAlert({
        message: error?.message || 'Failed to delete banner',
      });
    }
  };

  const fetchDeletePopUp = (id) => async () => {
    setConfirmation();
    setLoadingAlert();

    try {
      await deletePopUp(id);
      setSuccessAlert({ message: 'Pop up successfully deleted.' });
      fetchList(list?.data?.length === 1 && page > 1 ? page - 1 : page);
    } catch (error) {
      setFailedAlert({
        message: error?.message || 'Failed to delete pop up',
      });
    }
  };

  const onClickRowTable = (data) => {
    const content = {
      brochure: {
        privileges: 'read_detail_brochure',
        message: `You don't have permission to read detail brochure upload.`,
        route: route.brochure('detail', data.id),
      },
      popup: {
        privileges: 'read_detail_popup_banner',
        message: `You don't have permission to read detail popup.`,
        route: route.popUp('detail', data.id),
      },
    }[tab];

    if (isHaveAccess(feature, content?.privileges)) {
      router.push(content?.route);
    } else {
      setFailedAlert({
        message: content?.message,
      });
    }
  };

  const onAddPopUp = () => router.push(route.popUp('create'));

  const onUpdateBanner = (id) => {
    if (isHaveAccess(feature, 'update_banner')) {
      router.push(route.banner('edit', id));
    } else {
      setFailedAlert({
        message: `You don't have permission to update banner.`,
      });
    }
  };

  const onUpdatePopUp = (id) => (e) => {
    e.stopPropagation();

    if (isHaveAccess(feature, 'update_popup_banner')) {
      router.push(route.popUp('edit', id));
    } else {
      setFailedAlert({
        message: `You don't have permission to update pop up banner.`,
      });
    }
  };

  const confirmDeleteBanner = (id) => {
    if (isHaveAccess(feature, 'delete_banner')) {
      setConfirmation({
        message: 'Are you sure want to delete this banner?',
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: fetchDeleteBanner(id) },
        ],
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to delete banner.`,
      });
    }
  };

  const onDeletePopUp = (id) => (e) => {
    e.stopPropagation();

    if (isHaveAccess(feature, 'delete_popup_banner')) {
      setConfirmation({
        message: 'Are you sure want to delete this pop up?',
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: fetchDeletePopUp(id) },
        ],
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to delete pop up.`,
      });
    }
  };

  const onChangeStatusBanner = (data) => (e) => {
    const pickMessage = {
      true: {
        title: 'Are you sure you want to hide this banner?',
      },
      false: {
        title: 'Are you sure you want to show this banner?',
      },
    }[!!data?.isDisplay];

    e.stopPropagation();

    if (isHaveAccess(feature, 'update_showhide')) {
      setConfirmation({
        message: pickMessage?.title,
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: fetchUpdateBanner(data) },
        ],
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to update banner status.`,
      });
    }
  };

  const onChangeStatusPopUp = (data) => (e) => {
    const pickMessage = {
      true: {
        title: 'Are you sure you want to deactivate this pop up?',
        description: '',
      },
      false: {
        title: 'Are you sure you want to activate this pop up?',
        description: 'Other pop up will automatically no longer be active',
      },
    }[data?.isActive];

    e.stopPropagation();

    if (isHaveAccess(feature, 'update_popup_banner')) {
      setConfirmation({
        message: pickMessage?.title,
        description: pickMessage?.description,
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: fetchUpdate(data) },
        ],
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to update pop up status.`,
      });
    }
  };

  const onReorderBanner = async () => {
    setLoadingListBanner(true);

    let payload = {
      page: 1,
      size: 1000,
      sort: 'asc',
      type: 'banner',
    };

    const params = cleanObject(payload);

    try {
      const result = await getList({ params, withCancel: true }, 'bannerHero');
      const { data } = result;
      const filterActive = data.filter((item) => !!item.isDisplay);
      const filterHide = data.filter((item) => !item.isDisplay);

      setListBannerActive(filterActive);
      setListBannerHide(filterHide);
    } catch (err) {
      setListBannerActive([]);
      setListBannerHide([]);
    } finally {
      setLoadingListBanner(false);
      setOpenDialogReorder(true);
    }
  };

  const onClickRefresh = () => {
    setPage(1);
    setSort('asc');
    setOrderBy('');
    setSearch('');
    _setFilterDateRange([null, null]);
    _setFilterType({ label: 'All File Type', value: '' });
  };

  const onSaveReorder = () => async () => {
    setConfirmation();
    setLoadingAlert();

    const payload = {
      type: 'banner',
      data: { data: { active: listBannerActive.map((item) => item.id) } },
    };

    try {
      await fetchReorder(payload);
      fetchList(1);
      setSuccessAlert({
        message: 'Banner hero successfully reordered',
        onClose: setOpenDialogReorder(false),
      });
    } catch (err) {
      setFailedAlert({
        message:
          (typeof err?.message === 'string' && err?.message) ||
          `Failed to reorder banner hero`,
      });
    }
  };

  const confirmSaveReorder = () => {
    setConfirmation({
      message: 'Are you sure want to reorder this banner hero?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: onSaveReorder() },
      ],
    });
  };

  const onPaginationChange = (props, currentPage) => fetchList(currentPage);

  const normalizePeriod = ({ period, startPeriod, endPeriod }) => {
    if (period?.toLowerCase() === 'unlimited') return 'Unlimited';

    return `${dateFormat({ date: startPeriod, type: 'date' })} - ${dateFormat({
      date: endPeriod,
      type: 'date',
    })}`;
  };

  useEffect(() => {
    if (tab) {
      setPage(1);
      fetchList(1);
    }
  }, [search, filterType, filterDateRange, sort, orderBy, tab]);

  useEffect(() => {
    if (!type) {
      _setTab('bannerHero');
      setLoadingTable(true);
    } else {
      _setTab(type);
    }
  }, [type]);

  return {
    activeBtnGoAhead,
    addContent,
    choosedContent,
    confirmDeleteBanner,
    confirmSaveReorder,
    filter: {
      dateRange: {
        onChange: setFilterDateRange,
        value: filterDateRange,
      },
      type: {
        onChange: setFilterType,
        options: optionsFileType,
        value: filterType,
      },
    },
    fetchDeleteBanner, //for testing
    fetchUpdate, //for testing
    fetchDeletePopUp, //for testing
    list,
    listBannerActive,
    listBannerHide,
    loadingTable,
    loadingListBanner,
    normalizePeriod,
    onAddContent,
    onAddPopUp,
    onChangeStatusPopUp,
    onChangeStatusBanner,
    onClickRefresh,
    onClickRowTable,
    onCloseDialog,
    onDeletePopUp,
    onUpdateBanner,
    onUpdatePopUp,
    onPaginationChange,
    onReorderBanner,
    onSaveReorder, //for testing
    openDialog,
    setOpenDialog,
    setChoosedContent,
    tab,
    setTab,
    search,
    setSearch,
    sort,
    setSort,
    orderBy,
    setOrderBy,
    openDialogReorder,
    setOpenDialogReorder,
    setListBannerActive,
    setListBannerHide,
    page,
  };
};

export default useActions;
