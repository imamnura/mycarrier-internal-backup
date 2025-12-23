import React from 'react';
import UserManagementList from '@containers/Admin/UserManagement/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function UserManagementPages() {
  return (
    <AfterLogin
      containers={UserManagementList}
      privileges={privileges.admin.userManagement}
    />
  );
}
