import React from 'react';
import ReportNPSScore from '@containers/Report/NPSScore';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';
import { setPreviousLocation } from '@utils/common';

export default function ReportNPSScorePages() {
  if (typeof window !== 'undefined') setPreviousLocation(window.location.href);
  return (
    <AfterLogin
      containers={ReportNPSScore}
      privileges={privileges.report.npsScore}
    />
  );
}
