import React from 'react';
import PrivilegeManagementDetail from '@containers/Admin/Privilege/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function PrivilegeManagementPages() {
  return (
    <AfterLogin
      containers={PrivilegeManagementDetail}
      privileges={privileges.admin.privilegeManagement}
    />
  );
}
