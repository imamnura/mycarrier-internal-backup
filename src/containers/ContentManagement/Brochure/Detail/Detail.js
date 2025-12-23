import React from 'react';
import PropTypes from 'prop-types';
import DetailBase from '@fragments/Detail';
import useActions from './hooks/useActions';
import { breadcrumb, handleSchema } from './constant';

const Detail = (props) => {
  const { detail, isLoading } = useActions(props);

  return (
    <DetailBase
      breadcrumb={breadcrumb(detail.brochureId)}
      loading={isLoading}
      notFound={!detail}
      schema={handleSchema(detail)}
    />
  );
};

Detail.defaultProps = {
  match: {},
};

Detail.propTypes = {
  feature: PropTypes.array.isRequired,
  match: PropTypes.object,
};

export default Detail;
