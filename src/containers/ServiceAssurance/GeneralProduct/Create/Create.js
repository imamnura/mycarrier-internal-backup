import React from 'react';
import PropTypes from 'prop-types';
import useAction from './hooks/useActions';
import ValidationSection from './lib/ValidationSection';
import { breadcrumb } from './constant';

const SubmitCreate = (props) => {
  const {
    control,
    formState,
    handleSubmit,
    setValue,
    confirmValidation,
    handleCheck,
    checking,
    dropdown,
    loading,
    customerAsyncProps,
    detail,
    // serviceId,
    fetch,
    handleDummySid,
    dummy,
    handleChangeSymptomp,
  } = useAction(props);

  const createSectionProps = {
    breadcrumb: breadcrumb(),
    useform: {
      formState,
      control,
      handleSubmit,
      setValue,
    },
    checking,
    handleCheck,
    fetch,
    dropdown,
    loading,
    customerAsyncProps,
    detail,
    handleDummySid,
    dummy,
    handleChangeSymptomp,
  };

  return (
    <div>
      <ValidationSection
        {...createSectionProps}
        submitValidation={confirmValidation}
      />
    </div>
  );
};

SubmitCreate.defaultProps = {
  feature: [],
  match: {},
};

SubmitCreate.propTypes = {
  feature: PropTypes.array,
  match: PropTypes.object,
};

export default SubmitCreate;
