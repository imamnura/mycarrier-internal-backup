import React from 'react';
import ModificationOrderList from '@containers/Document/ModificationOrder/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ModificationOrderPages() {
  return (
    <AfterLogin
      containers={ModificationOrderList}
      privileges={privileges.document.modificationOrder}
    />
  );
}
