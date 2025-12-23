import React from 'react';
import BasoList from '@containers/Document/Baso/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BasoPages() {
  return (
    <AfterLogin containers={BasoList} privileges={privileges.document.baso} />
  );
}
