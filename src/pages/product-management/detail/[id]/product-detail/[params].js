import React from 'react';
import ProductDetail from '@containers/ContentManagement/Product/Detail/Elements/SubDetail/SubDetail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function NonBulkPages() {
  return (
    <AfterLogin
      containers={ProductDetail}
      privileges={privileges.contentManagement.productManagement}
    />
  );
}
