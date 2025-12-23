import React from 'react';
import PerformanceReport from '@containers/Report/Performance';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function PerformanceReportPages() {
  return (
    <AfterLogin
      containers={PerformanceReport}
      privileges={privileges.report.performance}
    />
  );
}
