import React from 'react';
import useQueryParams from '@utils/hooks/useQueryParams';
import Msight from './Other/Msight';
import FABSolution from './FAB/Solution';
import FABProduct from './FAB/Product';
import FABProductWithoutBASO from './FAB/ProductWithoutBaso';
import NCXProduct from './NCX/Product';
import NCXIntegration from './NCX/Integration';
import Neucloud from './Other/Neucloud';
import BaseDetail from '@fragments/Detail';
import { breadcrumb } from './../utils';

const NewOrder = (props) => {
  const { queryParams } = useQueryParams();
  const { productFlow = '', productName = '' } = queryParams;

  switch (productFlow) {
    case 'FABD Product':
      return <FABProduct {...props} />;
    case 'FABD Product (without BASO)':
      return <FABProductWithoutBASO {...props} />;
    case 'FABD Solution':
      return <FABSolution {...props} />;
    case 'NCX Product':
      return <NCXProduct {...props} />;
    case 'NCX Product Integration':
      return <NCXIntegration {...props} />;
    case 'Others': {
      if (productName === 'msight') return <Msight {...props} />;
      else if (productName === 'neucloud elastica') return <Neucloud {...props} />;
    }
    default:
      return (
        <BaseDetail
          loading={false}
          notFound={true}
          breadcrumb={breadcrumb(queryParams.id)}
        />
      );
  }
};

export default NewOrder;
