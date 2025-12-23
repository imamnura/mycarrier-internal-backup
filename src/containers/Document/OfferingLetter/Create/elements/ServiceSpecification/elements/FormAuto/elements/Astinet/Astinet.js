import { RadioGroup, TextField } from '@components/FormField';
import BasicTextField from '@components/TextField';
import DynamicOptionsSelect from '@containers/Document/OfferingLetter/_elements/DynamicOptionsSelect';
import { Grid } from '@material-ui/core';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useWatch } from 'react-hook-form';

const Astinet = (props) => {
  const { control, builder } = props;

  const currentFormData = useWatch({ control });

  const isBedaBandwith = currentFormData.MIX === 'NO';

  const globalValue = currentFormData.GLOBAL;
  const domestikValue = 100 - globalValue;

  return (
    <Grid container spacing={2}>
      {builder?.select?.map((fieldProps) => (
        <Grid item key={fieldProps.name} xs={12}>
          <DynamicOptionsSelect control={control} {...fieldProps} />
        </Grid>
      ))}
      {builder?.textField?.map((fieldProps) => {
        if (fieldProps.name === 'GLOBAL') {
          if (isBedaBandwith) {
            return (
              <Fragment key={fieldProps.name}>
                <Grid item xs={12}>
                  <TextField
                    control={control}
                    shouldUnregister
                    type="number"
                    {...fieldProps}
                    rules={{
                      ...fieldProps.rules,
                      max: {
                        message: 'Global must be lower than or equal to 100',
                        value: 100,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <BasicTextField
                    disabled
                    label="Domestik"
                    type="number"
                    value={domestikValue.toString()}
                  />
                </Grid>
              </Fragment>
            );
          } else {
            return null;
          }
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
    </Grid>
  );
};

Astinet.defaultProps = {
  builder: {},
};

Astinet.propTypes = {
  builder: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
};

export default Astinet;
