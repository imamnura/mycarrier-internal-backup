import React from 'react';
import LinkDetail from '@containers/SMSA2P/Link/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function LinkPages() {
  return (
    <AfterLogin containers={LinkDetail} privileges={privileges.smsa2p.link} />
  );
}
