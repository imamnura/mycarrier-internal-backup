import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useActions from './hooks/useActions';
import ModalGraph from './elements/ModalGraph';
import ModalMTTR from './elements/ModalMTTR';
import { breadcrumb, schemaMTTR, handleStatus } from '../utils';

const MRTG = (props) => {
  const {
    query,
    detailProduct,
    isLoading,
    detailSchema,
    modalGraph,
    setModalGraph,
    modalMTTR,
    setModalMTTR,
  } = useActions(props);

  const { id: custAccntNum, params: serviceId, projectId } = query;

  return (
    <>
      <Detail
        breadcrumb={breadcrumb(custAccntNum, serviceId, projectId)}
        loading={isLoading}
        notFound={!detailProduct}
        schema={detailSchema}
        status={handleStatus(detailProduct?.status)}
      />
      <ModalMTTR
        id={custAccntNum}
        modalMTTR={modalMTTR}
        schema={schemaMTTR}
        setModalMTTR={setModalMTTR}
      />
      <ModalGraph modalGraph={modalGraph} setModalGraph={setModalGraph} />
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
