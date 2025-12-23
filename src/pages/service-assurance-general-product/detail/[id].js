import React from 'react';
import ServiceAssuranceGeneralProductDetail from '@containers/ServiceAssurance/GeneralProduct/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ServiceAssuranceSMSA2PPages() {
  return (
    <AfterLogin
      containers={ServiceAssuranceGeneralProductDetail}
      privileges={privileges.serviceAssurance.generalProduct}
    />
  );
}
