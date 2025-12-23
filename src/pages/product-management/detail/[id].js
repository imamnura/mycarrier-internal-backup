import React from 'react';
import ProductManagementDetail from '@containers/ContentManagement/Product/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function NonBulkPages() {
  return (
    <AfterLogin
      containers={ProductManagementDetail}
      privileges={privileges.contentManagement.productManagement}
    />
  );
}
