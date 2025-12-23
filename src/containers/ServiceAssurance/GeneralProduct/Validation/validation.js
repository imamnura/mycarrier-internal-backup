import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import useAction from './hooks/useActions';
import ValidationSection from './lib/ValidationSection';
import { breadcrumb, handleStatus } from './constant';

const SubmitValidation = (props) => {
  const {
    query: { id },
  } = useRouter();
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
    detail,
    // serviceId,
    fetch,
    handleDummySid,
    handleChangeSymptomp,
  } = useAction(props);

  const validationSectionProps = {
    breadcrumb: breadcrumb(id),
    status: {
      value: 'draft',
      custom: handleStatus,
    },
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
    detail,
    handleDummySid,
    handleChangeSymptomp,
  };

  return (
    <div>
      <ValidationSection
        {...validationSectionProps}
        submitValidation={confirmValidation}
      />
    </div>
  );
};

SubmitValidation.defaultProps = {
  feature: [],
  match: {},
};

SubmitValidation.propTypes = {
  feature: PropTypes.array,
  match: PropTypes.object,
};

export default SubmitValidation;
