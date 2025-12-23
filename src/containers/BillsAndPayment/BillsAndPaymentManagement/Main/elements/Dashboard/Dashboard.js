import React from 'react';
import SummaryInvoice from './elements/SummaryInvoice';
import PopUpList from './elements/PopUpList';
import useAction from './hooks/useAction';
import PaymentHistorical from './elements/PaymentHistorical';
import SummaryLetter from './elements/SummaryLetter';
import { Box } from '@legion-ui/core';
import Reload from '@assets/icon-v2/Reload';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import { isHaveAccess } from '@utils/common';
import { LOCATOR } from './test-locator';

const BillAndPaymentDashboard = (props) => {
  const {
    tab,
    popUpList,
    refSummaryLetter,
    refSummanyInvoice,
    refPaymentHistorical,
    onClickRefresh,
    onClosePopUpList,
    setPopUpList,
    setTab,
  } = useAction();

  const headerProps = {
    tabs: {
      onChange: setTab,
      options: [
        { label: 'Dashboard', value: 'dashboard', id: LOCATOR.tab.dashboard },
        {
          label: 'Company List',
          value: 'company-list',
          id: LOCATOR.tab.companyList,
        },
      ],
      value: tab,
    },
    action: (isHaveAccess(props.feature, 'read_dashboard_bills_and_payment') ||
      isHaveAccess(props.feature, 'create_upload_historical_payment')) && [
      {
        children: 'refresh',
        id: LOCATOR.refresh,
        leftIcon: Reload,
        onClick: onClickRefresh,
      },
    ],
    breadcrumb: [{ label: 'Bills & Payment Management' }],
  };

  return (
    <>
      <HeaderAndFilter {...headerProps} />
      <Box margin={'0px 40px 20px 40px'}>
        <section>
          <SummaryInvoice
            setPopUpList={setPopUpList}
            ref={refSummanyInvoice}
            feature={props.feature}
          />
        </section>
        <section>
          <SummaryLetter
            setPopUpList={setPopUpList}
            ref={refSummaryLetter}
            feature={props.feature}
          />
        </section>
        {isHaveAccess(props.feature, 'create_upload_historical_payment') && (
          <section>
            <PaymentHistorical
              feature={props.feature}
              ref={refPaymentHistorical}
            />
          </section>
        )}
        {popUpList.open && (
          <PopUpList {...popUpList} onClose={onClosePopUpList} />
        )}
      </Box>
    </>
  );
};

export default BillAndPaymentDashboard;
