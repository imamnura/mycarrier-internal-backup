import React from 'react';
import { Popover, CircularProgress } from '@material-ui/core';
import Typography from '@components/Typography';
import useStyles from './styles';
import useAction from './hooks/useAction';
import PropTypes from 'prop-types';
import ArrowDown from '@assets/icon-v2/ArrowDown';
import RadioGroup from '@material-ui/core/RadioGroup';
import ListItem from './lib/ListItem';

const SelectWithLevel = (props) => {
  const { isDisabled } = props;
  const {
    data,
    open,
    refField,
    setOpen,
    onChange,
    selected,
    value,
    handleValue,
  } = useAction(props);

  const classes = useStyles({ rootEvent: open, isDisabled });

  const { label, name, isLoading } = props;

  const handleOpen = isDisabled ? () => () => {} : setOpen(true);

  return (
    <div>
      <Typography
        children="*"
        className={classes.required}
        color="primary-main"
        variant="overline"
        weight="medium"
      />
      <Typography
        children={label}
        className={classes.label}
        variant="overline"
        weight="medium"
      />
      <div className={classes.root} onClick={handleOpen} ref={refField}>
        <div className={classes.labelSelect}>
          {value ? value : 'Choose Symptomps'}
        </div>
        <ArrowDown className={classes.arrow} />
      </div>
      <Popover
        anchorEl={refField.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{ paper: classes.popover }}
        onClose={setOpen(false)}
        open={!!open}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {isLoading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress size={28} />
          </div>
        ) : (
          <div className={classes.scroller}>
            <RadioGroup name={name} onChange={onChange} value={selected}>
              <ListItem data={data} handleValue={handleValue} level={1} />
            </RadioGroup>
          </div>
        )}
      </Popover>
    </div>
  );
};

SelectWithLevel.defaultProps = {
  data: [],
  isDisabled: false,
  isLoading: false,
  label: 'Select Date',
  name: 'selectLevel',
  value: null,
};

SelectWithLevel.propTypes = {
  data: PropTypes.array,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default SelectWithLevel;
