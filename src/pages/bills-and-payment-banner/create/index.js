import React from 'react';
import BillsPaymentBannerCreate from '@containers/ContentManagement/BillsAndPaymentBanner/Create';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BillsPaymentBannerCreateManagementPages() {
  return (
    <AfterLogin
      containers={BillsPaymentBannerCreate}
      privileges={privileges.contentManagement.billsAndPaymentBanner}
    />
  );
}
