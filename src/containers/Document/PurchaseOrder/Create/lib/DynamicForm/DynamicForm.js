import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Hidden } from '@material-ui/core';
import { TextArea, TextField } from '@components/FormFieldLegion';
import { Text } from '@legion-ui/core';
import { Select } from '@components/FormField';
import { mergeForms } from '../../utils';
import DynamicDropdown from '../DynamicDropdown';
import DynamicUploadFile from '../DynamicUploadFile';
import DynamicPackages from '../DynamicPackages';
import SolutionItem from '../SolutionItem';
import { string } from 'yup';
import useQueryParams from '@utils/hooks/useQueryParams';

const DynamicForm = (props) => {
  const { customer, products, filters, productId, useForm } = props;

  const { queryParams } = useQueryParams();

  const mergedForms = mergeForms(products, queryParams?.orderType, filters);

  const renderForm = (fieldProps) => {
    if (fieldProps?.formtype === 'Text Field') {
      let defaultValue;

      if (fieldProps?.formName.toLowerCase().includes('address')) {
        defaultValue = customer?.data?.address;
      }

      if (fieldProps?.formName.toLowerCase().includes('npwp')) {
        defaultValue = customer?.data?.npwp;
      }

      return (
        <>
          <Grid item xs={12} md={6}>
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
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} md={6} />
          </Hidden>
        </>
      );
    }
    if (fieldProps?.formtype === 'Text Area') {
      return (
        <>
          <Grid item xs={12} md={6}>
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
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} md={6} />
          </Hidden>
        </>
      );
    }
    if (fieldProps?.formtype === 'Dropdown') {
      if (fieldProps?.dropdownType === 'manual') {
        return (
          <>
            <Grid item xs={12} md={6}>
              <Text
                size="14px"
                weight="600"
                block
                mb="8px"
                color="secondary600"
              >
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
            </Grid>
            <Hidden smDown>
              <Grid item xs={12} md={6} />
            </Hidden>
          </>
        );
      }
      if (fieldProps?.dropdownType === 'api') {
        return (
          <>
            <Grid item xs={12} md={6}>
              <DynamicDropdown
                {...props}
                useForm={useForm}
                fieldProps={fieldProps}
              />
            </Grid>
            <Hidden smDown>
              <Grid item xs={12} md={6} />
            </Hidden>
          </>
        );
      }
    }
    if (fieldProps?.formtype === 'Upload File') {
      return (
        <>
          <Grid item xs={12} md={6}>
            <DynamicUploadFile useForm={useForm} fieldProps={fieldProps} />
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} md={6} />
          </Hidden>
        </>
      );
    }
    if (fieldProps?.formtype === 'Upload BAKES') {
      return (
        <>
          <Grid item xs={12} md={6}>
            <TextField
              block
              control={useForm?.control}
              label="BAKES Number"
              name={`${fieldProps?.formKey}.bakesNumber`}
              required={fieldProps?.required}
              placeholder="Input BAKES Number"
              maxLength={27}
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
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} md={6} />
          </Hidden>
          <Grid item xs={12} md={6}>
            <DynamicUploadFile
              fieldProps={{
                ...fieldProps,
                formKey: `${fieldProps?.formKey}.bakesFile`,
                fileType: ['pdf'],
                maxSize: 5,
              }}
              useForm={useForm}
            />
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} md={6} />
          </Hidden>
        </>
      );
    }
    if (fieldProps?.formtype === 'Packages') {
      return (
        <>
          <Grid item xs={12}>
            <DynamicPackages
              useForm={useForm}
              fieldProps={fieldProps}
              productId={productId}
            />
          </Grid>
        </>
      );
    }
    if (fieldProps?.formtype === 'Solutions') {
      return <SolutionItem {...props} />;
    }
  };

  return (
    mergedForms.length > 0 && (
      <Grid container xs={12} spacing={2}>
        {mergedForms?.map((form) => renderForm(form))}
      </Grid>
    )
  );
};

DynamicForm.propTypes = {
  control: PropTypes.object.isRequired,
};

export default DynamicForm;
