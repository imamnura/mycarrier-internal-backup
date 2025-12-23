import React from 'react';
import CampaignDetail from '@containers/SMSA2P/NonBulk/CampaignDetail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function CampaignPages() {
  return (
    <AfterLogin
      containers={CampaignDetail}
      privileges={privileges.smsa2p.nonBulk}
    />
  );
}
