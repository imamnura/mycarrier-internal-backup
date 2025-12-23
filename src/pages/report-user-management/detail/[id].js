import React from 'react';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';
import UserManagementReportDetail from '@containers/Report/UserManagement/Detail';

export default function UserManagementReportDetailPages() {
  return (
    <AfterLogin
      containers={UserManagementReportDetail}
      privileges={privileges.report.userManagement}
    />
  );
}
