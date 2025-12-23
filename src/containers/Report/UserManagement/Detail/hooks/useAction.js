import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  getViewAllDataJourney,
  getGraphCompanyAccessing,
} from '../../_repositories/repositories';
import { cleanObject, isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { normalizeBarChart } from '../utils';

const useActions = (feature) => {
  const router = useRouter();
  const { id } = router.query;

  const type =
    {
      'feature-customer': `customer`,
      'feature-internal': `internal`,
    }[id] || 'customer';

  const { setFailedAlert } = usePopupAlert();

  const [tab, _setTab] = useState('');

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [chartData, setChartData] = useState(null);
  const [filterDateRange, setFilterDateRange] = useState([null, null]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const [loadingCompanyAccessing, setLoadingCompanyAccessing] = useState(false);

  const setTab = (val) => {
    setPage(1);
    setSearch('');
    setFilterDateRange([null, null]);
    _setTab(val);
  };

  const fetchList = async (newPage) => {
    const _params = {
      page: newPage ? newPage : page,
      journey: tab,
      size,
      search,
      startDate: filterDateRange[0]
        ? moment(filterDateRange[0]).format('YYYY-MM-DD')
        : '',
      endDate: filterDateRange[1]
        ? moment(filterDateRange[1]).format('YYYY-MM-DD')
        : '',
    };
    const params = cleanObject(_params);

    const validatePath =
      router.asPath === route.reportUserManagement('detail', id);

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const result = await getViewAllDataJourney(
          { params, withCancel: true },
          type,
        );
        const { data, meta } = result;
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

  const fetchGraphAccessing = async (type) => {
    const _params = {
      journey: tab,
      search,
      startDate: filterDateRange[0]
        ? moment(filterDateRange[0]).format('YYYY-MM-DD')
        : '',
      endDate: filterDateRange[1]
        ? moment(filterDateRange[1]).format('YYYY-MM-DD')
        : '',
    };
    const params = cleanObject(_params);

    const validatePath =
      router.asPath === route.reportUserManagement('detail', id);

    if (!loadingCompanyAccessing && validatePath) {
      setLoadingCompanyAccessing(true);
      try {
        const result = await getGraphCompanyAccessing({ params }, type);
        if (result) {
          const { data } = result;
          setChartData(normalizeBarChart(data.reverse()));
        }
        setLoadingCompanyAccessing(false);
      } catch (error) {
        setChartData(null);
        setLoadingCompanyAccessing(false);
      }
    }
  };

  useEffect(() => {
    if (
      (tab === 'evaluate' &&
        isHaveAccess(feature, 'read_user_management_report')) ||
      (tab === 'explore' &&
        isHaveAccess(feature, 'read_user_management_report')) ||
      (tab === 'activate' &&
        isHaveAccess(feature, 'read_user_management_report')) ||
      (tab === 'getSupport' &&
        isHaveAccess(feature, 'read_user_management_report')) ||
      (tab === 'pay' && isHaveAccess(feature, 'read_user_management_report'))
    ) {
      setPage(1);
      fetchList(1);
      fetchGraphAccessing(type);
    } else {
      setFailedAlert({
        message: "You don't have permission to view this page.",
      });
      setLoadingTable(false);
      setList({ data: [] });
      setChartData(null);
    }

    return () => {
      setList({ data: [] });
      setChartData(null);
    };
  }, [tab, filterDateRange, search, id]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const loading = {
    chartData: loadingCompanyAccessing,
  };

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    filter: {
      dateRange: {
        onChange: setFilterDateRange,
        value: filterDateRange,
      },
    },
    list,
    loading,
    search,
    setSearch,
    tab,
    setTab,
    type,
    chartData,
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useActions;
