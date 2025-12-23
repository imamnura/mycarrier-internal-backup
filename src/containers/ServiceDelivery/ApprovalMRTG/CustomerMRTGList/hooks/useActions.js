import { useEffect, useState } from 'react';
import { getListCustomerMRTG } from '../../_repositories/repositories';
import { cleanObject, isHaveAccess } from '@utils/common';
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

  const [loadingTable, setLoadingTable] = useState(false);

  const fetchList = async (newPage) => {
    const location = router.pathname;

    const _params = {
      page: newPage ? newPage : page,
      size,
      search,
    };

    const params = cleanObject(_params);

    const validatePath = location === route.mrtg('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);

      try {
        const { data, meta } = await getListCustomerMRTG({
          params,
          withCancel: true,
        });
        const newData = data || [];
        const normalize = {
          data: [...newData],
          meta,
        };
        setList(normalize);
        setLoadingTable(false);
      } catch (error) {
        if (error.code !== 500) {
          setLoadingTable(false);
        }

        setList({
          data: [],
          meta: {},
        });
      }
    }
  };

  useEffect(() => {
    if (isHaveAccess(props.feature, 'read_list_mrtg')) {
      setPage(1);
      fetchList(1);
    } else {
      setFailedAlert({
        message: "You don't have permission to view this page.",
      });
      setLoadingTable(false);
    }
  }, [search]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onClickRowTable = (data) => {
    if (isHaveAccess(feature, 'read_detail_custMrtg')) {
      router.push(route.mrtg('detail', data.customerAccountNumber));
    } else {
      setFailedAlert({
        message: "You don't have permission to read detail customer MRTG.",
      });
    }
  };

  return {
    list,
    page,
    loading: loadingTable,
    onPaginationChange,
    onClickRowTable,
    fetchList,
    search,
    setSearch,
  };
};

export default useActions;
