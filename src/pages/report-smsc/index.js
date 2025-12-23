import React from 'react';
import ReportSMSCList from '@containers/Report/SMSC';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ReportSMSCPages() {
  return (
    <AfterLogin
      containers={ReportSMSCList}
      privileges={privileges.report.smsc}
    />
  );
}
