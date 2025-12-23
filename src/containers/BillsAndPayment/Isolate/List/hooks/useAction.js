import { useEffect, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import {
  getListIsolate,
  getOptionProduct,
} from '../../_repositories/repositories';
import { route } from '@configs';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import useQueryParams from '@utils/hooks/useQueryParams';
import { size } from '@fragments/List/List';

const useAction = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { setFailedAlert } = usePopupAlert();
  const { queryParams, setQueryParams } = useQueryParams();

  const [list, setList] = useState({ data: [], meta: {}, hasMore: false });

  const [page, setPage] = useState(1);

  const search = queryParams?.search || '';
  const setSearch = (search) => setQueryParams({ search });

  const filterProduct = queryParams?.product || '';
  const setFilterProduct = ({ value: product }) => setQueryParams({ product });

  const [loadingTable, setLoadingTable] = useState(false);

  const fetchList = async (resetData) => {
    const location = router.pathname;

    const _params = {
      page: resetData ? 1 : page,
      product: filterProduct,
      search,
      size,
    };

    const params = cleanObject(_params);

    const validatePath = location === route.isolate('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);

      try {
        const result = await getListIsolate({ params, withCancel: true });
        const { data, meta } = result;
        const normalize = {
          data,
          meta,
        };
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

  const [optionFilterProduct, setOptionFilterProduct] = useState([]);

  const fetchOptionFilterProduct = async () => {
    try {
      const result = await getOptionProduct();
      setOptionFilterProduct(
        result.data.map((product) => ({ value: product, label: product })),
      );
    } catch (error) {
      setOptionFilterProduct([]);
    }
  };

  useEffect(() => {
    fetchOptionFilterProduct();
  }, []);

  useEffect(() => {
    if (isHaveAccess(feature, 'read_list_isolate_cdm')) {
      setPage(1);
      fetchList(true);
    } else {
      setFailedAlert({
        message: "You don't have permission to view list.",
      });
      setLoadingTable(false);
      setList({
        data: [],
        meta: {},
      });
    }
  }, [search, filterProduct]);

  useEffect(() => {
    // fetchList(false);
    if (isHaveAccess(feature, 'read_list_isolate_cdm')) {
      fetchList(false);
    } else {
      setFailedAlert({
        message: "You don't have permission to view list.",
      });
      setLoadingTable(false);
      setList({
        data: [],
        meta: {},
      });
    }
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onClickRowTable = isHaveAccess(feature, 'read_detail_isolate_cdm')
    ? async (data) => router.push(`${route.isolate('detail', data.id)}`)
    : undefined;

  return {
    filterProduct,
    list,
    page,
    loadingTable,
    onPaginationChange,
    onClickRowTable,
    optionFilterProduct,
    search,
    setFilterProduct,
    setSearch,
  };
};

export default useAction;
