import Button from '@components/Button';
import TimePickerForm from '@components/TimePickerForm';
import Typography from '@components/Typography';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { dateFormat } from '@utils/parser';

const TimeRangePicker = (props) => {
  const {
    onChange,
    baseDate,
    value,
    tab,
    setValue,
    minTime,
    type,
    initialOpen,
    initialStartTime,
    initialEndTime, //for testing
  } = props;
  const [open, _setOpen] = useState(initialOpen);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);

  useEffect(() => {
    setStartTime(value.startTime);
    setEndTime(value.endTime);
  }, [value]);

  const onSubmit = () => {
    const _baseDate = moment(baseDate).format('YYYY-MM-DD');
    const formattedStartTime = moment(startTime).format('HH:mm');
    const formattedEndTime = moment(endTime).format('HH:mm');

    const result = {
      endTime: moment(`${_baseDate} ${formattedEndTime}`).toJSON(),
      startTime: moment(`${_baseDate} ${formattedStartTime}`).toJSON(),
    };

    onChange(result);
    _setOpen(false);

    setStartTime(null);
    setEndTime(null);
  };

  const onCancel = () => {
    // setStartTime(null);
    // setEndTime(null);
    _setOpen(false);
  };

  const setOpen = (val) => () => {
    _setOpen(val);

    if (type === 'add') {
      setStartTime(minTime || minTimeToday);
    }
  };

  const label = useMemo(() => {
    let label = 'Pilih waktu mulai acara.. - waktu berakhir..';
    const { startTime, endTime } = value;

    if (startTime && endTime) {
      label = `${moment(startTime).format('HH:mm')} - ${moment(endTime).format(
        'HH:mm',
      )}`;
    }

    return label;
  }, [value]);

  const minTimeToday = () => {
    let m = moment(baseDate);
    m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    m.toISOString();

    const minTimeToday = moment(m._d).toISOString();

    return minTimeToday;
  };

  // const handleChangeStartTime = (v) => setStartTime(v.target.value);

  // const handleChangeEndTime = (v) => setEndTime(v.target.value);

  const validateTime =
    dateFormat({ date: startTime, type: 'time' }) <
    dateFormat({ date: endTime, type: 'time' });

  const buttonDisabled =
    !startTime ||
    !endTime ||
    !validateTime ||
    dateFormat({ date: startTime, type: 'time' }) <
      dateFormat({ date: minTime, type: 'time' }) ||
    dateFormat({ date: endTime, type: 'time' }) <
      dateFormat({ date: minTime, type: 'time' });

  return (
    <>
      <Box sx={{ cursor: 'pointer' }}>
        <Typography
          children={label}
          color="general-mid"
          onClick={tab === 'id' ? setOpen(true) : setOpen(false)}
          variant="caption"
        />
      </Box>
      <Dialog open={open}>
        <DialogTitle>
          <Typography variant="h5" weight="medium">
            Select Time
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box alignItems="center" display="flex">
            <Box maxWidth={120}>
              {/* <TextField
                id="startTime"
                InputLabelProps={{
                  shrink: true,
                }}
                label="Start Time"
                onChange={handleChangeStartTime}
                type="time"
                value={startTime}
              /> */}
              <TimePickerForm
                label="Start Time"
                minTime={minTime || minTimeToday()}
                onChange={setStartTime}
                setValue={setValue}
                value={startTime}
              />
            </Box>
            <Box mx={2}>
              <Typography>-</Typography>
            </Box>
            <Box maxWidth={120}>
              {/* <TextField
                defaultValue=""
                id="endTime"
                InputLabelProps={{
                  shrink: true,
                }}
                label="End Time"
                onChange={handleChangeEndTime}
                type="time"
                value={endTime}
              /> */}
              <TimePickerForm
                label="End Time"
                onChange={setEndTime}
                setValue={setValue}
                value={endTime}
              />
            </Box>
          </Box>
        </DialogContent>
        <Box display="flex" p={2}>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button onClick={onCancel} variant="ghost">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button disabled={buttonDisabled} onClick={onSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
};

TimeRangePicker.defaultProps = {
  initialEndTime: '',
  initialOpen: false,
  initialStartTime: '',
  type: '',
};

TimeRangePicker.propTypes = {
  baseDate: PropTypes.string.isRequired,
  initialEndTime: PropTypes.string,
  initialOpen: PropTypes.bool,
  initialStartTime: PropTypes.string,
  minTime: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.object.isRequired,
};

export default TimeRangePicker;
