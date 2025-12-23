import { useEffect, useState } from 'react';
import { cleanObject } from '@utils/common';
import { getListOfDetailBroadcastInformation } from '@containers/Broadcast/BroadcastInformation/_repositories/repositories';
import { useRouter } from 'next/router';
import { size } from '@fragments/List/List';
import { route } from '@configs/';

const useAction = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { id: broadcastId } = router.query;

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [search, setSearch] = useState('');
  const [filterLastUpdate, setFilterLastUpdate] = useState(null);
  const [filterStatus, setFilterStatus] = useState({
    label: 'All Status',
    value: '',
  });

  const [page, setPage] = useState(1);

  const fetchList = async (newPage) => {
    const _params = {
      size,
      search,
      lastUpdate: filterLastUpdate,
      status: filterStatus.value,
      page: newPage ? newPage : page,
    };

    const params = cleanObject(_params);

    const validatePath =
      router.asPath === route.broadcastInformation('detail', broadcastId);

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getListOfDetailBroadcastInformation(
          broadcastId,
          {
            params,
            withCancel: true,
          },
        );
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
    if (broadcastId) {
      setPage(1);
      fetchList(1);
    }
  }, [search, filterLastUpdate, filterStatus, broadcastId]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    feature,
    filterLastUpdate,
    filterStatus,
    list,
    search,
    setFilterLastUpdate,
    setFilterStatus,
    setSearch,
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useAction;
