import React from 'react';
import LBAList from '@containers/SMSA2P/LBA/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function LBAPages() {
  return <AfterLogin containers={LBAList} privileges={privileges.smsa2p.lba} />;
}
