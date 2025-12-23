import { useEffect, useState } from 'react';
import { isHaveAccess } from '@utils/common';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { optionsEventsStatus, optionsContentStatus } from '../constant';
import { useRouter } from 'next/router';
import {
  getList,
  deleteEvent,
} from '@containers/ContentManagement/Events/_repositories/repositories';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { dateFormat } from '@utils/parser';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [search, setSearch] = useState('');

  const [filterEventsStatus, _setFilterEventsStatus] = useState({
    label: 'All Event Status',
    value: '',
  });
  const [filterContentStatus, _setContentStatus] = useState({
    label: 'All Content Status',
    value: '',
  });
  const [filterDateRange, _setFilterDateRange] = useState([null, null]);

  const setFilterEventsStatus = (val) => {
    setPage(1);
    _setFilterEventsStatus(val);
  };

  const setFilterContentStatus = (val) => {
    setPage(1);
    _setContentStatus(val);
  };

  const setFilterDateRange = (val) => {
    setPage(1);
    _setFilterDateRange(val);
  };

  const fetchList = async (newPage) => {
    let payload = {
      page: newPage ? newPage : page,
      search,
      size,
      sort,
      startDate:
        filterDateRange[0] &&
        dateFormat({ date: filterDateRange[0], type: 'params' }),
      endDate:
        filterDateRange[1] &&
        dateFormat({ date: filterDateRange[1], type: 'params' }),
      type: 'event',
      status: filterEventsStatus.value,
      contentStatus: filterContentStatus.value,
    };

    const params = cleanObject(payload);

    const validatePath = router.pathname === route.events('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getList({ params, withCancel: true });
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
    setPage(1);
    fetchList(1);
  }, [
    search,
    filterEventsStatus,
    filterDateRange,
    sort,
    orderBy,
    filterContentStatus,
  ]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onUpdateEvents = (e, id) => {
    if (isHaveAccess(feature, 'update_event')) {
      e.stopPropagation();
      router.push(route.events('edit', id));
    } else {
      setFailedAlert({
        message: `You don't have permission to update event.`,
      });
    }
  };

  const handleDeleteEvents = (eventId) => async () => {
    setConfirmation();
    setLoadingAlert();

    try {
      await deleteEvent(eventId);
      setSuccessAlert({ message: 'Events successfully deleted.' });
      fetchList(1);
    } catch (error) {
      setFailedAlert({
        message: error?.message || 'Failed to delete event',
      });
    }
  };

  const confirmDeleteEvents = (e, eventId) => {
    if (isHaveAccess(feature, 'delete_event')) {
      e.stopPropagation();
      setConfirmation({
        message: 'Are you sure want to delete this event?',
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: handleDeleteEvents(eventId) },
        ],
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to delete event.`,
      });
    }
  };

  const addEvents = () => {
    router.push(route.events('create'));
  };

  const onClickRowTable = (data) => {
    router.push(route.events('detail', data.id));
  };

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    filter: {
      dateRange: {
        onChange: setFilterDateRange,
        value: filterDateRange,
      },
      eventsStatus: {
        onChange: setFilterEventsStatus,
        options: optionsEventsStatus,
        value: filterEventsStatus,
      },
      contentStatus: {
        onChange: setFilterContentStatus,
        options: optionsContentStatus,
        value: filterContentStatus,
      },
    },
    list,
    onClickRowTable,
    onUpdateEvents,
    confirmDeleteEvents,
    addEvents,
    search,
    setSearch,
    sort,
    setSort,
    orderBy,
    setOrderBy,
    handleDeleteEvents, //for testing
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useActions;
