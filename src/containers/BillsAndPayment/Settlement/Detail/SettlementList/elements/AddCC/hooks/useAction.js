import {
  postAddCC,
  getListEmployeeCC,
} from '@containers/BillsAndPayment/Settlement/_repositories/repositories';
import { size } from '@fragments/List/List';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useAction = ({
  open,
  onClose,
  initialCCType,
  recepientCC,
  setRecepientCC,
  ...rest
}) => {
  const { initialSelectedEmployee } = rest;
  const router = useRouter();

  const settlementId = router.query.id;

  const [selectedEmployee, setSelectedEmployee] = useState(
    initialSelectedEmployee || {},
  );
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const { ..._selectedEmployee } = selectedEmployee;
    if (
      recepientCC?.includes(`Sdr. ${_selectedEmployee?.name?.toUpperCase()}`) ||
      recepientCC?.includes(`Sdr. ${_selectedEmployee?.title?.toUpperCase()}`)
    ) {
      setCCType(null);
      setType(null);
      onClose();
      return;
    }
    setLoading(true);
    delete _selectedEmployee.hierarchy;

    const payload = {
      settlementId,
      ..._selectedEmployee,
    };
    try {
      const result = await postAddCC(payload);
      if (result.success) {
        setRecepientCC(result.data);
        setLoading(false);
        setCCType(null);
        setType(null);
        onClose();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const [search, setSearch] = useState('');

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

  const fetchListEmployee = async (resetData) => {
    const oldData = resetData ? [] : list.data;
    const loadings = !loadingTable.root && !loadingTable.row;
    const params = {
      page: resetData ? 1 : page,
      size,
      search,
      type: ccType == 1 ? 'title' : 'name',
    };
    if (loadings || resetData) {
      if (resetData) setLoadingTable({ root: true });
      else setLoadingTable({ row: true });

      try {
        const result = await getListEmployeeCC({ params, withCancel: true });
        const { data, meta } = result || {};
        const hasMore = meta?.page >= meta?.totalPage ? false : true;
        const newData = data || [];
        const normalize = {
          data: [...oldData, ...newData],
          hasMore,
          meta: meta,
        };
        setPage(meta?.page + 1);
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
      }
    }
  };

  const [type, setType] = useState('');
  const [ccType, setCCType] = useState(initialCCType || '');

  const onSubmitType = () => {
    setCCType(type);
  };

  const onCancel = () => {
    if (ccType) {
      setType(null);
      setCCType(null);
    } else {
      onClose();
      setType(null);
      setCCType(null);
    }
  };

  useEffect(() => {
    setList({ data: [], meta: {}, hasMore: false });
    setSearch('');
    setSelectedEmployee({});

    if (ccType) {
      setPage(1);
      fetchListEmployee(true);
    }
  }, [settlementId, ccType]);

  useEffect(() => {
    if (ccType) {
      fetchListEmployee(true);
    }
  }, [search]);

  const onBottomPage = () => {
    if (list.hasMore) {
      fetchListEmployee(false);
    }
  };

  const onScrollList = ({ target }) => {
    const { scrollTop, scrollHeight, clientHeight } = target;
    const scroll = scrollHeight - clientHeight - scrollTop <= 40;

    if (scroll) {
      onBottomPage();
    }
  };

  return {
    ccType,
    onCancel,
    onSubmit,
    onSubmitType,
    open,
    setType,
    type,
    // listEmployee,
    list,
    search,
    setSearch,
    loadingTable,
    selectedEmployee,
    setSelectedEmployee,
    loading,
    onScrollList,
  };
};

export default useAction;
