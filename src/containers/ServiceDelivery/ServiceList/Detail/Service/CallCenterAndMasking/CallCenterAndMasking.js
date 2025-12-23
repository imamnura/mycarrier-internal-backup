import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useActions from './hooks/useActions';
import { breadcrumb, handleStatus } from '../utils';

const MRTG = (props) => {
  const { query, detailProduct, isLoading, detailSchema } = useActions(props);

  const { id: custAccntNum, params: serviceId, projectId, serviceType } = query;

  return (
    <>
      <Detail
        breadcrumb={breadcrumb(custAccntNum, serviceId, projectId)}
        loading={isLoading}
        notFound={!detailProduct}
        schema={detailSchema(serviceType)}
        status={handleStatus(detailProduct?.status)}
      />
    </>
  );
};

MRTG.defaultProps = {
  feature: [],
  match: {},
};

MRTG.propTypes = {
  feature: PropTypes.array,
  match: PropTypes.object,
};

export default MRTG;
