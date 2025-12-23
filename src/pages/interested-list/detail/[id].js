import React from 'react';
import InterestedListDetail from '@containers/ContentManagement/InterestedList/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function InterestedListPages() {
  return (
    <AfterLogin
      containers={InterestedListDetail}
      privileges={privileges.contentManagement.interestedList}
    />
  );
}
