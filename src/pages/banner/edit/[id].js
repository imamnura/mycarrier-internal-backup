import React from 'react';
import BannerEdit from '@containers/ContentManagement/Homepage/Create/BannerV2';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BannerPages() {
  return (
    <AfterLogin
      containers={BannerEdit}
      privileges={privileges.contentManagement.banner}
    />
  );
}
