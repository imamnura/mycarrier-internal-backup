import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  getListSender,
  getListCustomerSender,
  getListOperatorSender,
} from '../../_repositories/repositories';
import { cleanObject, isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { optionsFilterStatus } from '../constant';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { setFailedAlert } = usePopupAlert();

  const [tab, _setTab] = useState('');
  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [filterStatus, _setFilterStatus] = useState({
    value: '',
    label: 'All Status',
  });
  const [filterOperator, _setFilterOperator] = useState([
    { value: '', label: 'All Operator' },
  ]);
  const [optionsFilterOperator, setOptionsFilterOperator] = useState([
    { value: '', label: 'All Operator' },
  ]);
  const [filterDateRange, _setFilterDateRange] = useState([null, null]);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');
  const [optionsFilterCustomer, setOptionsFilterCustomer] = useState([
    { value: '', label: 'All Customer' },
  ]);
  const [filterCustomer, _setFilterCustomer] = useState([]);

  const setTab = (val) => {
    setPage(1);
    setOrderBy('');
    setSort('asc');
    setSearch('');
    setFilterCustomer([]);
    setFilterStatus({ value: '', label: 'All Status' });
    setFilterOperator([{ value: '', label: 'All Operator' }]);
    setFilterDateRange([null, null]);
    _setTab(val);
  };

  const onClickRefresh = () => setTab(tab);

  const setFilterCustomer = (val) => {
    setPage(1);
    _setFilterCustomer(val);
  };

  const setFilterStatus = (val) => {
    setPage(1);
    _setFilterStatus(val);
  };

  const setFilterOperator = (val) => {
    setPage(1);
    _setFilterOperator(val);
  };

  const setFilterDateRange = (val) => {
    setPage(1);
    _setFilterDateRange(val);
  };

  const fetchList = async (newPage) => {
    let customerFilterValue;
    if (filterCustomer)
      customerFilterValue = filterCustomer.map((item) => item?.value);

    let operatorFilterValue;
    if (filterOperator)
      operatorFilterValue = filterOperator.map((item) => item?.value);

    const _params = {
      page: newPage ? newPage : page,
      size,
      sort,
      search,
      startDate: filterDateRange[0]
        ? moment(filterDateRange[0]).format('YYYY-MM-DD')
        : '',
      endDate: filterDateRange[1]
        ? moment(filterDateRange[1]).format('YYYY-MM-DD')
        : '',
      status: filterStatus.value ? filterStatus.value : tab,
      customer: filterCustomer ? customerFilterValue.join(',') : '',
      operator: filterOperator ? operatorFilterValue.join(',') : '',
    };
    const params = cleanObject(_params);

    const validatePath = router.pathname === route.bulk('list');

    const normalizeData = (data = []) => {
      const newData = data.map((v) => {
        return {
          ...v,
          cp_name: v.smscData?.cp_name || '',
          sid: v.smscData?.sid || '',
        };
      });
      return newData;
    };

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getListSender({
          params,
          withCancel: true,
        });
        const normalize = {
          data: normalizeData(data),
          meta,
        };
        setList(normalize);
      } catch (error) {
        if (
          ['You are not allowed to access this menu!'].includes(error.message)
        ) {
          setFailedAlert({
            message: error.message,
          });
        }
        setList({
          data: [],
          meta: {},
        });
      } finally {
        setLoadingTable(false);
      }
    }
  };

  const normalizeOptionsCustomer = (data) => {
    let optionsCustomer = [{ value: '', label: 'All Customer' }];

    data.map(({ custAccntName, custAccntNum }) =>
      optionsCustomer.push({ value: custAccntNum, label: custAccntName }),
    );

    return optionsCustomer;
  };

  const fetchOptionsCustomer = async () => {
    try {
      const { data } = await getListCustomerSender();
      setOptionsFilterCustomer(data);
    } catch (error) {
      setOptionsFilterCustomer([]);
    }
  };

  const fetchOptionsOperator = async () => {
    try {
      const { data } = await getListOperatorSender();
      setOptionsFilterOperator(data);
    } catch (error) {
      setOptionsFilterOperator([]);
    }
  };
  const normalizeOptionsOperator = (data) => {
    let optionsOperator = [{ value: '', label: 'All Operator' }];

    data.map(({ operatorTypeId, operatorTypeName }) =>
      optionsOperator.push({ value: operatorTypeId, label: operatorTypeName }),
    );

    return optionsOperator;
  };

  useEffect(() => {
    if (
      (tab === 'onprogress' &&
        isHaveAccess(props.feature, 'read_list_bulk_request')) ||
      (tab === 'done' && isHaveAccess(props.feature, 'read_list_bulk_active'))
    ) {
      setPage(1);
      fetchList(1);
      fetchOptionsCustomer();
      fetchOptionsOperator();
    } else {
      setFailedAlert({
        message: "You don't have permission to view this page.",
      });
      setLoadingTable(false);
      setList({ data: [] });
    }
  }, [
    tab,
    filterCustomer,
    filterStatus,
    filterOperator,
    filterDateRange,
    search,
    sort,
    orderBy,
  ]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onClickRowTable = (data) => {
    if (isHaveAccess(feature, 'read_detail_bulk')) {
      router.push(route.bulk('detail', data.orderNumber));
    } else {
      setFailedAlert({
        message: "You don't have permission to read detail Bulk.",
      });
    }
  };

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    filter: {
      customer: {
        onChange: setFilterCustomer,
        options: normalizeOptionsCustomer(optionsFilterCustomer),
        value: filterCustomer,
      },
      status: {
        onChange: setFilterStatus,
        options: optionsFilterStatus(tab),
        value: filterStatus,
      },
      operator: {
        onChange: setFilterOperator,
        options: normalizeOptionsOperator(optionsFilterOperator),
        value: filterOperator,
      },
      dateRange: {
        onChange: setFilterDateRange,
        value: filterDateRange,
      },
    },
    list,
    onClickRowTable,
    onClickRefresh,
    orderBy,
    setOrderBy,
    search,
    setSearch,
    sort,
    setSort,
    tab,
    setTab,
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useActions;
