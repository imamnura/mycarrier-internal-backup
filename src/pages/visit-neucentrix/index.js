import React from 'react';
import VisitNeucentrixList from '@containers/Neucentrix/VisitNeucentrix/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function VisitNeucentrixPages() {
  return (
    <AfterLogin
      containers={VisitNeucentrixList}
      privileges={privileges.neucentrix.visitNeucentrix}
    />
  );
}
