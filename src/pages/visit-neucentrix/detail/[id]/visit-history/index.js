import React from 'react';
import VisitNeucentrixHistory from '@containers/Neucentrix/VisitNeucentrix/ListHistoryActivity';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function VisitNeucentrixPages() {
  return (
    <AfterLogin
      containers={VisitNeucentrixHistory}
      privileges={privileges.neucentrix.visitNeucentrix}
    />
  );
}
