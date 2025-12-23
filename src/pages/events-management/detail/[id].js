import React from 'react';
import EventsDetail from '@containers/ContentManagement/Events/Detail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function EventsDetailPage() {
  return (
    <AfterLogin
      containers={EventsDetail}
      privileges={privileges.contentManagement.eventsManagement}
    />
  );
}
