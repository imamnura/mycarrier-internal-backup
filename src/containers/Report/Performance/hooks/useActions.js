import { route } from '@configs';
import { size } from '@fragments/List/List';
import { cleanObject } from '@utils/common';
import generateToken from '@utils/generateToken';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useQueryParams from '@utils/hooks/useQueryParams';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  downloadDetailData,
  getChartData,
  getFilterCustomerOptions,
  getFilterDataCenterOptions,
  getList,
} from '../_repositories/repositories';
import {
  currentDate,
  mtdDate,
  optionsFilterReportTime,
  optionsFilterType,
  optionsFilterVisitPurpose,
  ytdDate,
} from '../constant';
import {
  normalizeBarChart,
  normalizeDocumentPie,
  normalizeGeneralPie,
  normalizeGroupedBar,
  parsingValue,
} from '../utils';
import { dialog } from '@fragments/DownloadAuthorization/dialog-bridge';

const useActions = () => {
  const router = useRouter();
  const { setSuccessAlert, setFailedAlert } = usePopupAlert();

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [chartData, setChartData] = useState({
    documentPie: [],
    orderTypePie: null,
    productPie: null,
    customerBar: null,
    performanceBar: null,
    documentValue: null,
    timeBar: [],
  });

  const [page, setPage] = useState(1);
  const [filterCustomer, _setFilterCustomer] = useState({
    label: 'All Customer',
    value: '',
  });
  const [filterDataCenter, _setFilterDataCenter] = useState({
    label: 'All Data Center',
    value: '',
  });
  const [filterReportTime, setFilterReportTime] = useState({
    label: 'Daily',
    value: 'daily',
  });
  const [filterVisitPurpose, setFilterVisitPurpose] = useState({
    label: 'All Visiting Purpose',
    value: '',
  });
  const [filterType, _setFilterType] = useState({
    label: 'All Data',
    value: '',
  });
  const [filterPeriod, _setFilterPeriod] = useState([null, null]);
  const [filterCustomerOptions, setFilterCustomerOptions] = useState([]);
  const [filterDataCenterOptions, setFilterDataCenterOptions] = useState([]);
  const [content, setContent] = useState({});

  const { queryParams, setQueryParams, setQueryParamsForce } = useQueryParams();

  const tabL2 = queryParams.feature;
  const tab = queryParams.category;

  const period = queryParams.period;

  useEffect(() => {
    if (period === 'mtd') {
      setFilterPeriod([mtdDate, currentDate]);
    } else if (period === 'ytd') {
      setFilterPeriod([ytdDate, currentDate]);
    }
  }, [period]);

  const setFilterCustomer = (val) => {
    setPage(1);
    _setFilterCustomer(val);
  };

  const setFilterDataCenter = (val) => {
    setPage(1);
    _setFilterDataCenter(val);
  };

  const setFilterType = (val) => {
    setPage(1);
    _setFilterType(val);
  };

  const setFilterPeriod = (val) => {
    setPage(1);
    _setFilterPeriod(val);
  };

  const setTab = (val) => {
    setQueryParamsForce({ category: val });
    setTabL2('');
  };

  const setTabL2 = (val) => {
    if (val) {
      setPage(1);
      setFilterCustomer({ value: '', label: 'All Customer' });
      setFilterVisitPurpose({ label: 'All Visiting Purpose', value: '' });
      setFilterReportTime({ label: 'Daily', value: 'daily' });
      setFilterDataCenter({ label: 'All Data Center', value: '' });
      setFilterType({ label: 'All Data', value: '' });
      setFilterPeriod([null, null]);
      setQueryParams({ feature: val });
    }
  };

  const [loadingFilterCustomer, setLoadingFilterCustomer] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingDataCenter, setLoadingDataCenter] = useState(false);

  const formatPeriod = (val) => {
    if (!val) return '';
    return moment(val).format('YYYY-MM-DD');
    // const res = moment(val).format('YYYY-MM-DD');
    // if (res === '-') return null;
    // return res;
  };

  const fetchChartData = async () => {
    setLoadingChart(true);

    setChartData({
      documentPie: [],
      orderTypePie: null,
      productPie: null,
      customerBar: null,
      performanceBar: null,
      documentValue: null,
      timeBar: [],
    });

    const paramsTimeApprove = {
      visitType: filterVisitPurpose.value,
      dataCenter: filterDataCenter.value ? filterDataCenter.label : '',
      reportTime: filterReportTime.value,
    };

    const _params = {
      custAccntNum: !['visitNCX', 'timeApproveVisit'].includes(tabL2)
        ? filterCustomer.value
        : '',
      custAccntName:
        ['visitNCX', 'timeApproveVisit'].includes(tabL2) && filterCustomer.value
          ? filterCustomer.label
          : '',
      endDate: formatPeriod(filterPeriod[1]),
      startDate: formatPeriod(filterPeriod[0]),
      type: filterType.value,
      ...(tabL2 === 'timeApproveVisit' && paramsTimeApprove),
    };
    const params = cleanObject(_params);

    try {
      const result = await getChartData(params, tabL2);
      const resData = result.data;
      if (tabL2 === 'timeApproveVisit') {
        setChartData({
          ...chartData,
          timeBar: normalizeGroupedBar(resData, filterReportTime?.value),
        });
      } else {
        setChartData({
          customerBar: normalizeBarChart(resData.customer?.reverse()),
          performanceBar: normalizeBarChart(resData.amPerformance?.reverse()),
          documentPie: normalizeDocumentPie(resData.status, tabL2),
          orderTypePie: normalizeGeneralPie(
            resData.orderType || resData.userType,
          ),
          productPie: normalizeGeneralPie(
            resData.products || resData.troubleType || resData.location,
          ),
          documentValue: {
            value: parsingValue(resData.value),
            totalValue: parsingValue(resData.totalValue),
          },
        });
      }
      setLoadingChart(false);
    } catch (error) {
      setChartData({});
      setLoadingChart(false);
    }
  };

  const fetchFilterCustomerOptions = async () => {
    if (['po', 'baso', 'visitNCX', 'timeApproveVisit'].includes(tabL2)) {
      setLoadingFilterCustomer(true);
      try {
        const result = await getFilterCustomerOptions(tabL2);
        const options = result.data
          .filter(({ custAccntName }) => !!custAccntName)
          .map(({ custAccntNum, custAccntName }) => ({
            value: custAccntNum ? custAccntNum : custAccntName,
            label: custAccntName,
          }));
        setFilterCustomerOptions([
          { value: '', label: 'All Customer' },
          ...options,
        ]);
        setLoadingFilterCustomer(false);
      } catch (error) {
        setFilterCustomerOptions([{ value: '', label: 'All Customer' }]);
        setLoadingFilterCustomer(false);
      }
    }
  };

  const fetchFilterDataCenterOptions = async () => {
    if (['timeApproveVisit'].includes(tabL2)) {
      setLoadingDataCenter(true);
      try {
        const accessTokenGenerate = await generateToken();
        const { data } = await getFilterDataCenterOptions(accessTokenGenerate);
        const normalize = data.map((item) => ({
          value: item.location_id,
          label: item.location_name,
        }));
        setFilterDataCenterOptions([
          { value: '', label: 'All Data Center' },
          ...normalize,
        ]);
        setLoadingDataCenter(false);
      } catch (error) {
        setFilterDataCenterOptions([{ value: '', label: 'All Data Center' }]);
        setLoadingDataCenter(false);
      }
    }
  };

  const fetchList = async (newPage) => {
    const _params = {
      size,
      page: newPage ? newPage : page,
      custAccntNum: !['visitNCX'].includes(tabL2) ? filterCustomer.value : '',
      custAccntName:
        ['visitNCX'].includes(tabL2) && filterCustomer.value
          ? filterCustomer.label
          : '',
      type: filterType.value,
      startDate: formatPeriod(filterPeriod[0]),
      endDate: formatPeriod(filterPeriod[1]),
    };
    const params = cleanObject(_params);

    const validatePath = router.pathname === route.reportPerformance();

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getList({ params }, tabL2);
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
    fetchFilterCustomerOptions();
    fetchChartData();
    setPage(1);
    fetchList(1);
  }, [
    tabL2,
    filterCustomer,
    filterReportTime,
    filterVisitPurpose,
    filterDataCenter,
    filterPeriod,
    filterType,
  ]);

  useEffect(() => {
    fetchFilterCustomerOptions();
    fetchFilterDataCenterOptions();
  }, [tabL2]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const loading = {
    chart: loadingChart,
    filterCustomer: loadingFilterCustomer,
    filterDataCenter: loadingDataCenter,
    download: loadingDownload,
  };

  const validateBakesOfferingLetter = (things) => {
    if (['bakes', 'offeringLetter'].includes(tabL2)) return things;

    return null;
  };

  const validateBakesOfferingLetterServiceAssurance = (things) => {
    if (['bakes', 'offeringLetter'].includes(tabL2)) return things;
    if (['serviceAssurance'].includes(tab)) return things;

    return null;
  };

  const validatePoBasoVIsitNCX = (things) => {
    if (['po', 'baso', 'visitNCX'].includes(tabL2)) return things;

    return null;
  };

  const validateProductPie = (things) => {
    if (!['neucloud', 'timeApproveVisit'].includes(tabL2)) return things;

    return null;
  };

  const validateTimeApprove = ['timeApproveVisit'].includes(tabL2);

  const onClickRefresh = () => {
    fetchFilterCustomerOptions();
    fetchChartData();
  };

  const fetchDownload = async (otherParams) => {
    const _params = {
      custAccntNum: !['visitNCX', 'timeApproveVisit'].includes(tabL2)
        ? filterCustomer.value
        : '',
      custAccntName:
        ['visitNCX'].includes(tabL2) && filterCustomer.value
          ? filterCustomer.label
          : '',
      startDate: formatPeriod(filterPeriod[0]),
      endDate: formatPeriod(filterPeriod[1]),
      ...otherParams,
    };
    const params = cleanObject(_params);

    setLoadingDownload(true);
    try {
      const { data } = await downloadDetailData(tabL2, params);
      let fileUrl = data?.fileUrlDownload || data?.fileUrl;
      setSuccessAlert({
        message: 'Detail data successfully downloaded.',
      });
      setLoadingDownload(false);
      window.open(fileUrl, '_blank');
    } catch (error) {
      if (error.code === 403) {
        dialog.show('Forbidden download');
        setLoadingDownload(false);
        return;
      }

      setLoadingDownload(false);
      setFailedAlert({
        message: error?.message,
      });
    }
  };

  const onClickDownload = () => {
    if (tabL2 === 'timeApproveVisit') {
      setContent({
        title: 'Choose spesific filtering to download data',
        textInfo:
          'More spesific filtering that you’ve been choosed will generate spesific data',
        open: true,
        options: {
          dataCenter: filterDataCenterOptions,
          customer: filterCustomerOptions,
        },
        loading: {
          customer: loadingFilterCustomer,
          dataCenter: loadingDataCenter,
          download: loadingDownload,
        },
        fetchDownload: fetchDownload,
        tab: tabL2,
      });
    } else fetchDownload();
  };

  const filter = () => {
    let filters = [];

    if (tabL2 === 'timeApproveVisit') {
      filters.push({
        maxWidth: 300,
        onChange: setFilterReportTime,
        options: optionsFilterReportTime,
        type: 'dropdown',
        value: filterReportTime,
      });

      filters.push({
        isLoading: loading.filterDataCenter,
        isSearchable: true,
        maxWidth: 300,
        onChange: setFilterDataCenter,
        options: filterDataCenterOptions,
        type: 'dropdown',
        value: filterDataCenter,
      });

      filters.push({
        maxWidth: 300,
        onChange: setFilterVisitPurpose,
        options: optionsFilterVisitPurpose,
        type: 'dropdown',
        value: filterVisitPurpose,
      });
    }
    if (tabL2 !== 'timeApproveVisit') {
      filters.push({
        onChange: setFilterPeriod,
        type: 'dateRange',
        value: filterPeriod,
        variant: 'secondary',
      });
    }

    if (['po', 'baso', 'visitNCX', 'timeApproveVisit'].includes(tabL2)) {
      filters.push({
        isLoading: loading.filterCustomer,
        isSearchable: true,
        maxWidth: 300,
        onChange: setFilterCustomer,
        options: filterCustomerOptions,
        type: 'dropdown',
        value: filterCustomer,
      });
    }

    if (tabL2 === 'baso') {
      filters.push({
        onChange: setFilterType,
        type: 'dropdown',
        options: optionsFilterType,
        value: filterType,
      });
    }

    return filters;
  };

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    content,
    setContent,
    chartData,
    filter,
    filterReportTime: filterReportTime?.value,
    list,
    loading,
    onClickDownload,
    onClickRefresh,
    setFilterCustomer,
    setFilterPeriod,
    setFilterType,
    setTab,
    tab,
    setTabL2,
    tabL2,
    validateBakesOfferingLetter,
    validateBakesOfferingLetterServiceAssurance,
    validatePoBasoVIsitNCX,
    validateProductPie,
    validateTimeApprove,
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useActions;
