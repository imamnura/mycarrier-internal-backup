import React from 'react';
import NotificationSettingList from '@containers/UserProfile/NotificationSetting';
import AfterLogin from '@layouts/Adapter/AfterLogin';

export default function NotificationSetting() {
  return <AfterLogin containers={NotificationSettingList} hideNavigation />;
}
