import React from 'react';
import LinkList from '@containers/SMSA2P/Link/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function LinkPages() {
  return (
    <AfterLogin containers={LinkList} privileges={privileges.smsa2p.link} />
  );
}
