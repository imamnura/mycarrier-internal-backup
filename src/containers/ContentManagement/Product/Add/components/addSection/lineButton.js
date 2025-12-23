import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Color from '@styles/color';

import PropTypes from 'prop-types';
import styles from '../styles';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const lineButton = ({ classes, handleClick, label, variant }) => {
  return (
    <div className={classes.buttonWrapper}>
      <div
        className={classes.line}
        style={{
          borderBottom: `1px dashed #B3C3CA`,
        }}
      />
      <div
        className={classes.buttonSection}
        onClick={handleClick}
        style={{
          color: variant === 'primary' ? Color.primary.main : Color.green.main,
        }}
      >
        {variant === 'primary' ? <CancelIcon /> : <AddCircleIcon />}{' '}
        <p>{label}</p>
      </div>
    </div>
  );
};

lineButton.defaultProps = {
  classes: {},
  label: '',
  variant: 'default',
};

lineButton.propTypes = {
  classes: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  label: PropTypes.string,
  variant: PropTypes.string,
};

const Styled = withStyles(styles)(lineButton);

export default Styled;
