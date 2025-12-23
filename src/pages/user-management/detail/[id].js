import React from 'react';
import UserManagementDetail from '@containers/Admin/UserManagement/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function UserManagementPages() {
  return (
    <AfterLogin
      containers={UserManagementDetail}
      privileges={privileges.admin.userManagement}
    />
  );
}
