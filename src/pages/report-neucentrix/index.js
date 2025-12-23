import React from 'react';
import ReportNeucentrixList from '@containers/Neucentrix/ReportNeucentrix/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ReportNeucentrixPages() {
  return (
    <AfterLogin
      containers={ReportNeucentrixList}
      privileges={privileges.neucentrix.reportNeucentrix}
    />
  );
}
