import React from 'react';
import ProductConfigForm from '@containers/ContentManagement/POConfig/Form';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ProductConfig() {
  return (
    <AfterLogin
      containers={ProductConfigForm}
      privileges={privileges.contentManagement.poConfig}
    />
  );
}
