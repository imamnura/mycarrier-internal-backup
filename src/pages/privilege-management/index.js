import React from 'react';
import PrivilegeManagementList from '@containers/Admin/Privilege/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function PrivilegeManagementPages() {
  return (
    <AfterLogin
      containers={PrivilegeManagementList}
      privileges={privileges.admin.privilegeManagement}
    />
  );
}
