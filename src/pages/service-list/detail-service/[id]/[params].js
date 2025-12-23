import React from 'react';
import DetailService from '@containers/ServiceDelivery/ServiceList/Detail/Service-v2';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function DetailServicePages() {
  return (
    <AfterLogin
      containers={DetailService}
      privileges={privileges.serviceDelivery.serviceList}
    />
  );
}
