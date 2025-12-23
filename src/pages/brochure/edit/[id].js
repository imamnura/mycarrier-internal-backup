import React from 'react';
import BrochureEdit from '@containers/ContentManagement/Homepage/Create/BrochureUpload';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BrochureEditPages() {
  return (
    <AfterLogin
      containers={BrochureEdit}
      privileges={privileges.contentManagement.brochure}
    />
  );
}
