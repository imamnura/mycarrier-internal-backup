import React from 'react';
import ServiceAssuranceSMSA2PList from '@containers/ServiceAssurance/SMSA2P/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ServiceAssuranceSMSA2PPages() {
  return (
    <AfterLogin
      containers={ServiceAssuranceSMSA2PList}
      privileges={privileges.serviceAssurance.smsa2p}
    />
  );
}
