import React from 'react';
import EventsAdd from '@containers/ContentManagement/Events/Add-v2';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function EventsAddPage() {
  return (
    <AfterLogin
      containers={EventsAdd}
      privileges={privileges.contentManagement.eventsManagement}
    />
  );
}
