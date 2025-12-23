import React from 'react';
import { IconButton } from '@material-ui/core';
import { Text, Flex, Box } from '@legion-ui/core';
import { SelectDatePicker, Select } from '@components/FormField';
import { TextArea, TextField } from '@components/FormFieldLegion';
import ButtonMinimal from '@components/ButtonMinimal';
import List from '@fragments/List/List';
import Trash from '@assets/icon-v2/Trash';
import { schema } from './SolutionItem.utils';
import { rupiahFormat } from '@utils/parser';
import useResponsive from '@utils/hooks/useResponsive';
import useSolutionItem from './SolutionItem.hook';
import useStyles from './SolutionItem.styles';
import { number, string } from 'yup';

const SolutionItem = (props) => {
  const { useForm } = props;

  const classes = useStyles(useResponsive('md'));
  const {
    fieldsPackagesSolutions,
    formValues,
    // listPackages,
    loadingPackages,
    loadingData,
    onAddOrder,
    onDeleteOrder,
    watchBakesStartDate,
    optionsPackageSolutions,
    isCDNaas,
  } = useSolutionItem(props);

  const tableData = fieldsPackagesSolutions?.fields?.map((field, index) => ({
    item: (
      <Box mt="8px" width="100%">
        <Select
          control={useForm?.control}
          isLoading={loadingPackages}
          isSearchable
          customOnChange={(value) => {
            if (value !== useForm.getValues(`packagesSolutions.${index}.id`)) {
              useForm.setValue(`packagesSolutions.${index}.subItem`, undefined);
              useForm.setValue(`packagesSolutions.${index}.attributes`, []);
              useForm.trigger();
            }
          }}
          isDisabled={
            isCDNaas && formValues?.packagesSolutions[index]?.isMainPackage
          }
          key={field.id}
          menuPlacement="auto"
          menuPosition="fixed"
          name={`packagesSolutions.${index}.id`}
          options={optionsPackageSolutions?.map((product) => {
            if (isCDNaas) {
              // Check if any subPackageName is "Basic CDN delivery"
              const hasMainPackage = formValues.packagesSolutions?.some(
                (pkg) => pkg?.isMainPackage,
              );

              const countRowPackages = formValues.packagesSolutions.length;

              if (countRowPackages <= 1) {
                return {
                  label: product?.packageName,
                  value: product?.id,
                  isDisabled: !product.isMainPackage,
                };
              }

              const selectedIds = formValues.packagesSolutions
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
          rules={{
            validate: async (value) =>
              string()
                .required()
                .label('Item')
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
          isOptionDisabled={(option) => option.isDisabled}
        />
      </Box>
    ),
    subItem: (
      <Box mt="8px" width="100%">
        {formValues?.packagesSolutions?.[index]?.attributes?.length ? (
          <Select
            control={useForm?.control}
            isSearchable
            key={field.id}
            menuPlacement="auto"
            menuPosition="fixed"
            customOnChange={(value) => {
              props?.useForm?.setValue(
                `packagesSolutions.${index}.price`,
                Number(value.split(',')[2]),
              );
            }}
            name={`packagesSolutions.${index}.subItem`}
            options={formValues?.packagesSolutions?.[index]?.attributes?.map(
              (product) => ({
                label: product?.subPackageName,
                value:
                  product?.id +
                  ',' +
                  product?.subPackageName +
                  ',' +
                  product?.price,
              }),
            )}
            rules={{
              validate: async (value) => {
                return string()
                  .required()
                  .label('Sub Item')
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message);
              },
            }}
            isOptionDisabled={(option) => option.isDisabled}
          />
        ) : (
          <p>- </p>
        )}
      </Box>
    ),
    paymentType: (
      <Box className={classes.box} width="100%">
        <TextField
          control={useForm?.control}
          disabled
          key={field.paymentType}
          name={`packagesSolutions.${index}.paymentType`}
          rules={{
            validate: async (value) =>
              string()
                .required()
                .label('Payment Type')
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
        />
      </Box>
    ),
    description: (
      <Box className={classes.box} width="100%">
        <TextArea
          control={useForm?.control}
          key={field.id}
          name={`packagesSolutions.${index}.description`}
          placeholder="Type description.."
          rules={{
            validate: async (value) =>
              string()
                .required()
                .label('Description')
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
        />
      </Box>
    ),
    quantity: (
      <Box className={classes.smallField}>
        <TextField
          control={useForm?.control}
          key={field.id}
          name={`packagesSolutions.${index}.quantity`}
          type="number"
          defaultValue={1}
          rules={{
            validate: async (value) =>
              number()
                .integer('Please input round number, without comma')
                .moreThan(0)
                .required()
                .typeError('you must specify a number')
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
        />
      </Box>
    ),
    price: (
      <TextField
        before="Rp"
        control={useForm?.control}
        key={field.id}
        maxLength={17}
        name={`packagesSolutions.${index}.price`}
        type="number"
        rules={{
          validate: async (value) =>
            number()
              .integer('Please input round number, without comma')
              .moreThan(0)
              .required()
              .typeError('you must specify a number')
              .validate(value)
              .then(() => true)
              .catch((err) => err?.message),
        }}
      />
    ),
    discount: (
      <Box className={classes.smallField}>
        <TextField
          after="%"
          control={useForm?.control}
          key={field.id}
          maxLength={3}
          name={`packagesSolutions.${index}.discount`}
          type="number"
          rules={{
            validate: async (value) =>
              number()
                .integer(
                  'Please input round number, example: 0-100, without comma',
                )
                .min(0)
                .max(100)
                .typeError('you must specify a number')
                .transform((value) => (isNaN(value) ? undefined : value))
                .nullable()
                .optional()
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
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
        {fieldsPackagesSolutions?.fields.length > 1 && (
          <IconButton onClick={onDeleteOrder(index)}>
            <Trash className={classes.deleteIcon} />
          </IconButton>
        )}
      </Box>
    ),
    subTotal: (
      <Text
        mt="12px"
        children={rupiahFormat(
          formValues?.packagesSolutions?.[index]?.subTotal,
        )}
      />
    ),
  }));

  const listProps = {
    noMargin: true,
    noPadding: true,
    table: {
      customBody: {
        verticalAlign: 'top',
        '&:not(:last-child) > td': {
          borderBottom: null,
        },
      },
      customItem: {
        marginTop: '20px',
      },
      data: tableData,
      loadingRoot: loadingData,
      loading: loadingData,
      schema: schema({ isCDNaas }),
      numbering: false,
      showPageInformation: false,
      meta: {
        page: 0,
      },
    },
    withTopDivider: false,
  };

  const renderOrderItem = (
    <Box pl="8px" mt="24px" style={{ width: '100%' }}>
      <Text
        children={`${formValues?.productName} Pack`}
        color="secondary600"
        size="20px"
        weight={700}
      />
      <Box mt="8px">
        <List {...listProps} />
      </Box>
      <Box mt="16px">
        <Flex alignY="center" alignX="space-between">
          <Box className={classes.divider} />
          <ButtonMinimal
            label="Add More"
            onClick={onAddOrder()}
            variant="add"
          />
        </Flex>
      </Box>
      <Box mr={useResponsive('xs') ? 0 : 5} mt="16px" mb="8px">
        <Flex alignY="center" alignX="flex-end" style={{ gap: '16px' }}>
          <Box>
            <Text
              block
              children="Grand Total"
              color="secondary500"
              size="14px"
              style={{ textAlign: 'right' }}
              weight={700}
            />
            <Text
              block
              children="Exclude PPN"
              color="secondary400"
              size="12px"
              style={{ textAlign: 'right' }}
              weight={400}
            />
          </Box>
          <Text
            children={rupiahFormat(formValues?.grandTotal)}
            color="secondary500"
            size="20px"
            weight={700}
          />
        </Flex>
      </Box>
    </Box>
  );

  return (
    <>
      <Flex className={classes.container} alignY="flex-start" mt="8px">
        <Box mt="2px">
          <SelectDatePicker
            control={useForm?.control}
            menuLabel={
              <Flex alignY="flex-start" mb="6px">
                <Text
                  children="*"
                  color="primary500"
                  size="14px"
                  weight={700}
                />
                <Text
                  children="Bakes Start Date"
                  color="secondary500"
                  size="14px"
                  weight={600}
                />
              </Flex>
            }
            name="bakesStartDate"
            rules={{
              validate: async (value) =>
                string()
                  .nullable()
                  .required()
                  .label('Bakes Start Date')
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message),
            }}
          />
        </Box>
        <Box mt="2px">
          <SelectDatePicker
            control={useForm?.control}
            minDate={watchBakesStartDate}
            menuLabel={
              <Flex alignY="flex-start" mb="6px">
                <Text
                  children="*"
                  color="primary500"
                  size="14px"
                  weight={700}
                />
                <Text
                  children="Bakes End Date"
                  color="secondary500"
                  size="14px"
                  weight={600}
                />
              </Flex>
            }
            name="bakesEndDate"
            rules={{
              validate: async (value) =>
                string()
                  .nullable()
                  .required()
                  .label('Bakes End Date')
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message),
            }}
          />
        </Box>
        <Box className={classes.durationField}>
          <TextField
            block
            after="Month"
            control={useForm?.control}
            name="bakesDuration"
            type="number"
            label="Bakes Duration"
            disabled
            required
          />
        </Box>
      </Flex>
      {renderOrderItem}
    </>
  );
};

export default SolutionItem;
