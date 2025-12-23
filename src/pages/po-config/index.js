import React from 'react';
import POConfig from '@containers/ContentManagement/POConfig/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function POConfigPages() {
  return (
    <AfterLogin
      containers={POConfig}
      privileges={privileges.contentManagement.poConfig}
    />
  );
}
