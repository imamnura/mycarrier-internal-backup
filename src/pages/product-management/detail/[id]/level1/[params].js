import React from 'react';
import Level1Detail from '@containers/ContentManagement/Product/Detail/Elements/SubDetail/SubDetail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function NonBulkPages() {
  return (
    <AfterLogin
      containers={Level1Detail}
      privileges={privileges.contentManagement.productManagement}
    />
  );
}
