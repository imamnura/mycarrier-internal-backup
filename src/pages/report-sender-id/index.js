import React from 'react';
import ReportSenderIdList from '@containers/Report/Bulk-v2';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ReportSenderIdPages() {
  return (
    <AfterLogin
      containers={ReportSenderIdList}
      privileges={privileges.report.bulk}
    />
  );
}
