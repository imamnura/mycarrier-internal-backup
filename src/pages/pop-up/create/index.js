import React from 'react';
import PopUpCreate from '@containers/ContentManagement/Homepage/Create/PopUp';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function PopUpCreatePages() {
  return (
    <AfterLogin
      containers={PopUpCreate}
      privileges={privileges.contentManagement.popUp}
    />
  );
}
