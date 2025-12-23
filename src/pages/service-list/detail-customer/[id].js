import React from 'react';
import DetailCustomer from '@containers/ServiceDelivery/ServiceList/Detail/Customer';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function DetailCustomerPages() {
  return (
    <AfterLogin
      containers={DetailCustomer}
      privileges={privileges.serviceDelivery.serviceList}
    />
  );
}
