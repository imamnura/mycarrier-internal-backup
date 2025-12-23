import React from 'react';
import ServiceDetail from '@containers/ServiceDelivery/DeliveryTracking/ServiceDetail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ServiceDetailPages() {
  return (
    <AfterLogin
      containers={ServiceDetail}
      privileges={privileges.serviceDelivery.deliveryTracking}
    />
  );
}
