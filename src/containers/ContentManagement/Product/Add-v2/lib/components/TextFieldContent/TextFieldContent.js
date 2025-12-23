import React from 'react';
import PropTypes from 'prop-types';
import ControllerTextField from './ControllerTextField';
import useStyles from './styles';

const TextField = (props) => {
  const {
    placeholder,
    control,
    position,
    fontSize,
    name,
    weight,
    colorPlaceholder,
    noSpacing,
    ...otherProps
  } = props;
  const classes = useStyles(
    position,
    fontSize,
    weight,
    colorPlaceholder,
    noSpacing,
  );

  return (
    <ControllerTextField
      className={classes.input}
      control={control}
      name={name}
      placeholder={placeholder}
      {...otherProps}
    />
  );
};

TextField.defaultProps = {
  colorPlaceholder: 'black',
  fontSize: 14,
  noSpacing: false,
  placeholder: '',
  position: 'left',
  weight: 'normal',
};

TextField.propTypes = {
  colorPlaceholder: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  noSpacing: PropTypes.bool,
  placeholder: PropTypes.string,
  position: PropTypes.oneOf(['left', 'right', 'center']),
  weight: PropTypes.oneOf(['light', 'normal', 'medium', 'bold']),
};

export default TextField;
