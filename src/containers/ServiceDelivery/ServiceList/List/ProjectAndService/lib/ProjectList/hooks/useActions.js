import { useEffect, useState } from 'react';
import { getListProject } from '../../../../../_repositories/repositories';
import { cleanObject, isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const { feature } = props;
  const router = useRouter();
  const { query, isReady } = router;
  const { id: custAccntNum } = query;

  const [list, setList] = useState({ data: [], meta: {}, hasMore: false });
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState('');
  const [sort, setSort] = useState('asc');
  const [search, setSearch] = useState('');
  const [loadingTable, _setLoadingTable] = useState({
    root: true,
    row: false,
  });

  const setLoadingTable = ({ root, row }) => {
    const resRoot = typeof root === 'boolean' ? root : loadingTable.root;
    const resRow = typeof row === 'boolean' ? row : loadingTable.row;

    _setLoadingTable({
      root: resRoot,
      row: resRow,
    });
  };

  const fetchList = async (resetData) => {
    const oldData = resetData ? [] : list.data;

    if (resetData) {
      setList({
        data: [],
        hasMore: false,
        meta: {},
      });
    }

    const _params = {
      page: resetData ? 1 : page,
      size,
      search,
      orderBy,
      sort,
    };
    const params = cleanObject(_params);

    const loadings = !loadingTable.root && !loadingTable.row;

    if (loadings || resetData) {
      if (resetData) setLoadingTable({ root: true });
      else setLoadingTable({ row: true });
      try {
        const { data, meta } = await getListProject(custAccntNum, { params });
        const hasMore = meta.page >= meta.totalPage ? false : true;
        const newData = data;
        const normalize = {
          data: [...oldData, ...newData],
          hasMore,
          meta,
        };
        setPage(meta.page + 1);
        setList(normalize);
        setLoadingTable({
          root: false,
          row: false,
        });
      } catch (error) {
        setLoadingTable({
          root: false,
          row: false,
        });
        setList({
          data: [],
          hasMore: false,
          meta: {},
        });
      }
    }
  };

  useEffect(() => {
    if (isReady) {
      if (isHaveAccess(feature, 'read_detail_service_list')) {
        setPage(1);
        fetchList(true);
      } else {
        setLoadingTable({
          root: false,
          row: false,
        });
        setList({ data: [] });
      }
    }
  }, [search, orderBy, sort]);

  const onClickRowTable = (data) => {
    router.push(
      route.serviceList('detailProject', custAccntNum, data.projectId),
    );
  };

  const onBottomPage = () => {
    if (list.hasMore) {
      fetchList(false);
    }
  };

  const loading = {
    tableRoot: loadingTable.root,
    tableRow: loadingTable.row,
  };

  return {
    list,
    loading,
    onBottomPage,
    onClickRowTable,
    search,
    setSearch,
    useOrderBy: [orderBy, setOrderBy],
    useOrderDirection: [sort, setSort],
  };
};

export default useActions;
