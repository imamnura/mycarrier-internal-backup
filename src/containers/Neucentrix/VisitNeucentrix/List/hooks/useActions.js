import { useEffect, useState } from 'react';
import { dateFormat } from '@utils/parser';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { cleanObject, isHaveAccess } from '@utils/common';
import { errorTitle } from '@constants/static';
import {
  getListVisitNeucentrix,
  getDropdownOption,
} from '../../../VisitNeucentrix/_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;

  const { setFailedAlert } = usePopupAlert();

  const [list, setList] = useState({ data: [], meta: {}, hasMore: false });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState({});
  const [filterStatus, setFilterStatus] = useState({
    label: 'All Status',
    value: '',
  });
  const [filterVisitDate, setFilterVisitDate] = useState(null);
  const [filterOrderDate, setFilterOrderDate] = useState(null);
  const [filterLocation, setFilterLocation] = useState({
    label: 'All Location',
    value: '',
  });
  const [optionsLocation, setOptionsLocation] = useState([
    { value: '', label: 'All Location' },
  ]);

  const [loadingLocation, setLoadingLocation] = useState(false);
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
      page,
      status: filterStatus.value,
      visitDate: dateFormat({ date: filterVisitDate, type: 'params' }),
      orderDate: dateFormat({ date: filterOrderDate, type: 'params' }),
      location: filterLocation.value,
    };
    const params = cleanObject(_params);

    const validatePath = router.pathname === route.visitNcx('list');

    if (validatePath) {
      try {
        const result = await getListVisitNeucentrix({
          params,
          withCancel: true,
        });
        const { data, meta } = result;
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
        setList(normalize);
        setLoadingTable({
          root: false,
          row: false,
        });
        setPage(page);
      } catch (e) {
        setError({
          description: e?.message,
          message: errorTitle[e?.code],
        });
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

  const fetchLocation = async () => {
    const validatePath = router.pathname === route.visitNcx('list');

    if (validatePath) {
      try {
        setLoadingLocation(true);
        const { data } = await getDropdownOption('location');
        setOptionsLocation(normalizeOptionsLocation(data));
      } catch (e) {
        setOptionsLocation([{ value: '', label: 'All Location' }]);
      } finally {
        setLoadingLocation(false);
      }
    }
  };

  const normalizeOptionsLocation = (data) => {
    let optionsLocation = [{ value: '', label: 'All Location' }];

    data.map((v) => optionsLocation.push({ value: v, label: v }));

    return optionsLocation;
  };

  useEffect(() => {
    if (
      isHaveAccess(feature, 'read_list_visiting_neucentrix') ||
      isHaveAccess(feature, 'read_list_visiting_neucentrix_am')
    ) {
      fetchList({
        page: 1,
      });
    } else {
      setFailedAlert({
        message: "You don't have permission to view this page.",
      });
      setLoadingTable({
        root: false,
        row: false,
      });
      setList({ data: [] });
    }
  }, [search, filterStatus, filterLocation, filterOrderDate, filterVisitDate]);

  useEffect(() => {
    if (
      isHaveAccess(feature, 'read_list_visiting_neucentrix') ||
      isHaveAccess(feature, 'read_list_visiting_neucentrix_am')
    ) {
      fetchLocation();
    }
  }, []);

  useEffect(() => {
    fetchList({ page });
  }, [page]);

  const onBottomPage = () => {
    if (list.hasMore) {
      fetchList();
    }
  };

  const onClickRowTable = async (data) => {
    if (isHaveAccess(feature, 'read_detail_visiting_neucentrix')) {
      router.push(route.visitNcx('detail', data.visitId));
    } else {
      setFailedAlert({
        content: "You don't have permission to view detail.",
        success: false,
      });
    }
  };

  const loading = {
    tableRoot: loadingTable.root,
    tableRow: loadingTable.row,
    loadingLocation: loadingLocation,
  };

  return {
    error,
    feature,
    filterStatus,
    filterVisitDate,
    filterOrderDate,
    filterLocation,
    list,

    loading,
    onBottomPage,
    onClickRowTable,
    search,
    setFilterStatus,
    setFilterVisitDate,
    setFilterOrderDate,
    setFilterLocation,
    setSearch,
    optionsLocation,
    page,
    setPage,
  };
};

export default useActions;
