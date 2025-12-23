import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@components/TextField';
import MaskedInput from 'react-text-mask';
import currencyMask from './mask/currency';

export const Masked = (props) => {
  const { inputRef, mask, ...otherProps } = props;

  return (
    <MaskedInput
      {...otherProps}
      mask={mask}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
    />
  );
};

Masked.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  inputRef: PropTypes.any.isRequired,
  mask: PropTypes.func.isRequired,
};

const TextFieldMasked = (_props) => {
  const { maskType, ...props } = _props;

  const mask = {
    currency: currencyMask(),
  }[maskType];

  return (
    <TextField
      {...props}
      InputProps={{
        inputComponent: Masked,
        inputProps: {
          mask: mask,
          ...props.InputProps?.inputProps,
        },
        ...props.InputProps,
      }}
    />
  );
};

TextFieldMasked.defaultProps = {
  InputProps: {},
};

TextFieldMasked.propTypes = {
  InputProps: PropTypes.object,
  maskType: PropTypes.oneOf(['currency']).isRequired,
};

export default TextFieldMasked;
