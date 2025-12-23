import React from 'react';
import ServiceAssuranceGameqooList from '@containers/ServiceAssurance/Gameqoo/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function ServiceAssuranceGameqooPages() {
  return (
    <AfterLogin
      containers={ServiceAssuranceGameqooList}
      privileges={privileges.serviceAssurance.gameqoo}
    />
  );
}
