import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from '../styles';

import DocumentIcon from '@assets/Svg/Document';

const Item = ({ classes, active, label, ...props }) => {
  return (
    <div className={classes[active()]} {...props}>
      <DocumentIcon style={{ color: '#B3C3CA', marginLeft: '10px' }} />
      <p style={{ marginLeft: '2em' }}>{label}</p>
      <div />
    </div>
  );
};

Item.defaultProps = {
  action: {},
  active: '',
  classes: {},
  label: '',
};

Item.propTypes = {
  action: PropTypes.object,
  active: PropTypes.string,
  classes: PropTypes.object,
  label: PropTypes.string,
};

const Styled = withStyles(styles)(Item);

export default Styled;
