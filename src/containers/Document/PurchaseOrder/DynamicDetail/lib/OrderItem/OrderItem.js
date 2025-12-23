import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import Typography from '@components/Typography';
import { schemaTable } from './utils';
import List from '@fragments/List';
import { rupiahFormat } from '@utils/parser';
import CheckCircle from '@assets/Svg/CheckCircle';
import { Tooltip } from '@legion-ui/core';
import ReadMoreComponent from './ReadMore';

const OrderItem = ({ data, productFlow }) => {
  const listProps = {
    noMargin: true,
    noPadding: true,
    table: {
      data: data?.list?.map((item) => {
        return {
          ...item,
          item: (
            <Box my={'20px'} display={'flex'} alignItems={'center'}>
              <Typography
                children={item.item}
                variant="subtitle2"
                weight="normal"
                color="general-main"
              />
              {item?.isNCXGenerated && (
                <Tooltip text="Auto generated by NCX/SC One">
                  <span style={{ marginLeft: '3px' }}>
                    <CheckCircle />
                  </span>
                </Tooltip>
              )}
            </Box>
          ),
          description: (
            <ReadMoreComponent
              description={item.description}
              maxCharLimit={70}
            />
          ),
        };
      }),
      customBody: {
        verticalAlign: 'text-top',
      },
      customItem: {
        alignItems: 'top',
        padding: '20px 12px',
      },
      loading: false,
      meta: {
        page: 0,
      },
      schema: schemaTable[productFlow] || schemaTable.default,
      // schema: schemaTable.default,
    },
    withTopDivider: false,
  };

  return (
    <Box mt={2}>
      <List {...listProps} />
      {!!data?.grandTotal && (
        <Grid
          align="right"
          container
          item
          justifyContent="flex-end"
          md="auto"
          xs={12}
        >
          <Grid>
            <Grid align="right" item style={{ marginTop: '1rem' }}>
              <Typography
                children="Grand Total"
                style={{ paddingRight: '1.5rem' }}
                variant="h5"
                weight="light"
              />
              <Typography
                children={data?.grandTotal}
                variant="h5"
                weight="medium"
              />
            </Grid>
          </Grid>
        </Grid>
      )}
      {productFlow == 'ncx product integration' &&
        (!!data?.otc || !!data?.mrc) && (
          <>
            <Box my={'20px'}>
              <Typography
                children="Total Price"
                variant="h4"
                weight="medium"
                color="general-mid"
              />
            </Box>
            <Grid container item md="auto" xs={12}>
              <Grid item md={6} xs={12}>
                <Typography
                  children="One Time Charge"
                  color="general-mid"
                  inline
                />
                <Typography
                  children={rupiahFormat(data?.otc || '')}
                  variant="h4"
                  weight="medium"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography
                  children="Monthly Recurring Charge"
                  color="general-mid"
                  inline
                />
                <Typography
                  children={rupiahFormat(data?.mrc || '')}
                  variant="h4"
                  weight="medium"
                />
              </Grid>
            </Grid>
          </>
        )}
    </Box>
  );
};

export default OrderItem;

OrderItem.defaultProps = {
  data: {},
};

OrderItem.propTypes = {
  data: PropTypes.object,
};
