import Button from '@components/Button';
import { Modal } from '@legion-ui/core';
import React from 'react';
import DatePicker from '@components/DatePicker';
import { Controller } from 'react-hook-form';
import Typography from '@components/Typography';
import { Checkbox } from '@legion-ui/core';
import useAction from './hooks/useAction';
import useStyles from './styles';
import { Box, Grid } from '@material-ui/core';

const PeriodFilter = ({
  onClose,
  open,
  optionsCheckboxFilter,
  getValueFilterPeriod,
  onClear,
  hooksFormFilterPeriod: { control, handleSubmit, watch, isValid },
}) => {
  const { onApply, isDisableApply } = useAction({
    onClose,
    getValueFilterPeriod,
    watch,
  });

  const classes = useStyles();

  return (
    <Modal
      show={open}
      title="Period Filter"
      onClose={onClose}
      className={classes.title}
    >
      <div
        style={{
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
        }}
      >
        <Box width="100%">
          <Grid container justifyContent="flex-start" spacing={2}>
            <Grid item xs={12} style={{ paddingTop: '0' }}>
              {optionsCheckboxFilter?.length > 0 && (
                <>
                  <Typography variant="subtitle2" weight="medium">
                    Filter by
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 36,
                      marginTop: '5px',
                    }}
                  >
                    {optionsCheckboxFilter.map((d, i) => (
                      <Controller
                        key={i}
                        defaultValue={false}
                        id={d.nameInput}
                        control={control}
                        name={d.nameInput}
                        render={({ field: { value, onChange } }) => (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                            }}
                          >
                            <Checkbox checked={value} onChange={onChange} />
                            <Typography color="general-main" variant="body2">
                              {d.label}
                            </Typography>
                          </Box>
                        )}
                      />
                    ))}
                  </Box>
                </>
              )}
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="period"
                render={({ field, fieldState }) => {
                  const { value, onChange } = field;

                  const error = fieldState?.error?.message;

                  return (
                    <>
                      <Typography
                        children="*"
                        color="primary-main"
                        variant="overline"
                        weight="medium"
                      />
                      <Box component="span" sx={{ marginLeft: 2 }}>
                        <Typography
                          children="Period"
                          color="general-mid"
                          variant="overline"
                          weight="medium"
                        />
                      </Box>
                      <DatePicker
                        autoOk={true}
                        format="MMMM YYYY"
                        label="Select Period"
                        onChange={onChange}
                        openTo={'month'}
                        value={value}
                        views={['year', 'month']}
                        iconCalendar={true}
                        withFilterPeriod={false}
                      />
                      <Typography
                        children={error}
                        color="primary-main"
                        variant="caption"
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <div style={{ flexGrow: 1 }}>
            <Button
              variant="transparent"
              onClick={() => {
                onClear();
              }}
            >
              Clear
            </Button>
          </div>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onApply)}
            disabled={!isValid || isDisableApply()}
          >
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PeriodFilter;
