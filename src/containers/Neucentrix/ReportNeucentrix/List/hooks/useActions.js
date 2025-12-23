import { useEffect, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import { getListReportNeucentrix } from '../../_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;

  const { setFailedAlert } = usePopupAlert();

  const [list, setList] = useState({ data: [], meta: {}, hasMore: false });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [filterStatus, setFilterStatus] = useState({
    label: 'All Status',
    value: '',
  });

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

  const fetchList = async ({ page }) => {
    const _params = {
      size,
      search,
      sort,
      page,
      status: filterStatus.value,
    };
    const params = cleanObject(_params);

    const normalizeData = (rawData) => {
      const joinCompany = rawData.map((v) => {
        const companyName = v.companyName.join(', ');

        return { ...v, companyName };
      });
      return [...joinCompany];
    };

    try {
      const result = await getListReportNeucentrix({
        params,
        withCancel: true,
      });
      const { data, meta } = result;
      // const hasMore = false;
      const hasMore = meta.page >= meta.totalPages ? false : true;
      const rawData = data || [];
      const normalize = {
        data: normalizeData(rawData),
        hasMore,
        meta: {
          ...meta,
          totalPage: meta.totalPages,
        },
      };

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

  useEffect(() => {
    fetchList({ page: 1 });
  }, [search, filterStatus, sort]);

  useEffect(() => {
    fetchList({ page });
  }, [page]);

  const onBottomPage = () => {
    if (list.hasMore) {
      fetchList(false);
    }
  };

  const onClickRowTable = async (data) => {
    if (isHaveAccess(feature, 'read_detail_report_ncx')) {
      router.push(route.reportNcx('detail', data.reportId));
    } else {
      setFailedAlert({
        content: "You don't have permission to view detail.",
        success: false,
      });
    }
  };

  const onClickUploadReport = () => router.push(route.reportNcx('create'));

  const loading = {
    tableRoot: loadingTable.root,
    tableRow: loadingTable.row,
  };

  return {
    feature,
    filterStatus,
    list,
    loading,
    onBottomPage,
    onClickUploadReport,
    onClickRowTable,
    search,
    setFilterStatus,
    setSearch,
    setSort,
    sort,
    setPage,
    page,
  };
};

export default useActions;
