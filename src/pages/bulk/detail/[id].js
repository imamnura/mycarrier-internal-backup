import React from 'react';
import BulkDetail from '@containers/SMSA2P/Bulk/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BulkPages() {
  return (
    <AfterLogin containers={BulkDetail} privileges={privileges.smsa2p.bulk} />
  );
}
