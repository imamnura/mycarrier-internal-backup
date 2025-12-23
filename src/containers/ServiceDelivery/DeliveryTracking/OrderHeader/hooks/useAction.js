import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { cleanObject, isHaveAccess } from '@utils/common';
import {
  getDetailCustomer,
  getListOrder,
} from '../../_repositories/repositories';
import useQueryParams from '@utils/hooks/useQueryParams';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { dateFormat } from '@utils/parser';
import { optionsFilterOrderType, optionsFilterStatus } from '../utils';

const useAction = ({ feature }) => {
  const router = useRouter();
  const { setFailedAlert } = usePopupAlert();
  const { queryParams } = useQueryParams();
  const { custAccntNum } = queryParams;

  const [customerData, setCustomerData] = useState(null);
  const [list, setList] = useState({ data: [], meta: {} });
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');

  const [filterLastUpdate, setFilterLastUpdate] = useState([null, null]);
  const [filterStatus, setFilterStatus] = useState({
    label: 'All Status',
    value: '',
  });
  const [filterOrderType, setFilterOrderType] = useState({
    label: 'All Order Type',
    value: '',
  });

  const [loading, setLoading] = useState(true);
  const [loadingTable, setLoadingTable] = useState(false);

  const fetchCustomerInformation = async () => {
    try {
      const { data } = await getDetailCustomer(custAccntNum);
      setCustomerData(data);
    } catch (error) {
      setCustomerData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchListOrderHeader = async (page) => {
    setLoadingTable(true);
    const params = cleanObject({
      size,
      search,
      custAccntNum,
      page,
      orderType: filterOrderType.value,
      status: filterStatus.value,
      startDate:
        filterLastUpdate[0] &&
        dateFormat({ date: filterLastUpdate[0], type: 'params' }),
      endDate:
        filterLastUpdate[1] &&
        dateFormat({ date: filterLastUpdate[1], type: 'params' }),
      sort,
    });

    try {
      const { data, meta } = await getListOrder({ params });
      setList({ data, meta });
    } catch (error) {
      setList({
        data: [],
        meta: {},
      });
    } finally {
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    if (custAccntNum) {
      fetchCustomerInformation();
    }
  }, [custAccntNum]);

  useEffect(() => {
    if (custAccntNum) {
      if (isHaveAccess(feature, 'read_detail_customer_delivery_tracking')) {
        setPage(1);
        fetchListOrderHeader(1);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
        setLoading(false);
        setList({ data: [] });
      }
    }
  }, [
    custAccntNum,
    search,
    filterLastUpdate,
    filterStatus,
    filterOrderType,
    orderBy,
    sort,
  ]);

  const onPaginationChange = (props, currentPage) => {
    setPage(currentPage);
    fetchListOrderHeader(currentPage);
  };

  const onClickRowTable = (data) => {
    if (isHaveAccess(feature, 'read_order_list_delivery_tracking')) {
      router.push({
        pathname: route.deliveryTracking(
          'detailOrder',
          custAccntNum,
          data.orderId,
        ),
      });
    } else {
      setFailedAlert({
        message: "You don't have permission to read detail order header.",
      });
    }
  };

  return {
    custAccntNum,
    customerData,
    search,
    setSearch,
    list,
    loading,
    loadingTable,
    onPaginationChange,
    onClickRowTable,
    page,
    useOrderBy: [orderBy, setOrderBy],
    useOrderDirection: [sort, setSort],
    filterStatus,
    setFilterStatus,
    filter: [
      {
        onChange: setFilterLastUpdate,
        label: 'Last Update',
        value: filterLastUpdate,
        type: 'dateRange',
      },
      {
        onChange: setFilterStatus,
        options: optionsFilterStatus,
        value: filterStatus,
        type: 'dropdown',
      },
      {
        onChange: setFilterOrderType,
        options: optionsFilterOrderType,
        minWidth: 170,
        value: filterOrderType,
        type: 'dropdown',
      },
    ],
  };
};

export default useAction;
