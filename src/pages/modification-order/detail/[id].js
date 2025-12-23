import React from 'react';
import ModificationOrderDetail from '@containers/Document/ModificationOrder/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ModificationOrderPages() {
  return (
    <AfterLogin
      containers={ModificationOrderDetail}
      privileges={privileges.document.modificationOrder}
    />
  );
}
