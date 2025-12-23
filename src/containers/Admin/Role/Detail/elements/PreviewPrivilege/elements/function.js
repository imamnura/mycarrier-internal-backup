import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import StopIcon from '@material-ui/icons/Stop';
import useActions from '../hooks/useActions';

const Component = (props) => {
  const { classes, data, isDisabled, isLabelActive } = props;

  const { onCheckedFunction } = useActions(props);

  return (
    <>
      {data.map((item, i) => (
        <div key={i} style={{ lineHeight: '1.5' }}>
          <FormControlLabel
            classes={{
              root: isLabelActive && item.isChecked && classes.labelFormActive,
            }}
            control={
              <Checkbox
                checked={item.isChecked}
                checkedIcon={
                  <StopIcon
                    className={
                      (isLabelActive && classes.icon) ||
                      (isDisabled ? classes.iconDisabled : classes.icon)
                    }
                    fontSize="small"
                  />
                }
                classes={{ root: classes.checkboxCustom }}
                disabled={isDisabled}
                name={item._id}
                onChange={(e) => onCheckedFunction(e, item)}
              />
            }
            key={i}
            label={item.title}
          />
          <p
            className={
              (isLabelActive && item.isChecked && classes.labelActive) ||
              classes.captionFuntion
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
};

Component.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.array,
  isDisabled: PropTypes.bool.isRequired,
  isLabelActive: PropTypes.bool.isRequired,
};

export default Component;
