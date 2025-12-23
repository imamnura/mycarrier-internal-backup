import React from 'react';
import UMBList from '@containers/SMSA2P/UMB/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function UMBPages() {
  return <AfterLogin containers={UMBList} privileges={privileges.smsa2p.umb} />;
}
