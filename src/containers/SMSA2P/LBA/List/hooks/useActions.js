import moment from 'moment';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { cleanObject, isHaveAccess } from '@utils/common';
import {
  getListLBA,
  getListCustomerLBA,
} from '../../_repositories/repositories';
import {
  optionsFilterStatus,
  optionsFilterOperator,
  statusLabel,
} from '../../utils';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { titleCapitalize } from '@utils/common';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { setFailedAlert } = usePopupAlert();

  const [tab, _setTab] = useState('');
  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [filterDateRange, _setFilterDateRange] = useState([null, null]);
  const [filterStatus, _setFilterStatus] = useState({
    value: '',
    label: 'All Status',
  });
  const [filterCustomer, _setFilterCustomer] = useState([
    { value: '', label: 'All Customer' },
  ]);
  const [filterOperator, _setFilterOperator] = useState({
    value: '',
    label: 'All Operator',
  });
  const [optionsFilterCustomer, setOptionsFilterCustomer] = useState([
    { value: '', label: 'All Customer' },
  ]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState(null);
  const [sort, setSort] = useState('asc');

  const setTab = (val) => {
    setPage(1);
    setSort('asc');
    setOrderBy(null);
    setSearch('');
    setFilterCustomer([{ value: '', label: 'All Customer' }]);
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
      provider: filterOperator.value,
    };

    const params = cleanObject(_params);

    const validatePath = router.pathname === route.lba('list');

    const normalizeData = (data) => {
      const newData = data.map((v) => {
        return {
          ...v,
          status: statusLabel[v.activationStatus],
          serviceCategory: v?.lbaCategory?.join(', '),
          provider: titleCapitalize(v.provider),
        };
      });
      return newData;
    };

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getListLBA({ params, withCancel: true });
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
      const { data } = await getListCustomerLBA();
      setOptionsFilterCustomer(data);
    } catch (error) {
      setOptionsFilterCustomer([]);
    }
  };

  useEffect(() => {
    if (
      (tab === 'progress' &&
        isHaveAccess(props.feature, 'read_list_request')) ||
      (tab === 'done' && isHaveAccess(props.feature, 'read_list_active'))
    ) {
      setPage(1);
      fetchList(1);
      fetchOptionsCustomer();
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
  ]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onClickRowTable = (data) => {
    if (isHaveAccess(feature, 'read_detail')) {
      router.push(route.lba('detail', data.orderNumber));
    } else {
      setFailedAlert({
        message: "You don't have permission to read detail LBA.",
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
        options: optionsFilterStatus,
        value: filterStatus,
      },
      operator: {
        onChange: setFilterOperator,
        options: optionsFilterOperator,
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
    search,
    setSearch,
    orderBy,
    setOrderBy,
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
