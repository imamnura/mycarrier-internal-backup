import React from 'react';
import ServiceAssuranceNeucloudDetail from '@containers/ServiceAssurance/Neucloud/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ServiceAssuranceNeucloudPages() {
  return (
    <AfterLogin
      containers={ServiceAssuranceNeucloudDetail}
      privileges={privileges.serviceAssurance.neucloud}
    />
  );
}
