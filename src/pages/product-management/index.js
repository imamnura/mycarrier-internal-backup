import React from 'react';
import ProductManagementList from '@containers/ContentManagement/Product/List';
// import ProductManagementList from '@containers/ContentManagement/Product/List-v2';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ProductManagementPages() {
  return (
    <AfterLogin
      containers={ProductManagementList}
      privileges={privileges.contentManagement.productManagement}
    />
  );
}
