import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

function Component(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      guide={false}
      mask={[
        /[a-z]/,
        /[a-z]/,
        /[a-z]/,
        '-',
        /[a-z]/,
        '-',
        /[a-z]/,
        /[a-z]/,
        /[a-z]/,
        '-',
        /[a-z]/,
        /[a-z]/,
        /[a-z]/,
        '-',
        /[a-z]/,
        /[a-z]/,
        /[a-z]/,
      ]}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
    />
  );
}

Component.propTypes = {
  inputRef: PropTypes.func.isRequired,
  mask: PropTypes.array.isRequired,
};

export default Component;
