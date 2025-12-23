import React from 'react';
import RequestIPPrefixList from '@containers/ServiceDelivery/IPPrefix/List/Request';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function RequestIPPrefixPages() {
  return (
    <AfterLogin
      containers={RequestIPPrefixList}
      privileges={privileges.serviceDelivery.ipPrefix}
    />
  );
}
