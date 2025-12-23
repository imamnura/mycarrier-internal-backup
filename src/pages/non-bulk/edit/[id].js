import React from 'react';
import NonBulkEdit from '@containers/SMSA2P/NonBulk/Edit';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function NonBulkPages() {
  return (
    <AfterLogin
      containers={NonBulkEdit}
      privileges={privileges.smsa2p.nonBulk}
    />
  );
}
