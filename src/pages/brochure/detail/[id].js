import React from 'react';
import BrochureDetail from '@containers/ContentManagement/Homepage/Detail/BrochureUpload';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BrochureDetailPages() {
  return (
    <AfterLogin
      containers={BrochureDetail}
      privileges={privileges.contentManagement.brochure}
    />
  );
}
