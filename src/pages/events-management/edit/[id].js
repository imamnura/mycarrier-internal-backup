import React from 'react';
import EventsEdit from '@containers/ContentManagement/Events/Add-v2';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function EventsEditPage() {
  return (
    <AfterLogin
      containers={EventsEdit}
      privileges={privileges.contentManagement.eventsManagement}
    />
  );
}
