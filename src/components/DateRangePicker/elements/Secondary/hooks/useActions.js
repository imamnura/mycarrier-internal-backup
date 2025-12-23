import { Dialog, Popover } from '@material-ui/core';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { getRangeOfMonth } from '@utils/parser';

const useActions = (props) => {
  const { mobileClient, value, onChange, useRangeMonth } = props;

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

  const PopUp = mobileClient ? Dialog : Popover;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rangeOfMonth, setRangeOfMonth] = useState(null);

  useEffect(() => {
    setStartDate(value[0] ? moment(value[0]) : moment());
    setEndDate(value[1] ? moment(value[1]) : moment());
  }, [value]);

  const onSubmit = () => {
    onChange([moment(startDate).toJSON(), moment(endDate).toJSON()]);
    _setOpen(false);
  };

  const label = useMemo(() => {
    let res = [];
    let placeholder = '';

    if (Array.isArray(props.label)) {
      placeholder = props.label.join(' - ');
    } else {
      placeholder = props.label;
    }

    if (value.length === 2) {
      if (value[0]) {
        res[0] = moment(value[0]).format(props?.format || 'DD/MM/YYYY');
      }

      if (value[1]) {
        res[1] = moment(value[1]).format(props?.format || 'DD/MM/YYYY');
      }
    }

    return res.length ? res.join(' - ') : placeholder;
  }, [props.label, value]);

  const onClosePopup = () => {
    setStartDate(value[0] ? moment(value[0]) : moment());
    setEndDate(value[1] ? moment(value[1]) : moment());
    _setOpen(false);
  };

  const disableSubmit = useMemo(() => {
    if (!startDate || !endDate) {
      return true;
    }

    const start = moment(startDate);
    const end = moment(endDate);

    if (!end.isSameOrAfter(start)) {
      return true;
    }

    !!useRangeMonth && setRangeOfMonth(getRangeOfMonth(startDate, endDate));

    return false;
  }, [startDate, endDate]);

  const onReset = () => {
    setStartDate(moment());
    setEndDate(moment());
    onChange([null, null]);
    _setOpen(false);
  };

  return {
    disableSubmit,
    endDate,
    label,
    onClosePopup,
    onReset,
    onSubmit,
    open,
    PopUp,
    setEndDate,
    setOpen,
    setStartDate,
    startDate,
    rangeOfMonth,
  };
};

export default useActions;
