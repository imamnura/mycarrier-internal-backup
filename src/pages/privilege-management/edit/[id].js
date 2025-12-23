import React from 'react';
import PrivilegeManagementEdit from '@containers/Admin/Privilege/Edit';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function PrivilegeManagementPages() {
  return (
    <AfterLogin
      containers={PrivilegeManagementEdit}
      privileges={privileges.admin.privilegeManagement}
    />
  );
}
