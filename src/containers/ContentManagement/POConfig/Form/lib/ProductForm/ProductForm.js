import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, TextField } from '@components/FormFieldLegion';
import { Select } from '@components/FormField';
import { Box, Text } from '@legion-ui/core';
import _ from 'lodash';
import { cleanObject } from '@utils/common';
import useAction from './hooks/useActions';
import { object, string } from 'yup';
import DynamicForm from '../DynamicForm';
import RootProduct from '../RootProduct';
import { toLowerCase } from '@utils/text';

const CheckboxGroup = ({ schema, values = {}, productFlow = {}, useForm }) => {
  const normalize = Object.keys(values).map((orderType) =>
    _.startCase(orderType),
  );

  const onChange = (value) => () => {
    const normalizeValues = _.camelCase(value);
    if (normalize.includes(value)) {
      useForm?.resetField('form', {
        defaultValue: cleanObject({ ...values, [normalizeValues]: null }),
      });
    } else {
      useForm?.resetField('form', {
        defaultValue: {
          ...values,
          [normalizeValues]: productFlow?.data?.form[normalizeValues],
        },
      });
    }
  };

  return (
    <div>
      <Text size="sm" weight="600" block color="#3B525C">
        <Text children="*" size="sm" color="#DE1B1B" />
        Order Type
      </Text>
      {schema.options.map((option, index) => (
        <Box pt="8px" key={option[index]}>
          <Checkbox
            control={useForm?.control}
            checked={normalize?.includes(option)}
            customValue
            disabled={schema?.disabled?.includes(option)}
            onChange={onChange(option)}
            label={option}
            name="form"
            value={option}
          />
        </Box>
      ))}
    </div>
  );
};

const ProductForm = (props) => {
  const { useForm, options, loading, onFieldsChange, rootProducts } = props;
  const { productFlow, form, checkboxSchema } = useAction(props);

  const isNCXProductIntegration =
    toLowerCase(productFlow?.data?.name) === 'ncx product integration';

  return (
    <Box>
      <Box pt="16px">
        <TextField
          block
          control={useForm?.control}
          label="Product Name"
          name="productName"
          placeholder="Input Product Name"
          required
          rules={{
            validate: async (value) =>
              string()
                .required()
                .label('Product Name')
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
        />
      </Box>
      <Box pt="16px">
        <Text size="sm" weight="600" block mb="8px" color="#3B525C">
          <Text children="*" size="sm" color="#DE1B1B" />
          Product Category
        </Text>
        <Select
          control={useForm?.control}
          // label="Product Category"
          menuWidth="100%"
          minWidth="100%"
          name="categoryProduct"
          options={options.productCategory}
          isLoading={loading.productCategory}
          placeholder="Select Product Category"
          // required
          rawValue
          noBorder={false}
          hideNullHelperText
          rules={{
            validate: async (value) =>
              object()
                .required()
                .label('Product Category')
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
        />
      </Box>
      <Box pt="16px">
        <Text size="sm" weight="600" block mb="8px" color="#3B525C">
          <Text children="*" size="sm" color="#DE1B1B" />
          Product Flow
        </Text>
        <Select
          control={useForm?.control}
          // label="Product Flow"
          menuWidth="100%"
          minWidth="100%"
          name="productFlow"
          options={options.productFlow}
          isLoading={loading.productFlow}
          placeholder="Select Product Flow"
          // required
          rawValue
          noBorder={false}
          hideNullHelperText
          rules={{
            validate: async (value) =>
              object()
                .required()
                .label('Product Flow')
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
        />
      </Box>
      {isNCXProductIntegration && (
        <>
          <Box
            padding="16px"
            background="#F8F9FA"
            radius="8px"
            margin={'16px 0 0 0'}
          >
            <Box margin={'0 0 12px 0'}>
              <Text
                size="20px"
                weight="700"
                color="#3B525C"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Text size="14px" weight="600" color="#DE1B1B" children="*" />
                Root Product
              </Text>
            </Box>
            <Box background="#F8F9FA">
              <RootProduct
                productFlow={productFlow}
                onFieldsChange={onFieldsChange}
                useForm={useForm}
                productId={props.productId}
                data={props.data}
              />
            </Box>
          </Box>
          {!(rootProducts.length > 0) && (
            <span
              style={{
                display: 'block',
                marginTop: '4px',
                fontWeight: '400',
                fontSize: '12px',
                color: '#DE1B1B',
              }}
              role="alert"
              id="legion-textfield-rootProduct-error"
            >
              Please add at least 1 root product
            </span>
          )}
        </>
      )}

      {!isNCXProductIntegration && (
        <DynamicForm
          {...props}
          additionalForm={productFlow?.data?.baseForm}
          useForm={useForm}
          filters={{
            formtype: [
              'Text Field',
              'Text Area',
              'Dropdown',
              'Upload File',
              'PIC Partner',
            ],
          }}
        />
      )}
      <Box pt="16px">
        <CheckboxGroup
          schema={checkboxSchema()}
          useForm={useForm}
          values={form}
          productFlow={productFlow}
        />
      </Box>
    </Box>
  );
};

ProductForm.defaultProps = {
  control: {},
};

ProductForm.propTypes = {
  control: PropTypes.object,
};

export default ProductForm;
