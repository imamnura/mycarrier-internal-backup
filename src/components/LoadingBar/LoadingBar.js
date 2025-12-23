import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';
import useStyles from './styles';
import useActions from './hooks/useActions';

const LoadingBar = (props) => {
  const { progress, variant } = useActions(props);
  const classes = useStyles();

  if (progress === 100) {
    return null;
  }

  return (
    <LinearProgress
      classes={{
        root: classes.progress,
        bar: classes.bar,
      }}
      value={progress}
      variant={variant}
    />
  );
};

LoadingBar.defaultProps = {
  loading: false,
};

LoadingBar.propTypes = {
  loading: PropTypes.bool,
};

export default LoadingBar;
