import React from 'react';
import Achievement from '@containers/UserProfile/Achievement';
import AfterLogin from '@layouts/Adapter/AfterLogin';

export default function DetailAchievement() {
  return <AfterLogin containers={Achievement} hideNavigation />;
}
