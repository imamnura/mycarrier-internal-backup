import React from 'react';
import RoleManagementList from '@containers/Admin/Role/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function RoleManagementPages() {
  return (
    <AfterLogin
      containers={RoleManagementList}
      privileges={privileges.admin.roleManagement}
    />
  );
}
