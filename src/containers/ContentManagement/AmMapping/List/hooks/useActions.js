import { useEffect, useState } from 'react';
import {
  getListUser,
  getFilterCustomer,
  downloadAmMapping,
} from '@containers/ContentManagement/AmMapping/_repositories/repositories';
import { cleanObject, isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { defaultConfirm } from '@constants/dialogDefaultValue';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { setSuccessAlert, setFailedAlert } = usePopupAlert();

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [page, setPage] = useState(1);
  const [confirmation, setConfirmation] = useState({
    content: '',
    actions: [],
  });
  const [filterStatus, setFilterStatus] = useState({
    label: 'All Status',
    value: '',
  });
  const [filterCustomer, setFilterCustomer] = useState({
    label: 'All Customer Type',
    value: '',
  });
  const [filterCustomerOptions, setFilterCustomerOptions] = useState([]);
  const [search, setSearch] = useState('');
  const [loadingDownload, setLoadingDownload] = useState(false);

  const [loadingFilterCustomer, setLoadingFilterCustomer] = useState(true);

  const fetchList = async (newPage) => {
    const payload = {
      page: newPage ? newPage : page,
      size,
      search,
      customerType: filterCustomer.value,
      status: filterStatus.value,
    };

    const params = cleanObject(payload);

    const validatePath = router.pathname === route.amMapping('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getListUser({ params });
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

  const fetchFilterCustomer = async () => {
    setLoadingFilterCustomer(true);

    try {
      const result = await getFilterCustomer();
      const options = result.data.map(({ label, value }) => ({
        value: value,
        label: label,
      }));
      setFilterCustomerOptions([
        { value: '', label: 'All Customer Type' },
        ...options,
      ]);
      setLoadingFilterCustomer(false);
    } catch (error) {
      setFilterCustomerOptions([{ value: '', label: 'All Customer Type' }]);
      setLoadingFilterCustomer(false);
    }
  };

  const onClickDownload = async () => {
    setLoadingDownload(true);
    const _params = {
      search,
      customerType: filterCustomer.value,
      status: filterStatus.value,
    };
    const params = cleanObject(_params);
    try {
      const result = await downloadAmMapping(params);
      if (result.data.fileUrlDownload) {
        window.location.href = result.data.fileUrlDownload;
        setSuccessAlert({
          message: 'Data successfully downloaded',
        });
      }
      setLoadingDownload(false);
    } catch (error) {
      setFailedAlert({
        message: error.message,
      });
      setLoadingDownload(false);
    }
  };

  const clearConfirmation = () => setConfirmation(defaultConfirm);

  useEffect(() => {
    setPage(1);
    fetchList(1);
  }, [search, filterCustomer, filterStatus]);

  useEffect(() => {
    fetchFilterCustomer();
  }, []);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onClickAdd = () => {
    if (isHaveAccess(feature, 'create_amMapping')) {
      router.push(route.amMapping('create'));
    } else {
      setFailedAlert({
        message: "You don't have permission to add new mapping.",
      });
    }
  };

  const onClickRowTable = (data) => {
    if (isHaveAccess(feature, 'read_detail')) {
      router.push(route.amMapping('detail', data?.nipnas));
    } else {
      setFailedAlert({
        message:
          "You don't have permission to read detail account manager mapping.",
      });
    }
  };

  const loading = {
    filterCustomer: loadingFilterCustomer,
    download: loadingDownload,
  };

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    list,
    loading,
    filterStatus,
    filterCustomer,
    filterCustomerOptions,
    clearConfirmation,
    onClickAdd,
    onClickRowTable,
    onClickDownload,
    setFilterStatus,
    setFilterCustomer,
    confirmation,
    setConfirmation,
    search,
    setSearch,
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useActions;
