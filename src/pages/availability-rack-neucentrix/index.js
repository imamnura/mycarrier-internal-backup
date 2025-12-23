import React from 'react';
import AvailabilityRack from '@containers/Neucentrix/AvailabilityRack/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function availabilityRackPages() {
  return (
    <AfterLogin
      containers={AvailabilityRack}
      privileges={privileges.neucentrix.availabilityRack}
    />
  );
}
