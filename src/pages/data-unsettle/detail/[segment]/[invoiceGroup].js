import React from 'react';
import DataUnsettleDetail from '@containers/BillsAndPayment/DataUnsettle/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function DataUnsettlePages() {
  return (
    <AfterLogin
      containers={DataUnsettleDetail}
      privileges={privileges.billsAndPayment.dataUnsettle}
    />
  );
}
