import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const RadioItem = (props) => {
  const { keyItem, label, value, handleValue } = props;

  return (
    <FormControlLabel
      control={
        <Radio
          onClick={handleValue({
            symptompName: value.symptompName,
            symptompId: value.symptompId,
            symptompDesc: value.symptompDesc,
            symptompPath: value.symptompPath,
            value: value.value,
          })}
        />
      }
      key={keyItem}
      label={label}
      style={{ marginLeft: `6px` }}
      value={value.value}
    />
  );
};

RadioItem.defaultProps = {
  handleValue: () => {},
  keyItem: null,
  label: 'Select Date',
  value: {},
};

RadioItem.propTypes = {
  handleValue: PropTypes.func,
  keyItem: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.object,
};

export default RadioItem;
