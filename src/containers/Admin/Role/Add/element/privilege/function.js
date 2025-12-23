import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { replacer } from '../../utils';
import StopIcon from '@material-ui/icons/Stop';

const Component = ({ classes, data, getFunction, parentId, disabled }) => {
  const handleChange = (event, i) => {
    const index = data.findIndex((item) => item.alias === i.alias);

    const newFunction = replacer(data, index, {
      ...i,
      isChecked: event.target.checked,
    });

    getFunction(newFunction, parentId);
  };

  return (
    <>
      {data.map((item, i) => (
        <div key={i} style={{ lineHeight: '1.5' }}>
          <FormControlLabel
            classes={{
              root: classes.labelFormActive,
            }}
            control={
              <Checkbox
                checked={item.isChecked}
                checkedIcon={
                  <StopIcon
                    className={disabled ? classes.iconDisabled : classes.icon}
                    fontSize="small"
                  />
                }
                classes={{ root: classes.checkboxCustom }}
                disabled={disabled}
                name={item._id}
                onChange={(e) => handleChange(e, item)}
              />
            }
            key={i}
            label={item.title}
          />
          <p
            className={
              (item.isChecked && classes.labelActive) || classes.captionFuntion
            }
          >
            {item.description}
          </p>
        </div>
      ))}
    </>
  );
};

Component.defaultProps = {
  classes: {},
  data: [],
  disabled: false,
  parentId: '',
};

Component.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  disabled: PropTypes.boolean,
  getFunction: PropTypes.func.isRequired,
  parentId: PropTypes.string,
};

export default Component;
