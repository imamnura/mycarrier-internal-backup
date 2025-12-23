import React from 'react';
import DetailClaim from '@containers/BillsAndPayment/BillsAndPaymentManagement/DetailClaim';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BillsAndPaymentDetailClaimPages() {
  return (
    <AfterLogin
      containers={DetailClaim}
      privileges={privileges.billsAndPayment.notificationManagement}
    />
  );
}
