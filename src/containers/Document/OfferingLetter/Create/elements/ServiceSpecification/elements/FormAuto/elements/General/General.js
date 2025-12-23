import { RadioGroup, TextField } from '@components/FormField';
import DynamicOptionsSelect from '@containers/Document/OfferingLetter/_elements/DynamicOptionsSelect';
import { Grid } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const General = (props) => {
  const { control, builder } = props;

  return (
    <Grid container spacing={2}>
      {builder?.select?.map((fieldProps) => (
        <Grid item key={fieldProps.name} xs={12}>
          <DynamicOptionsSelect control={control} {...fieldProps} />
        </Grid>
      ))}
      {builder?.textField?.map((fieldProps) => (
        <Grid item key={fieldProps.name} xs={12}>
          <TextField
            control={control}
            shouldUnregister
            type="number"
            {...fieldProps}
          />
        </Grid>
      ))}
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
    </Grid>
  );
};

General.defaultProps = {
  builder: {},
};

General.propTypes = {
  builder: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
};

export default General;
