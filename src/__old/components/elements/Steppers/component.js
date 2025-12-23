import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { StepConnector } from '@material-ui/core';
import StepperIcon from '../../../../assets/Svg/StepperIcon';
import ClearIcon from '../../../../assets/Svg/Clear';
import MinusIcon from '../../../../assets/Svg/Minus';

const Component = (props) => {
  const { classes, activeStep, steps, activeStyle } = props;

  const Icon = (property) => {
    let color = property.active ? '#DE1B1B' : '#B3C3CA';
    const iconX = [
      'Returned',
      'Rejected',
      'Returned To Customer',
      'Upgrade BASO Rejected',
      'Invalid',
      'Retire',
      'Drop Quote',
    ].includes(property.label);

    if (iconX) {
      return <ClearIcon color={color} />;
    }

    const iconMinus = ['Delay Convert'].includes(property.label);

    if (iconMinus) {
      return <MinusIcon color={property.active ? '#FAB005' : '#B3C3CA'} />;
    }

    return <StepperIcon color={color} />;
  };

  const connector = (
    <StepConnector
      classes={{
        active:
          activeStyle === 'yellow'
            ? classes.connectorYellow
            : classes.connectorRed,
        completed: classes.connectorGreen,
        line: classes.connectorLine,
        alternativeLabel: classes.connectorRoot,
        lineHorizontal: classes.connectorWeight,
      }}
    />
  );

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      classes={{ root: classes.root }}
    >
      {steps.map((label, index) => (
        <Step connector={connector} key={`step-${label}-${index}`}>
          <StepLabel
            classes={{
              label: clsx(classes.label, {
                [classes.labelCompleted]: index < activeStep,
              }),
              active:
                activeStyle === 'yellow'
                  ? classes.labelYellow
                  : classes.labelActive,
              iconContainer: classes.iconStep,
            }}
            StepIconComponent={index >= activeStep ? Icon : ''}
            StepIconProps={{
              classes: {
                root: clsx(classes.icon, {
                  [classes.iconNormal]: index > activeStep,
                }),
                active: classes.iconRed,
                text: index === activeStep ? classes.textActive : classes.text,
                completed: classes.iconCompleted,
              },
              label: label,
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

Component.propTypes = {
  activeStep: PropTypes.number,
  activeStyle: PropTypes.oneOf(['default', 'yellow']),
  classes: PropTypes.object.isRequired,
  steps: PropTypes.array.isRequired,
};

Component.defaultProps = {
  activeStep: 0,
  activeStyle: 'default',
};

export default Component;
