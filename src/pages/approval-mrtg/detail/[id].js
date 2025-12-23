import React from 'react';
import ApprovalMRTGDetail from '@containers/ServiceDelivery/ApprovalMRTG/CustomerMRTGDetail-v2';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ApprovalMRTGPages() {
  return (
    <AfterLogin
      containers={ApprovalMRTGDetail}
      privileges={privileges.serviceDelivery.mrtg}
    />
  );
}
