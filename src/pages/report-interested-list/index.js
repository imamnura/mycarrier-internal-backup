import React from 'react';
import ReportInteresetedList from '@containers/ContentManagement/InterestedList/Report';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ReportInteresetedPages() {
  return (
    <AfterLogin
      containers={ReportInteresetedList}
      privileges={privileges.report.interestedList}
    />
  );
}
