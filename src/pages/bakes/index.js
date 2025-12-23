import React from 'react';
import BakesList from '@containers/Document/Bakes/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BakesPages() {
  return (
    <AfterLogin containers={BakesList} privileges={privileges.document.bakes} />
  );
}
