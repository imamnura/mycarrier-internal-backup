import { useEffect, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import {
  getFilterCustomerOptions,
  getFilterProductOptions,
  getListPurchaseOrder,
} from '../../_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { titleCapitalize } from '@utils/common';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { setFailedAlert } = usePopupAlert();

  const [list, setList] = useState({ data: [], meta: {} });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState('');
  const [sort, setSort] = useState('asc');
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

  const [filterCustomerOptions, setFilterCustomerOptions] = useState([]);
  const [filterProductOptions, setFilterProductOptions] = useState([]);

  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingFilterCustomer, setLoadingFilterCustomer] = useState(true);
  const [loadingFilterProduct, setLoadingFilterProduct] = useState(true);

  const fetchList = async (newPage) => {
    const location = router.pathname;

    const _params = {
      size,
      search,
      sort,
      page: newPage ? newPage : page,
      status: filterStatus.value,
      customer: filterCustomer.value,
      product: filterProduct.value,
      orderType: filterOrderType.value,
    };

    const params = cleanObject(_params);

    const validatePath = location === route.purchaseOrder('list');

    const normalizeData = (rawData) => {
      const newData = rawData.map((v) => {
        const orderType = titleCapitalize(v.orderType);

        return { ...v, orderType };
      });
      return [...newData];
    };

    if (!loadingTable && validatePath) {
      setLoadingTable(true);

      try {
        const { data, meta } = await getListPurchaseOrder({
          params,
          withCancel: true,
        });
        const rawData = data || [];
        const normalize = {
          data: normalizeData(rawData),
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
    sort,
    orderBy,
  ]);

  useEffect(() => {
    fetchList();
  }, [page]);

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
    fetchFilterCustomerOptions();
    fetchFilterProductOptions();
  }, []);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  // status order item: draft | unsubmitted | submitted
  const onClickRowTable = async (data) => {
    let product = '';

    switch (data?.productName?.toLowerCase()) {
      case 'neucentrix cndc':
        product = 'neucentrix';
        break;
      default:
        product = 'solutions';
    }

    if (data?.status === 'draft') {
      router.push({
        pathname: route.purchaseOrder('orderItem', data.orderNumber, product),
        query: {
          orderType:
            data?.orderType === 'Subscribe' ? 'New Order' : data?.orderType,
          productName: data?.productName?.toLowerCase(),
          productFlow: data?.productFlow,
          isSubmitted: true,
        },
      });
    } else {
      if (isHaveAccess(feature, 'read_detail')) {
        router.push({
          pathname: route.purchaseOrder('detail', data.orderNumber),
        });
      } else {
        setFailedAlert({
          message: "You don't have permission to view detail.",
        });
      }
    }
  };

  const onClickDocument = (fileUrl) => (e) => {
    e.stopPropagation();
    window.open(fileUrl);
  };

  const onClickCreate = () =>
    router.push({
      pathname: route.purchaseOrder('create'),
      query: { orderType: 'new order' },
    });

  const loading = {
    filterCustomer: loadingFilterCustomer,
    filterProduct: loadingFilterProduct,
    table: loadingTable,
  };

  return {
    feature,
    filterCustomer,
    filterCustomerOptions,
    filterOrderType,
    filterProduct,
    filterProductOptions,
    filterStatus,
    list,
    page,
    loading,
    onPaginationChange,
    onClickDocument,
    onClickRowTable,
    onClickCreate,
    search,
    setFilterCustomer,
    setFilterOrderType,
    setFilterProduct,
    setFilterStatus,
    setSearch,
    sort,
    setSort,
    orderBy,
    setOrderBy,
  };
};

export default useActions;
