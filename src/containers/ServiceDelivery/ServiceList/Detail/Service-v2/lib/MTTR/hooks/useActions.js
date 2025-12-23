import { useState, useEffect } from 'react';
import { cleanObject } from '@utils/common';
import { getListMTTR } from '@containers/ServiceDelivery/ServiceList/_repositories/repositories';

const useActions = (props) => {
  const { data, search } = props;

  const [list, setList] = useState({ data: [], meta: {} });
  const [page, setPage] = useState(1);

  const [loadingTable, setLoadingTable] = useState(false);

  const fetchList = async (newPage) => {
    const _params = {
      size: 5,
      search,
      page: newPage ? newPage : page,
    };

    const params = cleanObject(_params);

    if (!loadingTable) {
      setLoadingTable(true);

      try {
        const res = await getListMTTR(data?.serviceId, params);
        if (res?.data) {
          setList({
            data: res?.data,
            meta: res?.meta,
          });
        }
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
    if (!!data?.custAccntNum && !!data?.sid) {
      setPage(1);
      fetchList(1);
    }
  }, [search, data]);

  const onPaginationChange = (props, currentPage) => {
    setPage(currentPage);
    fetchList();
  };

  return {
    list,
    loading: {
      root: loadingTable,
    },
    page,
    onPaginationChange,
  };
};

export default useActions;
