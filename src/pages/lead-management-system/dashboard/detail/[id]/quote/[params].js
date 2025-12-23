import React from 'react';
import QuoteHeader from '@containers/LeadManagmentSystem/Dashboard/Detail/elements/QuoteHeader';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function QuoteHeaderPages() {
  return (
    <AfterLogin
      containers={QuoteHeader}
      privileges={privileges.leadManagementSystem.dashboard}
    />
  );
}
