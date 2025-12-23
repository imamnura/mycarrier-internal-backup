import React from 'react';
import ReportNonBulk from '@containers/Report/NonBulk';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ReportLBAPages() {
  return (
    <AfterLogin
      containers={ReportNonBulk}
      privileges={privileges.report.nonBulk}
    />
  );
}
