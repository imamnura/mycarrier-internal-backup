import { useEffect, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import {
  getDownloadDataUnsettle,
  getListDataUnsettle,
} from '../../_repositories/repositories';
import { route } from '@configs';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import moment from 'moment';
import useQueryParams from '@utils/hooks/useQueryParams';

const useAction = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { queryParams, setQueryParams } = useQueryParams();

  const [list, setList] = useState([]);

  const search = queryParams?.search || '';
  const setSearch = (search) => setQueryParams({ search });

  const filterSegment = queryParams?.segment || '';
  const setFilterSegment = ({ value: segment }) => setQueryParams({ segment });

  // const cutOff = queryParams?.cutOffDate ? moment(queryParams?.cutOffDate) : undefined;
  // const filterDate = cutOff?.isValid() ? cutOff.toJSON() : undefined;
  // const setFilterDate = (cutOffDate) => setQueryParams({ cutOffDate });

  const sort = queryParams?.sort;
  const setSort = (sort) => setQueryParams({ sort });

  const orderBy = queryParams?.orderBy;
  const setOrderBy = (orderBy) => setQueryParams({ orderBy, sort: 'asc' });

  const useSort = [sort, setSort];
  const useOrderBy = [orderBy, setOrderBy];

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
      orderBy,
      search,
      segment: filterSegment,
      sort,
    };
    const params = cleanObject(_params);
    const validatePath = router.pathname === route.dataUnsettle('list');

    setLoadingTable(true);
    if (validatePath) {
      try {
        const result = await getListDataUnsettle({ params, withCancel: true });
        const { data } = result;
        setList(data);
      } catch (error) {
        setList([]);
      } finally {
        setLoadingTable(false);
      }
    }
  };

  useEffect(() => {
    // fetchList();
    if (isHaveAccess(feature, 'read_list_summary_unsettle')) {
      // if (isHaveAccess(feature, 'read_list_company_am')) {
      fetchList();
    } else {
      setFailedAlert({
        message: "You don't have permission to view list.",
      });
      setLoadingTable(false);
      setList([]);
    }
  }, [search, filterSegment, sort, orderBy, filterMonth, filterYear]);

  const privilegesDownload = isHaveAccess(
    feature,
    'read_download_list_summary_data_unsettle',
  );

  const onClickRowTable = async (data) => {
    if (isHaveAccess(feature, 'read_detail_data_unsettle')) {
      // router.push(`${route.dataUnsettle
      // ('detail', { segment: data.segment, invoiceGroup: data.invoiceGroup })}?cutOffDate=${filterDate || ''}`);
      router.push(
        `${route.dataUnsettle('detail', {
          segment: data.segment,
          invoiceGroup: data.invoiceGroup,
        })}?cutOffDate=${`${filterYear.value}${filterMonth.value}` || ''}`,
      );
    } else {
      setFailedAlert({
        message: "You don't have permission to view detail.",
      });
    }
  };

  const onDownload = async () => {
    setLoadingAlert();
    const _payload = {
      // endDate: filterDate ? moment(filterDate).format('YYYY-MM-DD') : '',
      period: `${filterYear.value}${filterMonth.value}`,
      orderBy,
      search,
      segment: filterSegment,
      sort,
    };

    const payload = cleanObject(_payload);

    try {
      const result = await getDownloadDataUnsettle('summary', payload);
      window.open(result.data.fileUrlDownload, '_blank');
      setSuccessAlert({
        message: 'Data Unsettle table successfully downloaded',
      });
    } catch (error) {
      setFailedAlert({ message: error.message });
    }
  };

  return {
    // filterDate,
    filterSegment,
    list,
    loadingTable,
    onClickRowTable,
    onDownload,
    search,
    // setFilterDate,
    setFilterSegment,
    setSearch,
    useOrderBy,
    useSort,
    filterMonth,
    filterYear,
    setFilterMonth,
    setFilterYear,
    privilegesDownload,
  };
};

export default useAction;
