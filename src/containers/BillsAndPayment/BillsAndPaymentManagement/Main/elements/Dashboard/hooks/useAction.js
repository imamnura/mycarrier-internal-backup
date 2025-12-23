import { route } from '@configs/index';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const useAction = () => {
  const router = useRouter();

  const refSummanyInvoice = React.useRef();
  const refSummaryLetter = React.useRef();
  const refPaymentHistorical = React.useRef();

  const tab = router.query?.tab;
  const setTab = (value) => {
    router.push(route.billsAndPayment(value));
  };

  const [popUpList, setPopUpList] = useState({
    open: false,
    type: 'invoice',
    subType: 'all',
  });

  const onClosePopUpList = () => {
    setPopUpList({ ...popUpList, testLocator: { id: '' }, open: false });
  };

  const onClickRefresh = () => {
    refSummanyInvoice.current.onRefresh();
    refSummaryLetter.current.onRefresh();
    refPaymentHistorical.current.onRefresh();
  };

  return {
    tab,
    popUpList,
    refSummaryLetter,
    refSummanyInvoice,
    refPaymentHistorical,
    onClosePopUpList,
    onClickRefresh,
    setPopUpList,
    setTab,
  };
};

export default useAction;
