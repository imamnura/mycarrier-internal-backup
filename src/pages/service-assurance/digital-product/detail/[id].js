import React from 'react';
import ServiceAssuranceDigitalProduct from '@containers/ServiceAssurance/DigitalProduct/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ServiceAssuranceDigitalProductPages() {
  return (
    <AfterLogin
      containers={ServiceAssuranceDigitalProduct}
      privileges={privileges.serviceAssurance.digitalProduct}
    />
  );
}
