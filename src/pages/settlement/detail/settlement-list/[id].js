import React from 'react';
import SettlementDetail from '@containers/BillsAndPayment/Settlement/Detail/SettlementList';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function SettlementPages() {
  return (
    <AfterLogin
      containers={SettlementDetail}
      privileges={privileges.billsAndPayment.settlement}
    />
  );
}
