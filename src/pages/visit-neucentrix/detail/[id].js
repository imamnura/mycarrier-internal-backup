import React from 'react';
import VisitNeucentrixDetail from '@containers/Neucentrix/VisitNeucentrix/Detail-v2';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function VisitNeucentrixPages() {
  return (
    <AfterLogin
      containers={VisitNeucentrixDetail}
      privileges={privileges.neucentrix.visitNeucentrix}
    />
  );
}
