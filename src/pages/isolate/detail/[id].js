import React from 'react';
import IsolateDetail from '@containers/BillsAndPayment/Isolate/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function IsolatePages() {
  return (
    <AfterLogin
      containers={IsolateDetail}
      privileges={privileges.billsAndPayment.isolate}
    />
  );
}
