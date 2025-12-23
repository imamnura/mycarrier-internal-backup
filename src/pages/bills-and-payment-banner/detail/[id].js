import React from 'react';
import BillsPaymentBannerDetail from '@containers/ContentManagement/BillsAndPaymentBanner/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BillsPaymentBannerDetailManagementPages() {
  return (
    <AfterLogin
      containers={BillsPaymentBannerDetail}
      privileges={privileges.contentManagement.billsAndPaymentBanner}
    />
  );
}
