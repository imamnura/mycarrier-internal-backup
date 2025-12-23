import React from 'react';
import OfferingLetterDetail from '@containers/Document/OfferingLetter/Detail';
// import OfferingLetterDetail from '@containers/GeneralProduct/QuotationDetail';
import AfterLogin from '@layouts/Adapter/AfterLogin';
import { privileges } from '@configs';

export default function OfferingLetterPages() {
  return (
    <AfterLogin
      containers={OfferingLetterDetail}
      privileges={privileges.document.offeringLetter}
    />
  );
}
