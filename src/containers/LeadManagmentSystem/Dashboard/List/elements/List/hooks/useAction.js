import { useEffect, useMemo, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import {
  getListLeadManagementSystem,
  getSource,
} from '../../../../_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { useRouter } from 'next/router';
import useQueryParams from '@utils/hooks/useQueryParams';
import { dateRangeToParams, paramsToDateRange } from '@utils/parser';
import usePopupAlert from '@utils/hooks/usePopupAlert';

const useAction = (props) => {
  const router = useRouter();
  const { feature } = props;

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const { queryParams, setQueryParams, setQueryParamsForce } = useQueryParams();
  const { setFailedAlert } = usePopupAlert();

  const search = queryParams.search || '';
  const setSearch = (search) => setQueryParams({ search });

  const [page, setPage] = useState(1);

  const tab = queryParams.tab || '';
  const setTab = (tab) => {
    setQueryParamsForce({ tab, source: filterSource, status: filterStatus });
  };

  const filterSource = queryParams.source || '';
  const setFilterSource = ({ value: source }) => setQueryParams({ source });

  const filterStatus = queryParams.status || '';
  const setFilterStatus = ({ value: status }) => setQueryParams({ status });

  const filterDateSubmit = paramsToDateRange(
    queryParams?.dateSubmit,
    'YYYY-MM-DD',
  );
  const setFilterDateSubmit = (dateSubmit) =>
    setQueryParams({ dateSubmit: dateRangeToParams(dateSubmit) });

  const filterLastUpdate = paramsToDateRange(
    queryParams?.lastUpdate,
    'YYYY-MM-DD',
  );
  const setFilterLastUpdate = (lastUpdate) =>
    setQueryParams({ lastUpdate: dateRangeToParams(lastUpdate) });

  const filterLastContacted = paramsToDateRange(
    queryParams?.lastContact,
    'YYYY-MM-DD',
  );
  const setFilterLastContacted = (lastContact) =>
    setQueryParams({ lastContact: dateRangeToParams(lastContact) });

  const status = useMemo(() => {
    const s = {
      needValidation: 'need_validation',
      leadValid: 'valid',
      leadInvalid: 'invalid',
      dispatchLead: 'dispatch',
    }[tab];

    return s;
  }, [tab]);

  const fetchList = async (newPage) => {
    const _params = {
      size,
      search,
      page: newPage ? newPage : page,
      source: filterSource,
      status:
        queryParams.tab === 'leadValid' ? filterStatus || 'valid' : status,
      dateSubmitStart: filterDateSubmit[0],
      dateSubmitEnd: filterDateSubmit[1],
      lastUpdateStart: filterLastUpdate[0],
      lastUpdateEnd: filterLastUpdate[1],
      lastContactedStart: filterLastContacted[0],
      lastContactedEnd: filterLastContacted[1],
    };

    const params = cleanObject(_params);

    setLoadingTable(true);
    try {
      const { data, meta } = await getListLeadManagementSystem({
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
  };

  useEffect(() => {
    if (router.isReady && status) {
      if (
        isHaveAccess(feature, 'read_list_need_validation_lead') ||
        isHaveAccess(feature, 'read_list_valid_lead') ||
        isHaveAccess(feature, 'read_list_invalid_lead')
      ) {
        fetchList(1);
        setPage(1);
      } else {
        setFailedAlert({ message: "You don't have permission to read list" });
        setLoadingTable(false);
        setList({
          data: [],
          meta: {},
        });
      }
    }
  }, [
    queryParams.tab,
    queryParams.source,
    queryParams.dateSubmit,
    queryParams.lastUpdate,
    queryParams.lastContact,
    queryParams.search,
    queryParams.status,
  ]);

  useEffect(() => {
    if (page > 1) {
      fetchList();
    }
  }, [page]);

  const onClickRowTable = async (data) => {
    if (isHaveAccess(feature, 'read_detail_lead')) {
      router.push(
        route.dashboadLeadManagementSystem('detail', data.interestId),
      );
    } else {
      setFailedAlert({ message: "You don't have permission to read detail" });
    }
  };

  const [optionSource, setOptionSource] = useState([
    { label: 'All Source', value: '' },
  ]);

  const getFilterSource = async () => {
    try {
      const result = await getSource();
      const opt = result.data.map(({ name, value }) => ({
        value,
        label: name,
      }));
      setOptionSource([{ label: 'All Source', value: '' }, ...opt]);
    } catch (error) {
      setOptionSource([{ label: 'All Source', value: '' }]);
    }
  };

  useEffect(() => {
    getFilterSource();
  }, []);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    feature,
    filterDateSubmit,
    filterLastContacted,
    filterLastUpdate,
    filterSource,
    filterStatus,
    list,
    onClickRowTable,
    optionSource,
    search,
    setFilterDateSubmit,
    setFilterLastContacted,
    setFilterLastUpdate,
    setFilterSource,
    setFilterStatus,
    setSearch,
    setTab,
    tab,
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useAction;
