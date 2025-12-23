import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../../elements/TextField';

const Component = ({ data, classes }) => {
  return (
    <TextField
      className={classes.subItem}
      defaultValue={data.journey}
      disabled
      fullWidth={true}
      label="Journey Name"
      maxLength={80}
      name={data.aliasJourney}
      required={true}
      type="text"
    />
  );
};

Component.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
};

Component.defaultProps = {
  classes: {},
  data: {},
};

export default Component;
