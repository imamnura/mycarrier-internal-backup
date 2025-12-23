import React from 'react';
import DetailLoginData from '@containers/ServiceDelivery/ApprovalMRTG/LoginDataDetail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ApprovalMRTGPages() {
  return (
    <AfterLogin
      containers={DetailLoginData}
      privileges={privileges.serviceDelivery.mrtg}
    />
  );
}
