import React from 'react';
import IPPrefixDetail from '@containers/ServiceDelivery/IPPrefix/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function IPPrefixDetailPages() {
  return (
    <AfterLogin
      containers={IPPrefixDetail}
      privileges={privileges.serviceDelivery.ipPrefix}
    />
  );
}
