import React from 'react';
import PropTypes from 'prop-types';
import { DetailGenerator } from '@fragments/Detail';
import List from '@fragments/List/List';
import { Box, Grid, IconButton } from '@material-ui/core';
import ButtonMinimal from '@components/ButtonMinimal';
import useResponsive from '@utils/hooks/useResponsive';
import Typography from '@components/Typography/Typography';
import { rupiahFormat } from '@utils/parser';
import { Select, TextField } from '@components/FormField';
import Cancel from '@assets/icon-v2/Cancel';
import useAction from './hooks/useActions';
import { tableHeader } from '../../utils';
import useStyles from './styles';

const OrderItem = (props) => {
  const { control, loadingListProducts, loadingData } = props;

  const {
    onBottomPage,
    orderItemFields,
    onDeleteOrder,
    onAddOrder,
    formValues,
    dropdownOptions,
    isCDNaas,
  } = useAction(props);

  const classes = useStyles();
  const currentPackages = props.watch('packages') || [];

  const tableData = orderItemFields?.map((field, index) => ({
    item: (
      <Box width="100%">
        <Select
          // menuIsOpen={true}
          control={control}
          isLoading={loadingListProducts}
          isSearchable
          key={field.id}
          label="Item"
          maxWidth="100%"
          menuPosition="fixed"
          name={`packages.${index}.id`}
          customOnChange={(value) => {
            const selectedPackages = dropdownOptions.find(
              (data) => data.id === value,
            );

            if (!selectedPackages?.attributes?.length) {
              props.setValue(`packages.${index}.price`, selectedPackages.price);
            } else {
              props.setValue(`packages.${index}.price`, 0);
            }
          }}
          options={dropdownOptions.map((product) => {
            if (isCDNaas) {
              // Check if any subPackageName is "Basic CDN delivery"
              const hasMainPackage = formValues.packages.some(
                (pkg) => pkg?.isMainPackage,
              );

              const countRowPackages = formValues.packages.length;

              if (countRowPackages <= 1) {
                return {
                  label: product?.packageName,
                  value: product?.id,
                  isDisabled: !product.isMainPackage,
                };
              }

              const selectedIds = formValues.packages
                .filter((pkg, pkgIdx) => pkg?.isMainPackage && pkgIdx !== index)
                .map((pkg) => pkg?.id);

              return {
                label: product?.packageName,
                value: product?.id,
                isDisabled: !hasMainPackage
                  ? !product.isMainPackage
                  : selectedIds.includes(product?.id),
              };
            }

            return {
              label: product?.packageName,
              value: product?.id,
              isDisabled: product?.isDisabled,
            };
          })}
          required
          isOptionDisabled={(option) => option.isDisabled}
        ></Select>
      </Box>
    ),
    subItem: (
      <Box width="100%">
        {formValues?.packages?.[index]?.attributes?.length ? (
          <Select
            // menuIsOpen={true}
            control={control}
            isLoading={loadingListProducts}
            isSearchable
            key={field.id}
            customOnChange={(value) => {
              const selectedValue = value.split(',');
              const selectedPackages =
                formValues?.packages?.[index]?.attributes;
              const findPackage = selectedPackages.find(
                (item) => item.id === selectedValue[0],
              );

              props.setValue(`packages.${index}.price`, findPackage.price);
            }}
            maxWidth="100%"
            menuPosition="fixed"
            name={`packages.${index}.subItem`}
            options={currentPackages[index].attributes?.map((product) => ({
              label: product?.subPackageName,
              value: product?.id + ',' + product?.subPackageName,
              data: product,
            }))}
            label="Sub Item"
            placeholder="Select Sub Item"
            required
            isOptionDisabled={(option) => option.isDisabled}
          ></Select>
        ) : (
          <p>-</p>
        )}
      </Box>
    ),
    paymentType: (
      <Box width="100%">
        <TextField
          control={control}
          disabled
          key={field.paymentType}
          label="Payment Type"
          name={`packages.${index}.paymentType`}
          required
        />
      </Box>
    ),
    description: (
      <Box width="100%">
        <TextField
          control={control}
          key={field.id}
          label="Description"
          // maxLength={160}
          multiline
          name={`packages.${index}.description`}
          placeholder="Type description.."
          required
        />
      </Box>
    ),
    quantity: (
      <Box width="100%">
        <TextField
          control={control}
          key={field.id}
          label="Quantity"
          name={`packages.${index}.quantity`}
          required
          type="number"
        />
      </Box>
    ),
    price: (
      <Box width="100%">
        <TextField
          control={control}
          key={field.id}
          label="Price (Rp)"
          maxLength={17}
          name={`packages.${index}.price`}
          required
          type="number"
        />
      </Box>
    ),
    discount: (
      <Box width="100%">
        <TextField
          control={control}
          key={field.id}
          label="Discount (%)"
          maxLength={3}
          name={`packages.${index}.discount`}
          type="number"
        />
      </Box>
    ),
    action: (
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        width="100%"
      >
        {orderItemFields.length > 1 && (
          <IconButton
            aria-label="delete"
            className={classes.root}
            disabled={orderItemFields.length < 2}
            onClick={onDeleteOrder(index)}
            size="small"
          >
            <Cancel className="cancel" />
          </IconButton>
        )}
      </Box>
    ),
    subTotal: rupiahFormat(formValues?.packages?.[index]?.subTotal),
  }));

  const listProps = {
    noMargin: true,
    noPadding: true,
    onBottomPage: onBottomPage,
    table: {
      customBody: {
        verticalAlign: 'top',
        '&:not(:last-child) > td': { borderBottom: null },
      },
      customItem: { marginTop: '20px' },
      data: tableData,
      loadingRoot: loadingData,
      loading: loadingData,
      schema: tableHeader({ isCDNaas }),
      numbering: false,
      showPageInformation: false,
      meta: { page: 0 },
      headerAlign: 'center',
    },
    withTopDivider: false,
  };

  const schema = [
    {
      type: 'custom',
      title: 'Order Item',
      render: (
        <>
          <List {...listProps} />
          <Box mt={2}>
            <Grid alignItems="center" container justifyContent="flex-end">
              <Grid item md={10} xs={5}>
                <div style={{ borderTop: '2px dashed #B3C3CA' }} />
              </Grid>
              <Grid align="center" item md={2} xs={7}>
                <ButtonMinimal
                  label="Add More Item"
                  onClick={onAddOrder()}
                  variant="add"
                />
              </Grid>
            </Grid>
          </Box>
          <Box mr={useResponsive('xs') ? 0 : 5} mt={2}>
            <Grid
              alignItems="center"
              container
              justifyContent="flex-end"
              spacing={2}
            >
              <Grid align="right" item md="auto" xs={12}>
                <Grid container direction="column" justifyContent="flex-end">
                  <Grid align="right" item>
                    <Typography
                      children="Grand Total"
                      variant="h5"
                      weight="light"
                    />
                  </Grid>
                  <Grid align="right" item>
                    <Typography
                      children="This price is exclude from PPN"
                      variant="caption"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid align="right" item md="auto" xs={12}>
                <Typography
                  children={rupiahFormat(formValues?.grandTotal)}
                  variant="h4"
                  weight="medium"
                />
              </Grid>
            </Grid>
          </Box>
        </>
      ),
    },
  ];

  return <DetailGenerator data={schema} />;
};

OrderItem.defaultProps = {
  control: {},
  listProducts: [],
  loadingData: false,
  loadingListProducts: false,
};

OrderItem.propTypes = {
  control: PropTypes.object,
  listProducts: PropTypes.array,
  loadingData: PropTypes.bool,
  loadingListProducts: PropTypes.bool,
};

export default OrderItem;
