import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { isHaveAccess } from '@utils/common';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getList,
  downloadList,
  getListStatus,
  getListProduct,
} from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;

  const [list, setList] = useState({ data: [], meta: {} });

  const { setSuccessAlert, setFailedAlert } = usePopupAlert();

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);

  const [tab, _setTab] = useState('');

  const [filterStatus, _setFilterStatus] = useState({
    value: '',
    label: 'All Status',
  });
  const [filterProduct, _setFilterProduct] = useState({
    value: '',
    label: 'All Product',
  });
  const [filterDateRange, _setFilterDateRange] = useState([null, null]);

  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const [optionsStatus, setOptionsStatus] = useState({
    value: '',
    label: 'All Status',
  });
  const [optionsProduct, setOptionsProduct] = useState({
    value: '',
    label: 'All Product',
  });
  const [loadingOptionsStatus, setLoadingOptionsStatus] = useState(false);
  const [loadingOptionsProduct, setLoadingOptionsProduct] = useState(false);

  const setTab = (val) => {
    setPage(1);
    setSearch('');
    _setFilterStatus({ value: '', label: 'All Status' });
    _setFilterProduct({ value: '', label: 'All Product' });
    _setTab(val);
    _setFilterDateRange([null, null]);
  };

  const onClickRefresh = () => setTab(tab);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onClickRowTable = async (data) => {
    if (
      (tab === 'approval' &&
        isHaveAccess(feature, 'read_detail_ticket_digital_product')) ||
      (tab === 'history' &&
        isHaveAccess(feature, 'read_detail_history_ticket_digital_product'))
    ) {
      router.push(route.digitalProduct('detail', data.referenceId));
    } else {
      setFailedAlert({
        message: "You don't have permission to view Detail.",
      });
    }
  };

  const fetchListDigitalProduct = async (newPage) => {
    const location = router.pathname;

    const _params = {
      size,
      search,
      page: newPage ? newPage : page,
      status: filterStatus.value,
      productName: filterProduct.value,
      startDate: filterDateRange[0]
        ? moment(filterDateRange[0]).format('YYYY-MM-DD')
        : '',
      endDate: filterDateRange[1]
        ? moment(filterDateRange[1]).format('YYYY-MM-DD')
        : '',
    };

    const params = cleanObject(_params);

    const validatePath = location === route.digitalProduct('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);

      try {
        const { data, meta } = await getList(params, tab);
        const normalize = {
          data,
          meta,
        };
        setList(normalize);
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

  const setFilterStatus = (val) => {
    setPage(1);
    _setFilterStatus(val);
  };

  const setFilterProduct = (val) => {
    setPage(1);
    _setFilterProduct(val);
  };

  const setFilterDateRange = (val) => {
    setPage(1);
    _setFilterDateRange(val);
  };

  const fetchListStatus = async () => {
    setLoadingOptionsStatus(true);

    const params = { tab: tab === 'approval' ? 'open' : 'close' };

    try {
      const { data } = await getListStatus(params);
      setOptionsStatus([{ value: '', label: 'All Status' }, ...data]);
    } catch (err) {
      setOptionsStatus({ value: '', label: 'All Status' });
    } finally {
      setLoadingOptionsStatus(false);
    }
  };

  const fetchListProduct = async () => {
    setLoadingOptionsProduct(true);

    try {
      const { data } = await getListProduct();
      setOptionsProduct([{ value: '', label: 'All Product' }, ...data]);
    } catch (err) {
      setOptionsProduct({ value: '', label: 'All Product' });
    } finally {
      setLoadingOptionsProduct(false);
    }
  };

  const onClickDownload = async () => {
    setLoadingDownload(true);
    const _params = {
      // eslint-disable-next-line no-nested-ternary
      status: filterStatus.value
        ? filterStatus.value
        : tab === 'approval'
        ? 'all-Progress'
        : 'done',
      startDate: filterDateRange[0]
        ? moment(filterDateRange[0]).format('YYYY-MM-DD')
        : '',
      endDate: filterDateRange[1]
        ? moment(filterDateRange[1]).format('YYYY-MM-DD')
        : '',
      search,
      productName: filterProduct.value,
    };
    const params = cleanObject(_params);

    try {
      const result = await downloadList(params);
      if (result.data.fileUrl) {
        window.location.href = result.data.fileUrl;
        setSuccessAlert({
          message: 'File successfully downloaded',
        });
      }
    } catch (error) {
      setFailedAlert({
        message: error.message,
      });
    } finally {
      setLoadingDownload(false);
    }
  };

  useEffect(() => {
    fetchListDigitalProduct();
  }, [filterStatus, filterDateRange, filterProduct, search, tab, page]);

  useEffect(() => {
    fetchListStatus();
    fetchListProduct();
  }, [tab]);

  return {
    filterDateRange,
    filterProduct,
    filterStatus,
    list,
    page,
    loading: {
      status: loadingOptionsStatus,
      product: loadingOptionsProduct,
      download: loadingDownload,
      table: loadingTable,
    },
    onPaginationChange,
    onClickDownload,
    onClickRefresh,
    onClickRowTable,
    optionsStatus,
    optionsProduct,
    search,
    setFilterDateRange,
    setFilterProduct,
    setFilterStatus,
    setSearch,
    setTab,
    tab,
  };
};

export default useActions;
