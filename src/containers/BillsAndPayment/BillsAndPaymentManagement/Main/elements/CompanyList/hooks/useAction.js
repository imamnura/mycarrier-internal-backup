import { useEffect, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import { getListBillsAndPaymentManagement } from '../../../../_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { dateFormat } from '@utils/parser';
import { LOCATOR } from '../test-locator';

const useAction = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { setFailedAlert } = usePopupAlert();

  const tab = router.query?.tab;
  const setTab = (value) => {
    router.push(route.billsAndPayment(value));
  };

  // const manager = isHaveAccess(feature, 'read_quotation_approve');

  const [list, setList] = useState({ data: [], meta: {}, hasMore: false });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [filterProfileByAssessment, _setFilterProfileByAssessment] = useState({
    value: '',
    label: 'All Profile by Assessment',
  });
  const [filterLastUpdate, _setFilterLastUpdate] = useState([null, null]);

  const [loadingTable, setLoadingTable] = useState(false);

  const fetchList = async (newPage) => {
    const _params = {
      size,
      search,
      page: newPage ? newPage : page,
      profByAsessment: filterProfileByAssessment.value,
      startDate:
        filterLastUpdate[0] &&
        dateFormat({ date: filterLastUpdate[0], type: 'params' }),
      endDate:
        filterLastUpdate[1] &&
        dateFormat({ date: filterLastUpdate[1], type: 'params' }),
    };
    const params = cleanObject(_params);

    const validatePath =
      router.asPath === route.billsAndPayment('company-list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const result = await getListBillsAndPaymentManagement({
          params,
          withCancel: true,
        });
        const { data, meta } = result;
        const normalize = {
          data,
          meta: { ...meta, updatedOn: meta.latestUpdate },
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

  const setFilterProfileByAssessment = (v) => {
    setPage(1);
    _setFilterProfileByAssessment(v);
  };

  const setFilterLastUpdate = (v) => {
    setPage(1);
    _setFilterLastUpdate(v);
  };

  useEffect(() => {
    // setPage(1);
    // fetchList(1);
    if (
      isHaveAccess(feature, 'read_list_company_am') ||
      isHaveAccess(feature, 'read_list_company_cdm')
    ) {
      setPage(1);
      fetchList(1);
    } else {
      setFailedAlert({
        message: "You don't have permission to view list.",
      });
      setLoadingTable(false);
    }
  }, [search, filterLastUpdate, filterProfileByAssessment]);

  useEffect(() => {
    // fetchList();
    if (
      isHaveAccess(feature, 'read_list_company_am') ||
      isHaveAccess(feature, 'read_list_company_cdm')
    ) {
      fetchList();
    } else {
      setFailedAlert({
        message: "You don't have permission to view list.",
      });
      setLoadingTable(false);
    }
  }, [page]);

  const privilegesRefresh =
    isHaveAccess(feature, 'read_list_company_am') ||
    isHaveAccess(feature, 'read_list_company_cdm');

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onClickRowTable = async (data) => {
    if (isHaveAccess(feature, 'read_detail_company')) {
      router.push(route.billsAndPayment('detail', data.bpNumber));
    } else {
      setFailedAlert({
        message: "You don't have permission to view detail.",
      });
    }
  };

  const onRefresh = () => {
    fetchList(1);
    setPage(1);
  };

  const testLocator = LOCATOR;

  return {
    filterLastUpdate,
    filterProfileByAssessment,
    list,
    loadingTable,
    onClickRowTable,
    // onBottomPage,
    onPaginationChange,
    onRefresh,
    page,
    privilegesRefresh,
    search,
    setFilterLastUpdate,
    setFilterProfileByAssessment,
    setSearch,
    setTab,
    tab,
    testLocator,
  };
};

export default useAction;
