import React from 'react';
import PurchaseOrderDetail from '@containers/Document/PurchaseOrder/DynamicDetail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function PurchaseOrderPages() {
  return (
    <AfterLogin
      containers={PurchaseOrderDetail}
      privileges={privileges.document.purchaseOrder}
    />
  );
}
