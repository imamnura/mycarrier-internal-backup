import React from 'react';
import NotificationManagement from '@containers/BillsAndPayment/BillsAndPaymentManagement/Main';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function NotificationManagementPages() {
  return (
    <AfterLogin
      containers={NotificationManagement}
      privileges={privileges.billsAndPayment.notificationManagement}
    />
  );
}
