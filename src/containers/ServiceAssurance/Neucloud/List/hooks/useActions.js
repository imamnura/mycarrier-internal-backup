import { useEffect, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import {
  getList,
  downloadData,
  updateTicket,
} from '../../_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { defaultConfirm } from '@constants/dialogDefaultValue';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const [list, setList] = useState({ data: [], meta: {}, hasMore: false });
  const [confirmation, setConfirmation] = useState({
    content: '',
    actions: [],
  });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [filterStatus, setFilterStatus] = useState({
    label: 'All Status',
    value: '',
  });
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingTable, _setLoadingTable] = useState({
    root: true,
    row: false,
  });
  const [openFormTicketNumber, setOpenFormTicketNumber] = useState({
    open: false,
    refId: '',
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
  };

  const fetchList = async (resetData) => {
    const oldData = resetData ? [] : list.data;

    const _params = {
      page: resetData ? 1 : page,
      search,
      size,
      sort,
      status: filterStatus.value,
    };
    const params = cleanObject(_params);

    const loadings = !loadingTable.root && !loadingTable.row;
    const validatePath = router.pathname === route.neucloud('list');

    if ((loadings || resetData) && validatePath) {
      if (resetData) setLoadingTable({ root: true });
      else setLoadingTable({ row: true });

      try {
        const result = await getList({ params, withCancel: true });
        const { data, meta } = result;
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

  const onBottomPage = () => {
    if (list.hasMore) {
      fetchList(false);
    }
  };

  const onClickRowTable = async (data) => {
    if (isHaveAccess(feature, 'read_detail_ticket_neucloud')) {
      router.push(route.neucloud('detail', data.referenceId));
    } else {
      setFailedAlert({
        message: "You don't have permission to view Neucloud Detail.",
      });
    }
  };

  const handleFormTicketNumber = (refId) => {
    if (isHaveAccess(feature, 'update_status_ticket_neucloud')) {
      if (!openFormTicketNumber.open) {
        clearConfirmation();
      }
      setOpenFormTicketNumber({
        open: !openFormTicketNumber.open,
        refId: refId,
      });
    } else {
      setFailedAlert({
        message: "You don't have permission to add ticket number.",
      });
    }
  };

  const clearConfirmation = () => setConfirmation(defaultConfirm);

  const updateTicketNumber = async (values) => {
    setLoadingAlert();
    setOpenFormTicketNumber({ open: false });
    setConfirmation(defaultConfirm);
    try {
      await updateTicket(openFormTicketNumber.refId, {
        ticketId: values.ticketId,
      });
      setSuccessAlert({
        message: 'Data successfully updated.',
        onClose: () => fetchList(true),
      });
    } catch (error) {
      setFailedAlert({
        message: `Failed to update Ticket Number`,
      });
    }
  };

  const onClickDownload = async () => {
    setLoadingDownload(true);
    const _params = {
      search,
      sort,
      status: filterStatus.value,
      page: 1,
      size: list.meta.totalData,
    };
    const params = cleanObject(_params);
    try {
      const result = await downloadData(params);
      if (result.data.url) {
        window.location.href = result.data.url;
        setSuccessAlert({
          message: 'Data successfully downloaded',
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

  const loading = {
    tableRoot: loadingTable.root,
    tableRow: loadingTable.row,
    download: loadingDownload,
  };

  useEffect(() => {
    if (isHaveAccess(feature, 'read_list_ticket_neucloud')) {
      setPage(1);
      fetchList(true);
    } else {
      setFailedAlert({
        message: "You don't have permission to view Neucloud List.",
      });
    }
  }, [search, filterStatus, sort, orderBy]);

  return {
    openFormTicketNumber,
    list,
    loading,
    onBottomPage,
    onClickRowTable,
    handleFormTicketNumber,
    updateTicketNumber,
    clearConfirmation,
    handleRefresh,
    onClickDownload,
    filterStatus,
    setFilterStatus,
    search,
    setSearch,
    confirmation,
    setConfirmation,
    sort,
    setSort,
    orderBy,
    setOrderBy,
  };
};

export default useActions;
