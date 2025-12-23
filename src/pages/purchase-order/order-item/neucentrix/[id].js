import React from 'react';
import PurchaseOrderAddOrder from '@containers/Document/PurchaseOrder/AddOrder/Neucentrix';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function PurchaseOrderPages() {
  return (
    <AfterLogin
      containers={PurchaseOrderAddOrder}
      privileges={privileges.document.purchaseOrder}
    />
  );
}
