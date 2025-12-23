import React from 'react';
import LeadManagmentSystemDashboardCreate from '@containers/LeadManagmentSystem/Dashboard/Create';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function LeadManagmentSystemDashboardCreatePages() {
  return (
    <AfterLogin
      containers={LeadManagmentSystemDashboardCreate}
      privileges={privileges.leadManagementSystem.dashboard}
    />
  );
}
