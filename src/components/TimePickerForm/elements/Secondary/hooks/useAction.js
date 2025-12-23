import moment from 'moment';
import { useEffect, useMemo, useRef, useState } from 'react';

const useAction = (props) => {
  const refField = useRef(null);
  const refHour = useRef(null);
  const refMinute = useRef(null);
  const refSecond = useRef(null);

  const [activeHour, setActiveHour] = useState();
  const [activeMinute, setActiveMinute] = useState();
  const [activeSecond, setActiveSecond] = useState();

  const [open, _setOpen] = useState(false);

  const setOpen = (val) => async () => {
    await _setOpen(val);
    if (val) {
      await onPickTime(activeHour, 'hour')();
      await onPickTime(activeMinute, 'minute')();
      await onPickTime(activeSecond, 'second')();
    }
  };

  const [hourSeparator, setHourSeparator] = useState(false);
  const [minuteSeparator, setMinuteSeparator] = useState(false);
  const [secondSeparator, setSecondSeparator] = useState(false);

  const separatorHandler = (type) => (e) => {
    const active = {
      hour: activeHour,
      minute: activeMinute,
      second: activeSecond,
    }[type];

    const setSeparator = {
      hour: setHourSeparator,
      minute: setMinuteSeparator,
      second: setSecondSeparator,
    }[type];

    const separator = {
      hour: hourSeparator,
      minute: minuteSeparator,
      second: secondSeparator,
    }[type];

    if (e.currentTarget.scrollTop === active * 32) {
      setSeparator(true);
    } else {
      if (separator) {
        setSeparator(false);
      }
    }
  };

  const isMinDateInvalid = (index, type) => {
    const rawCurrent = {
      hour: activeHour,
      minute: activeMinute,
      second: activeMinute,
      [type]: index,
    };

    const rawMin = moment(props.minTime);

    const min = moment(
      `${rawMin.hours() || 0}:${rawMin.minutes() || 0}:${
        rawMin.seconds() || 0
      }`,
      'HH:mm:ss',
    );
    const current = moment(
      `${rawCurrent.hour}:${rawCurrent.minute}:${rawCurrent.second}`,
      'HH:mm:ss',
    );

    return current.isBefore(min);
  };

  const isMaxDateInvalid = (index, type) => {
    const rawCurrent = {
      hour: activeHour,
      minute: activeMinute,
      second: activeMinute,
      [type]: index,
    };

    const rawMax = moment(props.maxTime);

    const max = moment(
      `${rawMax.hours() || 23}:${rawMax.minutes() || 59}:${
        rawMax.seconds() || 59
      }`,
      'HH:mm:ss',
    );
    const current = moment(
      `${rawCurrent.hour}:${rawCurrent.minute}:${rawCurrent.second}`,
      'HH:mm:ss',
    );

    return current.isAfter(max);
  };

  const onPickTime = (index, type) => () => {
    const ref = {
      hour: refHour,
      minute: refMinute,
      second: refSecond,
    }[type];

    const setActive = {
      hour: setActiveHour,
      minute: setActiveMinute,
      second: setActiveSecond,
    }[type];

    const setSeparator = {
      hour: setHourSeparator,
      minute: setMinuteSeparator,
      second: setSecondSeparator,
    }[type];

    if (!isMinDateInvalid(index, type) && !isMaxDateInvalid(index, type)) {
      if (index === 0) {
        setSeparator(true);
      }

      ref?.current?.scrollTo({
        top: index * 32,
        behavior: 'smooth',
      });

      setActive(index);
    }
  };

  const { value, onChange } = props;

  useEffect(() => {
    if (!open) {
      const resDate = moment(
        `${moment().format(
          'YYYY/MM/DD',
        )} %${activeHour}:${activeMinute}:${activeSecond}`,
        'YYYY/MM/DD HH:mm:ss',
      ).toJSON();
      onChange(resDate);
    }
  }, [open]);

  useEffect(() => {
    if (props.minTime || props.maxTime) {
      const time = moment(props.minTime || props.maxTime);

      if (isNaN(activeSecond)) {
        setActiveSecond(time.second());
      }

      if (isNaN(activeMinute)) {
        setActiveMinute(time.minute());
      }

      if (isNaN(activeHour)) {
        setActiveHour(time.hour());
      }
    } else {
      setActiveHour(0);
      setActiveMinute(0);
      setActiveSecond(0);
    }
  }, [props.minTime, props.maxTime]);

  useEffect(() => {
    if (props.minTime) {
      const rawMin = moment(props.minTime);

      const min = moment(
        `${rawMin.hours() || 0}:${rawMin.minutes() || 0}:${
          rawMin.seconds() || 0
        }`,
        'HH:mm:ss',
      );
      const current = moment(
        `${activeHour}:${activeMinute}:${activeSecond}`,
        'HH:mm:ss',
      );

      if (current.isBefore(min)) {
        onPickTime(rawMin.second(), 'second')();
        onPickTime(rawMin.minute(), 'minute')();
        onPickTime(rawMin.hour(), 'hour')();
      }
    }

    if (props.maxTime) {
      const rawMax = moment(props.maxTime);

      const max = moment(
        `${rawMax.hours() || 0}:${rawMax.minutes() || 0}:${
          rawMax.seconds() || 0
        }`,
        'HH:mm:ss',
      );
      const current = moment(
        `${activeHour}:${activeMinute}:${activeSecond}`,
        'HH:mm:ss',
      );

      if (current.isAfter(max)) {
        onPickTime(rawMax.second(), 'second')();
        onPickTime(rawMax.minute(), 'minute')();
        onPickTime(rawMax.hour(), 'hour')();
      }
    }
  }, [activeHour, activeMinute, activeSecond]);

  useEffect(() => {
    const val = moment(value);
    if (val.isValid() && refField.current) {
      onPickTime(val.second(), 'second')();
      onPickTime(val.minute(), 'minute')();
      onPickTime(val.hour(), 'hour')();
    }
  }, [value, refField]);

  const label = useMemo(() => {
    if (value) {
      return moment(value).format('HH:mm:ss');
    }
  }, [value]);

  return {
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
    setActiveHour,
    setOpen,
    value: label,
  };
};

export default useAction;
