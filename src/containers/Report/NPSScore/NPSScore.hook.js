import { useEffect, useMemo, useState } from 'react';
import {
  getNpsList,
  getNpsCategory,
  getNpsCustomer,
  getNpsResult,
  getNpsTrend,
  getNpsVOC,
  downloadNpsList,
  getNpsScoreAllJourney,
  getNpsTotalRespondent,
  getNpsWorklog,
  getFollowUpSummary,
} from './_repositories/repositories';
import { cleanObject } from '@utils/common';
import moment from 'moment';
import { route } from '@configs/index';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useQueryParams from '@utils/hooks/useQueryParams';
import { capitalize } from '@utils/text';
import useResponsive from '@utils/hooks/useResponsive';

const useNpsScore = () => {
  const router = useRouter();

  const { queryParams, setQueryParams } = useQueryParams();
  const paramsJourney = queryParams.journey || 'alljourney';
  const smClient = useResponsive('xs');
  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();

  const [filters, setFilters] = useState({
    period: { label: 'Monthly', value: 'monthly' },
    customer: [],
    category: { label: 'All Category', value: '' },
    product: [],
    dateRange: [],
  });

  const setJourney = (val) => {
    // setFilters({
    //   period: { label: 'Monthly', value: 'monthly' },
    //   customer: [],
    //   category: { label: 'All Category', value: '' },
    //   product: [],
    //   dateRange: [],
    // });

    setQueryParams({ journey: val[0]?.value });
  };

  const [openFilter, _setOpenFilter] = useState(false);
  const setOpenFilter = (v) => () => _setOpenFilter(v);

  const totalFilter = useMemo(() => {
    return Object.keys(filters).filter((filterName) => {
      const val = filters[filterName];
      if (Array.isArray(val) && val.length > 0) {
        return true;
      }

      if (filterName === 'period' && val.value !== 'monthly') {
        return true;
      }

      if (filterName === 'category' && !!val.value) {
        return true;
      }

      return false;
    }).length;
  }, [filters]);

  const filterPayload = useMemo(() => {
    let payload = {
      journey: paramsJourney,
      period: filters?.period?.value,
      customer: filters?.customer?.map(({ value }) => value).join(','),
      category: filters?.category?.value,
      product: filters?.product?.map(({ value }) => value).join(','),
    };

    if (filters.dateRange[0]) {
      payload.startDate = moment(filters.dateRange[0]).format('YYYY-MM-DD');
    }

    if (filters.dateRange[1]) {
      payload.endDate = moment(filters.dateRange[1]).format('YYYY-MM-DD');
    }

    return cleanObject(payload);
  }, [filters, paramsJourney]);

  const [loadingNpsResult, setLoadingNpsResult] = useState(true);
  const [npsResult, setNpsResult] = useState(null);

  const fetchNpsResult = async () => {
    setLoadingNpsResult(true);
    try {
      const result = await getNpsResult({
        params: { ...filterPayload, status: 'valid' },
      });
      setNpsResult(result.data);
    } catch (error) {
      setNpsResult(null);
    } finally {
      setLoadingNpsResult(false);
    }
  };

  const [loadingNpsTrend, setLoadingNpsTrend] = useState(true);
  const [npsTrend, setNpsTrend] = useState(null);

  const fetchNpsTrend = async () => {
    setLoadingNpsTrend(true);
    try {
      const result = await getNpsTrend({
        params: { ...filterPayload, status: 'valid' },
      });
      setNpsTrend(result.data);
    } catch (error) {
      setNpsTrend(null);
    } finally {
      setLoadingNpsTrend(false);
    }
  };

  const [loadingNpsCategory, setLoadingNpsCategory] = useState(true);
  const [npsCategory, setNpsCategory] = useState(null);

  const fetchNpsCategory = async () => {
    setLoadingNpsCategory(true);
    try {
      const result = await getNpsCategory({
        params: { ...filterPayload, status: 'valid' },
      });
      setNpsCategory(result.data);
    } catch (error) {
      setNpsCategory(null);
    } finally {
      setLoadingNpsCategory(false);
    }
  };

  const [loadingNpsVOC, setLoadingNpsVOC] = useState(true);
  const [npsVOC, setNpsVOC] = useState(null);

  const fetchNpsVOC = async () => {
    setLoadingNpsVOC(true);
    try {
      const resPromoters = await getNpsVOC({
        params: { ...filterPayload, category: 'promoters', status: 'valid' },
      });
      const resDetractors = await getNpsVOC({
        params: { ...filterPayload, category: 'detractor', status: 'valid' },
      });
      const resPassives = await getNpsVOC({
        params: { ...filterPayload, category: 'passive', status: 'valid' },
      });

      const maskJourney = {
        activate: 'Activate',
        getsupport: 'Get Support',
        use: 'Use',
        evaluate: 'Evaluate',
        pay: 'Pay',
        explore: 'Explore',
      };
      setNpsVOC({
        promoters: [...resPromoters.data]
          .map(({ name, journey, value }) => ({
            name: `${Array.isArray(name) ? name.join('') : name}_${
              journey === paramsJourney ? '' : maskJourney[journey]
            }`,
            value,
          }))
          .reverse(),
        detractors: [...resDetractors.data]
          .map(({ name, journey, value }) => ({
            name: `${Array.isArray(name) ? name.join('') : name}_${
              journey === paramsJourney ? '' : maskJourney[journey]
            }`,
            value,
          }))
          .reverse(),
        passives: [...resPassives.data]
          .map(({ name, journey, value }) => ({
            name: `${Array.isArray(name) ? name.join('') : name}_${
              journey === paramsJourney ? '' : maskJourney[journey]
            }`,
            value,
          }))
          .reverse(),
      });
    } catch (error) {
      setNpsVOC(null);
    } finally {
      setLoadingNpsVOC(false);
    }
  };

  const [loadingNpsCustomer, setLoadingNpsCustomer] = useState(true);
  const [npsCustomer, setNpsCustomer] = useState(null);

  const fetchNpsCustomer = async () => {
    setLoadingNpsCustomer(true);
    try {
      const result = await getNpsCustomer({
        params: { ...filterPayload, status: 'valid' },
      });
      setNpsCustomer({
        all: [...result.data].reverse(),
        top5: [...result.data].slice(0, 5).reverse(),
      });
    } catch (error) {
      setNpsCustomer({ all: null, top5: null });
    } finally {
      setLoadingNpsCustomer(false);
    }
  };

  const [list, setList] = useState({ data: [], meta: {}, hasMore: false });
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState('needValidation');
  const [loadingTable, _setLoadingTable] = useState({
    root: true,
    row: false,
  });

  const setLoadingTable = ({ root, row }) => {
    const resRoot = typeof root === 'boolean' ? root : loadingTable.root;
    const resRow = typeof row === 'boolean' ? row : loadingTable.row;

    _setLoadingTable({
      root: resRoot,
      row: resRow,
    });
  };

  const [search, setSearch] = useState('');
  const [selectedRow, setSelectedRow] = useState([]);

  const [openPopupListRespondent, _setOpenPopupListRespondent] = useState(null);
  const setOpenPopupListRespondent = (v) => () =>
    _setOpenPopupListRespondent(v);

  const [openPopupUpdate, _setOpenPopupUpdate] = useState({
    show: false,
    edit: false,
  });
  const setOpenPopupUpdate = (v) => () => _setOpenPopupUpdate(v);

  const fetchNpsList = async (resetData, size = 10) => {
    const oldData = resetData ? [] : list.data;
    const loadings = !loadingTable.root && !loadingTable.row;
    const _params = {
      ...filterPayload,
      page: resetData ? 1 : page,
      size: size,
      search,
      category:
        paramsJourney == 'alljourney' ? 'detractor' : filterPayload.category,
      status: paramsJourney == 'alljourney' ? 'valid' : tab.toLowerCase(),
    };

    const params = cleanObject(_params);

    const validatePath = router.pathname === route.reportNpsScore();

    if ((loadings || resetData) && validatePath) {
      if (resetData) setLoadingTable({ root: true });
      else setLoadingTable({ row: true });
      try {
        const result = await getNpsList(params);
        const { data, meta } = result;
        const hasMore = meta?.page >= meta?.totalPage ? false : true;
        const newData = data || [];
        const normalize = {
          data: [...oldData, ...newData],
          hasMore,
          meta: {
            ...meta,
            totalPage: meta.totalPages || meta.totalPage,
          },
        };
        setPage(meta?.page + 1);
        setList(normalize);
      } catch (error) {
        setList({
          data: [],
          meta: {},
        });
      } finally {
        setLoadingTable({
          root: false,
          row: false,
        });
      }
    }
  };

  const resetAll = () => {
    if (filterPayload.journey) {
      if (filterPayload.journey === 'alljourney') {
        // fetchNpsVOC();
        fetchNpsScoreAllJourney();
        fetchNpsTotalRespondent();
      }
      fetchNpsVOC();

      fetchNpsResult();
      fetchNpsTrend();
      fetchStatusSummary();
      fetchNpsCategory();
      fetchNpsCustomer();
      fetchNpsList(true);
      setPage(1);
      setSearch('');
      setTab('needValidation');
      setSelectedRow([]);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      resetAll();
    }
  }, [JSON.stringify(filterPayload), router.isReady]);

  useEffect(() => {
    if (filterPayload.journey) {
      setSelectedRow([]);
      setSearch('');
      setPage(1);
      fetchNpsList(true);
    }
  }, [tab]);

  useEffect(() => {
    if (filterPayload.journey) {
      setPage(1);
      fetchNpsList(true);
    }
  }, [search]);

  const [openCustomerSurvey, _setOpenCustomerSurvey] = useState(false);
  const setOpenCustomerSurvey = (v) => () => _setOpenCustomerSurvey(v);

  const onSuccessUpdate = () => {
    setSelectedRow([]);
    if (search != '') setSearch('');
    else fetchNpsList(true, page * 10);
    // document.body.style.overflow = 'auto';
  };

  const onClickRefresh = () => {
    resetAll();
  };

  const onClickDownload = async () => {
    const _params = {
      ...filterPayload,
      category:
        // paramsJourney == 'alljourney' ? 'detractor' : filterPayload.category,
        paramsJourney == 'alljourney' ? '' : filterPayload.category,
    };

    const params = cleanObject(_params);
    setLoadingAlert();
    try {
      delete params.status;
      const { data } = await downloadNpsList(params);
      if (data.fileUrl) {
        window.location.href = data.fileUrl;
        setSuccessAlert({
          message: 'Detail data successfully downloaded.',
        });
      }
    } catch (error) {
      setFailedAlert({
        message: 'Something wrong, Failed to download data',
      });
    }
  };
  const pickLabel = {
    alljourney: 'All Journey',
    getsupport: 'Get Support',
  };

  const [loadingNpsScoreAllJourney, setLoadingNpsScoreAllJourney] =
    useState(true);
  const [npsScoreAllJourney, setNpsScoreAllJourney] = useState(null);

  const fetchNpsScoreAllJourney = async () => {
    setLoadingNpsScoreAllJourney(true);
    try {
      const result = await getNpsScoreAllJourney({
        params: { ...filterPayload, status: 'all' },
      });
      setNpsScoreAllJourney(result.data);
    } catch (error) {
      setNpsScoreAllJourney(null);
    } finally {
      setLoadingNpsScoreAllJourney(false);
    }
  };

  const [loadingNpsTotalRespondent, setLoadingNpsTotalRespondent] =
    useState(true);
  const [npsTotalRespondent, setNpsTotalRespondent] = useState(null);

  const fetchNpsTotalRespondent = async () => {
    setLoadingNpsTotalRespondent(true);
    try {
      const result = await getNpsTotalRespondent({
        params: { ...filterPayload, status: 'valid,invalid,needvalidation' },
      });
      setNpsTotalRespondent(result.data);
    } catch (error) {
      setNpsTotalRespondent(null);
    } finally {
      setLoadingNpsTotalRespondent(false);
    }
  };

  const [popupWorklog, _setPopupWorklog] = useState(null);
  const setPopupWorklog = (v) => () => _setPopupWorklog(v);
  const [loadingWorklog, setLoadingWorklog] = useState(false);
  const onClickWorklog = (rateId) => () => fetchWorklogData(rateId);

  const fetchWorklogData = async (rateId) => {
    const params = { rateId };
    setLoadingWorklog(true);
    try {
      const { data } = await getNpsWorklog(params);
      _setPopupWorklog(data);
    } catch (error) {
      setFailedAlert({
        message: 'Something wrong, Failed to fetch data',
      });
    } finally {
      setLoadingWorklog(false);
    }
  };

  const [summaryFollowUp, setSummaryFollowUp] = useState(null);
  const [loadingFollowUp, setLoadingFollowUp] = useState(false);

  const fetchStatusSummary = async () => {
    const params = { ...filterPayload, status: 'valid' };
    setLoadingFollowUp(true);
    try {
      const result = await getFollowUpSummary(params);
      setSummaryFollowUp(result.data);
    } catch (error) {
      setSummaryFollowUp(null);
    } finally {
      setLoadingFollowUp(false);
    }
  };

  const onBottomPage = () => {
    if (list.hasMore) {
      fetchNpsList(false);
    }
  };

  return {
    filters,
    journey: {
      value: paramsJourney,
      label: pickLabel[paramsJourney] || capitalize(paramsJourney),
    },
    npsList: {
      list,
      loadingTable,
      onBottomPage,
      page,
      search,
      selectedRow,
      setSearch,
      setTab,
      tab,
      useSelectedRow: [selectedRow, setSelectedRow],

      onSuccessUpdate,
    },
    npsResult: {
      data: npsResult,
      loading: loadingNpsResult,
    },
    npsTrend: {
      data: npsTrend,
      loading: loadingNpsTrend,
    },
    npsCategory: {
      data: npsCategory,
      loading: loadingNpsCategory,
    },
    npsVOC: {
      data: npsVOC,
      loading: loadingNpsVOC,
    },
    npsCustomer: {
      data: npsCustomer,
      loading: loadingNpsCustomer,
    },
    npsScoreAllJourney: {
      data: npsScoreAllJourney,
      loading: loadingNpsScoreAllJourney,
    },
    npsTotalRespondent: {
      data: npsTotalRespondent,
      loading: loadingNpsTotalRespondent,
    },
    summaryFollowUp: {
      data: summaryFollowUp,
      loading: loadingFollowUp,
    },
    worklog: {
      data: popupWorklog,
      loading: loadingWorklog,
    },
    openCustomerSurvey,
    openFilter,
    openPopupUpdate,
    openPopupListRespondent,
    totalFilter,
    filterPayload,
    setFilters,
    setJourney,
    setOpenCustomerSurvey,
    setOpenFilter,
    setOpenPopupUpdate,
    setOpenPopupListRespondent,
    setPopupWorklog,
    onClickRefresh,
    onClickDownload,
    onClickWorklog,
    onBottomPage,
    smClient,
  };
};

export default useNpsScore;
