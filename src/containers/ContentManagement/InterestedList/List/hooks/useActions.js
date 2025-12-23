import { useEffect, useState } from 'react';
import { isHaveAccess, cleanObject } from '@utils/common';
import {
  getList,
  checkScIntegrationStatus,
  getSource,
} from '@containers/ContentManagement/InterestedList/_repositories/repositories';
import moment from 'moment';
import datetime from '@__old/utils/datetime';
import { capitalize } from '@utils/text';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { optionsStatus, optionsStatusByStarclick } from '../constant';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { setFailedAlert } = usePopupAlert();

  const [list, setList] = useState({ data: [], meta: {}, hasMore: false });
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('newest');
  const [orderBy, setOrderBy] = useState('');
  const [search, setSearch] = useState('');
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingFilterSource, setLoadingFilterSource] = useState(false);
  const [modalDownload, _setModalDownload] = useState(false);

  const [filterStatus, _setFilterStatus] = useState({
    label: 'All Status On MyCarrier',
    value: '',
  });
  const [filterStatusByStarclick, _setFilterStatusByStarclick] = useState({
    label: 'All Status By Starclick',
    value: '',
  });
  const [filterSource, _setFilterSource] = useState({
    label: 'All Source',
    value: '',
  });
  const [filterDateRange, _setFilterDateRange] = useState([null, null]);
  const [filterSourceOptions, _setFilterSourceOptions] = useState([]);
  const [scIntegrationStatus, setScIntegrationStatus] = useState(false);
  const [loadingScIntegrationStatus, setLoadingScintegrationStatus] =
    useState(true);

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

  const onClickRefresh = () => {
    _setFilterStatus({ label: 'All Status On MyCarrier', value: '' });
    _setFilterStatusByStarclick({
      label: 'All Status By Starclick',
      value: '',
    });
    _setFilterSource({ label: 'All Source', value: '' });
    _setFilterDateRange([null, null]);
    setOrderBy('');
    setPage(1);
    setSearch('');
    setSort('newest');
  };

  const setFilterSource = (val) => {
    setPage(1);
    _setFilterSource(val);
  };

  const setFilterStatus = (val) => {
    setPage(1);
    _setFilterStatus(val);
  };

  const setFilterStatusByStarclick = (val) => {
    setPage(1);
    _setFilterStatusByStarclick(val);
  };

  const setFilterDateRange = (val) => {
    setPage(1);
    _setFilterDateRange(val);
  };

  const formatPeriod = (val) => {
    return moment(val).format('YYYY-MM-DD');
  };

  const fetchList = async (resetData) => {
    const oldData = resetData ? [] : list.data;

    const payload = {
      page: resetData ? 1 : page,
      search,
      status: filterStatus.value,
      starclickStatus: filterStatusByStarclick.value,
      size,
      sort,
      startDate: filterDateRange[0] && formatPeriod(filterDateRange[0]),
      endDate: filterDateRange[1] && formatPeriod(filterDateRange[1]),
      source: filterSource.value,
    };

    const params = cleanObject(payload);

    const loadings = !loadingTable.root && !loadingTable.row;
    const validatePath = router.pathname === route.interested('list');

    if ((loadings || resetData) && validatePath) {
      if (resetData) setLoadingTable({ root: true });
      else setLoadingTable({ row: true });

      try {
        const { data, meta } = await getList({ params });
        const hasMore = meta.page >= meta.totalPages ? false : true;
        const newData = data || [];
        const normalize = {
          data: [...oldData, ...newData],
          hasMore,
          meta: {
            ...meta,
            totalPage: meta.totalPages,
          },
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
    setPage(1);
    fetchList(true);
  }, [
    search,
    filterStatus,
    filterStatusByStarclick,
    filterSource,
    filterDateRange,
    sort,
    orderBy,
  ]);

  const fetchFilterSourceOptions = async () => {
    setLoadingFilterSource(true);

    try {
      const result = await getSource();
      const reMapData = result.data.map(({ name, value }) => ({
        label: name,
        value: value,
      }));
      _setFilterSourceOptions([
        { label: 'All Source', value: '' },
        ...reMapData,
      ]);
    } catch (error) {
      _setFilterSourceOptions([{ label: 'All Source', value: '' }]);
    } finally {
      setLoadingFilterSource(false);
    }
  };

  const fetchScIntegrationStatus = async () => {
    setLoadingScintegrationStatus(true);
    try {
      const { data } = await checkScIntegrationStatus();

      setScIntegrationStatus(data?.status);
    } catch (err) {
      setFailedAlert({
        message: 'Failed to check sc integration status',
      });
    } finally {
      setLoadingScintegrationStatus(false);
    }
  };

  useEffect(() => {
    fetchScIntegrationStatus();
    fetchFilterSourceOptions();
  }, []);

  const onBottomPage = () => {
    list.hasMore && fetchList(false);
  };

  const statusLabel = capitalize(filterStatus.value) || 'All-Status';
  const today = datetime('', 'today');
  const generateFileName = `${today.format(
    'YYYYMMDDHHmmss',
  )}_${statusLabel}.xlsx`;

  const _filterParams = {
    search,
    status: filterStatus.value,
    starclickStatus: filterStatusByStarclick.value,
    sort,
    startDate: filterDateRange[0] && formatPeriod(filterDateRange[0]),
    endDate: filterDateRange[1] && formatPeriod(filterDateRange[1]),
    source: filterSource.value,
    fileName: generateFileName,
  };

  const filterParams = cleanObject(_filterParams);

  const onClickRowTable = async (data) => {
    if (isHaveAccess(feature, 'read_detail')) {
      router.push(route.interested('detail', data.interestId));
    } else {
      setFailedAlert({
        message: "You don't have permission to read detail interested.",
      });
    }
  };

  const setModalDownload = (v) => _setModalDownload(v);

  return {
    filter: {
      source: {
        onChange: setFilterSource,
        options: filterSourceOptions,
        value: filterSource,
      },
      dateRange: {
        onChange: setFilterDateRange,
        value: filterDateRange,
      },
      status: {
        onChange: setFilterStatus,
        options: optionsStatus,
        value: filterStatus,
      },
      starclickStatus: {
        onChange: setFilterStatusByStarclick,
        options: optionsStatusByStarclick,
        value: filterStatusByStarclick,
      },
    },
    list,
    loading: {
      download: loadingDownload,
      loadingFilterSource: loadingFilterSource,
      tableRoot: loadingTable.root,
      tableRow: loadingTable.row,
    },
    onBottomPage,
    onClickRefresh,
    onClickRowTable,
    orderBy,
    setOrderBy,
    search,
    setSearch,
    sort,
    setSort,
    setModalDownload,
    modalDownload,
    filterParams,
    setLoadingDownload,
    scIntegrationStatus,
    loadingScIntegrationStatus,
    setScIntegrationStatus, //for testing
  };
};

export default useActions;
