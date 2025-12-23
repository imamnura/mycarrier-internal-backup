import React from 'react';
import PopUpEdit from '@containers/ContentManagement/Homepage/Create/PopUp';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function BrochureEditPages() {
  return (
    <AfterLogin
      containers={PopUpEdit}
      privileges={privileges.contentManagement.popUp}
    />
  );
}
