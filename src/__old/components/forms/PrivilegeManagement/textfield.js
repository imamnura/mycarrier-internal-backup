import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '../../elements/TextField';
import Typography from '../../../../components/Typography';

const Component = ({
  label,
  name,
  maxLength,
  defaultValue,
  update,
  categoryId,
  featureId,
  classes,
  error,
  type,
  item,
  placeholder,
}) => {
  const [charLength, setCharLength] = useState(defaultValue?.length || 0);
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event) => {
    const val = event.target.value;
    const sliceVal = val.slice(0, maxLength);
    const valLength = sliceVal.length;
    setCharLength(valLength);
    if (maxLength >= valLength) {
      setValue(sliceVal);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <TextField
        className={classes}
        defaultValue={defaultValue}
        error={error}
        fullWidth={true}
        label={label}
        maxRows={2}
        name={name}
        onBlur={(e) => {
          if (type === 'feature') {
            update(e, categoryId, item._id);
          } else if (type === 'category') {
            update(e, item._id);
          } else {
            update(e, categoryId, featureId, item._id, type);
          }
        }}
        onChange={handleChange}
        placeholder={placeholder}
        required={true}
        type="text"
        value={value}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {!!maxLength && (
          <Typography
            children={`${charLength}/${maxLength}`}
            variant="caption"
          />
        )}
      </div>
    </div>
  );
};

Component.propTypes = {
  categoryId: PropTypes.string,
  classes: PropTypes.object,
  data: PropTypes.array,
  defaultValue: PropTypes.string,
  error: PropTypes.bool,
  featureId: PropTypes.string,
  item: PropTypes.object.isRequired,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  update: PropTypes.func.isRequired,
};

Component.defaultProps = {
  categoryId: '',
  classes: {},
  data: [],
  defaultValue: '',
  error: false,
  featureId: '',
  label: '',
  maxLength: 0,
  name: '',
  placeholder: '',
  type: '',
};

export default Component;
