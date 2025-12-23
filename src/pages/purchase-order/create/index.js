import React from 'react';
import Create from '@containers/Document/PurchaseOrder/Create';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function PurchaseOrderPages() {
  return (
    <AfterLogin
      containers={Create}
      privileges={privileges.document.purchaseOrder}
    />
  );
}
