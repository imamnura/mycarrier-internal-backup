import React, { useMemo } from 'react';
import Stepper from '@components/Stepper';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const DocumentStage = ({ data }) => {
  const stepperProps = useMemo(() => {
    let errors = undefined;
    let warnings = undefined;
    let errorsLabel = undefined;

    const steps = data
      ?.map((item) => {
        return {
          ...item,
          label: item.status,
        };
      })
      .filter((s) => !!s);

    let active = steps.findIndex(({ isCompleted }) => !isCompleted) - 1;
    active = active < 0 ? -1 : active;

    return {
      steps,
      active: active < 0 ? 5 : active,
      errors,
      errorsLabel,
      warnings,
    };
  }, [data]);

  return (
    <Box mt={3}>
      <Stepper {...stepperProps} />
    </Box>
  );
};

DocumentStage.propTypes = {
  data: PropTypes.array.isRequired,
};

export default React.memo(DocumentStage);
