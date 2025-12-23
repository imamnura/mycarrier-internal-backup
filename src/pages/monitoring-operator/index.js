import React from 'react';
import MonitoringOperatorList from '@containers/ServiceDelivery/MonitoringOperator/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function MonitoringOperator() {
  return (
    <AfterLogin
      containers={MonitoringOperatorList}
      privileges={privileges.serviceDelivery.monitoringOperator}
    />
  );
}
