import { RadioGroup, TextField } from '@components/FormField';
import DynamicOptionsSelect from '@containers/Document/OfferingLetter/_elements/DynamicOptionsSelect';
import { Box, Grid } from '@material-ui/core';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useWatch } from 'react-hook-form';
import Typography from '@components/Typography';

const VpnIp = (props) => {
  const { control, builder } = props;

  const {
    PROPORSI_BEST_EFFORT = 0,
    PROPORSI_CRITICAL = 0,
    PROPORSI_INTERACTIVE = 0,
  } = useWatch({ control });

  const totalProporsi = useMemo(() => {
    return (
      parseInt(PROPORSI_BEST_EFFORT) +
      parseInt(PROPORSI_CRITICAL) +
      parseInt(PROPORSI_INTERACTIVE)
    );
  }, [PROPORSI_BEST_EFFORT, PROPORSI_CRITICAL, PROPORSI_INTERACTIVE]);

  return (
    <Grid container spacing={2}>
      {builder?.select?.map((fieldProps) => (
        <Grid item key={fieldProps.name} xs={12}>
          <DynamicOptionsSelect control={control} {...fieldProps} />
        </Grid>
      ))}
      {builder?.textField?.map((fieldProps) => {
        if (fieldProps.name === 'PROPORSI_INTERACTIVE') {
          return (
            <Grid item key={fieldProps.name} xs={12}>
              <TextField
                control={control}
                shouldUnregister
                type="number"
                {...fieldProps}
              />
              {!!totalProporsi && totalProporsi !== 100 && (
                <Box mt={2}>
                  <Typography color="primary-main" variant="caption">
                    Proporsi Best Effort, Proporsi Critical dan Proporsi
                    Interactive harus berjumlah 100
                  </Typography>
                </Box>
              )}
            </Grid>
          );
        }

        return (
          <Grid item key={fieldProps.name} xs={12}>
            <TextField
              control={control}
              shouldUnregister
              type="number"
              {...fieldProps}
            />
          </Grid>
        );
      })}
      {builder?.radio?.map((fieldProps) => (
        <Grid item key={fieldProps.name} xs={12}>
          <RadioGroup
            control={control}
            direction="horizontal"
            shouldUnregister
            {...fieldProps}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography variant="caption">
          <strong>Note:</strong> Kapasitas Kecil (Kbps) : 0.064 , 0.128 , 0.256
          , 0.512
        </Typography>
      </Grid>
    </Grid>
  );
};

VpnIp.defaultProps = {
  builder: {},
};

VpnIp.propTypes = {
  builder: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
};

export default VpnIp;
