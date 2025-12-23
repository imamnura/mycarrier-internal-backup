import React from 'react';
import OrderHeader from '@containers/LeadManagmentSystem/Dashboard/Detail/elements/OrderHeader';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function OrderHeaderPages() {
  return (
    <AfterLogin
      containers={OrderHeader}
      privileges={privileges.leadManagementSystem.dashboard}
    />
  );
}
