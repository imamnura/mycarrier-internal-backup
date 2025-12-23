import React from 'react';
import ServiceAssuranceGeneralProductList from '@containers/ServiceAssurance/GeneralProduct/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ServiceAssuranceGeneralProductPages() {
  return (
    <AfterLogin
      containers={ServiceAssuranceGeneralProductList}
      privileges={privileges.serviceAssurance.generalProduct}
    />
  );
}
