import { useEffect, useState } from 'react';
import { cleanObject } from '@utils/common';
import { getDetailDataUnsettle } from '@containers/BillsAndPayment/DataUnsettle/_repositories/repositories';
import { useRouter } from 'next/router';
import useQueryParams from '@utils/hooks/useQueryParams';
import moment from 'moment';

const useActions = (props) => {
  const router = useRouter();
  const { queryParams, setQueryParams } = useQueryParams();
  const { feature } = props;
  const { segment, invoiceGroup } = router.query;

  const [list, setList] = useState([]);

  const search = queryParams?.search || '';
  const setSearch = (search) => setQueryParams({ search });

  const filterIddb = queryParams?.iddb || '';
  const setFilterIddb = ({ value: iddb }) => setQueryParams({ iddb });

  const filterAging = queryParams?.aging || '';
  const setFilterAging = ({ value: aging }) => setQueryParams({ aging });

  const sort = queryParams?.sort;
  const setSort = (sort) => setQueryParams({ sort });

  const orderBy = queryParams?.orderBy;
  const setOrderBy = (orderBy) => setQueryParams({ orderBy, sort: 'asc' });

  const useSort = [sort, setSort];
  const useOrderBy = [orderBy, setOrderBy];

  // const cutOffDate = moment(queryParams?.cutOffDate);
  // const filterDate = cutOffDate.isValid() ? cutOffDate.toJSON() : undefined;
  // const setFilterDate = (cutOffDate) => setQueryParams({ cutOffDate });

  const [loadingTable, setLoadingTable] = useState(true);
  const [filterMonth, _setFilterMonth] = useState({
    label: 'All Month',
    value: '',
  });
  const [filterYear, _setFilterYear] = useState({
    label: 'All Year',
    value: '',
  });

  const setFilterMonth = (value) => {
    if (!filterYear.value) {
      const yearNow = moment().year().toString();
      _setFilterYear({ value: yearNow, label: yearNow });
    }

    if (!value.value) {
      _setFilterYear({ label: 'All Year', value: '' });
    }

    _setFilterMonth(value);
  };

  const setFilterYear = (value) => {
    if (!filterMonth.value) {
      const now = moment();
      const monthValue = now.format('MM');
      const monthLabel = now.format('MMMM');
      setFilterMonth({ value: monthValue, label: monthLabel });
    }

    if (!value.value) {
      _setFilterMonth({ label: 'All Month', value: '' });
    }

    _setFilterYear(value);
  };

  const fetchList = async () => {
    const _params = {
      // endDate: filterDate ? moment(filterDate).format('YYYY-MM-DD') : '',
      period: `${filterYear.value}${filterMonth.value}`,
      iddb: filterIddb,
      invoiceGroup,
      orderBy,
      periode: filterAging,
      search,
      segment,
      sort,
    };
    const params = cleanObject(_params);

    setLoadingTable(true);

    try {
      const result = await getDetailDataUnsettle({ params, withCancel: true });
      setList(result.data);
    } catch (error) {
      setList([]);
    } finally {
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    if (!!segment && !!invoiceGroup) {
      fetchList();
    }
  }, [
    search,
    filterIddb,
    filterAging,
    segment,
    invoiceGroup,
    sort,
    orderBy,
    filterMonth,
    filterYear,
  ]);

  return {
    feature,
    filterAging,
    // filterDate,
    filterIddb,
    list,
    loading: loadingTable,
    search,
    setFilterAging,
    // setFilterDate,
    setFilterIddb,
    setSearch,
    useOrderBy,
    useSort,
    filterMonth,
    filterYear,
    setFilterMonth,
    setFilterYear,
  };
};

export default useActions;
