import React from 'react';
import PurchaseOrderList from '@containers/Document/PurchaseOrder/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function PurchaseOrderPages() {
  return (
    <AfterLogin
      containers={PurchaseOrderList}
      privileges={privileges.document.purchaseOrder}
    />
  );
}
