import React from 'react';
import IsolateList from '@containers/BillsAndPayment/Isolate/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function IsolatePages() {
  return (
    <AfterLogin
      containers={IsolateList}
      privileges={privileges.billsAndPayment.isolate}
    />
  );
}
