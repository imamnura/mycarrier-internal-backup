import React from 'react';
import BrochureList from '@containers/ContentManagement/Homepage/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BannerPages() {
  return (
    <AfterLogin
      containers={BrochureList}
      privileges={privileges.contentManagement.brochure}
    />
  );
}
