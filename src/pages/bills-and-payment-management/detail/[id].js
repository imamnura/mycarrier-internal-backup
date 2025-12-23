import React from 'react';
import BillsAndPaymentListDetail from '@containers/BillsAndPayment/BillsAndPaymentManagement/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BillsAndPaymentDetailPages() {
  return (
    <AfterLogin
      containers={BillsAndPaymentListDetail}
      privileges={privileges.billsAndPayment.notificationManagement}
    />
  );
}
