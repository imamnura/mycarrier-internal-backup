import React from 'react';
import HomepageManagement from '@containers/ContentManagement/Homepage/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function HomepageManage() {
  return (
    <AfterLogin
      containers={HomepageManagement}
      privileges={[
        privileges.contentManagement.brochure,
        privileges.contentManagement.popUp,
        privileges.contentManagement.banner,
      ]}
    />
  );
}
