import React from 'react';
import { Box, IconButton, Popover } from '@material-ui/core';
import Typography from '@components/Typography';
import useStyles from './styles';
import clsx from 'clsx';
import TextField from '@components/TextField';
import DateIcon from '@assets/icon-v2/Date';
import useAction from './hooks/useAction';
import PropTypes from 'prop-types';

const hours = Array.from(Array(24).keys());
const minutes = Array.from(Array(60).keys());
const seconds = Array.from(Array(60).keys());
const overSpace = Array.from(Array(6).keys());

const TimePickerFormSecondary = (props) => {
  const {
    activeHour,
    activeMinute,
    activeSecond,
    hourSeparator,
    isMaxDateInvalid,
    isMinDateInvalid,
    minuteSeparator,
    onPickTime,
    open,
    refField,
    refHour,
    refMinute,
    refSecond,
    secondSeparator,
    separatorHandler,
    setOpen,
    value,
  } = useAction(props);

  const classes = useStyles();

  const { required, error, disabled, label, helperText } = props;

  return (
    <div>
      <TextField
        disabled={disabled}
        error={error}
        helperText={helperText}
        InputLabelProps={{
          shrink: !!value || open,
        }}
        inputProps={{
          ref: refField,
          readOnly: true,
          onClick: setOpen(true),
        }}
        label={label}
        placeholder="hh:mm:ss"
        required={required}
        rightAdornment={(props) => (
          <IconButton onClick={setOpen(true)} style={{ marginRight: -12 }}>
            <DateIcon {...props} />
          </IconButton>
        )}
        value={value}
      />
      <Popover
        anchorEl={refField.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        keepMounted
        onClose={setOpen(false)}
        open={open}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box display={'flex'} m={2}>
          <div
            className={classes.scroller}
            onScroll={separatorHandler('hour')}
            ref={refHour}
          >
            {hours.map((item, index) => (
              <div
                className={clsx({
                  [classes.scrollItem]: true,
                  [classes.scrollItemDisabled]:
                    isMinDateInvalid(index, 'hour') ||
                    isMaxDateInvalid(index, 'hour'),
                  [classes.scrollItemActive]: activeHour === index,
                  [classes.scrollItemActiveHour]: activeHour === index,
                })}
                key={item}
                onClick={onPickTime(index, 'hour')}
              >
                <Typography weight={activeHour === index ? 'medium' : 'normal'}>
                  {item.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
                </Typography>
              </div>
            ))}
            {overSpace.map((item) => (
              <div className={classes.emptyItem} key={item} />
            ))}
          </div>
          <div
            className={clsx({
              [classes.separator]: true,
              [classes.separatorActive]: hourSeparator && minuteSeparator,
            })}
          >
            <Typography weight="medium">:</Typography>
          </div>
          <div
            className={classes.scroller}
            onScroll={separatorHandler('minute')}
            ref={refMinute}
          >
            {minutes.map((item, index) => (
              <div
                className={clsx({
                  [classes.scrollItem]: true,
                  [classes.scrollItemDisabled]:
                    isMinDateInvalid(index, 'minute') ||
                    isMaxDateInvalid(index, 'minute'),
                  [classes.scrollItemActive]: activeMinute === index,
                  [classes.scrollItemActiveMinute]: activeMinute === index,
                })}
                key={item}
                onClick={onPickTime(index, 'minute')}
              >
                <Typography
                  weight={activeMinute === index ? 'medium' : 'normal'}
                >
                  {item.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
                </Typography>
              </div>
            ))}
            {overSpace.map((item) => (
              <div className={classes.emptyItem} key={item} />
            ))}
          </div>
          <div
            className={clsx({
              [classes.separator]: true,
              [classes.separatorActive]: minuteSeparator && secondSeparator,
            })}
          >
            <Typography weight="medium">:</Typography>
          </div>
          <div
            className={classes.scroller}
            onScroll={separatorHandler('second')}
            ref={refSecond}
          >
            {seconds.map((item, index) => (
              <div
                className={clsx({
                  [classes.scrollItem]: true,
                  [classes.scrollItemDisabled]:
                    isMinDateInvalid(index, 'second') ||
                    isMaxDateInvalid(index, 'second'),
                  [classes.scrollItemActive]: activeSecond === index,
                  [classes.scrollItemActiveSecond]: activeSecond === index,
                })}
                key={item}
                onClick={onPickTime(index, 'second')}
              >
                <Typography
                  weight={activeSecond === index ? 'medium' : 'normal'}
                >
                  {item.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
                </Typography>
              </div>
            ))}
            {overSpace.map((item) => (
              <div className={classes.emptyItem} key={item} />
            ))}
          </div>
        </Box>
      </Popover>
    </div>
  );
};

TimePickerFormSecondary.defaultProps = {
  disabled: false,
  error: false,
  helperText: '',
  label: 'Select Date',
  maxTime: null,
  minTime: null,
  required: false,
  value: null,
};

TimePickerFormSecondary.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  maxTime: PropTypes.string,
  minTime: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default TimePickerFormSecondary;
