import { RadioGroup, TextField } from '@components/FormField';
import DynamicOptionsSelect from '@containers/Document/OfferingLetter/_elements/DynamicOptionsSelect';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useWatch } from 'react-hook-form';
import { capitalize } from '@utils/text';
import { getSelectOptions } from '@containers/Document/OfferingLetter/_repositories/repositories';

const IpTransit = (props) => {
  const { control, builder, setValue } = props;

  const { GLOBAL, KOTA_ASAL } = useWatch({ control });

  useEffect(() => {
    const globalValue = GLOBAL;
    const domestikValue = 100 - globalValue;
    setValue('DOMESTIK', domestikValue);
  }, [GLOBAL]);

  const [optionsNcix, setOptionsNcix] = useState([]);

  useEffect(async () => {
    const ncixRef = builder.select.find((f) => f.name === 'KOTA_ASAL')?.ncixRef;
    if (ncixRef) {
      try {
        const result = await getSelectOptions(`${ncixRef}${KOTA_ASAL}`);
        setOptionsNcix(
          result.data.list_data.map(({ VALUE, DISPLAY }) => ({
            label: capitalize(DISPLAY),
            value: VALUE,
          })),
        );
      } catch (error) {
        setOptionsNcix([]);
      }
    }
  }, [KOTA_ASAL]);

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
      {builder?.radio?.map((fieldProps) => {
        if (fieldProps.name === 'NCIX') {
          if (optionsNcix.length > 0) {
            return (
              <Grid item key={fieldProps.name} xs={12}>
                <RadioGroup
                  control={control}
                  direction="horizontal"
                  options={optionsNcix}
                  shouldUnregister
                  {...fieldProps}
                />
              </Grid>
            );
          } else {
            return null;
          }
        }

        return (
          <Grid item key={fieldProps.name} xs={12}>
            <RadioGroup
              control={control}
              direction="horizontal"
              shouldUnregister
              {...fieldProps}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

IpTransit.defaultProps = {
  builder: {},
};

IpTransit.propTypes = {
  builder: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default IpTransit;
