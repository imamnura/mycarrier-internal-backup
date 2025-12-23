import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetailRequestMRTG,
  getListMRTGService,
} from '../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { cleanObject } from '@utils/common';

const useAction = (props) => {
  const { feature } = props;

  const { setFailedAlert } = usePopupAlert();
  const router = useRouter();

  const { id: customerAccountNumber, params: requestId } = router.query;

  const [data, setData] = useState(null);
  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async (id) => {
    const validatePath =
      router.asPath ===
      route.mrtg('request-mrtg', customerAccountNumber, requestId);

    if (validatePath) {
      setLoading(true);
      try {
        const { data } = await getDetailRequestMRTG(id);
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
    };
    const params = cleanObject(_params);

    const validatePath =
      router.asPath ===
      route.mrtg('request-mrtg', customerAccountNumber, requestId);

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const result = await getListMRTGService(id, {
          params,
          withCancel: true,
        });

        const { data, meta } = result;
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
    if (requestId) {
      fetchList(false, requestId);
    }
  }, [page]);

  useEffect(() => {
    if (customerAccountNumber && requestId) {
      if (isHaveAccess(feature, 'read_detail_reqMrtg')) {
        fetchDetail(requestId);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
      }
    }
  }, [customerAccountNumber, requestId]);

  useEffect(() => {
    if (customerAccountNumber && requestId) {
      if (isHaveAccess(feature, 'read_list_service')) {
        setPage(1);
        fetchList(1, requestId);
      }
    }
  }, [customerAccountNumber, requestId, search]);

  const action = () => {
    let actions = [];

    if (data?.status === 'CUSTOMER REQUEST') {
      if (isHaveAccess(feature, 'update_login_data')) {
        actions.push({
          children: 'integrate',
          onClick: () =>
            setModalUpdateStatus({
              caption:
                'Once you approved this, it will be process and data will be sent to customer automatically.',
              confirmation: 'Are you sure this system has been integrated?',
              success: 'System successfully integrated',
              title: 'Please give note of integrate',
              updateTo: 'integrated',
            }),
        });
      }
    }

    return actions;
  };

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    action,
    list,
    search,
    setSearch,
    customerAccountNumber,
    requestId,
    data,
    loading,
    fetchDetail,
    modalUpdateStatus,
    setModalUpdateStatus,
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useAction;
