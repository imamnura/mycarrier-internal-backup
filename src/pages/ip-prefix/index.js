import React from 'react';
import CustomerIPPrefixList from '@containers/ServiceDelivery/IPPrefix/List/Customer';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function IPPrefixPages() {
  return (
    <AfterLogin
      containers={CustomerIPPrefixList}
      privileges={privileges.serviceDelivery.ipPrefix}
    />
  );
}
