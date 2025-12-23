import React from 'react';
import ServiceAssuranceGameqooDetail from '@containers/ServiceAssurance/Gameqoo/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ServiceGameqooPages() {
  return (
    <AfterLogin
      containers={ServiceAssuranceGameqooDetail}
      privileges={privileges.serviceAssurance.gameqoo}
    />
  );
}
