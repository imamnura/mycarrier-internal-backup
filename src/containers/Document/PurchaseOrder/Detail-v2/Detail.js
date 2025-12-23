import React from 'react';
import useQueryParams from '@utils/hooks/useQueryParams';
import Trial from './Trial';
import NewInstall from './NewInstall';
import ModifyDisconnect from './ModifyDisconnect';
import Subscribe from './Subscribe';
import BaseDetail from '@fragments/Detail';
import { breadcrumb } from './utils';

const Detail = (props) => {
  const { queryParams } = useQueryParams();

  switch (queryParams?.orderType) {
    case 'Trial':
      return <Trial {...props} />;
    case 'Subscribe':
      return <Subscribe {...props} />;
    case 'New Install':
      return <NewInstall {...props} />;
    case 'Disconnect':
    case 'Modify':
      return <ModifyDisconnect {...props} />;
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

export default Detail;
