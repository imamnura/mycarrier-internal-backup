import React from 'react';
import PopUpDetail from '@containers/ContentManagement/Homepage/Detail/PopUp';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function PopUpDetailPages() {
  return (
    <AfterLogin
      containers={PopUpDetail}
      privileges={privileges.contentManagement.popUp}
    />
  );
}
