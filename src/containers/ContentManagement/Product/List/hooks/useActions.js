import { useEffect, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import { getList, deleteProduct } from '../../_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [orderBy, setOrderBy] = useState('');

  const onAddProduct = () => {
    if (isHaveAccess(feature, 'create_product')) {
      router.push(route.productManage('create'));
    } else {
      setFailedAlert({
        message: "You don't have permission to add product.",
      });
    }
  };

  const fetchList = async (newPage) => {
    setLoadingTable(true);
    const payload = {
      page: newPage ? newPage : page,
      search,
      size,
      sort,
    };
    const params = cleanObject(payload);

    const validatePath = router.pathname === route.productManage('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getList({ params, withCancel: true });
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
    setPage(1);
    fetchList(1);
  }, [search, sort, orderBy]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onUpdateProduct = (id) => {
    if (isHaveAccess(feature, 'update_product')) {
      router.push(route.productManage('edit', id));
    } else {
      setFailedAlert({
        message: "You don't have permission to update product.",
      });
    }
  };

  const fetchDeleteProduct = (id) => async () => {
    setConfirmation();
    setLoadingAlert();

    try {
      await deleteProduct(id);
      fetchList(1);
      setSuccessAlert({ message: 'Product successfully deleted.' });
    } catch (error) {
      setFailedAlert({ message: error?.message || 'Failed to delete product' });
    }
  };

  const onDeleteProduct = (id) => {
    if (isHaveAccess(feature, 'delete_product')) {
      setConfirmation({
        message: 'Are you sure want to delete this product ?',
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: fetchDeleteProduct(id) },
        ],
      });
    } else {
      setFailedAlert({
        message: "You don't have permission to delete product.",
      });
    }
  };

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    list,
    onAddProduct,
    onDeleteProduct,
    onUpdateProduct,
    search,
    setSearch,
    sort,
    setSort,
    orderBy,
    setOrderBy,
    fetchDeleteProduct, //for testing
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useActions;
