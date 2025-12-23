import { Dialog, Popover } from '@material-ui/core';
import moment from 'moment';
import { useEffect, useState } from 'react';

const useActions = ({
  mobileClient,
  value,
  onChange,
  defaultLabel,
  format,
  views = [],
  autoOk,
}) => {
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
  const [openModalPeriod, _setOpenModalPeriod] = useState(false);

  const setSelectedDate = (val) => {
    _setSelectedDate(val);

    if (autoOk) {
      const resDate = new Date(val?.toString()).toJSON();
      onChange(resDate);
      _setOpen(false);
    }
  };

  const resetSelectedDate = () => {
    setSelectedDate(null);
    onChange(null);
    _setOpen(false);
  };

  useEffect(() => {
    // default value
    if (value) _setSelectedDate(value);
  }, [value]);

  const PopUp = mobileClient ? Dialog : Popover;

  const onSubmit = () => {
    const resDate = new Date(selectedDate?.toString()).toJSON();
    onChange(resDate);
    _setOpen(false);
  };

  const _label = () => {
    if (value) {
      return moment(value).format(format);
    }

    return defaultLabel;
  };

  const label = _label();

  const onClosePopup = () => {
    setOpen(false)();
    setSelectedDate(value);
  };

  const setOpenModalPeriod = (v) => _setOpenModalPeriod(v);

  return {
    label,
    onClosePopup,
    onSubmit,
    open,
    PopUp,
    resetSelectedDate,
    selectedDate:
      views.length === 0 || views.includes('date')
        ? selectedDate
        : selectedDate || moment(),
    setOpen,
    setSelectedDate,
    setOpenModalPeriod,
    openModalPeriod,
  };
};

export default useActions;
