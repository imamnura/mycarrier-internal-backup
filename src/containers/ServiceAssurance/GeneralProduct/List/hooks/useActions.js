import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { route } from '@configs';
import { isHaveAccess } from '@utils/common';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { size } from '@fragments/List/List';
import { getList, downloadList } from '../../_repositories/repositories';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;

  const [list, setList] = useState({ data: [], meta: {} });

  const { setSuccessAlert, setFailedAlert } = usePopupAlert();

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);

  const [tab, _setTab] = useState('');

  const [filterProgress, _setFilterProgress] = useState({
    value: '',
    label: 'All Progress',
  });
  const [filterStatus, _setFilterStatus] = useState({
    value: '',
    label: 'All Status',
  });
  const [filterDateRange, _setFilterDateRange] = useState([null, null]);

  const [openPreview, setOpenPreview] = useState(false);
  const [evidenceFile, setEvidenceFile] = useState({
    fileUrl: '',
    fileName: '',
  });

  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);

  const setTab = (val) => {
    setPage(1);
    setSearch('');
    _setFilterProgress({ value: '', label: 'All Progress' });
    _setFilterStatus({ value: '', label: 'All Status' });
    _setTab(val);
    _setFilterDateRange([null, null]);
  };

  const onClickRefresh = () => setTab(tab);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onClickRowTable = async (data) => {
    if (
      (tab === 'approval' &&
        isHaveAccess(feature, 'read_detail_ticket_general_product')) ||
      (tab === 'onProgress' &&
        isHaveAccess(
          feature,
          'read_detail_history_ticket_general_product',
        )) ||
      (tab === 'closed' &&
        isHaveAccess(
          feature,
          'read_detail_history_ticket_general_product',
        ))
    ) {
      router.push(route.generalProduct('detail', data.referenceId));
    } else {
      setFailedAlert({
        message: "You don't have permission to view Detail.",
      });
    }
  };

  const fetchListGeneralProduct = async (newPage) => {
    const location = router.pathname;

    const _params = {
      size,
      search,
      page: newPage ? newPage : page,
      status: !filterStatus.value ? tab : filterStatus.value,
      progress: !filterProgress.value ? '' : filterProgress.value,
      startDate: filterDateRange[0]
        ? moment(filterDateRange[0]).format('YYYY-MM-DD')
        : '',
      endDate: filterDateRange[1]
        ? moment(filterDateRange[1]).format('YYYY-MM-DD')
        : '',
    };

    const params = cleanObject(_params);

    const validatePath = location === route.generalProduct('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true)

      try {
        const { data, meta } = await getList(params);
        const normalize = {
          data,
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

  const setFilterProgress = (val) => {
    setPage(1);
    _setFilterProgress(val);
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
      status: tab === 'closed' ? filterStatus.value || tab : tab,
      progress: filterProgress.value,
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
      if (result.data.fileUrlDownload) {
        window.location.href = result.data.fileUrlDownload;
        setSuccessAlert({
          message: 'Detail data successfully downloaded.',
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

  const onClickDownloadEvidence = () => () => {
    window.open(evidenceFile.fileUrl);
  };

  const onClosePreview = () => () => {
    setOpenPreview(false);
  };

  useEffect(() => {
    fetchListGeneralProduct();
  }, [
    filterStatus,
    filterProgress,
    filterDateRange,
    search,
    tab,
    page,
  ]);

  return {
    list,
    page,
    loading: {
      download: loadingDownload,
      table: loadingTable,
    },
    onPaginationChange,
    onClickRefresh,
    onClosePreview,
    onClickRowTable,
    onClickDownload,
    onClickDownloadEvidence,
    filterProgress,
    filterStatus,
    filterDateRange,
    openPreview,
    evidenceFile,
    search,
    setFilterProgress,
    setFilterStatus,
    setFilterDateRange,
    setOpenPreview,
    setEvidenceFile,
    setSearch,
    setTab,
    tab,
  };
};

export default useActions;
