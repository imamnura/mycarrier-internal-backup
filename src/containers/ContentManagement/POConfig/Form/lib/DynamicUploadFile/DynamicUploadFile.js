import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@legion-ui/core';
import { FileUpload } from '@components/FormField';
import { postUploadFile } from '@containers/Document/PurchaseOrder/_repositories/repositories';
import { array, object } from 'yup';

const DynamicUploadFile = (props) => {
  const { useForm, fieldProps } = props;

  return (
    <>
      <Text size="14px" weight="600" block mb="8px" color="secondary600">
        {fieldProps?.required && (
          <Text children="*" size="14px" color="primary500" />
        )}
        {fieldProps?.formName}
      </Text>
      <FileUpload
        accept={fieldProps?.fileType?.map((accept) => `.${accept}`)}
        control={useForm?.control}
        fetcher={postUploadFile}
        maxSize={fieldProps?.maxSize * 1048576}
        name={fieldProps?.formKey}
        placeholder={
          fieldProps?.hint ||
          fieldProps?.placeholder ||
          `Example: ${fieldProps?.formName}.ext`
        }
        maxFile={fieldProps?.multiple}
        rules={{
          validate: async (value) => {
            if (fieldProps?.required) {
              if (fieldProps?.multiple > 1) {
                return array()
                  .of(
                    object()
                      .nullable()
                      .required()
                      .label(fieldProps?.formName?.toString()),
                  )
                  .nullable()
                  .required()
                  .min(1)
                  .label(fieldProps?.formName?.toString())
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message);
              } else {
                return object()
                  .nullable()
                  .required()
                  .label(fieldProps?.formName?.toString())
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message);
              }
            } else {
              if (fieldProps?.multiple > 1) {
                return array()
                  .of(
                    object()
                      .nullable()
                      .required()
                      .label(fieldProps?.formName?.toString()),
                  )
                  .optional()
                  .min(0)
                  .label(fieldProps?.formName?.toString())
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message);
              } else {
                return object()
                  .nullable()
                  .optional()
                  .label(fieldProps?.formName?.toString())
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message);
              }
            }
          },
        }}
      />
    </>
  );
};

DynamicUploadFile.defaultProps = {
  required: false,
  placeholder: null,
};

DynamicUploadFile.propTypes = {
  required: PropTypes.bool,
  formName: PropTypes.string.isRequired,
  formKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default DynamicUploadFile;
