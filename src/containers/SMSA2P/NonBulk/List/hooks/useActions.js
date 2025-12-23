import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  getListNonBulk,
  getListCustomerNonBulk,
} from '../../_repositories/repositories';
import { cleanObject, isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { optionsFilterCampaignType } from '../constant';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { setFailedAlert } = usePopupAlert();

  const [tab, _setTab] = useState('');
  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [filterDateRange, _setFilterDateRange] = useState([null, null]);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');
  const [optionsFilterCustomer, setOptionsFilterCustomer] = useState([
    { value: '', label: 'All Customer' },
  ]);
  const [filterCustomer, _setFilterCustomer] = useState({
    value: '',
    label: 'All Customer',
  });
  const [filterCampaignType, _setFilterCampaignType] = useState({
    value: '',
    label: 'All Campaign Type',
  });

  const setTab = (val) => {
    setPage(1);
    setOrderBy('');
    setSort('asc');
    setSearch('');
    setFilterCustomer({ value: '', label: 'All Customer' });
    setFilterCampaignType({ value: '', label: 'All Campaign Type' });
    setFilterDateRange([null, null]);
    _setTab(val);
  };

  const onClickRefresh = () => setTab(tab);

  const setFilterCustomer = (val) => {
    setPage(1);
    _setFilterCustomer(val);
  };

  const setFilterCampaignType = (val) => {
    setPage(1);
    _setFilterCampaignType(val);
  };

  const setFilterDateRange = (val) => {
    setPage(1);
    _setFilterDateRange(val);
  };

  const fetchList = async (newPage) => {
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
      customer: filterCustomer.value,
      campaignType: filterCampaignType.value,
      status: tab,
    };
    const params = cleanObject(_params);

    const validatePath = router.pathname === route.nonBulk('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getListNonBulk({
          params,
          withCancel: true,
        });

        const normalize = { data, meta };
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
      const result = await getListCustomerNonBulk();

      const { data } = result;
      setOptionsFilterCustomer(data);
    } catch (error) {
      setOptionsFilterCustomer([]);
    }
  };

  useEffect(() => {
    if (
      (tab === 'On Progress' &&
        isHaveAccess(props.feature, 'read_list_non_bulk_request')) ||
      (tab === 'Completed' &&
        isHaveAccess(props.feature, 'read_list_non_bulk_active'))
    ) {
      setPage(1);
      fetchList(1);
      fetchOptionsCustomer();
    } else {
      setFailedAlert({
        message: "You don't have permission to view this page.",
      });
      setLoadingTable(false);
    }
  }, [
    tab,
    filterCustomer,
    filterCampaignType,
    filterDateRange,
    search,
    sort,
    orderBy,
  ]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onClickRowTable = (data) => {
    if (isHaveAccess(feature, 'read_detail_non_bulk')) {
      router.push(route.nonBulk('detail', data.orderNumber));
    } else {
      setFailedAlert({
        message:
          "You don't have permission to read detail account manager mapping.",
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
      campaignType: {
        onChange: setFilterCampaignType,
        options: optionsFilterCampaignType,
        value: filterCampaignType,
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
    fetchList,
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useActions;
