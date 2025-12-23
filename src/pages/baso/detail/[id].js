import React from 'react';
import BasoDetail from '@containers/Document/Baso/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BasoPages() {
  return (
    <AfterLogin containers={BasoDetail} privileges={privileges.document.baso} />
  );
}
