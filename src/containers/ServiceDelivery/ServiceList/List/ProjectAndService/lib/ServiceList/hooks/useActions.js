import { useEffect, useState } from 'react';
import {
  getListServices,
  getListDropdown,
  getSummary,
} from '../../../../../_repositories/repositories';
import { cleanObject, isHaveAccess, dropdownValueParser } from '@utils/common';
import { size } from '@fragments/List/List';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { checkProduct } from '../../../utils';
import useQueryParams from '@utils/hooks/useQueryParams';

const useActions = (props) => {
  const router = useRouter();
  const { feature, setData } = props;

  const { queryParams, setQueryParams, isReady } = useQueryParams();

  const { id: custAccntNum, params: projectId } = queryParams;

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [page, setPage] = useState(1);
  const [optionsFilterProduct, setOptionsFilterProduct] = useState([
    { value: '', label: 'All Product' },
  ]);
  const [optionsFilterRegional, setOptionsFilterRegional] = useState([
    { value: '', label: 'All Regional' },
  ]);
  const [optionsFilterStatus, setOptionsFilterStatus] = useState([
    { value: '', label: 'All Status' },
  ]);

  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const filterStatus = queryParams?.status || '';
  const setFilterStatus = ({ value: status }) => setQueryParams({ status });

  const filterProduct = queryParams?.product || '';
  const setFilterProduct = ({ value: product }) => setQueryParams({ product });

  const filterRegional = queryParams?.regional || '';
  const setFilterRegional = ({ value: regional }) =>
    setQueryParams({ regional });

  const search = queryParams?.search || '';
  const setSearch = (search) => setQueryParams({ search });

  const sort = queryParams?.sort || 'asc';
  const setSort = (sort) => setQueryParams({ sort });

  const orderBy = queryParams?.orderBy || '';
  const setOrderBy = (orderBy) => setQueryParams({ orderBy });

  const fetchList = async (newPage) => {
    const _params = {
      page: newPage ? newPage : page,
      size,
      search,
      regional: filterRegional,
      product: filterProduct,
      status: filterStatus,
      projectId,
      orderBy,
      sort,
    };
    const params = cleanObject(_params);

    if (!loadingTable) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getListServices(custAccntNum, { params });
        const normalize = { data, meta };
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

  useEffect(() => {
    fetchList();
  }, [page]);

  const fetchSummary = async () => {
    const _params = {
      projectId,
    };
    const params = cleanObject(_params);

    setLoadingSummary(true);
    // if (router.asPath.includes('detail-project')) {
    //   setLoadingRoot(true);
    // }
    try {
      const { data } = await getSummary(custAccntNum, { params });
      setSummary(data?.summary);
      if (router.asPath.includes('detail-project')) {
        setData(data);
      }
    } catch (error) {
      setSummary(null);
      if (router.asPath.includes('detail-project')) {
        setData(null);
      }
    } finally {
      setLoadingSummary(false);
      // if (router.asPath.includes('detail-project')) {
      // setLoadingRoot(false);
      // }
    }
  };

  const fetchOptionsProduct = async () => {
    try {
      const { data } = await getListDropdown({
        type: 'product',
        custAccntNum: custAccntNum,
      });
      const normalizeData = data.map((item) => ({
        value: item.value,
        label: item.name,
      }));
      setOptionsFilterProduct([
        { value: '', label: 'All Product' },
        ...normalizeData,
      ]);
    } catch (error) {
      setOptionsFilterProduct([]);
    }
  };

  const fetchOptionsRegional = async () => {
    try {
      const { data } = await getListDropdown({
        type: 'regional',
        custAccntNum: custAccntNum,
      });
      const normalizeData = data.map((item) => ({
        value: item.value,
        label: item.name,
      }));
      setOptionsFilterRegional([
        { value: '', label: 'All Regional' },
        ...normalizeData,
      ]);
    } catch (error) {
      setOptionsFilterRegional([]);
    }
  };

  const fetchOptionsStatus = async () => {
    try {
      const { data } = await getListDropdown({ type: 'status' });
      const normalizeData = data.map((item) => ({
        value: item.value,
        label: item.name,
      }));
      setOptionsFilterStatus([
        { value: '', label: 'All Status' },
        ...normalizeData,
      ]);
    } catch (error) {
      setOptionsFilterStatus([]);
    }
  };

  useEffect(() => {
    if (isReady && isHaveAccess(feature, 'read_detail_service_list')) {
      fetchOptionsProduct();
      fetchOptionsRegional();
      fetchOptionsStatus();
      fetchSummary();
    }
  }, [custAccntNum]);

  useEffect(() => {
    if (isReady) {
      if (isHaveAccess(feature, 'read_detail_service_list')) {
        setPage(1);
        fetchList(1);
      } else {
        setLoadingTable(false);
        setList({ data: [] });
      }
    }
  }, [
    custAccntNum,
    search,
    filterProduct,
    filterRegional,
    filterStatus,
    sort,
    orderBy,
  ]);

  const onClickRowTable = (data) => {
    router.push({
      pathname: route.serviceList(
        'detailService',
        custAccntNum,
        data.serviceId,
      ),
      query: { projectId, serviceType: checkProduct(data.productName) },
    });
  };

  const loading = {
    summary: loadingSummary,
  };

  const summarySchema = [
    {
      title: 'Total Service',
      content: summary?.totalService,
      variant: 'general',
      sm: 6,
    },
    {
      title: 'Active',
      content: summary?.active,
      variant: 'success',
      useDivider: true,
      sm: 6,
    },
    {
      title: 'On Delivery',
      content: summary?.onDelivery,
      variant: 'info',
      sm: 4,
    },
    {
      title: 'Isolated',
      content: summary?.isolated,
      variant: 'alert',
      sm: 4,
    },
    {
      title: 'Disconnect',
      content: summary?.disconnect,
      variant: 'danger',
      sm: 4,
    },
  ];

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    filter: {
      product: {
        onChange: setFilterProduct,
        options: optionsFilterProduct,
        value: dropdownValueParser(filterProduct, optionsFilterProduct),
      },
      regional: {
        onChange: setFilterRegional,
        options: optionsFilterRegional,
        value: dropdownValueParser(filterRegional, optionsFilterRegional),
      },
      status: {
        onChange: setFilterStatus,
        options: optionsFilterStatus,
        value: dropdownValueParser(filterStatus, optionsFilterStatus),
      },
    },
    list,
    loading,
    onClickRowTable,
    search,
    setSearch,
    useOrderBy: [orderBy, setOrderBy],
    useOrderDirection: [sort, setSort],
    summarySchema,
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useActions;
