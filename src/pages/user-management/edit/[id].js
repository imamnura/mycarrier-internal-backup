import React from 'react';
import UserManagementCreate from '@containers/Admin/UserManagement/Create';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function UserManagementPages() {
  return (
    <AfterLogin
      containers={UserManagementCreate}
      privileges={privileges.admin.userManagement}
    />
  );
}
