import React from 'react';
import InterestedListList from '@containers/ContentManagement/InterestedList/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function InterestedListPages() {
  return (
    <AfterLogin
      containers={InterestedListList}
      privileges={privileges.contentManagement.interestedList}
    />
  );
}
