import { useEffect, useState } from 'react';
import moment from 'moment';
import { cleanObject, isHaveAccess } from '@utils/common';
import { getList, deleteProduct } from '../../_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { statusOptions } from '../constant';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActions = (props) => {
  const router = useRouter();
  const { feature, initialChooseContent } = props;
  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [orderBy, setOrderBy] = useState('');
  const [choosedContent, setChoosedContent] = useState(initialChooseContent);
  const [openDialog, _setOpenDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState({
    value: '',
    label: 'All Status',
  });
  const [filterDateRange, setFilterDateRange] = useState([null, null]);

  const productTypeList = [
    {
      id: 1,
      label: 'Full Product Category',
      desc: 'Can add all page (Level 0 page, Level 1 page, Level 2 category and Product Detail page)',
    },
    {
      id: 2,
      label: 'Half Product Category',
      desc: 'Just add Level 0 & Level 1 page',
    },
    {
      id: 3,
      label: 'Single Product Category',
      desc: 'Only add Level 0 page (this product category only have Level 0 page)',
    },
  ];

  const onAddProduct = () => {
    if (isHaveAccess(feature, 'create_product')) {
      _setOpenDialog(true);
    } else {
      setFailedAlert({
        message: "You don't have permission to add product.",
      });
    }
  };
  const onCloseDialog = () => _setOpenDialog(false);
  const setOpenDialog = (val) => _setOpenDialog(val);

  const fetchList = async (newPage) => {
    const payload = {
      page: newPage ? newPage : page,
      status: filterStatus.value ? filterStatus.value : '',
      startDate: filterDateRange[0]
        ? moment(filterDateRange[0]).format('YYYY-MM-DD')
        : '',
      endDate: filterDateRange[1]
        ? moment(filterDateRange[1]).format('YYYY-MM-DD')
        : '',
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
  }, [search, sort, orderBy, filterStatus, filterDateRange]);

  useEffect(() => {
    fetchList();
  }, [page]);

  useEffect(() => {
    //remove localStorage after add product
    localStorage.removeItem('l0Information');
    localStorage.removeItem('l0Content');
    localStorage.removeItem('l1Information');
    localStorage.removeItem('l1Content');
    localStorage.removeItem('l2Information');
    localStorage.removeItem('l2Content');
  }, []);

  const addProduct = () => {
    if (choosedContent === 1)
      router.push({
        pathname: route.productManage('create'),
        query: { type: 'full' },
      });
    else if (choosedContent === 2)
      router.push({
        pathname: route.productManage('create'),
        query: { type: 'half' },
      });
    else
      router.push({
        pathname: route.productManage('create'),
        query: { type: 'single' },
      });
  };

  const onUpdateProduct = (e, id) => {
    e.stopPropagation();

    if (isHaveAccess(feature, 'update_product')) {
      router.push(route.productManage('detail', id));
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

  const onDeleteProduct = (e, id) => {
    if (isHaveAccess(feature, 'delete_product')) {
      e.stopPropagation();

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

  const onClickRowTable = (data) => {
    router.push(route.productManage('detail', data.catId));
  };

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    filter: {
      status: {
        onChange: setFilterStatus,
        options: statusOptions,
        value: filterStatus,
      },
      dateRange: {
        onChange: setFilterDateRange,
        value: filterDateRange,
      },
    },
    list,
    onAddProduct,
    addProduct,
    onDeleteProduct,
    onUpdateProduct,
    onClickRowTable,
    search,
    setSearch,
    sort,
    setSort,
    orderBy,
    setOrderBy,
    productTypeList,
    setChoosedContent,
    choosedContent,
    onCloseDialog,
    openDialog,
    setOpenDialog,
    fetchDeleteProduct, //for testing
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useActions;
