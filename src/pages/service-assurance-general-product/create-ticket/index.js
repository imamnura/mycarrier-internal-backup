import React from 'react';
import ServiceAssuranceGeneralProductCreate from '@containers/ServiceAssurance/GeneralProduct/Create';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ServiceAssuranceGeneralProductPages() {
  return (
    <AfterLogin
      containers={ServiceAssuranceGeneralProductCreate}
      privileges={privileges.serviceAssurance.generalProduct}
    />
  );
}
