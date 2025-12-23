import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import useAction from './hooks/useActions';
import ValidationSection from './lib/ValidationSection';
import { route } from '@configs';
import { Box } from '@material-ui/core';

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
    fetch,
    handleDummySid,
    dummy,
  } = useAction(props);

  const breadcrumb = [
    { label: 'Digital Product', url: route.digitalProduct('list') },
    { label: id || '-', url: route.digitalProduct('detail', id) },
    { label: 'Validate' },
  ];

  const validationSectionProps = {
    breadcrumb: breadcrumb,
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
    dummy,
  };

  return (
    <Box pb={3}>
      <ValidationSection
        {...validationSectionProps}
        submitValidation={confirmValidation}
      />
    </Box>
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
