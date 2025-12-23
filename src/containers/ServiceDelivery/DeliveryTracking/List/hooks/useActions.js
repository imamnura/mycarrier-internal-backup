import { useEffect, useState } from 'react';
import { getListCustomer } from '@containers/ServiceDelivery/DeliveryTracking/_repositories/repositories';
import { cleanObject, isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { dateFormat } from '@utils/parser';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { setFailedAlert } = usePopupAlert();

  const [list, setList] = useState({ data: [], meta: {} });
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState('lastUpdate');
  const [sort, setSort] = useState('asc');
  const [search, setSearch] = useState('');
  const [filterLastUpdate, setFilterLastUpdate] = useState([null, null]);
  const [loadingTable, setLoadingTable] = useState(false);

  const fetchList = async (newPage) => {
    const location = router.pathname;

    const _params = {
      size,
      search,
      page: newPage ? newPage : page,
      startDate:
        filterLastUpdate[0] &&
        dateFormat({ date: filterLastUpdate[0], type: 'params' }),
      endDate:
        filterLastUpdate[1] &&
        dateFormat({ date: filterLastUpdate[1], type: 'params' }),
      orderBy: orderBy,
      sort,
    };

    const params = cleanObject(_params);

    const validatePath = location === route.deliveryTracking('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getListCustomer({ params });
        const normalize = { data, meta };
        setList(normalize);
      } catch (e) {
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
    if (isHaveAccess(feature, 'read_list_customer_delivery_tracking')) {
      setPage(1);
      fetchList(1);
    } else {
      setFailedAlert({
        message: "You don't have permission to view this page.",
      });
      setLoadingTable(false);
      setList({ data: [] });
    }
  }, [search, filterLastUpdate, orderBy, sort]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onClickRowTable = (data) => {
    if (isHaveAccess(feature, 'read_detail_customer_delivery_tracking')) {
      router.push({
        pathname: route.deliveryTracking('detail', data.custAccntNum),
      });
    } else {
      setFailedAlert({
        message: "You don't have permission to read detail delivery tracking.",
      });
    }
  };

  return {
    list,
    page,
    loading: {
      table: loadingTable,
    },
    onPaginationChange,
    filter: {
      date: {
        onChange: setFilterLastUpdate,
        label: 'Last Update',
        value: filterLastUpdate,
      },
    },
    setSearch,
    search,
    useOrderBy: [orderBy, setOrderBy],
    useOrderDirection: [sort, setSort],
    onClickRowTable,
  };
};

export default useActions;
