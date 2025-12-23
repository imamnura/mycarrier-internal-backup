import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@legion-ui/core';
import { Select } from '@components/FormField';
import useActions from '@containers/Document/PurchaseOrder/Create/lib/DynamicDropdown/hooks/useActions';
import { object } from 'yup';

const DynamicDropdown = (props) => {
  const { useForm, fieldProps, customer } = props;

  const { options, loading } = useActions(props);

  return (
    <>
      <Text size="14px" weight="600" block mb="8px" color="secondary600">
        {fieldProps?.required && (
          <Text children="*" size="14px" color="primary500" />
        )}
        {fieldProps?.formName}
      </Text>
      <Select
        control={useForm?.control}
        isSearchable
        menuWidth="100%"
        minWidth="100%"
        name={fieldProps?.formKey}
        noBorder={false}
        placeholder={fieldProps?.placeholder}
        rawValue
        options={options}
        isLoading={loading}
        isDisabled={
          !!(fieldProps?.formKey === 'sidNeucentrix') &&
          !customer?.data?.custAccntNum
        }
        hideNullHelperText
        onCreate={(v) => {
          useForm?.resetField(fieldProps?.formKey, {
            defaultValue: { ...v, data: v },
          });
        }}
        isCreatable={fieldProps?.writeable}
        creatableWording={`Add ${fieldProps?.formName}`}
        rules={{
          validate: async (value) => {
            if (fieldProps?.required) {
              return object()
                .required()
                .label(fieldProps?.formName?.toString())
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message);
            } else {
              return object()
                .optional()
                .nullable()
                .label(fieldProps?.formName?.toString())
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message);
            }
          },
        }}
      />
    </>
  );
};

DynamicDropdown.defaultProps = {
  control: {},
  required: false,
  placeholder: null,
};

DynamicDropdown.propTypes = {
  control: PropTypes.object,
  required: PropTypes.bool,
  formName: PropTypes.string.isRequired,
  formKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default DynamicDropdown;
