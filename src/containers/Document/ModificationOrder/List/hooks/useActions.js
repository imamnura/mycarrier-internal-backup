import { useEffect, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import {
  getFilterCustomerOptions,
  getListModificationOrder,
  getFilterProductOptions,
} from '../../_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

const useActions = (feature) => {
  const router = useRouter();

  const [list, setList] = useState({ data: [], meta: {}, hasMore: false });

  const { setFailedAlert } = usePopupAlert();
  
  const [tab, _setTab] = useState('');

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);

  const [filterStatus, setFilterStatus] = useState({
    label: 'All Status',
    value: '',
  });
  const [filterCustomer, setFilterCustomer] = useState({
    label: 'All Customer',
    value: '',
  });
  const [filterProduct, setFilterProduct] = useState({
    label: 'All Product',
    value: '',
  });
  const [filterCustomerOptions, setFilterCustomerOptions] = useState([]);
  const [filterProductOptions, setFilterProductOptions] = useState([]);

  const [loadingFilterCustomer, setLoadingFilterCustomer] = useState(true);
  const [loadingFilterProduct, setLoadingFilterProduct] = useState(true);
  const [loadingTable, setLoadingTable] = useState(false);

  const setTab = (val) => {
    setPage(1);
    setSearch('');
    setFilterCustomer({ value: '', label: 'All Customer' });
    setFilterProduct({ value: '', label: 'All Product' });
    setFilterStatus({ value: '', label: 'All Status' });
    _setTab(val);
  };

  const fetchList = async (newPage) => {
    const location = router.pathname;

    const _params = {
      size,
      search,
      page: newPage ? newPage : page,
      tab: tab,
      status: filterStatus.value,
      sort: 'asc',
      product: filterProduct.value,
      customer: filterCustomer.value,
    };

    const params = cleanObject(_params);

    const validatePath = location === route.modificationOrder('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);

      try {
        const { data, meta } = await getListModificationOrder({
          params,
          withCancel: true,
        });
        const newData = data || [];
        const normalize = {
          data: [...newData],
          meta,
        };
        setList(normalize);
        setLoadingTable(false);
      } catch (error) {
        setLoadingTable(false);
        setList({
          data: [],
          hasMore: false,
          meta: {},
        });
      }
    }
  };

  const fetchFilterCustomerOptions = async () => {
    setLoadingFilterCustomer(true);

    try {
      const result = await getFilterCustomerOptions();
      const options = result.data.map(({ custAccntName, custAccntNum }) => ({
        value: custAccntNum,
        label: custAccntName,
      }));
      setFilterCustomerOptions([
        { value: '', label: 'All Customer' },
        ...options,
      ]);
      setLoadingFilterCustomer(false);
    } catch (error) {
      setFilterCustomerOptions([{ value: '', label: 'All Customer' }]);
      setLoadingFilterCustomer(false);
    }
  };

  const fetchFilterProductOptions = async () => {
    setLoadingFilterProduct(true);

    try {
      const result = await getFilterProductOptions();

      const options = result.data.map(({ productName }) => ({
        value: productName,
        label: productName,
      }));

      setFilterProductOptions([
        { value: '', label: 'All Product' },
        ...options,
      ]);
      setLoadingFilterProduct(false);
    } catch (error) {
      setFilterProductOptions([{ value: '', label: 'All Product' }]);
      setLoadingFilterProduct(false);
    }
  };

  useEffect(() => {
    fetchFilterCustomerOptions();
    fetchFilterProductOptions();
  }, []);

  useEffect(() => {
    if (
      (tab === 'ongoing' &&
        isHaveAccess(feature, 'read_list_on_going_modification_order')) ||
      (tab === 'upgrade' &&
        isHaveAccess(
          feature,
          'read_list_upgrade_complete_modification_order',
        )) ||
      (tab === 'downgrade' &&
        isHaveAccess(
          feature,
          'read_list_downgrade_complete_modification_order',
        ))
    ) {
      setPage(1);
      fetchList(1);
    } else {
      setFailedAlert({
        message: "You don't have permission to view this page.",
      });
      setLoadingTable(false);
      setList({ data: [] });
    }
  }, [tab, filterCustomer, filterStatus, filterProduct, search]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onClickRowTable = async (data) => {
    if (isHaveAccess(feature, 'read_detail_modification_order')) {
      router.push(route.modificationOrder('detail', data.orderId));
    } else {
      setFailedAlert({
        message: "You don't have permission to view detail.",
      });
    }
  };

  const onClickDocument = (fileUrl) => (e) => {
    e.stopPropagation();
    window.open(fileUrl);
  };

  const loading = {
    filterCustomer: loadingFilterCustomer,
    filterProduct: loadingFilterProduct,
    table: loadingTable,
  };

  return {
    feature,
    filterCustomer,
    setFilterCustomer,
    filterCustomerOptions,
    filterProduct,
    setFilterProduct,
    filterProductOptions,
    filterStatus,
    setFilterStatus,
    list,
    page,
    loading,
    onPaginationChange,
    onClickRowTable,
    onClickDocument,
    search,
    setSearch,
    tab,
    setTab,
  };
};

export default useActions;
