import { useEffect, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import {
  getFilterCustomerOptions,
  getFilterProductOptions,
  getFilterAmOptions,
  getFilterSegmentOptions,
  getListBaso,
} from '../../_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;

  const [list, setList] = useState({ data: [], meta: {} });

  const { setFailedAlert } = usePopupAlert();

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);

  const [filterStatus, setFilterStatus] = useState({
    label: 'All Status',
    value: '',
  });
  const [filterProduct, setFilterProduct] = useState({
    label: 'All Product',
    value: '',
  });
  const [filterCustomer, setFilterCustomer] = useState({
    label: 'All Customer',
    value: '',
  });
  const [filterOrderType, setFilterOrderType] = useState({
    label: 'All Order Type',
    value: '',
  });
  const [filterAm, setFilterAm] = useState({
    label: 'All Account Manager',
    value: '',
  });
  const [filterSegment, setFilterSegment] = useState({
    label: 'All Segment',
    value: '',
  });

  const [filterCustomerOptions, setFilterCustomerOptions] = useState([]);
  const [filterProductOptions, setFilterProductOptions] = useState([]);
  const [filterSegmentOptions, setFilterSegmentOptions] = useState([]);
  const [filterAmOptions, setFilterAmOptions] = useState([]);

  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingFilterAm, setLoadingFilterAm] = useState(true);
  const [loadingFilterCustomer, setLoadingFilterCustomer] = useState(true);
  const [loadingFilterProduct, setLoadingFilterProduct] = useState(true);
  const [loadingFilterSegment, setLoadingFilterSegment] = useState(true);

  const fetchList = async (newPage) => {
    const location = router.pathname;

    const _params = {
      size,
      search,
      page: newPage ? newPage : page,
      status: filterStatus.value,
      sort: 'asc',
      customer: filterCustomer.value,
      product: filterProduct.value,
      orderType: filterOrderType.value,
      account_manager: filterAm.value,
      segment: filterSegment.value,
    };

    const params = cleanObject(_params);

    const validatePath = location === route.baso('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);

      try {
        const { data, meta } = await getListBaso({ params, withCancel: true });
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
          meta: {},
        });
      }
    }
  };

  useEffect(() => {
    setPage(1);
    fetchList(1);
  }, [
    search,
    filterStatus,
    filterCustomer,
    filterOrderType,
    filterProduct,
    filterAm,
    filterSegment,
  ]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const fetchFilterAmOptions = async () => {
    setLoadingFilterAm(true);

    try {
      const result = await getFilterAmOptions();
      const options = result.data.map(({ fullName, nik }) => ({
        value: nik,
        label: fullName,
      }));
      setFilterAmOptions([
        { value: '', label: 'All Account Manager' },
        ...options,
      ]);
      setLoadingFilterAm(false);
    } catch (error) {
      setFilterAmOptions([{ value: '', label: 'All Account Manager' }]);
      setLoadingFilterAm(false);
    }
  };

  const fetchFilterSegmentOptions = async () => {
    setLoadingFilterSegment(true);

    try {
      const result = await getFilterSegmentOptions();
      const options = result.data.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
      setFilterSegmentOptions([
        { value: '', label: 'All Segment' },
        ...options,
      ]);
      setLoadingFilterSegment(false);
    } catch (error) {
      setFilterSegmentOptions([{ value: '', label: 'All Segment' }]);
      setLoadingFilterSegment(false);
    }
  };

  const fetchFilterCustomerOptions = async () => {
    setLoadingFilterCustomer(true);

    try {
      const result = await getFilterCustomerOptions();
      const options = result.data.map(({ custAccntNum, custAccntName }) => ({
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
      const options = result.data.map(({ productId, productName }) => ({
        value: productId,
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
    fetchFilterAmOptions();
    fetchFilterCustomerOptions();
    fetchFilterProductOptions();
    fetchFilterSegmentOptions();
  }, []);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onClickRowTable = async (data) => {
    if (isHaveAccess(feature, 'read_detail')) {
      router.push(route.baso('detail', data.orderNumber));
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
    filterAm: loadingFilterAm,
    filterCustomer: loadingFilterCustomer,
    filterProduct: loadingFilterProduct,
    filterSegment: loadingFilterSegment,
    table: loadingTable,
  };

  return {
    feature,
    filterAm,
    filterAmOptions,
    filterCustomer,
    filterCustomerOptions,
    filterOrderType,
    filterProduct,
    filterProductOptions,
    filterSegment,
    filterSegmentOptions,
    filterStatus,
    list,
    page,
    loading,
    onPaginationChange,
    onClickDocument,
    onClickRowTable,
    search,
    setFilterAm,
    setFilterCustomer,
    setFilterOrderType,
    setFilterProduct,
    setFilterSegment,
    setFilterStatus,
    setSearch,
  };
};

export default useActions;
