import React, { useMemo } from 'react';
import Typography from '@components/Typography/Typography';
import { Box, Grid } from '@material-ui/core';
import useStyles from '../styles';
import { TextFieldMasked } from '@components/FormField';
import PropTypes from 'prop-types';
import { currencyConverter } from '@utils/converter';
import {
  SERVICE_ITEM_IT_HALL,
  SERVICE_ITEM_NCIX,
  SERVICE_ITEM_NER,
} from '../constant';
import {
  formLabel,
  formServiceDefaultLabel,
  formServiceLabel,
  getSummary,
  priceForms,
} from '../utils';
import { useWatch } from 'react-hook-form';

function ModalContentServicePricing(props) {
  const {
    form: { control },
  } = props;
  const styles = useStyles();

  const servicesWatch = useWatch({
    control,
    name: 'services',
  });

  const withNcixWatch = useWatch({
    control,
    name: 'withNcix',
  });

  const withRentRackNERWatch = useWatch({
    control,
    name: 'withRentRackNER',
  });

  const formServicePrice = useWatch({
    control,
    name: 'price',
  });

  const summary = useMemo(() => {
    if (formServicePrice) {
      const defaultFormServicePrice = {
        [SERVICE_ITEM_IT_HALL]: formServicePrice[SERVICE_ITEM_IT_HALL],
      };

      if (withRentRackNERWatch) {
        Object.assign(defaultFormServicePrice, {
          ...defaultFormServicePrice,
          [SERVICE_ITEM_NER]: formServicePrice[SERVICE_ITEM_NER],
        });
      }

      if (withNcixWatch) {
        Object.assign(defaultFormServicePrice, {
          ...defaultFormServicePrice,
          [SERVICE_ITEM_NCIX]: formServicePrice[SERVICE_ITEM_NCIX],
        });
      }

      return getSummary(defaultFormServicePrice, {
        itHall: ['base', ...priceForms(servicesWatch, SERVICE_ITEM_IT_HALL)],
        NER: servicesWatch[SERVICE_ITEM_NER]
          ? ['base', ...priceForms(servicesWatch, SERVICE_ITEM_NER)]
          : null,
        NCIX: servicesWatch[SERVICE_ITEM_NCIX]
          ? ['base', ...priceForms(servicesWatch, SERVICE_ITEM_NCIX)]
          : null,
      });
    }
    return [0, 0];
  }, [formServicePrice, withNcixWatch, withRentRackNERWatch, servicesWatch]);

  return (
    <Box>
      {servicesWatch[SERVICE_ITEM_IT_HALL] && (
        <Box className={styles.roundedBox} sx={{ gap: '16px' }}>
          <Typography
            style={{ display: 'block', marginBottom: '16px' }}
            variant="h5"
            weight="bold"
          >
            {formServiceLabel(SERVICE_ITEM_IT_HALL)}
          </Typography>

          <Grid container justifyContent="center" spacing={1}>
            <Grid
              item
              sm={4}
              style={{
                display: 'flex',
                alignSelf: 'center',
              }}
              xs={4}
            >
              <Typography
                style={{ display: 'block' }}
                variant="body2"
                weight="normal"
              >
                {formServiceDefaultLabel(SERVICE_ITEM_IT_HALL)}
              </Typography>
            </Grid>
            <Grid item sm={4} xs={4}>
              <TextFieldMasked
                control={control}
                label="OTC Price"
                maskType="currency"
                maxLength={16}
                name={`price.${SERVICE_ITEM_IT_HALL}.base.otc`}
                required
              />
            </Grid>
            <Grid item sm={4} xs={4}>
              <TextFieldMasked
                control={control}
                label="MRC Price"
                maskType="currency"
                maxLength={16}
                name={`price.${SERVICE_ITEM_IT_HALL}.base.mrc`}
                required
              />
            </Grid>
          </Grid>
          {priceForms(servicesWatch, SERVICE_ITEM_IT_HALL).map(
            (priceItem, index) => (
              <Grid container justifyContent="center" key={index} spacing={1}>
                <Grid
                  item
                  sm={4}
                  style={{
                    display: 'flex',
                    alignSelf: 'center',
                  }}
                  xs={4}
                >
                  <Typography
                    style={{ display: 'block' }}
                    variant="body2"
                    weight="normal"
                  >
                    {formLabel(priceItem)}
                  </Typography>
                </Grid>
                <Grid item sm={4} xs={4}>
                  <TextFieldMasked
                    control={control}
                    label="OTC Price"
                    maskType="currency"
                    maxLength={16}
                    name={`price.${SERVICE_ITEM_IT_HALL}.${priceItem}.otc`}
                    required
                  />
                </Grid>
                <Grid item sm={4} xs={4}>
                  <TextFieldMasked
                    control={control}
                    label="MRC Price"
                    maskType="currency"
                    maxLength={16}
                    name={`price.${SERVICE_ITEM_IT_HALL}.${priceItem}.mrc`}
                    required
                  />
                </Grid>
              </Grid>
            ),
          )}
        </Box>
      )}

      {servicesWatch[SERVICE_ITEM_NER] && (
        <Box className={styles.roundedBox} sx={{ gap: '16px' }}>
          <Typography
            style={{ display: 'block', marginBottom: '16px' }}
            variant="h5"
            weight="bold"
          >
            {formServiceLabel(SERVICE_ITEM_NER)}
          </Typography>

          <Grid container justifyContent="center" spacing={1}>
            <Grid
              item
              sm={4}
              style={{
                display: 'flex',
                alignSelf: 'center',
              }}
              xs={4}
            >
              <Typography
                style={{ display: 'block' }}
                variant="body2"
                weight="normal"
              >
                {formServiceDefaultLabel(SERVICE_ITEM_NER)}
              </Typography>
            </Grid>
            <Grid item sm={4} xs={4}>
              <TextFieldMasked
                control={control}
                label="OTC Price"
                maskType="currency"
                maxLength={16}
                name={`price.${SERVICE_ITEM_NER}.base.otc`}
                required
              />
            </Grid>
            <Grid item sm={4} xs={4}>
              <TextFieldMasked
                control={control}
                label="MRC Price"
                maskType="currency"
                maxLength={16}
                name={`price.${SERVICE_ITEM_NER}.base.mrc`}
                required
              />
            </Grid>
          </Grid>
          {priceForms(servicesWatch, SERVICE_ITEM_NER).map(
            (priceItem, index) => (
              <Grid container justifyContent="center" key={index} spacing={1}>
                <Grid
                  item
                  sm={4}
                  style={{
                    display: 'flex',
                    alignSelf: 'center',
                  }}
                  xs={4}
                >
                  <Typography
                    style={{ display: 'block' }}
                    variant="body2"
                    weight="normal"
                  >
                    {formLabel(priceItem)}
                  </Typography>
                </Grid>
                <Grid item sm={4} xs={4}>
                  <TextFieldMasked
                    control={control}
                    label="OTC Price"
                    maskType="currency"
                    maxLength={16}
                    name={`price.${SERVICE_ITEM_NER}.${priceItem}.otc`}
                    required
                  />
                </Grid>
                <Grid item sm={4} xs={4}>
                  <TextFieldMasked
                    control={control}
                    label="MRC Price"
                    maskType="currency"
                    maxLength={16}
                    name={`price.${SERVICE_ITEM_NER}.${priceItem}.mrc`}
                    required
                  />
                </Grid>
              </Grid>
            ),
          )}
        </Box>
      )}

      {servicesWatch[SERVICE_ITEM_NCIX] && (
        <Box className={styles.roundedBox} sx={{ gap: '16px' }}>
          <Typography
            style={{ display: 'block', marginBottom: '16px' }}
            variant="h5"
            weight="bold"
          >
            {formServiceLabel(
              SERVICE_ITEM_NCIX,
              servicesWatch[SERVICE_ITEM_NCIX]?.ncixMembership,
            )}
          </Typography>

          <Grid container justifyContent="center" spacing={1}>
            <Grid
              item
              sm={4}
              style={{
                display: 'flex',
                alignSelf: 'center',
              }}
              xs={4}
            >
              <Typography
                style={{ display: 'block' }}
                variant="body2"
                weight="normal"
              >
                {formServiceDefaultLabel(SERVICE_ITEM_NCIX)}
              </Typography>
            </Grid>
            <Grid item sm={4} xs={4}>
              <TextFieldMasked
                control={control}
                label="OTC Price"
                maskType="currency"
                maxLength={16}
                name={`price.${SERVICE_ITEM_NCIX}.base.otc`}
                required
              />
            </Grid>
            <Grid item sm={4} xs={4}>
              <TextFieldMasked
                control={control}
                label="MRC Price"
                maskType="currency"
                maxLength={16}
                name={`price.${SERVICE_ITEM_NCIX}.base.mrc`}
                required
              />
            </Grid>
          </Grid>
          {priceForms(servicesWatch, SERVICE_ITEM_NCIX).map(
            (priceItem, index) => (
              <Grid container justifyContent="center" key={index} spacing={1}>
                <Grid
                  item
                  sm={4}
                  style={{
                    display: 'flex',
                    alignSelf: 'center',
                  }}
                  xs={4}
                >
                  <Typography
                    style={{ display: 'block' }}
                    variant="body2"
                    weight="normal"
                  >
                    {formLabel(priceItem)}
                  </Typography>
                </Grid>
                <Grid item sm={4} xs={4}>
                  <TextFieldMasked
                    control={control}
                    label="OTC Price"
                    maskType="currency"
                    maxLength={16}
                    name={`price.${SERVICE_ITEM_NCIX}.${priceItem}.otc`}
                    required
                  />
                </Grid>
                <Grid item sm={4} xs={4}>
                  <TextFieldMasked
                    control={control}
                    label="MRC Price"
                    maskType="currency"
                    maxLength={16}
                    name={`price.${SERVICE_ITEM_NCIX}.${priceItem}.mrc`}
                    required
                  />
                </Grid>
              </Grid>
            ),
          )}
        </Box>
      )}

      {/* Total Price */}
      <Box mb={6}>
        <Typography
          children="Price Total"
          style={{ display: 'block', marginBottom: '16px' }}
          variant="h5"
          weight="bold"
        />
        <Grid container spacing={1}>
          <Grid item sm={6} xs={6}>
            <Box sx={{ flexDirection: 'column' }}>
              <Typography
                children="OTC"
                style={{ display: 'block' }}
                variant="body2"
                weight="normal"
              />
              <Typography
                color="primary-main"
                style={{ display: 'block' }}
                variant="h4"
                weight="bold"
              >
                {currencyConverter(summary[0])}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={6} xs={6}>
            <Box sx={{ flexDirection: 'column' }}>
              <Typography
                children="Recurring"
                style={{ display: 'block' }}
                variant="body2"
                weight="normal"
              />
              <Typography
                color="primary-main"
                style={{ display: 'block' }}
                variant="h4"
                weight="bold"
              >
                {currencyConverter(summary[1])}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

ModalContentServicePricing.defaultProps = {
  form: {},
};

ModalContentServicePricing.propTypes = {
  form: PropTypes.object,
};

export default ModalContentServicePricing;
