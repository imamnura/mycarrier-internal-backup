import React from 'react';
import OrderDetail from '@containers/ServiceDelivery/DeliveryTracking/OrderDetail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function OrderDetailPages() {
  return (
    <AfterLogin
      containers={OrderDetail}
      privileges={privileges.serviceDelivery.deliveryTracking}
    />
  );
}
