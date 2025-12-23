import React from 'react';
import AmMappingList from '@containers/ContentManagement/AmMapping/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function AmMappingPages() {
  return (
    <AfterLogin
      containers={AmMappingList}
      privileges={privileges.contentManagement.amMapping}
    />
  );
}
