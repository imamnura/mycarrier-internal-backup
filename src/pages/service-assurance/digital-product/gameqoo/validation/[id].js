import React from 'react';
import ServiceAssuranceGameqooValidation from '@containers/ServiceAssurance/DigitalProduct/Validation';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ServiceAssuranceGameqooPages() {
  return (
    <AfterLogin
      containers={ServiceAssuranceGameqooValidation}
      privileges={privileges.serviceAssurance.digitalProduct}
    />
  );
}
