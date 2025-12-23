import React from 'react';
import ServiceList from '@containers/ServiceDelivery/ServiceList/List/Customer';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ServiceListPages() {
  return (
    <AfterLogin
      containers={ServiceList}
      privileges={privileges.serviceDelivery.serviceList}
    />
  );
}
