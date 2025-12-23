import React from 'react';
import DeliveryTracking from '@containers/ServiceDelivery/DeliveryTracking/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function DeliveryTrackingPage() {
  return (
    <AfterLogin
      containers={DeliveryTracking}
      privileges={privileges.serviceDelivery.deliveryTracking}
    />
  );
}
