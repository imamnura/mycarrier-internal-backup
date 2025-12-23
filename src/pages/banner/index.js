import React from 'react';
import BannerList from '@containers/ContentManagement/Homepage/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BannerPages() {
  return (
    <AfterLogin
      containers={BannerList}
      privileges={privileges.contentManagement.banner}
    />
  );
}
