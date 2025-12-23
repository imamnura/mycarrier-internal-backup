import {
  getDownloadListInvoiceSummary,
  getDownloadSummaryReminderLetter,
  getDownloadSummaryThanksLetter,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useEffect, useState } from 'react';

const useAction = (props) => {
  const [filterStatus, setFilterStatus] = useState({
    value: '',
    label: 'All Status',
  });
  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);
  const [list, setList] = useState({ data: [], meta: {}, hasMore: false });

  const [loadingTable, setLoadingTable] = useState(true);

  const fetchList = async (resetData) => {
    const _params = {
      size: 10,
      search,
      page: resetData ? 1 : page,
      ...props?.staticFilter,
      status: props?.staticFilter.status || filterStatus.value,
    };
    const params = cleanObject(_params);
    setLoadingTable(true);

    try {
      const result = await props.api({ params, withCancel: true });
      const { data, meta = {} } = result;
      const newData = data || [];
      const normalize = {
        data: newData,
        meta: { ...meta, updatedOn: meta.latestUpdate },
      };
      setList(normalize);
    } catch (error) {
      setList({
        data: [],
        meta: {},
      });
    } finally {
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchList(true);
  }, [search, filterStatus]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();

  const onDownload = async () => {
    setLoadingAlert();

    const _params = {
      search,
      ...props?.staticFilter,
      status: props?.staticFilter.status || filterStatus.value,
    };

    const params = cleanObject(_params);

    const repo = {
      invoice: getDownloadListInvoiceSummary,
      billingReminder: getDownloadSummaryReminderLetter,
      thanksLetter: getDownloadSummaryThanksLetter,
    }[props.type];

    try {
      const result = await repo({ params });
      window.open(result.data.fileUrlDownload);
      setSuccessAlert({
        message: 'File successfully downloaded',
      });
    } catch (error) {
      setFailedAlert({
        message: error.message || 'File failed to download',
      });
    }
  };

  return {
    filterStatus,
    search,
    setFilterStatus,
    setSearch,
    onPaginationChange,
    page,
    list,
    onDownload,
    loadingTable,
  };
};

export default useAction;
