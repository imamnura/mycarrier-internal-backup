import React from 'react';
import DetailProject from '@containers/ServiceDelivery/ServiceList/Detail/Project';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function DetailProjectPages() {
  return (
    <AfterLogin
      containers={DetailProject}
      privileges={privileges.serviceDelivery.serviceList}
    />
  );
}
