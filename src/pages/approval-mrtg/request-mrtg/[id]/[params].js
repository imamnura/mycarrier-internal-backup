import React from 'react';
import RequestMRTGDetail from '@containers/ServiceDelivery/ApprovalMRTG/RequestMRTGDetail-v2';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ApprovalMRTGPages() {
  return (
    <AfterLogin
      containers={RequestMRTGDetail}
      privileges={privileges.serviceDelivery.mrtg}
    />
  );
}
