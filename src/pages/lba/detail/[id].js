import React from 'react';
import LBADetail from '@containers/SMSA2P/LBA/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function LBADetailPages() {
  return (
    <AfterLogin containers={LBADetail} privileges={privileges.smsa2p.lba} />
  );
}
