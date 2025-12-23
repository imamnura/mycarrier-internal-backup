import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const RadioItem = ({ key, label, value, handleValue }) => {
  return (
    <FormControlLabel
      control={
        <Radio
          onClick={() =>
            handleValue({
              symptompName: value.symptompName,
              symptompId: value.symptompId,
              symptompDesc: value.symptompDesc,
              symptompPath: value.symptompPath,
              value: value.value,
            })
          }
        />
      }
      key={key}
      label={label}
      style={{ marginLeft: `6px` }}
      value={value.value}
    />
  );
};

RadioItem.defaultProps = {
  handleValue: () => {},
  key: null,
  label: 'Select Date',
  value: {},
};

RadioItem.propTypes = {
  handleValue: PropTypes.func,
  key: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.object,
};

export default RadioItem;
