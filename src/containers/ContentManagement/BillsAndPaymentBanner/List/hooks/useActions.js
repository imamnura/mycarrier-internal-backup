import { useEffect, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import {
  getList,
  fetchBanner,
} from '@containers/ContentManagement/BillsAndPaymentBanner/_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { statusOptions } from '../constant';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useSnackbar } from 'notistack';
import { dateFormat } from '@utils/parser';
import { LOCATOR } from '../../locator-id';

const useActions = ({ feature }) => {
  const router = useRouter();

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { enqueueSnackbar } = useSnackbar();

  const [list, setList] = useState({ data: [], meta: {} });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loadingTable, setLoadingTable] = useState(false);
  const [filterStatus, setFilterStatus] = useState({
    value: '',
    label: 'All Status',
  });
  const [filterDateRange, setFilterDateRange] = useState([null, null]);
  const [isLoading, setIsLoading] = useState(false);
  const [listBannerActive, setListBannerActive] = useState([]);
  const [listBannerHide, setListBannerHide] = useState([]);
  const [openDialogReorder, setOpenDialogReorder] = useState(false);

  const locatorId = LOCATOR;

  const fetchList = async (newPage) => {
    const _params = {
      search,
      page: newPage,
      size,
      isActive: filterStatus.value || '',
      startDate:
        filterDateRange[0] &&
        dateFormat({ date: filterDateRange[0], type: 'params' }),
      endDate:
        filterDateRange[1] &&
        dateFormat({ date: filterDateRange[1], type: 'params' }),
    };
    const params = cleanObject(_params);

    const validatePath =
      router.pathname === route.billsAndPaymentBanner('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getList({
          params,
        });
        setList({ data, meta });
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

  useEffect(() => {
    if (isHaveAccess(feature, 'read_list_bills_&_payment_banner')) {
      setPage(1);
      fetchList(page);
    } else {
      setFailedAlert({
        message:
          "You don't have permission to view list Bills and Payment Banner.",
      });
    }
  }, [page, search, filterStatus, filterDateRange]);

  const fetchActiveBanner = (params) => async () => {
    setConfirmation();

    const { bannerId, isActive, title } = params;
    const payload = {
      bannerId,
      isActive: !isActive,
    };

    try {
      await fetchBanner('Edit', payload);
      fetchList(page);

      if (!isActive) {
        enqueueSnackbar(`${title} is successfully active`);
      } else {
        enqueueSnackbar(`${title} is successfully non-active`);
      }
    } catch (error) {
      enqueueSnackbar('Unsuccessfully active/non-active');
    }
  };

  const fetchDeleteBanner = (id) => async () => {
    setConfirmation();
    setLoadingAlert();

    try {
      await fetchBanner('Delete', null, id);
      fetchList(list?.data?.length === 1 && page > 1 ? page - 1 : page);
      setSuccessAlert({ message: 'Banner was successfully deleted.' });
    } catch (error) {
      setFailedAlert({ message: error?.message || 'Failed to delete banner' });
    }
  };

  const onAddBanner = () => {
    if (isHaveAccess(feature, 'create_bills_&_payment_banner')) {
      router.push({
        pathname: route.billsAndPaymentBanner('create'),
      });
    } else {
      setFailedAlert({
        message: "You don't have permission to add banner.",
      });
    }
  };

  const onEditBanner = (bannerId) => (e) => {
    e.stopPropagation();

    if (isHaveAccess(feature, 'update_bills_&_payment_banner')) {
      router.push({
        pathname: route.billsAndPaymentBanner('edit', bannerId),
      });
    } else {
      setFailedAlert({
        message: "You don't have permission to update banner.",
      });
    }
  };

  const onChangeStatusBanner = (data) => (e) => {
    e.stopPropagation();

    const pickMessage = {
      true: {
        title: 'Are you sure you want to deactivate this banner?',
      },
      false: {
        title: 'Are you sure you want to activate this banner?',
      },
    }[data?.isActive];

    if (isHaveAccess(feature, 'update_show_bills_&_payment_banner')) {
      setConfirmation({
        message: pickMessage?.title,
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: fetchActiveBanner(data) },
        ],
      });
    } else {
      setFailedAlert({
        message: "You don't have permission to active/non-active banner",
      });
    }
  };

  const onDeleteBanner = (bannerId) => (e) => {
    e.stopPropagation();

    if (isHaveAccess(feature, 'delete_bills_&_payment_banner')) {
      setConfirmation({
        message: 'Are you sure want to delete this banner?',
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: fetchDeleteBanner(bannerId) },
        ],
      });
    } else {
      setFailedAlert({
        message: "You don't have permission to delete banner.",
      });
    }
  };

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onReorderBanner = async () => {
    setIsLoading(true);

    let payload = {
      page: 1,
      size: 1000,
    };

    const params = cleanObject(payload);

    try {
      const { data } = await getList({ params });
      const filterActive = data.filter((item) => item.isActive === true);
      const filterHide = data.filter((item) => item.isActive === false);

      setListBannerActive(filterActive);
      setListBannerHide(filterHide);
    } catch (err) {
      setListBannerActive([]);
      setListBannerHide([]);
    } finally {
      setIsLoading(false);
      setOpenDialogReorder(true);
    }
  };

  const onSaveReorder = () => async () => {
    setConfirmation();
    setLoadingAlert();

    const payload = {
      active: listBannerActive.map((item) => item.bannerId),
    };

    try {
      await fetchBanner('Reorder', payload);
      fetchList(1);
      setSuccessAlert({
        message: 'Banner successfully reordered',
        onClose: setOpenDialogReorder(false),
      });
    } catch (err) {
      setFailedAlert({
        message:
          (typeof err?.message === 'string' && err?.message) ||
          `Failed to reorder banner`,
      });
    }
  };

  const confirmSaveReorder = () => {
    setConfirmation({
      message: 'Are you sure want to save reorder this banner?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: onSaveReorder() },
      ],
    });
  };

  const action = () => {
    let button = [];

    if (isHaveAccess(feature, 'update_reorder_bills_&_payment_banner')) {
      button.push({
        children: 'REORDER BANNER',
        onClick: onReorderBanner,
        disabled: list?.data?.length < 1,
        loading: isLoading,
        variant: 'ghost',
        id: locatorId?.reorderBanner,
      });
    }
    if (isHaveAccess(feature, 'create_bills_&_payment_banner')) {
      button.push({
        children: 'ADD BANNER',
        onClick: onAddBanner,
        id: locatorId?.addBanner,
      });
    }

    return button;
  };

  const onClickRowTable = (data) => {
    if (isHaveAccess(feature, 'read_detail_bills_&_payment_banner')) {
      router.push({
        pathname: route.billsAndPaymentBanner('detail', data.bannerId),
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to read detail banner.`,
      });
    }
  };

  return {
    action,
    filter: {
      dateRange: {
        onChange: setFilterDateRange,
        value: filterDateRange,
      },
      status: {
        onChange: setFilterStatus,
        options: statusOptions,
        value: filterStatus,
      },
    },
    list,
    listBannerActive,
    listBannerHide,
    loadingTable,

    onDeleteBanner,
    onEditBanner,
    onChangeStatusBanner,
    onClickRowTable,

    openDialogReorder,
    setOpenDialogReorder,
    setListBannerActive,
    setListBannerHide,
    confirmSaveReorder,

    page,
    search,
    setSearch,
    fetchDeleteBanner, //for testing
    onPaginationChange,
    locatorId,
  };
};

export default useActions;
