import React from 'react';
import PropTypes from 'prop-types';
import { Card, Flex, Text } from '@legion-ui/core';
import { Checkbox, TextField } from '@components/FormFieldLegion';
import Information from '@assets/icon-v2/Information';
import { rupiahFormat } from '@utils/parser';
import { Grid } from '@material-ui/core';
import { number } from 'yup';

const DynamicPackagesItem = (props) => {
  const { useForm, fieldProps, data, onChange, index } = props;
  return (
    <Card bordered radius="12px">
      <Flex style={{ gap: 8, flexWrap: 'nowrap' }} alignY="start">
        <Checkbox
          control={useForm?.control}
          checked={data?.checked}
          customValue
          onChange={onChange}
          name={`${fieldProps?.formKey}.${index}`}
          variant="min"
        />
        <Flex direction="column" style={{ gap: 8, flexGrow: 1 }}>
          <Text
            children={data?.packageName || '-'}
            weight={700}
            size="18px"
            color="secondary600"
          />
          <Text
            children={data?.description || '-'}
            weight={400}
            size="12px"
            color="secondary400"
          />
          <Text weight={700} size="16px" color="primary500">
            {rupiahFormat(data?.price)}
            <Text
              children={` (${data?.paymentType})`}
              size="14px"
              weight={400}
              color="secondary400"
            />
          </Text>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={5} md={4}>
              <TextField
                control={useForm?.control}
                label="Quantity"
                name={`${fieldProps?.formKey}.${index}.quantity`}
                helperText={
                  data?.minQty && (
                    <Flex style={{ gap: 4 }} alignY="center">
                      <Information style={{ fontSize: '12px' }} />
                      Min. {data?.minQty}
                    </Flex>
                  )
                }
                type="number"
                disabled={!data?.checked}
                required
                block
                defaultValue={data?.minQty}
                rules={{
                  validate: async (value) => {
                    if (data?.checked) {
                      return number()
                        .integer('Please input a round number, without comma')
                        .min(data?.minQty)
                        .typeError('You must specify a number')
                        .required()
                        .label('Quantity')
                        .validate(value)
                        .then(() => true)
                        .catch((err) => err?.message);
                    } else {
                      return number()
                        .integer('Please input a round number, without comma')
                        .min(data?.minQty)
                        .typeError('You must specify a number')
                        .optional()
                        .nullable()
                        .label('Quantity')
                        .validate(value)
                        .then(() => true)
                        .catch((err) => err?.message);
                    }
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5} md={4}>
              <TextField
                control={useForm?.control}
                label="Discount (%)"
                name={`${fieldProps?.formKey}.${index}.discount`}
                type="number"
                disabled={!data?.checked}
                block
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
                      .label('Discount')
                      .validate(value)
                      .then(() => true)
                      .catch((err) => err?.message),
                }}
              />
            </Grid>
          </Grid>
        </Flex>
      </Flex>
    </Card>
  );
};

DynamicPackagesItem.defaultProps = {
  control: {},
  required: false,
  placeholder: null,
};

DynamicPackagesItem.propTypes = {
  control: PropTypes.object,
  required: PropTypes.bool,
  formName: PropTypes.string.isRequired,
  formKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default DynamicPackagesItem;
