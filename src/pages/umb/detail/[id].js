import React from 'react';
import UMBDetail from '@containers/SMSA2P/UMB/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function UMBPages() {
  return (
    <AfterLogin containers={UMBDetail} privileges={privileges.smsa2p.umb} />
  );
}
