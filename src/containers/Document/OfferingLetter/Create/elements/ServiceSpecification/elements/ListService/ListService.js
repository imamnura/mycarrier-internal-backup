/* eslint-disable react/prop-types */
import ButtonMinimal from '@components/ButtonMinimal';
import Numbering from '@components/Numbering';
import Typography from '@components/Typography';
import { Box, Divider, Grid } from '@material-ui/core';
import { rupiahFormat } from '@utils/parser';
import React, { Fragment } from 'react';
import useStyles from './styles';

const ListService = (props) => {
  const { data = [], onDelete, onAdd, onEdit, totalPrice } = props;

  const classes = useStyles();

  return (
    <>
      {data?.map((d, serviceIndex) => (
        <Box key={serviceIndex} pb={4}>
          <Numbering
            alignItems="flex-start"
            data={
              <Box pt={1}>
                <Grid container justifyContent="space-between" spacing={2}>
                  <Grid item>
                    <Typography variant="h5" weight="medium">
                      {d.productName}
                    </Typography>
                    <Box component="span" ml={2}>
                      <Typography variant="h5" weight="medium">
                        (SLG {d.slg}%)
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <ButtonMinimal
                      label="delete service"
                      onClick={onDelete({ serviceIndex })}
                      variant="delete"
                    />
                  </Grid>
                </Grid>
                {d.pricing.map((pricingItem, pricingIndex) => (
                  <Fragment key={pricingIndex}>
                    {pricingIndex === 0 && (
                      <Box pb={3}>
                        <Grid
                          container
                          key={`title${pricingIndex}`}
                          spacing={2}
                        >
                          <Grid
                            item
                            xs={
                              d.productParam === 'CNDC' && d.epicProduct ? 7 : 9
                            }
                          >
                            <Grid container spacing={2}>
                              {pricingItem.detailFields.map((field, f) => (
                                <Grid item key={`name${f}`} xs>
                                  <Typography
                                    color="general-main"
                                    variant="subtitle2"
                                    weight="medium"
                                  >
                                    {field.fieldName.toUpperCase()}
                                  </Typography>
                                </Grid>
                              ))}
                            </Grid>
                          </Grid>
                          {d.productParam === 'CNDC' && d.epicProduct ? (
                            <>
                              <Grid item xs={2}>
                                <Typography
                                  color="primary-main"
                                  variant="subtitle2"
                                  weight="medium"
                                >
                                  ONE TIME CHARGE
                                </Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Typography
                                  color="primary-main"
                                  variant="subtitle2"
                                  weight="medium"
                                >
                                  MONTHLY RECURRING CHARGE
                                </Typography>
                              </Grid>
                            </>
                          ) : (
                            <Grid item xs={3}>
                              <Typography
                                color="primary-main"
                                variant="subtitle2"
                                weight="medium"
                              >
                                TOTAL
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    )}
                    <Box>
                      <Grid container key={`value${pricingIndex}`} spacing={2}>
                        <Grid
                          item
                          xs={
                            d.productParam === 'CNDC' && d.epicProduct ? 7 : 9
                          }
                        >
                          <Grid container spacing={2}>
                            {pricingItem.detailFields.map((field, f) => (
                              <Grid item key={`field${f}`} xs>
                                <Typography
                                  color="general-mid"
                                  variant="subtitle1"
                                >
                                  {field.fieldValue}
                                </Typography>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                        {d.productParam === 'CNDC' && d.epicProduct ? (
                          <>
                            <Grid item xs={2}>
                              <Typography
                                color="primary-main"
                                variant="subtitle1"
                              >
                                {rupiahFormat(pricingItem.tarifOTC)}
                              </Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography
                                color="primary-main"
                                variant="subtitle1"
                              >
                                {rupiahFormat(pricingItem.tarifMRC)}
                              </Typography>
                            </Grid>
                          </>
                        ) : (
                          <Grid item xs={2}>
                            <Typography
                              color="primary-main"
                              variant="subtitle1"
                            >
                              {rupiahFormat(pricingItem.total)}
                            </Typography>
                          </Grid>
                        )}
                        <Grid item xs={1}>
                          <Box display="flex" mt={-1}>
                            <ButtonMinimal
                              onClick={onEdit({
                                data: d,
                                pricingIndex,
                                serviceIndex,
                              })}
                              variant="pencil"
                            />
                            <ButtonMinimal
                              onClick={onDelete({ pricingIndex, serviceIndex })}
                              variant="trash"
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Fragment>
                ))}
                <Box alignItems="center" display="flex" mt={3}>
                  <div className={classes.dashed} />
                  <ButtonMinimal
                    label="add location"
                    onClick={onAdd({ data: d, serviceIndex })}
                    variant="add"
                  />
                </Box>
              </Box>
            }
            number={serviceIndex + 1}
          />
        </Box>
      ))}
      {!!data?.length && (
        <Grid container justifyContent="center" spacing={3}>
          <Grid item>
            <Typography color="general-mid" variant="h4" weight="medium">
              TOTAL TARIF
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary-main" variant="h4" weight="medium">
              {rupiahFormat(totalPrice)}
            </Typography>
          </Grid>
        </Grid>
      )}
      <Box my={5}>
        <Divider />
      </Box>
    </>
  );
};

export default ListService;
