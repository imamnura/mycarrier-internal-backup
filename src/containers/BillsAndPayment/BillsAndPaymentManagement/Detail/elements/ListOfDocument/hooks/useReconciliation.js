import { useEffect, useMemo, useState, useContext } from 'react';
import moment from 'moment';
import { route } from '@configs';
import { getListReconciliation } from '../../../../_repositories/repositories';
import { size } from '@fragments/List/List';
import { useRouter } from 'next/router';
import {
  filterReconciliationStatusOptions,
  schemaReconciliation,
  maskStatusReconciliation,
} from '../../../utils';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { cleanObject, isHaveAccess } from '@utils/common';
import { capitalize } from '@utils/text';
import { BillsAndPaymentDetailContext } from '@context/BillsAndPayment';
import { LOCATOR } from '../../../test-locator';

const testLocator = LOCATOR.sections.list.reconciliation;

const useReconciliation = (feature) => {
  const {
    searchReconciliation: search,
    setSearchReconciliation: setSearch,
    pageReconciliation: page,
    setPageReconciliation: setPage,
    filterReconciliationStatus,
    setFilterReconciliationStatus,
    periodeReconciliation: period,
    setPeriodeReconciliation: setPeriod,
    setSortReconciliation: setSort,
    sortReconciliation: sort,
    setOrderByReconciliation: setOrderBy,
    orderByReconciliation: orderBy,
  } = useContext(BillsAndPaymentDetailContext);

  const { setFailedAlert } = usePopupAlert();

  const router = useRouter();
  const { id: bpNumber, type } = router.query;

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const schema = schemaReconciliation;

  const onClickRow = ({ reconciliationId }) => {
    if (isHaveAccess(feature, 'read_detail_reconciliation')) {
      router.push(
        route.billsAndPayment('reconciliation', bpNumber, reconciliationId),
      );
    } else {
      setFailedAlert({
        message: `You don't have permission to view detail reconciliations.`,
      });
    }
  };

  const filter = [
    {
      onChange: setFilterReconciliationStatus,
      options: filterReconciliationStatusOptions,
      type: 'dropdown',
      value: filterReconciliationStatus,
      id: testLocator.filter.status,
    },
    {
      onChange: setPeriod,
      type: 'date',
      value: period,
      label: 'Select Period',
      format: 'MMMM YYYY',
      minDate: '2024/01/01',
      openTo: 'month',
      views: ['year', 'month'],
      id: testLocator.filter.period,
    },
  ];

  const fetchList = async (newPage) => {
    const location = router.asPath;

    const _params = {
      bpNumber,
      sort: sort === 'desc' ? 'newest' : 'oldest',
      page: newPage ? newPage : page,
      size,
      status: filterReconciliationStatus.value,
      search,
      periode: period ? moment(period).format('YYYYMM') : null,
    };
    const params = cleanObject(_params);

    const validatePath =
      location === route.billsAndPayment('detail', bpNumber) + `?type=${type}`;

    if (!loadingTable && validatePath) {
      setLoadingTable(true);

      try {
        const { data, meta } = await getListReconciliation({
          params,
          withCancel: true,
        });
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
    // setPage(1);
    fetchList(1);
  }, [search, filterReconciliationStatus, sort, period, type]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const data = useMemo(
    () =>
      list?.data?.map((d) => ({
        ...d,
        meetingType:
          d?.meetingType?.length >= 1
            ? capitalize(d.meetingType.map((item) => item).join(', '))
            : '-',
        status: maskStatusReconciliation(d?.status),
      })),
    [list.data],
  );

  return {
    filter,
    search: {
      onChange: setSearch,
      placeholder: 'Search ID, Title, Summary..',
      value: search,
      id: testLocator.search,
    },
    table: {
      data: data,
      loading: false,
      loadingRoot: loadingTable,
      onPaginationChange,
      page,
      meta: list.meta,
      onClickRow,
      schema,
      useOrderDirection: [sort, setSort],
      useOrderBy: [orderBy, setOrderBy],
      id: testLocator.table,
      numbering: false,
    },
  };
};

export default useReconciliation;
