import { RadioGroup, TextField } from '@components/FormField';
import DynamicOptionsSelect from '@containers/Document/OfferingLetter/_elements/DynamicOptionsSelect';
import { Box, Grid } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useWatch } from 'react-hook-form';
import useStyles from './styles';
import Typography from '@components/Typography';
import ButtonMinimal from '@components/ButtonMinimal';

const MetroEthernet = (props) => {
  const { control, builder } = props;

  const currentFormData = useWatch({ control });

  const isP2MP = useMemo(
    () => currentFormData.OP2 === 'P2MP',
    [currentFormData],
  );

  const child = useMemo(() => {
    let res = [{}, {}, {}, {}, {}];

    builder?.select?.forEach((f) => {
      if (f.name.includes('CHILD')) {
        const splitedName = f.name.split('_');
        const index = parseInt(splitedName[1]) - 1;
        res[index] = {
          ...res[index],
          child: f,
        };
      }
    });

    builder?.textField?.forEach((f) => {
      if (f.name.includes('KAPASITAS')) {
        const splitedName = f.name.split('_');
        const index = parseInt(splitedName[1]) - 1;
        res[index] = {
          ...res[index],
          capacity: f,
        };
      } else if (f.name.includes('JUMLAH_NODE')) {
        const splitedName = f.name.split('_');
        const index = parseInt(splitedName[2]) - 1;
        res[index] = {
          ...res[index],
          node: f,
        };
      }
    });

    return res;
  }, [builder]);

  const backhaul = useMemo(() => {
    return builder?.select?.find(({ name }) => name === 'BACKHAUL');
  }, [builder]);

  const kotaAsal = useMemo(() => {
    return builder?.select?.find(({ name }) => name === 'KOTA_ASAL');
  }, [builder]);

  const kotaTujuan = useMemo(() => {
    return builder?.select?.find(({ name }) => name === 'KOTA_TUJUAN');
  }, [builder]);

  const bandwidth = useMemo(() => {
    return builder?.textField?.find(({ name }) => name === 'BANDWIDTH');
  }, [builder]);

  const diskon = useMemo(() => {
    return builder?.textField?.find(({ name }) => name === 'DISKON');
  }, [builder]);

  const [childLength, _setChildLength] = useState(1);
  const setChildLength = (val) => () => _setChildLength(val);

  const classes = useStyles();

  return (
    <Grid container spacing={2}>
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
      {currentFormData.OP2 && (
        <>
          {isP2MP ? (
            <>
              <Grid item xs={12}>
                <DynamicOptionsSelect control={control} {...backhaul} />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {child.map(({ child, capacity, node }, childIndex) => {
                    if (childIndex >= childLength) {
                      return null;
                    }

                    return (
                      <Grid item key={childIndex} xs={12}>
                        <div className={classes.childWrapper}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography variant="subtitle1" weight="medium">
                                Child {childIndex + 1}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <DynamicOptionsSelect
                                control={control}
                                {...child}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                control={control}
                                shouldUnregister
                                type="number"
                                {...capacity}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                control={control}
                                shouldUnregister
                                type="number"
                                {...node}
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    );
                  })}
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end" m={-1}>
                      {childLength > 1 && (
                        <ButtonMinimal
                          onClick={setChildLength(childLength - 1)}
                          variant="minus"
                        />
                      )}
                      {childLength < 5 && (
                        <ButtonMinimal
                          onClick={setChildLength(childLength + 1)}
                          variant="add"
                        />
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DynamicOptionsSelect control={control} {...kotaAsal} />
                </Grid>
                <Grid item xs={12}>
                  <DynamicOptionsSelect control={control} {...kotaTujuan} />
                </Grid>
              </Grid>
            </Grid>
          )}
        </>
      )}
      {currentFormData.OP2 && !isP2MP && (
        <>
          <Grid item xs={6}>
            <TextField
              control={control}
              shouldUnregister
              type="number"
              {...bandwidth}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              control={control}
              shouldUnregister
              type="number"
              {...diskon}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

MetroEthernet.defaultProps = {
  builder: {},
};

MetroEthernet.propTypes = {
  builder: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
};

export default MetroEthernet;
