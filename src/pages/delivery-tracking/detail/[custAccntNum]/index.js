import React from 'react';
import OrderHeader from '@containers/ServiceDelivery/DeliveryTracking/OrderHeader';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function OrderHeaderDelivery() {
  return (
    <AfterLogin
      containers={OrderHeader}
      privileges={privileges.serviceDelivery.deliveryTracking}
    />
  );
}
