import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import Typography from '@components/Typography';
import clsx from 'clsx';
import color from '@styles/color';

const StepperStatus = (props) => {
  const { data, step } = props;
  const classes = useStyles();

  const colors = {
    success: color.green.main,
    danger: color.primary.main,
    warning: color.yellow.main,
  };

  return (
    <div className={classes.root}>
      {step.map(({ variant, label }, index) => {
        const isActive = data[index + 1];

        let circleStyle = {};

        if (isActive) {
          circleStyle = {
            background: colors[variant],
          };
        }

        return (
          <div className={classes.item} key={index}>
            {index > 0 && <div className={classes.line} />}
            <div
              className={clsx({
                [classes.circle]: true,
                [classes.activeCircle]: isActive,
              })}
              style={circleStyle}
            >
              <Typography variant="subtitle1">{label}</Typography>
            </div>
          </div>
        );
      })}
    </div>
  );
};

StepperStatus.defaultProps = {
  data: {
    1: false,
    2: false,
    3: false,
  },
};

StepperStatus.propTypes = {
  data: PropTypes.object,
  step: PropTypes.array.isRequired,
};

export default StepperStatus;
