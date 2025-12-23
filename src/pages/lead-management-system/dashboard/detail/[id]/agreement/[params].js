import React from 'react';
import AgreementHeader from '@containers/LeadManagmentSystem/Dashboard/Detail/elements/AgreementHeader';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function AgreementHeaderPages() {
  return (
    <AfterLogin
      containers={AgreementHeader}
      privileges={privileges.leadManagementSystem.dashboard}
    />
  );
}
