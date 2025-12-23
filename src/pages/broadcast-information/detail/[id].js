import React from 'react';
import BroadcastInformationDetail from '@containers/Broadcast/BroadcastInformation/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BroadcastInformationDetailPages() {
  return (
    <AfterLogin
      containers={BroadcastInformationDetail}
      privileges={privileges.broadcast.broadcastInformation}
    />
  );
}
