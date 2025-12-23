import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CheckCircleRounded, PanoramaFishEyeRounded } from '@material-ui/icons';
import Text from '../Text';
import TextField from '../TextField';

export default function Component(props) {
  const { input, options, classes } = props;

  const handleCustomChange = (e, value, setValue) => {
    const arrVal = [...input.value];
    input.onChange(arrVal.filter((item) => item !== value));
    setValue(e.target.value);
    // input.onChange([...input.value, value]);
  };

  return (
    <FormControl>
      {options.map(({ label, value, withCustomField, setValue }, i) => {
        const checked = input.value.includes(value);
        const property = withCustomField
          ? {
              label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Text color="grey" variant="body2">
                    {label}
                  </Text>
                  &nbsp;&nbsp;&nbsp;
                  <TextField
                    input={{
                      value: value,
                      onChange: (e) => handleCustomChange(e, value, setValue),
                      onBlur: () => input.onChange([...input.value, value]),
                    }}
                  />
                </div>
              ),
              value: value,
            }
          : { label, value };

        return (
          <FormControlLabel
            classes={{
              label: classes.label,
            }}
            control={
              <Checkbox
                checked={checked}
                checkedIcon={
                  <CheckCircleRounded
                    className={classes.icon}
                    fontSize="small"
                  />
                }
                color="primary"
                disableRipple
                icon={
                  <PanoramaFishEyeRounded
                    className={classes.icon}
                    fontSize="small"
                  />
                }
                onChange={() => {
                  if (!checked) {
                    input.onChange([...input.value, value]);
                  } else {
                    const arrVal = [...input.value];
                    input.onChange(arrVal.filter((item) => item !== value));
                  }
                }}
                value={value}
              />
            }
            key={`chbx-${i}`}
            // label={label}
            {...property}
          />
        );
      })}
    </FormControl>
  );
}

Component.defaultProps = {
  classes: {},
  input: {},
  options: [],
};

Component.propTypes = {
  classes: PropTypes.object,
  input: PropTypes.object,
  options: PropTypes.array,
};
