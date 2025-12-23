import { useEffect, useState } from 'react';
import moment from 'moment';
import { cleanObject, isHaveAccess } from '@utils/common';
import {
  getFilterCompanyOptions,
  getListBakes,
} from '../../_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;

  const [list, setList] = useState({ data: [], meta: {} });

  const { setFailedAlert } = usePopupAlert();

  const [search, setSearch] = useState('');
  
  const [page, setPage] = useState(1);

  const manager = isHaveAccess(feature, 'read_bakes_approve');
  const [filterStatus, setFilterStatus] = useState({
    label: 'All Status',
    value: '',
  });
  const [filterCompany, setFilterCompany] = useState({
    label: 'All Company',
    value: '',
  });
  const [filterPeriod, setFilterPeriod] = useState([null, null]);
  const [filterCompanyOptions, setFilterCompanyOptions] = useState([]);

  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingFilterCompany, setLoadingFilterCompany] = useState(true);

  const formatPeriod = (val) => {
    return val && moment(val).format('YYYY-MM-DD');
  };

  const fetchList = async (newPage) => {
    const location = router.pathname;

    const _params = {
      size,
      search,
      page: newPage ? newPage : page,
      status: filterStatus.value,
      company: filterCompany.value,
      type: manager ? 'gm' : '',
      startDate: formatPeriod(filterPeriod[0]),
      endDate: formatPeriod(filterPeriod[1]),
    };

    const params = cleanObject(_params);

    const validatePath = location === route.bakes('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);

      try {
        const { data, meta } = await getListBakes({ params, withCancel: true });
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

  useEffect(() => {
    setPage(1);
    fetchList(1);
  }, [search, filterStatus, filterCompany, filterPeriod]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const fetchFilterCompanyOptions = async () => {
    setLoadingFilterCompany(true);

    const params = {
      search: '',
    };

    try {
      const result = await getFilterCompanyOptions({ params });
      const options = result.data.map((companyName) => ({
        value: companyName,
        label: companyName,
      }));
      setFilterCompanyOptions([
        { value: '', label: 'All Company' },
        ...options,
      ]);
      setLoadingFilterCompany(false);
    } catch (error) {
      setFilterCompanyOptions([{ value: '', label: 'All Company' }]);
      setLoadingFilterCompany(false);
    }
  };

  useEffect(() => {
    fetchFilterCompanyOptions();
  }, []);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onClickRowTable = async (data) => {
    if (data.status === 'draft') {
      if (isHaveAccess(feature, 'update_draft')) {
        router.push(route.bakes('create', data.bakesId));
      } else {
        setFailedAlert({
          message: "You don't have permission to edit draft.",
        });
      }
    } else {
      if (isHaveAccess(feature, 'read_detail')) {
        router.push(route.bakes('detail', data.bakesId));
      } else {
        setFailedAlert({
          message: "You don't have permission to view detail.",
        });
      }
    }
  };

  const onClickNewBakes = () => router.push('/bakes/create');

  const loading = {
    filterCompany: loadingFilterCompany,
    table: loadingTable
  };

  return {
    feature,
    filterCompany,
    filterCompanyOptions,
    filterPeriod,
    filterStatus,
    list,
    page,
    loading,
    manager,
    onPaginationChange,
    onClickNewBakes,
    onClickRowTable,
    search,
    setFilterCompany,
    setFilterPeriod,
    setFilterStatus,
    setSearch,
  };
};

export default useActions;
