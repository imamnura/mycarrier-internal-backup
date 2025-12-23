import React from 'react';
import LeadManagmentSystemDashboardList from '@containers/LeadManagmentSystem/Dashboard/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function LeadManagmentSystemDashboardListPages() {
  return (
    <AfterLogin
      containers={LeadManagmentSystemDashboardList}
      privileges={privileges.leadManagementSystem.dashboard}
    />
  );
}
