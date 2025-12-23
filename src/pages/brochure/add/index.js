import React from 'react';
import BrochureAdd from '@containers/ContentManagement/Homepage/Create/BrochureUpload';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BrochureAddPages() {
  return (
    <AfterLogin
      containers={BrochureAdd}
      privileges={privileges.contentManagement.brochure}
    />
  );
}
