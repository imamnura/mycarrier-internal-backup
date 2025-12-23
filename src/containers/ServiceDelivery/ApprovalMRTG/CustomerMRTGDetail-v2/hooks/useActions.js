import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetailCustomerMRTG,
  getListMRTGRequest,
} from '../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { optionsFilterStatus } from '../constant';
import { size } from '@fragments/List/List';
import { cleanObject } from '@utils/common';

const useAction = (props) => {
  const { feature } = props;

  const { setFailedAlert } = usePopupAlert();
  const router = useRouter();

  const { id: customerAccountNumber } = router.query;

  const [data, setData] = useState(null);
  const [tab, _setTab] = useState('');

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [filterStatus, _setFilterStatus] = useState({
    value: '',
    label: 'All Status',
  });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const setFilterStatus = (val) => {
    setPage(1);
    _setFilterStatus(val);
  };

  const setTab = (val) => {
    setPage(1);
    setSearch('');
    setFilterStatus({ value: '', label: 'All Status' });
    _setTab(val);
  };

  const fetchDetail = async (id) => {
    const validatePath = router.asPath === route.mrtg('detail', id);

    if (validatePath) {
      setLoading(true);
      try {
        const { data } = await getDetailCustomerMRTG(id);
        setData(data);
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchList = async (newPage, id) => {
    const _params = {
      page: newPage ? newPage : page,
      size,
      search,
      status: filterStatus.value,
      tab: tab,
    };
    const params = cleanObject(_params);

    const validatePath =
      router.asPath === route.mrtg('detail', customerAccountNumber);

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getListMRTGRequest(id, {
          params,
          withCancel: true,
        });
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
    if (customerAccountNumber) {
      if (isHaveAccess(feature, 'read_detail_custMrtg')) {
        fetchDetail(customerAccountNumber);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
      }
    }
  }, [customerAccountNumber]);

  useEffect(() => {
    if (customerAccountNumber) {
      if (
        (tab === 'login-data' &&
          isHaveAccess(feature, 'read_list_login_data')) ||
        (tab === 'request-mrtg' && isHaveAccess(feature, 'read_list_reqMrtg'))
      ) {
        setPage(1);
        fetchList(1, customerAccountNumber);
      }
    }
  }, [customerAccountNumber, tab, filterStatus, search]);

  useEffect(() => {
    fetchList(page, customerAccountNumber);
  }, [page]);

  const onClickRowTable = (data) => {
    if (
      tab === 'login-data' &&
      isHaveAccess(feature, 'read_detail_login_data')
    ) {
      router.push(
        route.mrtg('login-data', customerAccountNumber, data.loginDataId),
      );
    } else if (
      tab === 'request-mrtg' &&
      isHaveAccess(feature, 'read_detail_reqMrtg')
    ) {
      router.push(
        route.mrtg('request-mrtg', customerAccountNumber, data.requestId),
      );
    } else {
      setFailedAlert({
        message: "You don't have permission to read detail.",
      });
    }
  };

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    filter: {
      status: {
        onChange: setFilterStatus,
        options: optionsFilterStatus[tab],
        value: filterStatus,
      },
    },
    list,
    onClickRowTable,
    search,
    setSearch,
    tab,
    setTab,
    customerAccountNumber,
    data,
    loading,
    fetchDetail,
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useAction;
