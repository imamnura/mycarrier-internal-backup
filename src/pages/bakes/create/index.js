import React from 'react';
import BakesCreate from '@containers/Document/Bakes/Create';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BakesPages() {
  return (
    <AfterLogin
      containers={BakesCreate}
      privileges={privileges.document.bakes}
    />
  );
}
