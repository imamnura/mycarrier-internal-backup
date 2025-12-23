import React from 'react';
import BrochureDetail from '@containers/ContentManagement/Brochure/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BrochurePages() {
  return (
    <AfterLogin
      containers={BrochureDetail}
      privileges={privileges.contentManagement.userDownloadBrochure}
    />
  );
}
