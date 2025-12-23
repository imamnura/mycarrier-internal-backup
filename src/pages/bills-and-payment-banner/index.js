import React from 'react';
import BillsPaymentBannerList from '@containers/ContentManagement/BillsAndPaymentBanner/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BillsPaymentBannerManagementPages() {
  return (
    <AfterLogin
      containers={BillsPaymentBannerList}
      privileges={privileges.contentManagement.billsAndPaymentBanner}
    />
  );
}
