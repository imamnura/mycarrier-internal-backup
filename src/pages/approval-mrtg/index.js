import React from 'react';
import ApprovalMRTGList from '@containers/ServiceDelivery/ApprovalMRTG/CustomerMRTGList';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ApprovalMRTGPages() {
  return (
    <AfterLogin
      containers={ApprovalMRTGList}
      privileges={privileges.serviceDelivery.mrtg}
    />
  );
}
