import { useEffect, useState } from 'react';
import { getListCustomerIPPrefix } from '../../../_repositories/repositories';
import { cleanObject, isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import moment from 'moment';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;

  const [list, setList] = useState({ data: [], meta: {} });

  const { setFailedAlert } = usePopupAlert();

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);

  const [filterDateRange, setFilterDateRange] = useState([null, null]);
  const [modalDownload, setModalDownload] = useState(null);

  const [loadingTable, setLoadingTable] = useState(false);

  const onClickModalDownload = (value) => () => setModalDownload(value);

  const fetchList = async (newPage) => {
    const location = router.pathname;

    const _params = {
      size,
      search,
      page: newPage ? newPage : page,
      startDate: filterDateRange[0]
        ? moment(filterDateRange[0]).format('YYYY-MM-DD')
        : '',
      endDate: filterDateRange[1]
        ? moment(filterDateRange[1]).format('YYYY-MM-DD')
        : '',
    };

    const params = cleanObject(_params);

    const validatePath = location === route.ipPrefix('list-customer');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);

      try {
        const { data, meta } = await getListCustomerIPPrefix({
          params,
          withCancel: true,
        });
        const newData = data || [];
        const normalize = {
          data: [...newData],
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
    if (isHaveAccess(props.feature, 'read_list_customer_ip_prefix')) {
      setPage(1);
      fetchList(1);
    } else {
      setFailedAlert({
        message: "You don't have permission to view this page.",
      });
      setLoadingTable({
        root: false,
        row: false,
      });
    }
  }, [search, filterDateRange]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onClickRowTable = (data) => {
    if (isHaveAccess(feature, 'read_detail_customer_ip_prefix')) {
      router.push(route.ipPrefix('request', data?.custAccntNum));
    } else {
      setFailedAlert({
        message: "You don't have permission to read detail customer IP Prefix.",
      });
    }
  };

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const action = [
    {
      children: 'download',
      onClick: onClickModalDownload(true),
      variant: 'ghost',
    },
  ];

  return {
    filter: {
      dateRange: {
        onChange: setFilterDateRange,
        value: filterDateRange,
      },
    },
    list,
    page,
    loading: loadingTable,
    onPaginationChange,
    onClickRowTable,
    fetchList,
    search,
    setSearch,
    action,
    modalDownload,
    setModalDownload,
    onClickModalDownload,
  };
};

export default useActions;
