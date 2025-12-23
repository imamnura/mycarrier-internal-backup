import React from 'react';
// import SendBillingReminder from '@containers/BillsAndPayment/BillsAndPaymentManagement/SendBillingReminder';
import CreateBillingReminder from '@containers/BillsAndPayment/BillsAndPaymentManagement/BillingReminder/Create';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BillsAndPaymentCreateBillingReminderPages() {
  return (
    <AfterLogin
      containers={CreateBillingReminder}
      privileges={privileges.billsAndPayment.notificationManagement}
    />
  );
}
