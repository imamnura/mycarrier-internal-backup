import React from 'react';
import { Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import Text from '../Text';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export default function Component(props) {
  const { classes, steps, status } = props;

  const stepIcon = (property) => {
    const statusNoColor = ['completed', 'rejected', 'approved'].includes(
      status,
    );

    return (
      <div
        className={clsx(classes.stepIcon, {
          [classes.stepIconActive]: property.icon === 1 && !statusNoColor,
        })}
      />
    );
  };

  return (
    <Stepper
      classes={{ root: classes.root }}
      connector={false}
      orientation="vertical"
    >
      {steps.map((item, index) => (
        <Step active={true} key={index}>
          <StepLabel StepIconComponent={stepIcon}>
            <Text color="grey" variant="body2">
              {item.date}
            </Text>
          </StepLabel>
          <StepContent
            classes={{
              root: classes.contentRoot,
              last: classes.contentLast,
            }}
          >
            <Text variant="h5">{item.title}</Text>
            <br />
            <Text color="grey" variant="caption">
              {item.caption || '-'}
            </Text>
            <br />
            {item.noteProgress ? (
              <Text color="grey" variant="caption">
                Note: {item.noteProgress || '-'}
              </Text>
            ) : (
              ''
            )}
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
}

Component.defaultProps = {
  steps: [],
  worklog: [],
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  schemaStatus: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  steps: PropTypes.array,
  worklog: PropTypes.array,
};
