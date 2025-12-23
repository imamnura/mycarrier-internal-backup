import React from 'react';
import DetailInvoice from '@containers/BillsAndPayment/BillsAndPaymentManagement/DetailInvoice';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BillsAndPaymentDetailInvoicePages() {
  return (
    <AfterLogin
      containers={DetailInvoice}
      privileges={privileges.billsAndPayment.notificationManagement}
    />
  );
}
