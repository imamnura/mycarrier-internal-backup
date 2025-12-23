import React from 'react';
import ServiceAssuranceGeneralProductValidation from '@containers/ServiceAssurance/GeneralProduct/Validation';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ServiceAssuranceGeneralProductPages() {
  return (
    <AfterLogin
      containers={ServiceAssuranceGeneralProductValidation}
      privileges={privileges.serviceAssurance.generalProduct}
    />
  );
}
