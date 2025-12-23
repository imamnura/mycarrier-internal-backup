import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, TextField } from '@components/FormFieldLegion';
import { Text } from '@legion-ui/core';
import { Select } from '@components/FormField';
import { string } from 'yup';
import { mergeForms, regexString } from '../../utils';

const DynamicForm = (props) => {
  const { dynamicForm, filters, useForm, normalizeFormName } = props;

  const mergedForms = mergeForms(dynamicForm, filters);

  const renderForm = (fieldProps) => {
    let formName = fieldProps?.attributeName;

    if (normalizeFormName) {
      formName = normalizeFormName(fieldProps);
    }

    if (fieldProps?.inputType === 'textfield') {
      return (
        <TextField
          block
          control={useForm?.control}
          label={fieldProps?.attributeName}
          name={formName}
          required={fieldProps?.required}
          defaultValue={fieldProps?.defaultValue}
          placeholder={`Input ${fieldProps?.attributeName}`}
          rules={{
            validate: async (value) => {
              if (fieldProps?.required) {
                return string()
                  .required()
                  .matches(
                    new RegExp(
                      regexString[fieldProps?.attributeType?.toLowerCase()] ||
                        '',
                    ),
                  )
                  .label(fieldProps?.attributeName?.toString())
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message);
              } else {
                return string()
                  .optional()
                  .nullable()
                  .matches(
                    new RegExp(
                      regexString[fieldProps?.attributeType?.toLowerCase()] ||
                        '',
                    ),
                  )
                  .label(fieldProps?.attributeName?.toString())
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message);
              }
            },
          }}
        />
      );
    }
    if (fieldProps?.inputType === 'textarea') {
      return (
        <TextArea
          block
          rows={3}
          control={useForm?.control}
          label={fieldProps?.attributeName}
          name={formName}
          required={fieldProps?.required}
          defaultValue={fieldProps?.defaultValue}
          placeholder={`Input ${fieldProps?.attributeName}`}
          rules={{
            validate: async (value) => {
              if (fieldProps?.required) {
                return string()
                  .required()
                  .matches(
                    new RegExp(
                      regexString[fieldProps?.attributeType?.toLowerCase()] ||
                        '',
                    ),
                  )
                  .label(fieldProps?.attributeName?.toString())
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message);
              } else {
                return string()
                  .optional()
                  .nullable()
                  .matches(
                    new RegExp(
                      regexString[fieldProps?.attributeType?.toLowerCase()] ||
                        '',
                    ),
                  )
                  .label(fieldProps?.attributeName?.toString())
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message);
              }
            },
          }}
        />
      );
    }
    if (fieldProps?.inputType === 'combobox') {
      return (
        <div>
          <Text size="14px" weight="600" block mb="8px" color="secondary600">
            {fieldProps?.required && (
              <Text children="*" size="14px" color="primary500" />
            )}
            {fieldProps?.attributeName}
          </Text>
          <Select
            menuPosition="fixed"
            isSearchable
            control={useForm?.control}
            menuWidth="100%"
            minWidth="100%"
            name={formName}
            options={fieldProps?.attributeOptionsValue?.map((option) => ({
              label: option,
              value: option,
            }))}
            placeholder={`Select ${fieldProps?.attributeName}`}
            noBorder={false}
            hideNullHelperText
            defaultValue={fieldProps?.defaultValue}
            rules={{
              validate: async (value) => {
                if (fieldProps?.required) {
                  return string()
                    .required()
                    .label(fieldProps?.formName?.toString())
                    .validate(value)
                    .then(() => true)
                    .catch((err) => err?.message);
                } else {
                  return string()
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
        </div>
      );
    }
  };

  return mergedForms.length > 0 && mergedForms?.map((form) => renderForm(form));
};

DynamicForm.propTypes = {
  control: PropTypes.object.isRequired,
};

export default DynamicForm;
