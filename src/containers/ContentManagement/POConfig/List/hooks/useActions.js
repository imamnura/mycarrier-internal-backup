import { useEffect, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import {
  getListProduct,
  updateProduct,
  getOptionCategory,
} from '../../_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { statusOptions } from '../constant';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useSnackbar } from 'notistack';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { enqueueSnackbar } = useSnackbar();

  const [list, setList] = useState({ data: [], meta: {} });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loadingTable, setLoadingTable] = useState(false);
  // const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [filterStatus, setFilterStatus] = useState({
    value: '',
    label: 'All Status',
  });
  const [filterCategory, setFilterCategory] = useState({
    value: '',
    label: 'All Category',
  });

  const [productCategoryOptions, setProductCategoryOptions] = useState([]);
  const [loadingProductCategory, setLoadingProductCategory] = useState(true);

  const fetchList = async (newPage) => {
    const _params = {
      page: newPage,
      status: filterStatus.value || '',
      category: filterCategory.value || '',
      search,
      size,
    };
    const params = cleanObject(_params);

    const validatePath = router.pathname === route.poConfig('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getListProduct({
          params,
          withCancel: true,
        });
        setList({ data, meta });
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

  const fetchOptionsProductCategory = async () => {
    setLoadingProductCategory(true);
    try {
      const { data } = await getOptionCategory();
      const resOptions = data.map((data) => ({
        label: data?.categoryName,
        value: data?.categoryName,
      }));
      setProductCategoryOptions([
        {
          value: '',
          label: 'All Category',
        },
        ...resOptions,
      ]);
      setLoadingProductCategory(false);
    } catch (error) {
      setProductCategoryOptions([]);
      setLoadingProductCategory(false);
    }
  };

  const fetchUpdate = async ({ productId, isPublish, productName }) => {
    const payload = {
      isPublish: !isPublish,
    };

    // setLoadingUpdate(true);
    try {
      await updateProduct(productId, payload);
      fetchList(page);

      if (!isPublish) {
        enqueueSnackbar(`${productName} is successfully published`);
      } else {
        enqueueSnackbar(`${productName} is successfully unpublished`);
      }
    } catch (error) {
      enqueueSnackbar('Unsuccessfully hide/unhide');
    }
  };

  const fetchDeleteProduct = (id) => async () => {
    setConfirmation();
    setLoadingAlert();

    try {
      await updateProduct(id, null, 'DELETE');
      fetchList(list?.data?.length === 1 && page > 1 ? page - 1 : page);
      setSuccessAlert({ message: 'Product successfully deleted.' });
    } catch (error) {
      setFailedAlert({ message: error?.message || 'Failed to delete product' });
    }
  };

  const onAddProduct = () => {
    if (!isHaveAccess(feature, 'create_product')) {
      router.push({
        pathname: route.poConfig('add'),
      });
    } else {
      setFailedAlert({
        message: "You don't have permission to add product.",
      });
    }
  };

  const onUpdateProduct = (productId) => () => {
    if (!isHaveAccess(feature, 'update_product')) {
      router.push({
        pathname: route.poConfig('edit', productId),
      });
    } else {
      setFailedAlert({
        message: "You don't have permission to update product.",
      });
    }
  };

  const onShowHideProduct = (params) => () => {
    if (!isHaveAccess(feature, 'update_showhide')) {
      fetchUpdate(params);
    } else {
      setFailedAlert({
        message: "You don't have permission to show/hide product",
      });
    }
  };

  const onDeleteProduct = (id) => () => {
    if (!isHaveAccess(feature, 'delete_product')) {
      setConfirmation({
        message: 'Are you sure want to delete this product?',
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

  const onPaginationChange = (props, currentPage) => {
    setPage(currentPage);
  };

  const action = () => {
    let button = [];

    if (!isHaveAccess(feature, 'create_product')) {
      button.push({ children: 'ADD PRODUCT', onClick: onAddProduct });
    }

    return button;
  };

  useEffect(() => {
    if (isHaveAccess(feature, 'view_list_po_config')) {
      fetchList(page);
    } else {
      setFailedAlert({
        message: "You don't have permission to view list PO Config.",
      });
    }
  }, [page, search, filterStatus, filterCategory]);

  useEffect(() => {
    fetchOptionsProductCategory();
  }, []);

  return {
    action,
    filter: {
      status: {
        onChange: setFilterStatus,
        options: statusOptions,
        value: filterStatus,
      },
      category: {
        onChange: setFilterCategory,
        options: productCategoryOptions,
        value: filterCategory,
        isLoading: loadingProductCategory,
      },
    },
    list,
    fetchList,
    loadingTable,
    onAddProduct,
    onDeleteProduct,
    onUpdateProduct,
    onShowHideProduct,
    page,
    search,
    setSearch,
    fetchDeleteProduct, //for testing
    onPaginationChange,
  };
};

export default useActions;
