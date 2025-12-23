import React from 'react';
import LeadManagmentSystemDashboardDetail from '@containers/LeadManagmentSystem/Dashboard/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function LeadManagmentSystemDashboardDetailPages() {
  return (
    <AfterLogin
      containers={LeadManagmentSystemDashboardDetail}
      privileges={privileges.leadManagementSystem.dashboard}
    />
  );
}
