import { useEffect, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import { getListSettlement } from '../../_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { useRouter } from 'next/router';
import useQueryParams from '@utils/hooks/useQueryParams';
import moment from 'moment';
import usePopupAlert from '@utils/hooks/usePopupAlert';

const useAction = (props) => {
  const router = useRouter();
  const { feature } = props;

  const [list, setList] = useState({ data: [], meta: {} });

  const { queryParams, setQueryParams, setQueryParamsForce } = useQueryParams();
  const { setFailedAlert } = usePopupAlert();

  const search = queryParams.search || '';
  const setSearch = (search) => setQueryParams({ search });

  const [page, setPage] = useState(1);

  const tab = queryParams.tab || '';
  const setTab = (tab) => setQueryParamsForce({ tab });

  const filterStatus = queryParams.status || '';
  const setFilterStatus = ({ value: status }) => setQueryParams({ status });

  const filterBillingType = queryParams.billingType || '';
  const setFilterBillingType = ({ value: billingType }) =>
    setQueryParams({ billingType });

  const filterPeriod = queryParams?.period || null;
  const setFilterPeriod = (period) =>
    setQueryParams({
      period: period ? moment(period).format('YYYY-MM') : null,
    });
  const [loadingTable, setLoadingTable] = useState(false);
  const fetchList = async (newPage) => {
    const location = router.pathname;

    const _params = {
      size,
      search,
      page: newPage ? newPage : page,
      status: filterStatus,
      billingType: filterBillingType,
      periode: filterPeriod ? moment(filterPeriod).format('MMYYYY') : null,
    };

    const params = cleanObject(_params);

    const validatePath = location === route.settlement('list');

    if (
      !loadingTable &&
      validatePath &&
      ['settlement', 'users'].includes(tab)
    ) {
      setLoadingTable(true);
      try {
        const result = await getListSettlement(
          { params, withCancel: true },
          tab,
        );
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

  useEffect(() => {
    if (tab) {
      if (
        isHaveAccess(feature, 'read_settlement_list_am') ||
        isHaveAccess(feature, 'read_list_user_settlement_am') ||
        isHaveAccess(feature, 'read_settlement_list_cdm') ||
        isHaveAccess(feature, 'read_list_user_settlement_cdm')
      ) {
        setPage(1);
        fetchList(1);
      } else {
        setFailedAlert({ message: "You don't have permission to read list" });
        setLoadingTable(false);
        setList({
          data: [],
          hasMore: false,
          meta: {},
        });
      }
    }
  }, [
    queryParams.tab,
    queryParams.product,
    queryParams.status,
    queryParams.billingType,
    queryParams.period,
    queryParams.search,
  ]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onClickRowTable = async (data) => {
    if (tab == 'settlement') {
      router.push(route.settlement('detailSettlementList', data.settlementId));
    } else {
      router.push(route.settlement('detailUsers', data.userId));
    }
  };

  return {
    feature,
    filterStatus,
    filterBillingType,
    filterPeriod,
    // list: {
    //   data: list.data,
    //   meta: {
    //     ...list.meta,
    //     page,
    //   },
    // },
    list,
    page,
    loadingTable,
    onPaginationChange,
    onClickRowTable,
    search,
    setFilterStatus,
    setFilterBillingType,
    setFilterPeriod,
    setSearch,
    setTab,
    tab,
  };
};

export default useAction;
