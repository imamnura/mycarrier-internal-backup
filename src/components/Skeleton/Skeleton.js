import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton as MuiSkeleton } from '@material-ui/lab';
import useStyles from './styles';

const Skeleton = (props) => {
  const classes = useStyles();

  return (
    <MuiSkeleton
      {...props}
      animation="wave"
      classes={{
        root: classes.root,
        rect: classes.rectangle,
      }}
    />
  );
};

Skeleton.defaultProps = {
  height: '16px',
  variant: 'rect',
  width: '100%',
};

Skeleton.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf(['text', 'circle', 'rect']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Skeleton;
