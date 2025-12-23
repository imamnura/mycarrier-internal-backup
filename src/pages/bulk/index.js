import React from 'react';
import BulkList from '@containers/SMSA2P/Bulk/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BulkPages() {
  return (
    <AfterLogin containers={BulkList} privileges={privileges.smsa2p.bulk} />
  );
}
