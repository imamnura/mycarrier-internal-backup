import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import {
  Box,
  Step,
  StepConnector,
  StepLabel,
  Stepper as MuiStepper,
} from '@material-ui/core';
import CircleCancel from '@assets/icon-v2/CircleCancel';
import CircleCheck from '@assets/icon-v2/CircleCheck';
import CircleReturn from '@assets/icon-v2/CircleReturn';
import CircleWarning from '@assets/icon-v2/CircleWarning';
import OnState from '@assets/icon-v2/OnState';
import OnStateActive from '@assets/icon-v2/OnStateActive';
import useStyles from './styles';
import clsx from 'clsx';
import color from '@styles/color';
import { Text } from '@legion-ui/core';

export const NumberingStep =
  ({ number, variant }) =>
  () => {
    const variantStyle = {
      default: {
        color: color.general.light,
        border: `1px solid ${color.general.light}`,
        background: color.white,
      },
      active: {
        color: color.white,
        background: color.primary.main,
      },
    }[variant];

    const circleStyle = {
      alignItems: 'center',
      borderRadius: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      height: 24,
      justifyContent: 'center',
      width: 24,
      ...variantStyle,
    };

    return (
      <Box sx={circleStyle}>
        <Typography>{number + 1}</Typography>
      </Box>
    );
  };

const Stepper = (props) => {
  const {
    accessibleTab,
    active,
    errors,
    errorsLabel,
    onStepClick: _onStepClick,
    steps,
    variant,
    warnings,
  } = props;

  const onStepClick = (step) => () => {
    if (_onStepClick) {
      _onStepClick(step);
    }
  };

  const classes = useStyles(props);

  let validateConnector = undefined;
  if (errors || variant === 'number') {
    validateConnector = classes.connectorError;
  } else if (warnings) {
    validateConnector = classes.connectorWarning;
  } else {
    validateConnector = classes.connectorSuccess;
  }
  const connector = (
    <StepConnector
      classes={{
        alternativeLabel: classes.connector,
        root: classes.connectorIdle,
        active: validateConnector,
        completed: classes.connectorSuccess,
      }}
    />
  );

  return (
    <Box className={classes.stepWrapper}>
      <MuiStepper
        activeStep={active}
        alternativeLabel
        classes={{
          root: classes.root,
        }}
        connector={connector}
      >
        {steps.map((step, i) => {
          let StepIcon = {
            default: OnState,
            number: NumberingStep({ number: i, variant: 'default' }),
          }[variant];

          let stepStyle = classes.stepIdle;

          let label = '';
          let dateTime = '';

          if (typeof step === 'string') {
            label = step;
          } else {
            label = step.label;
            dateTime = step.dateTime;
          }

          if (i <= active) {
            StepIcon = CircleCheck;
            stepStyle = classes.stepSuccess;
          }

          const isLastIndexActive =
            variant === 'number' ? true : i !== steps.length - 1;

          if (i === active && isLastIndexActive) {
            const activeState = {
              default: {
                StepIcon: OnStateActive,
                stepStyle: classes.stepSuccess,
              },
              number: {
                StepIcon: NumberingStep({ number: i, variant: 'active' }),
                stepStyle: classes.stepError,
              },
            }[variant];

            StepIcon = activeState.StepIcon;
            stepStyle = activeState.stepStyle;
          }

          if (i === active && !!errors) {
            stepStyle = classes.stepError;

            if (errors === 'returned') {
              label = errorsLabel || 'Returned';
              StepIcon = CircleReturn;
            } else if (errors === 'rejected' || errors === 'suspend') {
              label = errorsLabel || 'Rejected';
              StepIcon = CircleCancel;
            }
          }

          if (i === active && !!warnings) {
            stepStyle = classes.stepWarning;
            label = warnings;
            StepIcon = CircleWarning;
          }

          const StepIconComponent = () => <StepIcon className={classes.icon} />;

          return (
            <Step completed={i < active} key={label}>
              <StepLabel
                classes={{
                  root: stepStyle,
                  label: clsx(stepStyle, classes.label),
                  iconContainer: classes.iconContainer,
                }}
                StepIconComponent={StepIconComponent}
              >
                <Box>
                  <Text
                    children={label}
                    className={clsx({
                      [classes.disabledLabel]:
                        !!_onStepClick && accessibleTab < i,
                      [classes.clickableLabel]:
                        !!_onStepClick && accessibleTab >= i,
                    })}
                    onClick={
                      accessibleTab >= i && i !== active
                        ? onStepClick(i)
                        : undefined
                    }
                    weight={variant === 'number' ? '400' : '600'}
                  />
                  {!!dateTime && (
                    <Typography inline variant="caption">
                      {dateTime}
                    </Typography>
                  )}
                </Box>
              </StepLabel>
            </Step>
          );
        })}
      </MuiStepper>
    </Box>
  );
};

Stepper.defaultProps = {
  accessibleTab: -1,
  active: 0,
  errors: null,
  errorsLabel: '',
  onStepClick: undefined,
  steps: [],
  variant: 'default',
  warnings: '',
};

Stepper.propTypes = {
  accessibleTab: PropTypes.number,
  active: PropTypes.number,
  errors: PropTypes.oneOf(['returned', 'rejected', 'others']),
  errorsLabel: PropTypes.string,
  onStepClick: PropTypes.func,
  steps: PropTypes.array,
  variant: PropTypes.oneOf(['default', 'number']),
  warnings: PropTypes.string,
};

export default Stepper;
