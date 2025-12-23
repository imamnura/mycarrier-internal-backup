import moment from 'moment';
import { useEffect, useState } from 'react';
import { route } from '@configs';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { statusOptions } from '../constant';
import {
  downloadList,
  getList,
  getCustomerName,
} from '../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { capitalize } from '@utils/text';
import { size } from '@fragments/List/List';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;

  const [list, setList] = useState({ data: [], meta: {} });

  const { setSuccessAlert, setFailedAlert } = usePopupAlert();

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);

  const [tab, _setTab] = useState('');

  const [sort, setSort] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const [filterCustomer, _setFilterCustomer] = useState({
    value: '',
    label: 'All Customer',
  });
  const [filterStatus, _setFilterStatus] = useState({
    value: '',
    label: 'All Status',
  });
  const [filterDateRange, _setFilterDateRange] = useState([null, null]);

  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);

  const [customerOptions, _setCustomerOptions] = useState([]);

  const tabStatus = tab === 'active' ? 'all-onprogress' : 'done';

  const setTab = (val) => {
    setPage(1);
    setSort('asc');
    setOrderBy('');
    setSearch('');
    setFilterCustomer({ value: '', label: 'All Customer' });
    setFilterStatus({ value: '', label: 'All Status' });
    setFilterDateRange([null, null]);
    _setTab(val);
  };

  const onClickRefresh = () => setTab(tab);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onClickRowTable = async (data) => {
    if (
      (tab === 'active' && isHaveAccess(feature, 'read_detail')) ||
      (tab === 'done' && isHaveAccess(feature, 'read_detailHistory'))
    ) {
      router.push(route.smsa2p('detail', data.ticketId));
    } else {
      setFailedAlert({
        message: "You don't have permission to view Detail.",
      });
    }
  };

  const fetchDetailReport = async (newPage) => {
    const location = router.pathname;

    const _params = {
      size,
      search,
      page: newPage ? newPage : page,
      sort,
      sortBy: orderBy,
      status: !filterStatus.value ? tabStatus : filterStatus.value,
      custAccntNum: filterCustomer.value,
      startDate: filterDateRange[0]
        ? moment(filterDateRange[0]).format('YYYY-MM-DD')
        : '',
      endDate: filterDateRange[1]
        ? moment(filterDateRange[1]).format('YYYY-MM-DD')
        : '',
    };

    const params = cleanObject(_params);

    const validatePath = location === route.smsa2p('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);

      try {
        const { data, meta } = await getList(params, tab);
        const normalize = {
          data,
          meta,
        };
        setList(normalize);
        setLoadingTable(false);
      } catch (error) {
        if (error.code !== 500) {
          setLoadingTable(false);
        }

        setList({
          data: [],
          meta: {},
        });
      }
    }
  };

  const setFilterCustomer = (val) => {
    setPage(1);
    _setFilterCustomer(val);
  };

  const setFilterStatus = (val) => {
    setPage(1);
    _setFilterStatus(val);
  };

  const setFilterDateRange = (val) => {
    setPage(1);
    _setFilterDateRange(val);
  };

  const fetchCustomerName = async () => {
    try {
      const result = await getCustomerName();
      const resOptions = [{ label: 'All Customer', value: '' }];
      result.data.map(({ custAccntName, custAccntNum }) => {
        resOptions.push({
          label: capitalize(custAccntName),
          value: custAccntNum,
        });
      });
      _setCustomerOptions(resOptions);
    } catch (error) {
      _setCustomerOptions([]);
    }
  };

  const onClickDownload = async () => {
    setLoadingDownload(true);
    const params = {
      search,
      custAccntNum: filterCustomer.value,
      sort,
      sortBy: orderBy,
      startDate: filterDateRange[0]
        ? moment(filterDateRange[0]).format('YYYY-MM-DD')
        : '',
      endDate: filterDateRange[1]
        ? moment(filterDateRange[1]).format('YYYY-MM-DD')
        : '',
      status: !filterStatus.value ? tabStatus : filterStatus.value,
    };
    try {
      const result = await downloadList(params);
      if (result.data.url) {
        window.location.href = result.data.url;
        setSuccessAlert({
          message: 'Detail data successfully downloaded.',
        });
      }
      setLoadingDownload(false);
    } catch (error) {
      setFailedAlert({
        message: error.message,
      });
      setLoadingDownload(false);
    }
  };

  useEffect(() => {
    if (
      (tab === 'active' && isHaveAccess(feature, 'read_active')) ||
      (tab === 'done' && isHaveAccess(feature, 'read_history'))
    ) {
      fetchDetailReport();
    } else {
      setFailedAlert({
        message: "You don't have permission to view this page.",
      });
    }
  }, [
    filterStatus,
    filterCustomer,
    filterDateRange,
    search,
    tab,
    sort,
    orderBy,
    page,
  ]);

  useEffect(() => {
    fetchCustomerName();
  }, []);

  return {
    filter: {
      customer: {
        onChange: setFilterCustomer,
        options: customerOptions,
        value: filterCustomer,
      },
      dateRange: {
        onChange: setFilterDateRange,
        value: filterDateRange,
      },
      status: {
        onChange: setFilterStatus,
        options: statusOptions(tab),
        value: filterStatus,
      },
    },
    list,
    page,
    loading: {
      download: loadingDownload,
      table: loadingTable,
    },
    onPaginationChange,
    onClickDownload,
    onClickRefresh,
    onClickRowTable,
    search,
    sort,
    orderBy,
    setSearch,
    setSort,
    setOrderBy,
    setTab,
    tab,
  };
};

export default useActions;
