import { cleanObject } from '@utils/common';
import { useEffect, useState } from 'react';
import { getNpsList } from '../../_repositories/repositories';

const useListRespondent = ({ popupParam, journey, onClose, filters }) => {
  const [list, setList] = useState({ data: [], meta: {}, hasMore: false });
  const [page, setPage] = useState(1);
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

  const { category, status } = popupParam || {};

  const title = (category || status || '').toUpperCase();

  const fetchList = async (resetData) => {
    const oldData = resetData ? [] : list.data;
    const loadings = !loadingTable.root && !loadingTable.row;
    const _params = {
      ...filters,
      page: resetData ? 1 : page,
      size: 10,
      journey,
      category: category == 'detractors' ? 'detractor' : category,
      status,
    };

    const params = cleanObject(_params);

    if (loadings || resetData) {
      if (resetData) setLoadingTable({ root: true });
      else setLoadingTable({ row: true });
      try {
        const result = await getNpsList(params);
        const { data, meta } = result;
        const hasMore = meta?.page >= meta?.totalPage ? false : true;
        const newData = data || [];
        const normalize = {
          data: [...oldData, ...newData],
          hasMore,
          meta: {
            ...meta,
            totalPage: meta.totalPages || meta.totalPage,
          },
        };
        setPage(meta?.page + 1);
        setList(normalize);
      } catch (error) {
        setList({
          data: [],
          meta: {},
        });
      } finally {
        setLoadingTable({
          root: false,
          row: false,
        });
      }
    }
  };

  useEffect(() => {
    if (popupParam) {
      setPage(1);
      fetchList(true);
    }
    return () => {
      setList({ data: [], meta: {}, hasMore: false });
      setLoadingTable({
        root: true,
        row: false,
      });
    };
  }, [popupParam]);

  const onBottomPage = () => {
    if (list.hasMore) {
      fetchList(false);
    }
  };

  return {
    category,
    list,
    onClose,
    page,
    status,
    title: { NEEDVALIDATION: 'NEED VALIDATION' }[title] || title,
    loadingTable,
    onBottomPage,
    popupParam,
  };
};

export default useListRespondent;
