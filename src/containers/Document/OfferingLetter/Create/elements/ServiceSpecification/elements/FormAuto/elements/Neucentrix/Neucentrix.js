import { TextField } from '@components/FormField';
import DynamicOptionsSelect from '@containers/Document/OfferingLetter/_elements/DynamicOptionsSelect';
import { Grid } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useWatch } from 'react-hook-form';
import useStyles from './styles';
import Typography from '@components/Typography';

const Neucentrix = (props) => {
  const { control, builder } = props;

  const { KOTA_ASAL } = useWatch({ control });

  const itHallForm = useMemo(() => {
    const select = builder.select.filter(({ name }) => name.includes('IH'));
    const textField = builder.textField.filter(({ name }) =>
      name.includes('IH'),
    );

    return {
      select,
      textField,
    };
  }, [builder]);

  const nerForm = useMemo(() => {
    const select = builder.select.filter(({ name }) => name.includes('NER'));
    const textField = builder.textField.filter(({ name }) =>
      name.includes('NER'),
    );

    return {
      select,
      textField,
    };
  }, [builder]);

  const ncixForm = useMemo(() => {
    const select = builder.select.filter(({ name }) => name.includes('NCIX'));
    const textField = builder.textField.filter(({ name }) =>
      name.includes('NCIX'),
    );

    return {
      select,
      textField,
    };
  }, [builder]);

  const [neucentrixProperties, setNeucentrixProperties] = useState(null);

  useEffect(() => {
    // const x = builder.select.filter(
    //   ({ name }) =>
    //     name.includes('IH') || name.includes('NER') || name.includes('NCIX'),
    // );

    setNeucentrixProperties(null);
  }, [KOTA_ASAL]);

  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {builder?.select
        ?.filter(
          ({ name }) =>
            !(
              name.includes('IH') ||
              name.includes('NER') ||
              name.includes('NCIX')
            ),
        )
        .map((fieldProps) => (
          <Grid item key={fieldProps.name} xs={12}>
            <DynamicOptionsSelect
              control={control}
              setNeucentrixProperties={setNeucentrixProperties}
              {...fieldProps}
            />
          </Grid>
        ))}
      {builder?.textField
        ?.filter(
          ({ name }) =>
            !(
              name.includes('IH') ||
              name.includes('NER') ||
              name.includes('NCIX')
            ),
        )
        .map((fieldProps) => (
          <Grid item key={fieldProps.name} xs={12}>
            <TextField
              control={control}
              shouldUnregister
              type="number"
              {...fieldProps}
            />
          </Grid>
        ))}
      {neucentrixProperties?.RACK_ITHALL && (
        <Grid item xs={12}>
          <div className={classes.wrapper}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" weight="medium">
                  Sewa Rack IT Hall
                </Typography>
              </Grid>
              {itHallForm.select.map((fieldProps) => (
                <Grid item key={fieldProps.name} xs={12}>
                  <DynamicOptionsSelect control={control} {...fieldProps} />
                </Grid>
              ))}
              {itHallForm.textField.map((fieldProps) => (
                <Grid item key={fieldProps.name} xs={12}>
                  <TextField
                    control={control}
                    shouldUnregister
                    type="number"
                    {...fieldProps}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
      )}
      {neucentrixProperties?.RACK_NER && (
        <Grid item xs={12}>
          <div className={classes.wrapper}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" weight="medium">
                  Sewa Rack NER
                </Typography>
              </Grid>
              {nerForm.select.map((fieldProps) => (
                <Grid item key={fieldProps.name} xs={12}>
                  <DynamicOptionsSelect control={control} {...fieldProps} />
                </Grid>
              ))}
              {nerForm.textField.map((fieldProps) => (
                <Grid item key={fieldProps.name} xs={12}>
                  <TextField
                    control={control}
                    shouldUnregister
                    type="number"
                    {...fieldProps}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
      )}
      {neucentrixProperties?.NCIX && (
        <Grid item xs={12}>
          <div className={classes.wrapper}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" weight="medium">
                  Additional Service NCIX Port
                </Typography>
              </Grid>
              {ncixForm.select.map((fieldProps) => (
                <Grid item key={fieldProps.name} xs={12}>
                  <DynamicOptionsSelect control={control} {...fieldProps} />
                </Grid>
              ))}
              {ncixForm.textField.map((fieldProps) => (
                <Grid item key={fieldProps.name} xs={12}>
                  <TextField
                    control={control}
                    shouldUnregister
                    type="number"
                    {...fieldProps}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
      )}
    </Grid>
  );
};

Neucentrix.defaultProps = {
  builder: {},
};

Neucentrix.propTypes = {
  builder: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  reset: PropTypes.func.isRequired,
};

export default Neucentrix;
