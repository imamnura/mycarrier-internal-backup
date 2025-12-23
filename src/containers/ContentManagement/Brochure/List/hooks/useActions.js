import { useEffect, useState } from 'react';
import { isHaveAccess } from '@utils/common';
import { getList, getProduct } from '../../_repositories/repositories';
import moment from 'moment';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { optionsTypeOfLogin, optionsNewsletterStatus } from '../constant';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { setFailedAlert } = usePopupAlert();

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('newest');
  const [orderBy, setOrderBy] = useState('');
  const [search, setSearch] = useState('');

  const [filterProduct, _setFilterProduct] = useState({
    label: 'All Product',
    value: '',
  });
  const [filterTypeLogin, _setFilterTypeLogin] = useState({
    label: 'All Type of Login',
    value: '',
  });
  const [filterNewsletterStatus, _setFilterNewsletetrStatus] = useState({
    label: 'All Newsletter Status',
    value: '',
  });
  const [filterDateDownload, _setFilterDateDownload] = useState([null, null]);
  const [productList, setProductList] = useState([null, null]);

  const [loadingFilterProduct, setLoadingFilterProduct] = useState(false);

  const setFilterTypeLogin = (val) => {
    setPage(1);
    _setFilterTypeLogin(val);
  };

  const setFilterNewsletetrStatus = (val) => {
    setPage(1);
    _setFilterNewsletetrStatus(val);
  };

  const setFilterProduct = (val) => {
    setPage(1);
    _setFilterProduct(val);
  };

  const setFilterDatePick = (val) => {
    setPage(1);
    _setFilterDateDownload(val);
  };

  const formatPeriod = (val) => {
    return moment(val).format('YYYY-MM-DD');
  };

  const fetchFilterProductOptions = async () => {
    setLoadingFilterProduct(true);

    try {
      const result = await getProduct();
      const reMapData = result.data.map(({ name }) => ({
        label: name,
        value: name,
      }));
      setProductList([{ label: 'All Product', value: '' }, ...reMapData]);
    } catch (error) {
      setProductList([{ label: 'All Product', value: '' }]);
    } finally {
      setLoadingFilterProduct(false);
    }
  };

  const fetchList = async (newPage) => {
    const payload = {
      page: newPage ? newPage : page,
      startDate: filterDateDownload[0]
        ? formatPeriod(filterDateDownload[0])
        : '',
      endDate: filterDateDownload[1] ? formatPeriod(filterDateDownload[1]) : '',
      afterLogin: filterTypeLogin.value,
      allowNewsLetter: filterNewsletterStatus.value,
      productName: filterProduct.value,
      search,
      size,
    };

    const params = cleanObject(payload);

    const validatePath = router.pathname === route.userDownloadBrochure('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getList({ params });
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

  const onClickRefresh = () => {
    _setFilterProduct({ label: 'All Product', value: '' });
    _setFilterTypeLogin({ label: 'All Type of Login', value: '' });
    _setFilterNewsletetrStatus({ label: 'All Newsletter Status', value: '' });
    _setFilterDateDownload([null, null]);
    setOrderBy('');
    setPage(1);
    setSearch('');
    setSort('newest');
  };

  useEffect(() => {
    fetchFilterProductOptions();
  }, []);

  useEffect(() => {
    setPage(1);
    fetchList(1);
  }, [
    search,
    sort,
    orderBy,
    filterTypeLogin,
    filterNewsletterStatus,
    filterDateDownload,
    filterProduct,
  ]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onClickRowTable = async (data) => {
    if (isHaveAccess(feature, 'read_detail_user_downloaded_brochure')) {
      router.push(
        route.userDownloadBrochure('detail', data.brochureDownloadId),
      );
    } else {
      setFailedAlert({
        message: "You don't have permission to view Detail.",
      });
    }
  };

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    filter: {
      loginType: {
        onChange: setFilterTypeLogin,
        options: optionsTypeOfLogin,
        value: filterTypeLogin,
      },
      newsletter: {
        onChange: setFilterNewsletetrStatus,
        options: optionsNewsletterStatus,
        value: filterNewsletterStatus,
      },
      product: {
        onChange: setFilterProduct,
        options: productList,
        value: filterProduct,
      },
      datePick: {
        onChange: setFilterDatePick,
        value: filterDateDownload,
      },
    },
    list,
    loading: {
      loadingFilterProduct: loadingFilterProduct,
    },
    onClickRowTable,
    onClickRefresh,
    orderBy,
    setOrderBy,
    search,
    setSearch,
    sort,
    setSort,
    productList,
    setProductList,
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useActions;
