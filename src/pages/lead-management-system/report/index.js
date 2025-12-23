import React from 'react';
import LeadManagmentSystemReport from '@containers/LeadManagmentSystem/Report';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function LeadManagmentSystemReportPages() {
  return (
    <AfterLogin
      containers={LeadManagmentSystemReport}
      privileges={privileges.leadManagementSystem.report}
    />
  );
}
