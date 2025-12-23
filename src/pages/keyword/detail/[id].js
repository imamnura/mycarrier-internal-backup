import React from 'react';
import KeywordDetail from '@containers/SMSA2P/Keyword/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function KeywordPages() {
  return (
    <AfterLogin
      containers={KeywordDetail}
      privileges={privileges.smsa2p.keyword}
    />
  );
}
