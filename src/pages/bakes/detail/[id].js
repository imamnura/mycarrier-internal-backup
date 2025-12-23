import React from 'react';
import BakesDetail from '@containers/Document/Bakes/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BakesPages() {
  return (
    <AfterLogin
      containers={BakesDetail}
      privileges={privileges.document.bakes}
    />
  );
}
