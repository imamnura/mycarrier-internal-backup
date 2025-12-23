import React from 'react';
import KeywordList from '@containers/SMSA2P/Keyword/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function KeywordPages() {
  return (
    <AfterLogin
      containers={KeywordList}
      privileges={privileges.smsa2p.keyword}
    />
  );
}
