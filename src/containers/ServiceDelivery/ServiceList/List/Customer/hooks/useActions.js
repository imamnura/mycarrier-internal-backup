import { useEffect, useState } from 'react';
import {
  getListCustomer,
  getListDropdown,
} from '../../../_repositories/repositories';
import { cleanObject, isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { dateFormat } from '@utils/parser';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;

  const [list, setList] = useState({ data: [], meta: {} });

  const { setFailedAlert } = usePopupAlert();

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);

  const [orderBy, setOrderBy] = useState('');
  const [sort, setSort] = useState('asc');
  const [optionsFilterCompany, setOptionsFilterCompany] = useState([
    { value: '', label: 'All Customer' },
  ]);
  const [filterCompany, _setFilterCompany] = useState({
    value: '',
    label: 'All Customer',
  });
  const [filterLastUpdate, _setFilterLastUpdate] = useState(null);

  const [loadingTable, setLoadingTable] = useState(false);

  const setFilterCompany = (val) => {
    setPage(1);
    _setFilterCompany(val);
  };

  const setFilterLastUpdate = (val) => {
    setPage(1);
    _setFilterLastUpdate(val);
  };

  const fetchList = async (newPage) => {
    const _params = {
      size,
      search,
      page: newPage ? newPage : page,
      customer: filterCompany.value,
      lastUpdate: dateFormat({ date: filterLastUpdate, type: 'params' }),
      sort,
    };
  
    const params = cleanObject(_params);

    if (!loadingTable) {
      setLoadingTable(true);

      try {
        const { data, meta } = await getListCustomer({ params });
        const newData = data;
        const normalize = {
          data: [...newData],
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

  const fetchOptionsCompany = async () => {
    try {
      const { data } = await getListDropdown({ type: 'company' });
      const normalizeData = data.map((item) => ({
        value: item.value,
        label: item.name,
      }));
      setOptionsFilterCompany([
        { value: '', label: 'All Customer' },
        ...normalizeData,
      ]);
    } catch (error) {
      setOptionsFilterCompany([]);
    }
  };

  useEffect(() => {
    fetchOptionsCompany();
  }, []);

  useEffect(() => {
    if (isHaveAccess(feature, 'read_list_service_list')) {
      setPage(1);
      fetchList(1);
    } else {
      setFailedAlert({
        message: "You don't have permission to view this page.",
      });
      setLoadingTable(false);
      setList({ data: [] });
    }
  }, [search, filterLastUpdate, filterCompany, orderBy, sort]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onClickRowTable = (data) => {
    if (isHaveAccess(feature, 'read_detail_service_list')) {
      router.push({
        pathname: route.serviceList('detailCustomer', data.custAccntNum),
        query: { tab: 'serviceList' },
      });
    } else {
      setFailedAlert({
        message: "You don't have permission to read detail service list.",
      });
    }
  };

  return {
    filter: {
      company: {
        onChange: setFilterCompany,
        options: optionsFilterCompany,
        value: filterCompany,
      },
      date: {
        onChange: setFilterLastUpdate,
        label: 'Last Update',
        value: filterLastUpdate,
      },
    },
    list,
    page,
    loading: loadingTable,
    onPaginationChange,
    onClickRowTable,
    search,
    setSearch,
    useOrderBy: [orderBy, setOrderBy],
    useOrderDirection: [sort, setSort],
  };
};

export default useActions;
