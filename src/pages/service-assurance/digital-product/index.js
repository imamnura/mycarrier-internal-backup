import React from 'react';
import ServiceAssuranceDigitalProductList from '@containers/ServiceAssurance/DigitalProduct/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ServiceAssuranceDigitalProductListPages() {
  return (
    <AfterLogin
      containers={ServiceAssuranceDigitalProductList}
      privileges={privileges.serviceAssurance.digitalProduct}
    />
  );
}
