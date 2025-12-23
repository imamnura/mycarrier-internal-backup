import React from 'react';
import AddOrderSolutions from '@containers/Document/PurchaseOrder/AddOrder/Solutions';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function PurchaseOrderPages() {
  return (
    <AfterLogin
      containers={AddOrderSolutions}
      privileges={privileges.document.purchaseOrder}
    />
  );
}
