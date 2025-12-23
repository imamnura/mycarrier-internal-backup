import React from 'react';
import RoleManagementAdd from '@containers/Admin/Role/Add';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function RoleManagementPages() {
  return (
    <AfterLogin
      containers={RoleManagementAdd}
      privileges={privileges.admin.roleManagement}
    />
  );
}
