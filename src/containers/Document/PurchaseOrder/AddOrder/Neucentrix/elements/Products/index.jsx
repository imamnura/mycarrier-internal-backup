import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, IconButton } from '@material-ui/core';
import Typography from '@components/Typography';
import Button from '@components/Button';
import ButtonMinimal from '@components/ButtonMinimal';
import color from '@styles/color';
import Edit from '@assets/icon-v2/Edit';
import List from '@fragments/List';
import { tableHeader } from '../../utils';
import { rupiahFormat } from '@utils/parser';
import StateMessage from '@components/StateMessage/StateMessage';
import NoData from '@assets/ilustration-v2/NoData';
import useProducts from './hooks/useProducts';
import { useForm } from 'react-hook-form';
import { DEFAULT_VALUES } from './constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { validation } from './validation';
import ModalProductConfig from './components/ModalProductConfig';
import { stringToHtml } from '@utils/parser';
import useStyles from './styles';

const DescriptionComponent = ({ description }) => {
  const [showMore, setShowMore] = useState(false);
  const maxLength = 100; // adjust this as needed

  const isLong = description.length > maxLength;
  const shortText = description.substring(0, maxLength) + "...";

  return (
    <div>
      <span>{stringToHtml(showMore || !isLong ? description : shortText)}</span>
      {isLong && (
        <span style={{
          color: 'blue',
          cursor: 'pointer',
        }} onClick={() => setShowMore(!showMore)}>
          {showMore ? " less" : " more"}
        </span>
      )}
    </div>
  );
};

const Products = (props) => {
  const { loadingData, data } = props;
  const classes = useStyles();

  const form = useForm({
    resolver: yupResolver(validation),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  });

  const {
    handleDeleteService,
    modalProductConfig,
    setModalProductConfig,
    handleSuccess,
  } = useProducts({ ...props, form });

  const listProps = {
    noMargin: true,
    noPadding: true,
    onBottomPage: () => { },
    withTopDivider: false,
  };

  return (
    <>
      <Grid alignItems="center" container justifyContent="space-between">
        <Grid item>
          <Typography
            children="Order Item"
            color="general-mid"
            variant="h4"
            weight="medium"
          />
        </Grid>
        <Grid item>
          <Button
            children="Add Product"
            // disabled={
            //   // !!data?.orderItem?.productName && !!data?.orderItem?.location
            //   !!data?.orderItem?.list?.length
            // }
            onClick={() => setModalProductConfig({ open: true })}
          />
        </Grid>
      </Grid>
      {
        // !!data?.orderItem?.productName && !!data?.orderItem?.location
        !!data?.orderItem?.list?.length && !loadingData ? (
          <>
            {data?.orderItem.list?.map((item, index) => {
              return (
                <Box pt={4} key={index} className={classes.roundedBox}>
                  <div className={classes.productsHeading}>
                    <Typography
                      children={item.productName}
                      color="general-dark"
                      variant="h5"
                      weight="medium"
                    />
                    <div className={classes.productsHeading}>
                      <div >
                        <IconButton
                          onClick={() => setModalProductConfig({ open: true, mode: 'edit', data: item })}
                          style={{ color: color.yellow.main }}
                        >
                          <Edit />
                        </IconButton>
                      </div>
                      <div>
                        <ButtonMinimal
                          label="Delete Product"
                          onClick={() => handleDeleteService(item.productId)}
                          variant="delete"
                        /></div>
                    </div>
                  </div>
                  <Box pt={4}>
                    <List {...listProps} table={{
                      data: !item.child ? [{
                          ...item,
                          description: <DescriptionComponent key={index} description={item.description.map((c) => c.attributeName + " : " + c.attributeValue).join(",<br/>")} />,
                        }]
                        : item?.child?.map((i) => {
                          return {
                            ...i,
                            description: <DescriptionComponent key={index} description={i.description.map((c) => c.attributeName + " : " + c.attributeValue).join(",<br/>")} />,
                          }
                        }),
                      loadingRoot: loadingData,
                      loading: loadingData,
                      schema: tableHeader(Boolean(!item.child)),
                      numbering: false,
                      showPageInformation: false,
                      meta: {
                        page: 0,
                      },
                    }} />
                  </Box>

                </Box>
              )
            })}
            {
              <>
                <Box mt={3}>
                  <Grid alignItems="center" justifyContent="center" container>
                    <Grid item xs={12}>
                      <div style={{ borderTop: '1px dashed #B3C3CA' }} />
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={4}>
                  <Grid
                    alignItems="center"
                    container
                    justifyContent="flex-end"
                    spacing={3}
                  >
                    <Grid align="right" item md={6} xs={12}>
                      <Typography
                        children="Total"
                        color="general-mid"
                        variant="h4"
                        weight="medium"
                      />
                    </Grid>
                    <Grid align="left" item md={3} xs={12}>
                      <Grid
                        container
                        direction="column"
                        justifyContent="flex-end"
                        spacing={1}
                      >
                        <Grid item>
                          <Typography
                            children="ONE TIME CHARGE"
                            color="general-mid"
                            variant="subtitle2"
                            weight="medium"
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            children={rupiahFormat(
                              Number(data?.orderItem?.otc),
                            )}
                            color="primary-main"
                            variant="h4"
                            weight="medium"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid align="left" item md={3} xs={12}>
                      <Grid
                        container
                        direction="column"
                        justifyContent="flex-end"
                        spacing={1}
                      >
                        <Grid item>
                          <Typography
                            children="MONTHLY RECURRING CHARGE"
                            color="general-mid"
                            variant="subtitle2"
                            weight="medium"
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            children={rupiahFormat(
                              Number(data?.orderItem?.mrc),
                            )}
                            color="primary-main"
                            variant="h4"
                            weight="medium"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </>
            }
          </>
        ) : (
          <Box py={4}>
            <StateMessage
              description="Add order item by clicking add service button first"
              ilustration={NoData}
              message="There is no Order Item"
            />
          </Box>
        )
      }
      <ModalProductConfig
        data={data}
        modalProductConfig={modalProductConfig}
        setModalProductConfig={setModalProductConfig}
        handleSuccess={handleSuccess}
      />
    </>
  );
};

Products.defaultProps = {
  control: {},
  data: {},
  fetchDetail: () => { },
  loadingData: false,
  state: {
    optionsAgreementNumber: [],
  },
};

Products.propTypes = {
  control: PropTypes.object,
  data: PropTypes.object,
  fetchDetail: PropTypes.func,
  loadingData: PropTypes.bool,
  state: PropTypes.object,
};

export default Products;
