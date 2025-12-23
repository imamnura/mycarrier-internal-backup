import React from 'react';
import ReportNeucentrixCreate from '@containers/Neucentrix/ReportNeucentrix/Create';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ReportNeucentrixPages() {
  return (
    <AfterLogin
      containers={ReportNeucentrixCreate}
      privileges={privileges.neucentrix.reportNeucentrix}
    />
  );
}
