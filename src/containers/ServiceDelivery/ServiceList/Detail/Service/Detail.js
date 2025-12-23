import React from 'react';
import { useRouter } from 'next/router';
import NotFound from '@fragments/Detail/elements/NotFound';
import ComponentMRTG from './MRTG';
import ComponentCallCenterAndMasking from './CallCenterAndMasking';

const Detail = (props) => {
  const router = useRouter();
  const { serviceType } = router.query;

  switch (serviceType) {
    case 'MRTG':
      return <ComponentMRTG {...props} />;
    case 'call-center':
    case 'masking':
    case 'itkp':
    case 'calling-card':
      return <ComponentCallCenterAndMasking {...props} />;
    default:
      return <NotFound />;
  }
};

export default Detail;
