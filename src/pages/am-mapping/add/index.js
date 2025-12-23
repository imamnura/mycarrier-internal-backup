import React from 'react';
import AmMappingAdd from '@containers/ContentManagement/AmMapping/Add';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function AmMappingPages() {
  return (
    <AfterLogin
      containers={AmMappingAdd}
      privileges={privileges.contentManagement.amMapping}
    />
  );
}
