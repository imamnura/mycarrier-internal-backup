import React from 'react';
import Settlement from '@containers/BillsAndPayment/Settlement/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function SettlementPages() {
  return (
    <AfterLogin
      containers={Settlement}
      privileges={privileges.billsAndPayment.settlement}
    />
  );
}
