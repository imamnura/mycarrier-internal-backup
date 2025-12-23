import React from 'react';
import ServiceAssuranceSMSA2PDetail from '@containers/ServiceAssurance/SMSA2P/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ServiceAssuranceSMSA2PPages() {
  return (
    <AfterLogin
      containers={ServiceAssuranceSMSA2PDetail}
      privileges={privileges.serviceAssurance.smsa2p}
    />
  );
}
