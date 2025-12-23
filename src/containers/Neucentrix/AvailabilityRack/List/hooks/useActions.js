import { useEffect, useState } from 'react';
import { cleanObject } from '@utils/common';
import {
  getDataAvailabilityRack,
  getListAvailabilityRack,
} from '../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';

const useActions = (props) => {
  const { feature } = props;
  const { setFailedAlert } = usePopupAlert();

  const [list, setList] = useState({ data: [], meta: {}, hasMore: false });
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);
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

  const handleRefresh = () => {
    fetchList(true);
    fetchDetail();
  };

  const onBottomPage = () => {
    if (list.hasMore) {
      fetchList(false);
    }
  };

  const fetchList = async ({ page }) => {
    const _params = {
      size,
      page,
    };

    const params = cleanObject(_params);

    try {
      const { data, meta } = await getListAvailabilityRack({
        params,
        withCancel: true,
      });
      const hasMore = meta.page >= meta.totalPages ? false : true;
      const newData = data || [];
      const normalize = {
        data: [...newData],
        hasMore,
        meta: {
          ...meta,
          totalPage: meta.totalPages,
        },
      };
      // setPage(meta.page + 1);
      setList(normalize);
      setLoadingTable({
        root: false,
        row: false,
      });
      setPage(page);
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
  };

  const fetchDetail = async () => {
    setLoading(true);

    try {
      const result = await getDataAvailabilityRack();
      setData(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isHaveAccess(feature, 'read_availability_rack')) {
      // setPage(1);
      fetchList({ page: 1 });
      fetchDetail();
    } else {
      setFailedAlert({
        message: "You don't have permission to view list.",
      });
      setLoadingTable({
        root: false,
        row: false,
      });
    }
  }, []);

  useEffect(() => {
    fetchList({ page });
  }, [page]);

  return {
    feature,
    data,
    list,
    loading,
    loadingTable,
    handleRefresh,
    onBottomPage,
    setPage,
    page,
  };
};

export default useActions;
