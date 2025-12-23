import { useEffect, useState } from 'react';
import { cleanObject } from '@__old/utils/common';
import {
  getVisitHistoryList,
  getDropdownOption,
} from '../../_repositories/repositories';
import { route } from '@configs';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { id: visitId } = router.query;

  const [list, setList] = useState({ data: {}, meta: {} });
  const [search, setSearch] = useState('');
  const [filterVisitor, setFilterVisitor] = useState({
    label: 'All Name',
    value: '',
  });
  const [optionsVisitor, setOptionsVisitor] = useState([
    { value: '', label: 'All Name' },
  ]);

  const [isLoadingVisitor, setLoadingVisitor] = useState(false);
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

  const fetchList = async (id) => {
    const _params = {
      visitor: filterVisitor.value,
      search: search,
    };
    const params = cleanObject(_params);

    const loadings = !loadingTable.root && !loadingTable.row;
    const validatePath = router.asPath === route.visitNcx('history', id);

    if ((loadings || true) && validatePath) {
      setLoadingTable({ root: true });

      try {
        const result = await getVisitHistoryList(visitId, { params });
        const { data, meta } = result;
        const normalize = {
          ...data,
          meta: {
            page: 1,
            size: meta.filteredData,
            totalData: meta.totalData,
          },
        };
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
          data: {},
          hasMore: false,
          meta: {},
        });
      }
    }
  };

  const fetchVisitor = async (visitId) => {
    const validatePath = router.asPath === route.visitNcx('history', visitId);

    if (validatePath) {
      try {
        setLoadingVisitor(true);
        const { data } = await getDropdownOption('visitors', visitId);
        setOptionsVisitor(normalizeOptionsVisitor(data));
      } catch (e) {
        setOptionsVisitor([]);
      } finally {
        setLoadingVisitor(false);
      }
    }
  };

  const normalizeOptionsVisitor = (data) => {
    let optionsVisitor = [{ value: '', label: 'All Name' }];

    data.map((v) => optionsVisitor.push({ value: v, label: v }));

    return optionsVisitor;
  };

  useEffect(() => {
    fetchList(visitId);
    fetchVisitor(visitId);
  }, [visitId, search, filterVisitor]);

  const loading = {
    tableRoot: loadingTable.root,
    tableRow: loadingTable.row,
  };

  return {
    visitId,
    feature,
    filterVisitor,
    list,
    loading,
    search,
    setFilterVisitor,
    setSearch,
    optionsVisitor,
    isLoadingVisitor,
  };
};

export default useActions;
