import React from 'react';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import BroadcastInformationCreate from '@containers/Broadcast/BroadcastInformation/Create';
import { privileges } from '@configs';

export default function BroadcastInformationPages() {
  return (
    <AfterLogin
      containers={BroadcastInformationCreate}
      privileges={privileges.broadcast.broadcastInformation}
    />
  );
}
