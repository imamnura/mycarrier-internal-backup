import React from 'react';
import BillsPaymentBannerEdit from '@containers/ContentManagement/BillsAndPaymentBanner/Create';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BillsPaymentBannerEditManagementPages() {
  return (
    <AfterLogin
      containers={BillsPaymentBannerEdit}
      privileges={privileges.contentManagement.billsAndPaymentBanner}
    />
  );
}
