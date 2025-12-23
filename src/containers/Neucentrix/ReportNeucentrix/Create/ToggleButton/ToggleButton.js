import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import useStyles from './styles';

const ToggleComponent = (props) => {
  const { value, onChange } = props;

  const classes = useStyles();

  const handleToggle = (e, value) => onChange(value);

  return (
    <ToggleButtonGroup
      exclusive
      onChange={handleToggle}
      style={{ heigth: 40 }}
      value={value}
    >
      <ToggleButton
        classes={{ selected: classes.selected }}
        className={classes.buttonItem}
        style={{ borderRadius: '10px 0 0 10px' }}
        value={true}
      >
        YES
      </ToggleButton>
      <ToggleButton
        classes={{ selected: classes.selected }}
        className={classes.buttonItem}
        style={{ borderRadius: '0 10px 10px 0' }}
        value={false}
      >
        NO
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

ToggleComponent.defaultProps = {
  value: null,
};

ToggleComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool,
};

export default ToggleComponent;
