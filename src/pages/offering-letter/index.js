import React from 'react';
import OfferingLetter from '@containers/Document/OfferingLetter/List';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function QOfferingLetterPages() {
  return (
    <AfterLogin
      containers={OfferingLetter}
      privileges={privileges.document.offeringLetter}
    />
  );
}
