/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@components/Stepper';
import { Box } from '@legion-ui/core';

const StepperForm = ({ active, data, onStepperClick }) => {
  const accessibleTab = useMemo(() => {
    const { invoices, fileTemplate, attachment, reviewer, carbonCopy } =
      data || {};
    if (reviewer?.length > 0) return 2;
    else if (carbonCopy?.length > 3) return 3;
    else if (fileTemplate) return 2;
    else if (attachment) return 2;
    if (invoices?.length > 0) return 1;
    else return -1;
  }, [data]);

  return (
    <>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: 2,
          margin: '30px 0',
        }}
      >
        <Stepper
          accessibleTab={accessibleTab}
          active={active - 1}
          onStepClick={onStepperClick}
          steps={['Pick Invoice', 'Email Text & Attachment', 'Approval Data']}
          variant="number"
        />
      </Box>
    </>
  );
};

StepperForm.propTypes = {
  active: PropTypes.number.isRequired,
};

export default StepperForm;
