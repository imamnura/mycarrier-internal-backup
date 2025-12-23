import React from 'react';
import ReportNeucentrixDetail from '@containers/Neucentrix/ReportNeucentrix/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ReportNeucentrixPages() {
  return (
    <AfterLogin
      containers={ReportNeucentrixDetail}
      privileges={privileges.neucentrix.reportNeucentrix}
    />
  );
}
