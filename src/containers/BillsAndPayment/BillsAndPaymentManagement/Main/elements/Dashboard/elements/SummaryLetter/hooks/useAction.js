import {
  getListSummaryReminderLetter,
  getListSummaryThanksLetter,
  getSummaryReminderLetter,
  getSummaryThanksLetter,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import moment from 'moment';
import { useEffect, useImperativeHandle, useState } from 'react';
import { LOCATOR } from '../../../test-locator';
import { addTypeToObject, maskLocatorLabel } from '@utils/test-locator';

const COLOR = {
  Sent: '#52BD94',
  'In Progress': '#FFB020',
  Draft: '#3366FF',
  Approval: '#FF7452',
  Failed: '#DE1B1B',
  Reject: '#DE1B1B',
  Rejected: '#DE1B1B',
};

const locatorReminding = LOCATOR.sections.summaryReminderLetter;
const locatorThanks = LOCATOR.sections.summaryThanksLetter;

const useAction = ({ setPopUpList, feature }, ref) => {
  const { setFailedAlert } = usePopupAlert();
  const [reminderPeriod, setReminderPeriod] = useState(null);
  const [reminderLetter, setReminderLetter] = useState({
    loading: true,
    totalAll: 0,
    chart: [],
    chartUnSorted: [],
  });

  const sorting = (a, b) => a.value - b.value;

  const fetchReminder = async () => {
    setReminderLetter((prev) => ({ ...prev, loading: true }));

    let payload = {};

    if (reminderPeriod) {
      payload.period = moment(reminderPeriod).format('YYYYMM');
    }
    try {
      const result = await getSummaryReminderLetter(payload);
      const chart = result.data.summary.map(({ total, label }) => ({
        label,
        value: total,
        color: COLOR[label],
      }));

      setReminderLetter({
        loading: false,
        totalAll: result.data.totalAll,
        chart: [...chart].sort(sorting),
        chartUnSorted: chart,
      });
    } catch (error) {
      setReminderLetter({
        loading: false,
        totalAll: 0,
        chart: [],
        chartUnSorted: [
          { label: 'Draft', value: 0, color: COLOR['Draft'] },
          { label: 'Approval', value: 0, color: COLOR['Approval'] },
          { label: 'In Progress', value: 0, color: COLOR['In Progress'] },
          { label: 'Sent', value: 0, color: COLOR['Sent'] },
          { label: 'Reject', value: 0, color: COLOR['Reject'] },
          { label: 'Failed', value: 0, color: COLOR['Failed'] },
        ],
      });
    }
  };

  useEffect(() => {
    // fetchReminder();
    if (isHaveAccess(feature, 'read_dashboard_bills_and_payment')) {
      // if (isHaveAccess(feature, 'read_list_company_am')) {
      fetchReminder();
    } else {
      setFailedAlert({
        message: "You don't have permission to view dashboard.",
      });
      setReminderLetter({
        loading: false,
        totalAll: 0,
        chart: [],
        chartUnSorted: [
          { label: 'Draft', value: 0, color: COLOR['Draft'] },
          { label: 'Approval', value: 0, color: COLOR['Approval'] },
          { label: 'In Progress', value: 0, color: COLOR['In Progress'] },
          { label: 'Sent', value: 0, color: COLOR['Sent'] },
          { label: 'Reject', value: 0, color: COLOR['Reject'] },
          { label: 'Failed', value: 0, color: COLOR['Failed'] },
        ],
      });
    }
  }, [reminderPeriod]);

  const [thanksPeriod, setThanksPeriod] = useState(null);
  const [thanksLetter, setThanksLetter] = useState({
    loading: true,
    totalAll: 0,
    chart: [],
    chartUnSorted: [],
  });

  const fetchThanks = async () => {
    setThanksLetter((prev) => ({ ...prev, loading: true }));

    let payload = {};

    if (thanksPeriod) {
      payload.period = moment(thanksPeriod).format('YYYYMM');
    }
    try {
      const result = await getSummaryThanksLetter(payload);
      const chart = result.data.summary.map(({ total, label }) => ({
        label,
        value: total,
        color: COLOR[label],
      }));

      setThanksLetter({
        loading: false,
        totalAll: result.data.totalAll,
        chart: [...chart].sort(sorting),
        chartUnSorted: chart,
      });
    } catch (error) {
      setThanksLetter({
        loading: false,
        totalAll: 0,
        chart: [],
        chartUnSorted: [
          { label: 'In Progress', value: 0, color: COLOR['In Progress'] },
          { label: 'Sent', value: 0, color: COLOR['Sent'] },
          { label: 'Failed', value: 0, color: COLOR['Failed'] },
        ],
      });
    }
  };

  useEffect(() => {
    // fetchThanks();
    if (isHaveAccess(feature, 'read_dashboard_bills_and_payment')) {
      // if (isHaveAccess(feature, 'read_list_company_am')) {
      fetchThanks();
    } else {
      setFailedAlert({
        message: "You don't have permission to view dashboard.",
      });
      setThanksLetter({
        loading: false,
        totalAll: 0,
        chart: [],
        chartUnSorted: [
          { label: 'In Progress', value: 0, color: COLOR['In Progress'] },
          { label: 'Sent', value: 0, color: COLOR['Sent'] },
          { label: 'Failed', value: 0, color: COLOR['Failed'] },
        ],
      });
    }
  }, [thanksPeriod]);

  useImperativeHandle(ref, () => ({
    onRefresh: () => {
      fetchReminder();
      fetchThanks();
    },
  }));

  const onOpenReminder = (subType) => () => {
    let p = {
      open: true,
      subType,
      type: 'billingReminder',
      api: getListSummaryReminderLetter,
      staticFilter: {},
      testLocator: addTypeToObject(
        locatorReminding.popup,
        maskLocatorLabel(subType),
      ),
    };

    if (reminderPeriod) {
      p.staticFilter.period = moment(reminderPeriod).format('YYYYMM');
    }

    if (subType !== 'all') {
      p.staticFilter.status = subType;
    }

    // setPopUpList(p);
    if (isHaveAccess(feature, 'read_dashboard_bills_and_payment'))
      setPopUpList(p);
  };

  const onOpenThanks = (subType) => () => {
    let p = {
      open: true,
      subType,
      type: 'thanksLetter',
      api: getListSummaryThanksLetter,
      staticFilter: {},
      testLocator: addTypeToObject(
        locatorThanks.popup,
        maskLocatorLabel(subType),
      ),
    };

    if (thanksPeriod) {
      p.staticFilter.period = moment(thanksPeriod).format('YYYYMM');
    }

    if (subType !== 'all') {
      p.staticFilter.status = subType;
    }

    // setPopUpList(p);
    if (isHaveAccess(feature, 'read_dashboard_bills_and_payment'))
      setPopUpList(p);
  };

  return {
    locatorReminding,
    locatorThanks,
    onOpenReminder,
    onOpenThanks,
    refSummaryLetter: ref,
    reminderLetter,
    reminderPeriod,
    setReminderPeriod,
    setThanksPeriod,
    sorting,
    thanksLetter,
    thanksPeriod,
  };
};

export default useAction;
