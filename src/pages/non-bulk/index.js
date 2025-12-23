import React from 'react';
import NonBulkList from '@containers/SMSA2P/NonBulk/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function NonBulkPages() {
  return (
    <AfterLogin
      containers={NonBulkList}
      privileges={privileges.smsa2p.nonBulk}
    />
  );
}
