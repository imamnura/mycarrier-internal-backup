import React from 'react';
import SettlementDetail from '@containers/BillsAndPayment/Settlement/Detail/Users';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function SettlementDetailPages() {
  return (
    <AfterLogin
      containers={SettlementDetail}
      privileges={privileges.billsAndPayment.settlement}
    />
  );
}
