import { Dialog, Popover } from '@material-ui/core';
import moment from 'moment';
import { useEffect, useState } from 'react';

const useActions = (props) => {
  const { mobileClient, value, onChange, inputFormat } = props;

  const [open, _setOpen] = useState(null);
  const setOpen = (value) => (e) => {
    if (mobileClient) {
      _setOpen(value);
    } else {
      if (value) {
        _setOpen(e.currentTarget);
      } else {
        _setOpen(false);
      }
    }
  };

  const [selectedDate, _setSelectedDate] = useState(value);

  const setSelectedDate = (val) => {
    if (val && val[0] && !val[1]) {
      _setSelectedDate([val[0], val[0]]);
    } else {
      _setSelectedDate(val);
    }
  };

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const resetSelectedDate = () => {
    setSelectedDate([null, null]);
    onChange([null, null]);
    _setOpen(false);
  };

  const dateRangeEqual = (date) => {
    const format = (v) => moment(v).format('DD-MM-YYYY');

    const start = format(selectedDate[0]) === format(date[0]);
    const end = format(selectedDate[1]) === format(date[1]);

    return start && end;
  };

  const PopUp = mobileClient ? Dialog : Popover;

  const onSubmit = () => {
    const resDate = selectedDate.map((d) => new Date(d.toString()).toJSON());
    onChange(resDate);
    _setOpen(false);
  };

  const _label = () => {
    let res = [];
    let placeholder = '';

    if (Array.isArray(props.label)) {
      placeholder = props.label.join(' - ');
    } else {
      placeholder = props.label;
    }

    if (value) {
      if (value[0]) {
        res[0] = moment(value[0]).format(inputFormat);
      }

      if (value[1]) {
        res[1] = moment(value[1]).format(inputFormat);
      }
    }

    return res.length ? res.join(' - ') : placeholder;
  };

  const label = _label();

  const onClosePopup = () => {
    setOpen(false)();
    setSelectedDate(value);
  };

  const setSuggestionSelectedDate = (val) => () => {
    setSelectedDate(val);
  };

  return {
    dateRangeEqual,
    label,
    onClosePopup,
    onSubmit,
    open,
    PopUp,
    resetSelectedDate,
    selectedDate,
    setOpen,
    setSelectedDate,
    setSuggestionSelectedDate,
  };
};

export default useActions;
