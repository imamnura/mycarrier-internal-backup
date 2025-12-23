import React from 'react';
import ServiceAssuranceNeucloudList from '@containers/ServiceAssurance/Neucloud/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ServiceAssuranceNeucloudPages() {
  return (
    <AfterLogin
      containers={ServiceAssuranceNeucloudList}
      privileges={privileges.serviceAssurance.neucloud}
    />
  );
}
