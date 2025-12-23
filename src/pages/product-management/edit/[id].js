import React from 'react';
import ProductManagementEdit from '@containers/ContentManagement/Product/Add'; //product v1
// import ProductManagementEdit from '@containers/ContentManagement/Product/Add-v2'; //product v2
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ProductManagementPages() {
  return (
    <AfterLogin
      containers={ProductManagementEdit}
      privileges={privileges.contentManagement.productManagement}
    />
  );
}
