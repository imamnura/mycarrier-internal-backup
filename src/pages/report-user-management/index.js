import React from 'react';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';
import UserManagementReport from '@containers/Report/UserManagement/Main';

export default function UserManagementReportPages() {
  return (
    <AfterLogin
      containers={UserManagementReport}
      privileges={privileges.report.userManagement}
    />
  );
}
