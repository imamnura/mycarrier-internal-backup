import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import useStyles from '../../styles';
import MomentUtils from '@material-ui/pickers/adapter/moment';
import { LocalizationProvider, StaticDatePicker } from '@material-ui/pickers';
import Typography from '@components/Typography';
import Button from '@components/Button';
import useResponsive from '@utils/hooks/useResponsive';
import useActions from './hooks/useActions';
import DateIcon from '@assets/icon-v2/Date';

const DateRangePickerSecondary = (props) => {
  const {
    onChange,
    value,
    label: _label,
    fullWidth,
    views,
    useRangeMonth,
    format,
    id = 'date-range-picker',
    ...otherProps
  } = props;

  const mobileClient = useResponsive('xs');

  const {
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
  } = useActions({
    mobileClient,
    onChange,
    value,
    label: _label,
    useRangeMonth,
    format,
  });

  const classes = useStyles({ mobileClient, open, fullWidth });

  const popUpProps = mobileClient
    ? {
        classes: { paper: classes.dialogPaper },
        open: !!open,
        onClose: onClosePopup,
      }
    : {
        anchorEl: open,
        anchorOrigin: {
          horizontal: 'left',
          vertical: 'bottom',
        },
        open: !!open,
        transformOrigin: {
          horizontal: 'left',
          vertical: 'top',
        },
        classes: { paper: classes.dialogPaper },
        onClose: onClosePopup,
      };

  return (
    <>
      <div className={classes.dropdown} onClick={setOpen(true)} id={id}>
        <Typography children={label} variant="body1" color="general-main" />
        <DateIcon className="arrow" />
      </div>
      <PopUp id="popUp" {...popUpProps}>
        <LocalizationProvider dateAdapter={MomentUtils} locale="en-US">
          <Box sx={{ display: 'flex', overflow: 'auto' }}>
            <div>
              <Box className={classes.header}>
                <Typography color="white" variant="subtitle2" weight="medium">
                  Start Date
                </Typography>
              </Box>
              <StaticDatePicker
                {...otherProps}
                autoOk
                displayStaticWrapperAs="desktop"
                id="startPick"
                maxDate={endDate}
                onChange={setStartDate}
                showDaysOutsideCurrentMonth
                value={startDate}
                views={views}
              />
            </div>
            <div>
              <Box className={classes.header}>
                <Typography color="white" variant="subtitle2" weight="medium">
                  End Date
                </Typography>
              </Box>
              <StaticDatePicker
                {...otherProps}
                autoOk
                displayStaticWrapperAs="desktop"
                id="endPick"
                minDate={startDate}
                onChange={setEndDate}
                showDaysOutsideCurrentMonth
                value={endDate}
                views={views}
              />
            </div>
          </Box>
          {useRangeMonth ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                height: 70,
                justifyContent: 'flex-end',
                padding: '12px 24px',
              }}
            >
              <Box>
                <Typography variant="subtitle2" weight="medium">
                  Range:
                </Typography>
                <Typography variant="subtitle2" weight="bold">
                  {` ${rangeOfMonth}`} Months
                </Typography>
              </Box>
              <Button onClick={onClosePopup} variant="ghost">
                Cancel
              </Button>
              <Button disabled={disableSubmit} onClick={onSubmit}>
                Submit
              </Button>
            </Box>
          ) : (
            <Box className={classes.actionButton}>
              <Button onClick={onReset} variant="ghost">
                Reset
              </Button>
              <Button disabled={disableSubmit} onClick={onSubmit}>
                Submit
              </Button>
            </Box>
          )}
        </LocalizationProvider>
      </PopUp>
    </>
  );
};

DateRangePickerSecondary.defaultProps = {
  label: ['Start Date', 'End Date'],
  value: [null, null],
  views: ['date'],
  useRangeMonth: false,
  format: 'DD/MM/YYYY',
};

DateRangePickerSecondary.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array,
  views: PropTypes.array,
  useRangeMonth: PropTypes.bool,
  format: PropTypes.string,
};

export default DateRangePickerSecondary;
