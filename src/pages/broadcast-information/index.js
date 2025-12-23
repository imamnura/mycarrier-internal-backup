import React from 'react';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import BroadcastInformation from '@containers/Broadcast/BroadcastInformation/List';
import { privileges } from '@configs';

export default function BroadcastInformationPages() {
  return (
    <AfterLogin
      containers={BroadcastInformation}
      privileges={privileges.broadcast.broadcastInformation}
    />
  );
}
