import React from 'react';
import OfferingLetterCreate from '@containers/Document/OfferingLetter/Create';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function OfferingLetterPages() {
  return (
    <AfterLogin
      containers={OfferingLetterCreate}
      privileges={privileges.document.offeringLetter}
    />
  );
}
