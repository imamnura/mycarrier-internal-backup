import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetailCustomer,
  getListRequest,
} from '../../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { cleanObject } from '@utils/common';

const useAction = (props) => {
  const { feature } = props;

  const { setFailedAlert } = usePopupAlert();
  const router = useRouter();

  const { id: custAccntNum } = router.query;

  const [data, setData] = useState(null);
  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [filterStatus, setFilterStatus] = useState({
    label: 'All Status',
    value: '',
  });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDetail = async (id) => {
    const validatePath =
      router.asPath === route.ipPrefix('request', custAccntNum);

    if (validatePath) {
      setLoading(true);
      try {
        const { data } = await getDetailCustomer(id);
        setData(data);
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchList = async (newPage) => {
    const _params = {
      page: newPage ? newPage : page,
      status: filterStatus.value,
      size,
      search,
    };
    const params = cleanObject(_params);

    const validatePath =
      router.asPath === route.ipPrefix('request', custAccntNum);

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getListRequest(custAccntNum, {
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

  const onClickRowTable = (dataList) => {
    if (isHaveAccess(feature, 'read_detail_ip_prefix')) {
      router.push(
        route.ipPrefix(
          'detail-request',
          data?.custAccntNum,
          dataList?.requestId,
        ),
      );
    } else {
      setFailedAlert({
        message: "You don't have permission to read detail request IP Prefix.",
      });
    }
  };

  useEffect(() => {
    if (custAccntNum) {
      if (isHaveAccess(feature, 'read_detail_customer_ip_prefix')) {
        fetchDetail(custAccntNum);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
        setLoading(false);
        setLoadingTable(false);
      }
    }
  }, [custAccntNum]);

  useEffect(() => {
    if (
      custAccntNum &&
      isHaveAccess(feature, 'read_detail_customer_ip_prefix')
    ) {
      setPage(1);
      fetchList(1);
    }
  }, [custAccntNum, search, filterStatus]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    data,
    filterStatus,
    setFilterStatus,
    list,
    loading,
    onClickRowTable,
    search,
    setSearch,
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useAction;
