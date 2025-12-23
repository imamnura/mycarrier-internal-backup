import {
  getInvoiceSummary,
  getListInvoiceSummary,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import { cleanObject, isHaveAccess } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import moment from 'moment';
import { useEffect, useImperativeHandle, useState } from 'react';
import { LOCATOR } from '../../../test-locator';

const useAction = (props, ref) => {
  const { setPopUpList, feature } = props;
  const { setFailedAlert } = usePopupAlert();
  const [data, setData] = useState({
    base: {
      totalAll: 0,
      totalInitial: 0,
      totalInprogress: 0,
      totalFinish: 0,
    },
    all: 0,
    requested: 0,
    inProgress: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);

  const [period, setPeriod] = useState(null);
  const [requestTime, setRequestTime] = useState({
    label: 'All Request Time',
    value: '',
  });

  const fetchInvoiceSummary = async () => {
    setLoading(true);

    let payload = {
      suspect: !!requestTime.value,
    };

    if (period) {
      payload.period = moment(period).format('YYYYMM');
    }

    try {
      const result = await getInvoiceSummary({ params: cleanObject(payload) });
      setData({
        base: result.data,
        all: new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(
          result.data.totalAll,
        ),
        requested: new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(
          result.data.totalInitial,
        ),
        inProgress: new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(
          result.data.totalInprogress,
        ),
        completed: new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(
          result.data.totalFinish,
        ),
      });
    } catch (error) {
      setData({
        base: {
          totalAll: 0,
          totalInitial: 0,
          totalInprogress: 0,
          totalFinish: 0,
        },
        all: 0,
        requested: 0,
        inProgress: 0,
        completed: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    onRefresh: fetchInvoiceSummary,
  }));

  useEffect(() => {
    // fetchInvoiceSummary();
    if (isHaveAccess(feature, 'read_dashboard_bills_and_payment')) {
      // if (isHaveAccess(feature, 'read_list_company_am')) {
      fetchInvoiceSummary();
    } else {
      setFailedAlert({
        message: "You don't have permission to view dashboard.",
      });
      setLoading(false);
    }
  }, [period, requestTime]);

  const testLocator = LOCATOR.sections.summaryInvoice;

  const onViewAll = (subType) => () => {
    let p = {
      open: true,
      subType,
      type: 'invoice',
      api: getListInvoiceSummary,
      staticFilter: {
        suspect: !!requestTime.value,
      },
      testLocator: testLocator[subType].popup,
    };

    if (period) {
      p.staticFilter.period = moment(period).format('YYYYMM');
    }

    if (subType !== 'all') {
      p.staticFilter.status = {
        completed: 'FINISH',
        inProgress: 'INPROGRESS',
        requested: 'INITIAL',
      }[subType];
    }

    // setPopUpList(p);
    if (isHaveAccess(feature, 'read_dashboard_bills_and_payment'))
      setPopUpList(p);
  };

  return {
    data,
    period,
    loading,
    requestTime,
    refSummaryInvoice: ref,
    setRequestTime,
    setPeriod,
    onViewAll,
  };
};

export default useAction;
