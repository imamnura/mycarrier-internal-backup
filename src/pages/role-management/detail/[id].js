import React from 'react';
import RoleManagementDetail from '@containers/Admin/Role/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function RoleManagementPages() {
  return (
    <AfterLogin
      containers={RoleManagementDetail}
      privileges={privileges.admin.roleManagement}
    />
  );
}
