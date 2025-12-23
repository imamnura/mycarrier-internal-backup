import { useEffect, useState, useMemo } from 'react';
import {
  getListBillingInformation,
  downloadBillingData,
  getSummaryBilling,
} from '@containers/Document/PurchaseOrder/_repositories/repositories';
import useQueryParams from '@utils/hooks/useQueryParams';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  statusLabel,
  optionsFilterStatus,
  emptyMessageTableBillingInformation,
} from '../../utils';
import { tableHeader } from '../../constant';
import { toLowerCase } from '@utils/text';

const useAction = () => {
  const { queryParams } = useQueryParams();
  const { id: orderNumber } = queryParams;
  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();

  const [list, setList] = useState({ data: [], meta: {} });
  const [page, setPage] = useState(1);
  const [tab, _setTab] = useState('');
  const [loadingTable, setLoadingTable] = useState(false);
  const [filterStatus, setFilterStatus] = useState({
    label: 'All Status',
    value: '',
  });
  const [dataSummary, setDataSummary] = useState({});
  const [loadingSummary, setLoadingSummary] = useState(false);

  const setTab = (val) => {
    setPage(1);
    _setTab(val);
  };

  const tabsProps = () => {
    const options = [
      { value: 'order-information', label: 'Order Information' },
      { value: 'billing-information', label: 'Billing Information' },
    ];

    if (!tab) setTab(options[0].value);

    return {
      options,
      value: tab,
      onChange: setTab,
      isCustom: true,
    };
  };

  const onClickDownload = async () => {
    setLoadingAlert();
    const _params = {
      orderNumber,
      status: filterStatus.value,
    };
    const params = cleanObject(_params);

    try {
      const result = await downloadBillingData({ params });
      window.open(result.data.fileUrl);
      setSuccessAlert({
        message: 'File successfully downloaded',
      });
    } catch (error) {
      setFailedAlert({
        message: error.message,
      });
    }
  };

  const fetchListBillingInformation = async (newPage) => {
    const _params = {
      page: newPage ? newPage : page,
      orderNumber,
      status: filterStatus?.value,
    };
    const params = cleanObject(_params);

    if (!loadingTable) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getListBillingInformation({
          params,
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

  const fetchGetSummaryBilling = async () => {
    const _params = { status: filterStatus?.value, orderNumber };
    const params = cleanObject(_params);
    setLoadingSummary(true);
    try {
      const { data } = await getSummaryBilling(params);
      setDataSummary(data);
    } catch (error) {
      setDataSummary({});
    } finally {
      setLoadingSummary(false);
    }
  };

  useEffect(() => {
    if (tab === 'billing-information') {
      fetchListBillingInformation(1);
      fetchGetSummaryBilling();
    }
  }, [tab, filterStatus]);

  useEffect(() => {
    if (tab === 'billing-information') {
      fetchListBillingInformation();
    }
  }, [page]);

  const normalizeData = useMemo(() => {
    if (!list) {
      return null;
    }

    return {
      ...list,
      data: list?.data?.map((item) => ({
        ...item,
        status: statusLabel[item?.status] || item?.status,
      })),
    };
  }, [list]);

  const filterBillingInformation = () => {
    let filters = [];

    filters.push({
      onChange: setFilterStatus,
      options: optionsFilterStatus,
      type: 'dropdown',
      value: filterStatus,
    });

    return filters;
  };

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const listProps = {
    title: 'Billing Information',
    filter: filterBillingInformation(),
    tabs: tabsProps(),
    table: {
      data: normalizeData?.data,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      schema: tableHeader[tab],
      onPaginationChange: onPaginationChange,
      customEmptyMessage: emptyMessageTableBillingInformation,
    },
  };

  const isShowTabBillingInformation = (data) => {
    const validProductFlows = [
      'FABD Product',
      'FABD Solution (without Partner Access)',
      'FABD Product (without BASO)',
      'FABD Solution',
    ];

    const isNeuCloudElasticaNewOrder =
      toLowerCase(data?.orderInformation?.product) === 'neucloud elastica' &&
      toLowerCase(data?.orderInformation?.orderType) === 'new order';

    return (
      (data?.status === 'completed' || data?.status === 'order created') &&
      (validProductFlows.includes(data?.productFlow) ||
        isNeuCloudElasticaNewOrder)
    );
  };

  return {
    list,
    listProps,
    tab,
    onClickDownload,
    dataSummary,
    loadingSummary,
    isShowTabBillingInformation,
  };
};

export default useAction;
