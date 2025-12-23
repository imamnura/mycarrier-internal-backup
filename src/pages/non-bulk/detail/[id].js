import React from 'react';
import NonBulkDetail from '@containers/SMSA2P/NonBulk/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function NonBulkPages() {
  return (
    <AfterLogin
      containers={NonBulkDetail}
      privileges={privileges.smsa2p.nonBulk}
    />
  );
}
