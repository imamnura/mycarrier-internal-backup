import React from 'react';
import AmMappingDetail from '@containers/ContentManagement/AmMapping/CustomerDetail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function AmMappingPages() {
  return (
    <AfterLogin
      containers={AmMappingDetail}
      privileges={privileges.contentManagement.amMapping}
    />
  );
}
