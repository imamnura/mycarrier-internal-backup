import React from 'react';
import BrochureList from '@containers/ContentManagement/Brochure/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BrochurePages() {
  return (
    <AfterLogin
      containers={BrochureList}
      privileges={privileges.contentManagement.userDownloadBrochure}
    />
  );
}
