import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDataGraph,
  getDropdownOption,
  getDownloadReportNonBulk,
} from '../_repositories/repositories';
import { cleanObject, isHaveAccess } from '@utils/common';
import { useRouter } from 'next/router';
import { route } from '@configs/index';
import moment from 'moment';
import { normalizeChart } from '../chartHandler';
import { dateRange, options } from '../utils';
import Reload from '@assets/icon-v2/Reload';
import useQueryParams from '@utils/hooks/useQueryParams';
import { dialog } from '@fragments/DownloadAuthorization/dialog-bridge';


const useAction = (props) => {
  const router = useRouter();

  const { feature } = props;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();

  const [dataGraph, setDataGraph] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, _setTab] = useState(undefined);
  const [chartType, setChartType] = useState({ label: 'Bar', value: 'bar' });
  const [reportTime, setReportTime] = useState({
    label: 'Daily',
    value: 'daily',
  });
  const [reportCustomer, setReportCustomer] = useState({
    label: 'All Customer',
    value: '',
  });
  const [reportType, setReportType] = useState({
    label: 'Last Update',
    value: 'totalSender',
  });
  const [optionsFilterCustomer, setOptionsFilterCustomer] = useState([
    { value: '', label: 'All Customer' },
  ]);
  const [modalDownload, setModalDownload] = useState(false);

  const onClickModalDownload = () => () => setModalDownload(!modalDownload);

  const setTab = (val) => {
    setChartType({ label: 'Bar', value: 'bar' });
    setReportTime({
      label: 'Daily',
      value: 'daily',
    });
    setReportCustomer({
      label: 'All Customer',
      value: '',
    });
    setReportType({
      label: 'Last Update',
      value: 'totalSender',
    });
    _setTab(val);
  };

  const fetchDataGraph = async () => {
    const rangeTime = dateRange(reportTime.value);
    const _params = {
      custAccntNum: reportCustomer?.value,
      reportTime: reportTime?.value,
      reportType:
        !isHaveAccess(feature, 'read_total_bulk') || tab === 1
          ? 'deliveryTime'
          : reportType?.value,
      startDate: rangeTime[0] ? rangeTime[0].format('YYYY-MM-DD') : '',
      endDate: rangeTime[1] ? rangeTime[1].format('YYYY-MM-DD') : '',
    };
    const params = cleanObject(_params);

    const validatePath = router.pathname === route.reportSenderId();

    if (!loading && validatePath) {
      setLoading(true);
      try {
        const { data } = await getDataGraph({
          params,
          withCancel: true,
        });

        const selectedData =
          params?.reportType === 'deliveryTime'
            ? data?.average || []
            : data?.detail || [];

        const normalizeData = normalizeChart(
          selectedData.sort((a, b) => {
            const date =
              moment(a?._id?.date).format('YYYYMMDD') -
              moment(b?._id?.date).format('YYYYMMDD');
            const week = a?._id?.week - b?._id?.week;
            const month = a?._id?.month - b?._id?.month;
            const year = a?._id?.year - b?._id?.year;

            switch (params?.reportTime) {
              case 'daily':
                return date;
              case 'weekly':
                if (month !== 0) {
                  return month;
                } else {
                  return week;
                }
              case 'monthly':
                if (year !== 0) {
                  return year;
                } else {
                  return month;
                }
              case 'yearly':
                return year;
              default:
                return;
            }
          }),
          { ...params, chartType: chartType?.value },
        );
        setDataGraph(normalizeData);
      } catch (error) {
        setDataGraph([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchOptionsCustomer = async () => {
    try {
      const { data } = await getDropdownOption('customer');
      const normalizeOptionsCustomer = data.map(
        ({ custAccntName, custAccntNum }) => ({
          value: custAccntNum,
          label: custAccntName,
        }),
      );
      setOptionsFilterCustomer([
        { value: '', label: 'All Customer' },
        ...normalizeOptionsCustomer,
      ]);
    } catch (error) {
      setOptionsFilterCustomer([{ value: '', label: 'All Customer' }]);
    }
  };

  const fetchDownload = async (formData) => {
    const { reportType, reportTime, custAccntNum, rangeTime, date } = formData;

    const params = {
      reportType:
        reportType.value === 'deliveryTime' ? reportType.value : date.value,
      reportTime: reportTime.value,
      custAccntNum: custAccntNum.value === 'all' ? '' : custAccntNum.value,
      startDate: moment(rangeTime[0]).format('YYYY-MM-DD'),
      endDate: moment(rangeTime[1]).format('YYYY-MM-DD'),
    };

    try {
      setLoadingAlert();
      const { data } = await getDownloadReportNonBulk(cleanObject(params));
      window.open(data, '_blank');
      setSuccessAlert({
        message: 'Report successfully downloaded',
      });
    } catch (e) {
      if (e.code === 403) {
        dialog.show('Forbidden download');
        return;
      }
      setFailedAlert({
        message: e.message,
      });
    }
  };

  useEffect(() => {
    fetchDataGraph();

    return () => {
      setDataGraph([]);
    };
  }, [tab, reportCustomer, reportTime, chartType, reportType]);

  useEffect(() => {
    fetchOptionsCustomer();
  }, []);

  const onClickRefresh = () => () => setTab(tab);

  const action = () => {
    let actions = [];

    if (
      isHaveAccess(feature, 'read_total_bulk') ||
      isHaveAccess(feature, 'read_time_delivery')
    ) {
      actions.push({
        onClick: onClickRefresh(),
        children: 'Refresh',
        loading: loading,
        leftIcon: Reload,
      });
    }
    if (isHaveAccess(props.feature, 'read_downloadReport')) {
      actions.push({
        children: 'Download',
        onClick: onClickModalDownload(),
        hideDivider: true,
        ml: 24,
      });
    }

    return actions;
  };

  const filterProps = () => {
    const filters = [];

    filters.push({
      maxWidth: 300,
      onChange: setChartType,
      options: options.type,
      type: 'dropdown',
      value: chartType,
    });
    filters.push({
      maxWidth: 300,
      onChange: setReportTime,
      options: options.time,
      type: 'dropdown',
      value: reportTime,
    });
    filters.push({
      maxWidth: 300,
      onChange: setReportCustomer,
      options: optionsFilterCustomer,
      type: 'dropdown',
      value: reportCustomer,
    });
    filters.push({
      maxWidth: 300,
      onChange: setReportType,
      options: options.date,
      type: 'dropdown',
      value: reportType,
    });

    return filters;
  };

  const tabsProps = () => {
    let tabs = {
      options: [],
      value: tab,
      onChange: setTab,
    };

    if (isHaveAccess(feature, 'read_total_bulk')) {
      tabs.options.push({
        value: 0,
        label: 'Total Bulk',
      });
    }
    if (isHaveAccess(feature, 'read_time_delivery')) {
      tabs.options.push({ value: 1, label: 'Time Delivery' });
    }
    if (tab === '') setTab(tabs.options[0]?.value);

    return tabs;
  };

  const { queryParams } = useQueryParams();

  useEffect(() => {
    if (queryParams.category === 'time-delivery') {
      setTab(1);
    } else {
      setTab(0);
    }
  }, [queryParams.category]);

  return {
    action,
    chartType,
    dataGraph,
    loading,
    filterProps,
    reportTime,
    tab,
    tabsProps,
    modalDownload,
    setModalDownload,
    onClickModalDownload,
    optionsFilterCustomer,
    fetchDownload,
  };
};

export default useAction;
