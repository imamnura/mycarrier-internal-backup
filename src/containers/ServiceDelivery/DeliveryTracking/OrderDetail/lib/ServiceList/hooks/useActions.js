import { useState, useEffect } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import {
  getListServices,
  getSummaryService,
} from '@containers/ServiceDelivery/DeliveryTracking/_repositories/repositories';
import { optionsFilterStatus } from '../../../utils';
import { dateFormat } from '@utils/parser';
import { route } from '@configs';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';

const useActions = (props) => {
  const { data, feature } = props;

  const router = useRouter();

  const { setFailedAlert } = usePopupAlert();

  const [list, setList] = useState({ data: [], meta: {} });
  const [page, setPage] = useState(1);

  const [loadingTable, setLoadingTable] = useState(false);

  const [search, setSearch] = useState(null);
  const [orderBy, setOrderBy] = useState('lastUpdate');
  const [sort, setSort] = useState('asc');
  const [filterLastUpdate, setFilterLastUpdate] = useState([null, null]);
  const [filterStatus, setFilterStatus] = useState({
    label: 'All Status',
    value: '',
  });

  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const fetchList = async (newPage) => {
    const _params = {
      size: 10,
      search,
      page: newPage ? newPage : page,
      status: filterStatus.value,
      startDate:
        filterLastUpdate[0] &&
        dateFormat({ date: filterLastUpdate[0], type: 'params' }),
      endDate:
        filterLastUpdate[1] &&
        dateFormat({ date: filterLastUpdate[1], type: 'params' }),
      custAccntNum: data?.custAccntNum,
      orderId: data?.orderId,
      serviceId: data?.serviceId,
      orderBy: orderBy,
      sort,
    };

    const params = cleanObject(_params);

    if (!loadingTable) {
      setLoadingTable(true);

      try {
        const res = await getListServices({
          params,
          withCancel: true,
        });
        if (res?.data) {
          setList({
            data: res?.data,
            meta: res?.meta,
          });
        }
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

  const fetchSummary = async () => {
    const _params = {
      custAccntNum: data?.custAccntNum,
      orderId: data?.orderId,
    };

    const params = cleanObject(_params);

    if (!loadingSummary) {
      setLoadingSummary(true);

      try {
        const res = await getSummaryService({ params });
        if (res?.data) {
          setSummary(res?.data);
        }
      } catch (error) {
        setSummary(null);
      } finally {
        setLoadingSummary(false);
      }
    }
  };

  useEffect(() => {
    if (
      !!data?.custAccntNum &&
      !!data?.orderId &&
      isHaveAccess(feature, 'read_service_list_delivery_tracking')
    ) {
      setPage(1);
      fetchList(1);
    }
  }, [search, filterStatus, filterLastUpdate, data, orderBy, sort]);

  useEffect(() => {
    if (
      !!data?.custAccntNum &&
      !!data?.orderId &&
      isHaveAccess(feature, 'read_service_list_delivery_tracking')
    ) {
      fetchSummary();
    }
  }, [data]);

  const onPaginationChange = (props, currentPage) => {
    setPage(currentPage);
    fetchList();
  };

  const onClickRowTable = (row) => {
    if (isHaveAccess(feature, 'read_service_detail_delivery_tracking')) {
      if (row?.serviceId !== 'Not Generated') {
        router.push({
          pathname: route.deliveryTracking(
            'detailService',
            data?.custAccntNum,
            data?.orderId,
            row?.serviceId,
          ),
        });
      } else {
        setFailedAlert({
          message: 'Service ID has not been generated yet.',
        });
      }
    } else {
      setFailedAlert({
        message: "You don't have permission to read detail service.",
      });
    }
  };

  const onClickCard = (v) => () => {
    if (filterStatus.value === v) {
      setFilterStatus({ label: 'All Status', value: '' });
    } else setFilterStatus(optionsFilterStatus.find((opt) => opt.value === v));
  };

  return {
    list,
    summary,
    loading: {
      root: loadingTable,
      summary: loadingSummary,
    },
    page,
    onPaginationChange,
    filter: {
      status: {
        onChange: setFilterStatus,
        options: optionsFilterStatus,
        value: filterStatus,
      },
      date: {
        onChange: setFilterLastUpdate,
        label: 'Last Update',
        value: filterLastUpdate,
      },
    },
    search,
    setSearch,
    onClickRowTable,
    useOrderBy: [orderBy, setOrderBy],
    useOrderDirection: [sort, setSort],
    onClickCard,
  };
};

export default useActions;
