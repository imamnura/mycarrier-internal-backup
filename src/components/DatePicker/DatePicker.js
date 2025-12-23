import { Grid, TextField } from '@material-ui/core';
import { LocalizationProvider, StaticDatePicker } from '@material-ui/pickers';
import MomentUtils from '@material-ui/pickers/adapter/moment';
import { emptyFunc } from '@utils/common';
import React from 'react';
import ArrowDown from '../../assets/icon-v2/ArrowDown';
import useResponsive from '../../utils/hooks/useResponsive';
import Button from '../Button';
import Typography from '../Typography';
import useActions from './hooks/useActions';
import useStyles from './styles';
import PeriodFilter from '@containers/BillsAndPayment/BillsAndPaymentManagement/Detail/elements/PeriodFilter';
import CalendarIcon from '@assets/Svg/CalendarIcon';
import Close from '@assets/Svg/Close';

export const KeyboardInput = (startProps) => (
  <React.Fragment>
    <TextField {...startProps} size="small" variant="standard" />
  </React.Fragment>
);

/**
 *
 * @typedef {import('@material-ui/pickers').StaticDatePickerProps} DatePickerProps -n
 *
 * @param {DatePickerProps} props -n
 * @returns {React.FC} -n
 */

const DatePicker = (props) => {
  const {
    disabled,
    error,
    helperText,
    menuLabel,
    required,
    onChange,
    value,
    label: defaultLabel = 'Select Date',
    views,
    format = 'DD/MM/YYYY',
    fullWidth,
    id,
    iconCalendar,
    withFilterPeriod,
    optionsCheckboxFilter,
    getValueFilterPeriod,
    resetFormFilterPeriod,
    hooksFormFilterPeriod,
    ...otherProps
  } = props;

  const mobileClient = useResponsive('xs');

  const {
    label,
    onClosePopup,
    onSubmit,
    open,
    PopUp,
    resetSelectedDate,
    selectedDate,
    setOpen,
    setSelectedDate,
    setOpenModalPeriod,
    openModalPeriod,
  } = useActions({
    mobileClient,
    onChange,
    value,
    defaultLabel,
    views,
    format,
    ...otherProps,
  });

  const classes = useStyles({ disabled, mobileClient, open, error, fullWidth });

  const popUpProps = mobileClient
    ? {
        classes: {
          paper: classes.dialogPaper,
        },
        onClose: onClosePopup,
        open: !!open,
      }
    : {
        anchorEl: withFilterPeriod ? openModalPeriod : open,
        anchorOrigin: {
          horizontal: 'left',
          vertical: 'bottom',
        },
        onClose: withFilterPeriod
          ? () => setOpenModalPeriod(false)
          : onClosePopup,
        open: !!open,
        transformOrigin: {
          horizontal: 'left',
          vertical: 'top',
        },
      };

  return (
    <>
      {!!menuLabel && (
        <Grid container>
          {!!required && (
            <Grid item style={{ marginRight: '2px' }}>
              <Typography
                children="*"
                color="primary-main"
                variant="overline"
                weight="medium"
              />
            </Grid>
          )}
          <Grid item>
            <Typography
              children={menuLabel}
              className={classes.menuLabel}
              variant="overline"
              weight="medium"
            />
          </Grid>
        </Grid>
      )}
      <div
        className={classes.dropdown}
        id={id || 'dropdown-pick'}
        onClick={
          withFilterPeriod
            ? () => setOpenModalPeriod(true)
            : disabled
            ? emptyFunc
            : setOpen(true)
        }
      >
        <Typography children={label} variant="body1" />
        {withFilterPeriod ? (
          <>
            {label !== 'All Period' && (
              <Close
                onClick={(e) => {
                  e.stopPropagation();
                  resetSelectedDate();
                  resetFormFilterPeriod();
                }}
                style={{
                  height: 20,
                  marginLeft: 20,
                  transition: '200ms',
                  width: 20,
                }}
              />
            )}
            <CalendarIcon
              style={{
                height: 20,
                marginLeft: label !== 'All Period' ? 5 : 20,
                transition: '200ms',
                width: 20,
              }}
            />
          </>
        ) : iconCalendar ? (
          <CalendarIcon
            style={{
              height: 20,
              marginLeft: 20,
              transition: '200ms',
              width: 20,
            }}
          />
        ) : (
          <ArrowDown className="arrow" />
        )}
      </div>
      {!!helperText && (
        <Typography
          children={helperText}
          className={classes.helper}
          variant="caption"
        />
      )}
      {withFilterPeriod ? (
        <PeriodFilter
          open={openModalPeriod}
          onClose={() => setOpenModalPeriod(false)}
          optionsCheckboxFilter={optionsCheckboxFilter}
          getValueFilterPeriod={getValueFilterPeriod}
          onClear={() => {
            resetSelectedDate();
            resetFormFilterPeriod();
            setOpenModalPeriod(false);
          }}
          hooksFormFilterPeriod={hooksFormFilterPeriod}
        />
      ) : (
        <PopUp id="popUp" {...popUpProps}>
          <LocalizationProvider dateAdapter={MomentUtils} locale="en-US">
            <StaticDatePicker
              {...otherProps}
              allowKeyboardControl={false}
              displayStaticWrapperAs={mobileClient ? 'mobile' : 'desktop'}
              inputFormat="DD/MM/YYYY"
              onChange={setSelectedDate}
              renderInput={KeyboardInput}
              toolbarPlaceholder="Select Date"
              value={selectedDate}
              views={views}
            />
            {!otherProps.autoOk && (
              <div className={classes.actionButton}>
                <Button
                  children="Reset"
                  id="btn-reset"
                  onClick={resetSelectedDate}
                  variant="ghost"
                />
                <Button children="Submit" id="btn-submit" onClick={onSubmit} />
              </div>
            )}
          </LocalizationProvider>
        </PopUp>
      )}

      {!!error && (
        <Typography children={error} color="primary-main" variant="caption" />
      )}
    </>
  );
};

export default DatePicker;
