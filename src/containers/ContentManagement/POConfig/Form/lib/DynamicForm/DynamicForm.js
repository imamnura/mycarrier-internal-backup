import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, TextField } from '@components/FormFieldLegion';
import { Box, Text } from '@legion-ui/core';
import { Select } from '@components/FormField';
import { mergeForms } from '../../utils';
import DynamicDropdown from '../DynamicDropdown';
import DynamicUploadFile from '../DynamicUploadFile';
import { string } from 'yup';
import PICForm from '../PICForm';

const DynamicForm = (props) => {
  const { additionalForm, filters, useForm } = props;

  const mergedForms = mergeForms(additionalForm, filters);

  const renderForm = (fieldProps) => {
    if (fieldProps?.formtype === 'Text Field') {
      let defaultValue;

      return (
        <Box pt="16px">
          <TextField
            block
            control={useForm?.control}
            label={fieldProps?.formName}
            name={fieldProps?.formKey}
            required={fieldProps?.required}
            placeholder={fieldProps?.placeholder}
            maxLength={fieldProps?.maxChar}
            defaultValue={defaultValue}
            rules={{
              validate: async (value) => {
                if (fieldProps?.required) {
                  return string()
                    .required()
                    .matches(new RegExp(fieldProps?.regex || '.'))
                    .label(fieldProps?.formName?.toString())
                    .validate(value)
                    .then(() => true)
                    .catch((err) => err?.message);
                } else {
                  return string()
                    .optional()
                    .nullable()
                    .matches(new RegExp(fieldProps?.regex || '.'))
                    .label(fieldProps?.formName?.toString())
                    .validate(value)
                    .then(() => true)
                    .catch((err) => err?.message);
                }
              },
            }}
          />
        </Box>
      );
    }
    if (fieldProps?.formtype === 'Text Area') {
      return (
        <Box pt="16px">
          <TextArea
            block
            control={useForm?.control}
            label={fieldProps?.formName}
            name={fieldProps?.formKey}
            required={fieldProps?.required}
            placeholder={fieldProps?.placeholder}
            maxLength={fieldProps?.maxChar}
            rows={3}
            rules={{
              validate: async (value) => {
                if (fieldProps?.required) {
                  return string()
                    .required()
                    .matches(fieldProps?.regex || '.')
                    .label(fieldProps?.formName?.toString())
                    .validate(value)
                    .then(() => true)
                    .catch((err) => err?.message);
                } else {
                  return string()
                    .optional()
                    .nullable()
                    .matches(fieldProps?.regex || '.')
                    .label(fieldProps?.formName?.toString())
                    .validate(value)
                    .then(() => true)
                    .catch((err) => err?.message);
                }
              },
            }}
          />
        </Box>
      );
    }
    if (fieldProps?.formtype === 'Dropdown') {
      if (fieldProps?.dropdownType === 'manual') {
        return (
          <Box pt="16px">
            <Text size="14px" weight="600" block mb="8px" color="secondary600">
              {fieldProps?.required && (
                <Text children="*" size="14px" color="primary500" />
              )}
              {fieldProps?.formName}
            </Text>
            <Select
              control={useForm?.control}
              menuWidth="100%"
              minWidth="100%"
              name={fieldProps?.formKey}
              options={fieldProps?.dropdownOption}
              placeholder={fieldProps?.placeholder}
              noBorder={false}
              hideNullHelperText
              rules={{
                validate: async (value) => {
                  if (fieldProps?.required) {
                    return string()
                      .required()
                      .matches(fieldProps?.regex || '.')
                      .label(fieldProps?.formName?.toString())
                      .validate(value)
                      .then(() => true)
                      .catch((err) => err?.message);
                  } else {
                    return string()
                      .optional()
                      .nullable()
                      .matches(fieldProps?.regex || '.')
                      .label(fieldProps?.formName?.toString())
                      .validate(value)
                      .then(() => true)
                      .catch((err) => err?.message);
                  }
                },
              }}
            />
          </Box>
        );
      }
      if (fieldProps?.dropdownType === 'api') {
        return (
          <Box pt="16px">
            <DynamicDropdown
              {...props}
              useForm={useForm}
              fieldProps={fieldProps}
            />
          </Box>
        );
      }
    }
    if (fieldProps?.formtype === 'Upload File') {
      return (
        <Box pt="16px">
          <DynamicUploadFile useForm={useForm} fieldProps={fieldProps} />
        </Box>
      );
    }
    if (fieldProps?.formtype === 'PIC Partner') {
      return (
        <Box pt="16px">
          <PICForm useForm={useForm} fieldProps={fieldProps} />
        </Box>
      );
    }
  };

  return mergedForms.length > 0 && mergedForms?.map((form) => renderForm(form));
};

DynamicForm.propTypes = {
  control: PropTypes.object.isRequired,
};

export default DynamicForm;
