/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@components/Stepper';
import { Box } from '@material-ui/core';

const StepperForm = ({ active, data, onStepperClick }) => {
  const accessibleTab = useMemo(() => {
    const { companyName, products, toc, agreement } = data || {};
    if (agreement?.length > 0) return 3;
    else if (toc?.usage?.period) return 2;
    else if (products?.length > 0) return 1;
    else if (companyName) return 0;
    else return -1;
  }, [data]);

  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', pb: 2, pt: 6, mb: 1 }}
      >
        <Stepper
          accessibleTab={accessibleTab}
          active={active - 1}
          onStepClick={onStepperClick}
          steps={[
            'Company Information',
            'Service Specification',
            'Terms & Condition',
            'Agreement',
          ]}
          variant="number"
        />
      </Box>
      {/* <Divider /> */}
    </>
  );
};

StepperForm.propTypes = {
  active: PropTypes.number.isRequired,
};

export default StepperForm;
