import { route } from '@configs';
import { isHaveAccess, cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getListBroadcastInformation } from '../../_repositories/repositories';
import { size } from '@fragments/List/List';
import { dateFormat } from '@utils/parser';

function useAction(props) {
  const router = useRouter();
  const { feature } = props;
  const { setFailedAlert } = usePopupAlert();

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [search, setSearch] = useState('');
  const [filterCreatedDate, setFilterCreatedDate] = useState(null);
  const [filterStatus, setFilterStatus] = useState({
    label: 'All status',
    value: '',
  });
  const [page, setPage] = useState(1);

  const fetchList = async (newPage) => {
    const payload = {
      size,
      search,
      createdDate: filterCreatedDate
        ? dateFormat({ date: filterCreatedDate, type: 'params' })
        : '',
      status: filterStatus.value,
      page: newPage ? newPage : page,
    };

    const params = cleanObject(payload);

    const validatePath = router.pathname === route.broadcastInformation('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getListBroadcastInformation({
          params,
          withCancel: true,
        });
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
    if (isHaveAccess(feature, 'read_list_broadcast_information_cdm')) {
      setPage(1);
      fetchList(1);
    } else {
      setFailedAlert({
        message: "You don't have permission to view list.",
      });
      setLoadingTable(false);
    }
  }, [search, filterCreatedDate, filterStatus]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onClickRowTable = (data) => {
    if (data.status === 'preparation') {
      router.push(route.broadcastInformation('create', data?.broadcastId));
    } else {
      if (isHaveAccess(feature, 'read_detail_broadcast_information_cdm')) {
        router.push(route.broadcastInformation('detail', data?.broadcastId));
      } else {
        setFailedAlert({
          message: "You don't have permission to view detail.",
        });
      }
    }
  };

  const onClickCreateBroadcast = () =>
    router.push(route.broadcastInformation('create'));

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    feature,
    filterCreatedDate,
    filterStatus,
    list,
    onClickCreateBroadcast,
    onClickRowTable,
    search,
    setFilterCreatedDate,
    setFilterStatus,
    setSearch,
    loadingTable,
    onPaginationChange,
    page,
  };
}

export default useAction;
