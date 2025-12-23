import React from 'react';
import EventList from '@containers/ContentManagement/Events/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function EventListPage() {
  return (
    <AfterLogin
      containers={EventList}
      privileges={privileges.contentManagement.eventsManagement}
    />
  );
}
