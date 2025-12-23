import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { isHaveAccess } from '@utils/common';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { getList, downloadList } from '../../_repositories/repositories';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;

  const [list, setList] = useState({ data: [], meta: {} });

  const { setSuccessAlert, setFailedAlert } = usePopupAlert();

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);

  const [tab, _setTab] = useState('');
  const tabStatus = tab === 'approval' ? 'all-onprogress' : 'done';

  const [filterStatus, _setFilterStatus] = useState({
    value: '',
    label: 'All Status',
  });
  const [filterDateRange, _setFilterDateRange] = useState([null, null]);

  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const setTab = (val) => {
    setPage(1);
    setSearch('');
    _setFilterStatus({ value: '', label: 'All Status' });
    _setTab(val);
    _setFilterDateRange([null, null]);
  };

  const onClickRefresh = () => setTab(tab);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onClickRowTable = async (data) => {
    if (
      (tab === 'approval' &&
        isHaveAccess(feature, 'read_detail_ticket_gameqoo')) ||
      (tab === 'history' &&
        isHaveAccess(feature, 'read_detail_history_ticket_gameqoo'))
    ) {
      router.push(route.gameqoo('detail', data.referenceId));
    } else {
      setFailedAlert({
        message: "You don't have permission to view Detail.",
      });
    }
  };

  const fetchListGameqoo = async () => {
    const location = router.pathname;

    const _params = {
      size,
      search,
      page,
      status: !filterStatus.value ? tabStatus : filterStatus.value,
      startDate: filterDateRange[0]
        ? moment(filterDateRange[0]).format('YYYY-MM-DD')
        : '',
      endDate: filterDateRange[1]
        ? moment(filterDateRange[1]).format('YYYY-MM-DD')
        : '',
    };

    const params = cleanObject(_params);

    const validatePath = location === route.gameqoo('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);

      try {
        const result = await getList(params);
        const { data, meta } = result;
        const normalize = {
          data,
          meta,
        };
        setList(normalize);
        setLoadingTable(false);
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

  const setFilterStatus = (val) => {
    setPage(1);
    _setFilterStatus(val);
  };

  const setFilterDateRange = (val) => {
    setPage(1);
    _setFilterDateRange(val);
  };

  const onClickDownload = async () => {
    setLoadingDownload(true);
    const _params = {
      status: tab === 'approval' ? 1 : filterStatus.value || 2,
      startDate: filterDateRange[0]
        ? moment(filterDateRange[0]).format('YYYY-MM-DD')
        : '',
      endDate: filterDateRange[1]
        ? moment(filterDateRange[1]).format('YYYY-MM-DD')
        : '',
      search,
    };
    const params = cleanObject(_params);

    try {
      const result = await downloadList(params);
      if (result.data.fileUrl) {
        window.location.href = result.data.fileUrl;
        setSuccessAlert({
          message: 'File successfully downloaded',
        });
      }
      setLoadingDownload(false);
    } catch (error) {
      setFailedAlert({
        message: error.message,
      });
      setLoadingDownload(false);
    }
  };

  useEffect(() => {
    fetchListGameqoo();
  }, [filterStatus, filterDateRange, search, tab, page]);

  return {
    list,
    loading: {
      download: loadingDownload,
      table: loadingTable,
    },
    onPaginationChange,
    onClickDownload,
    onClickRefresh,
    onClickRowTable,
    filterStatus,
    filterDateRange,
    search,
    setFilterStatus,
    setFilterDateRange,
    setSearch,
    setTab,
    tab,
  };
};

export default useActions;
