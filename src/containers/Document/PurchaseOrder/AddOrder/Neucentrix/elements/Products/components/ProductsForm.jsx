import React from 'react';
import Typography from '@components/Typography/Typography';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Select, TextField } from '@components/FormField';
import { SERVICE_NAME_FORM_LABEL } from '../constant';
function ProductsForm(props) {
  const {
    formService,
    form: { getValues, setValue, control },
    onChangeAdditional,
    isDisabled,
  } = props;

  return (
    <Box className={props.className}>
      <Typography
        style={{ marginBottom: '1rem', display: 'block' }}
        variant="h5"
        weight="bold"
      >
        {SERVICE_NAME_FORM_LABEL[formService.item]}
      </Typography>

      {formService.forms.map((inputFormProps, index) => (
        <Box key={index}>
          {(() => {
            const {
              type,
              defaultValue,
              name,
              disabled: disabledProps,
            } = inputFormProps;
            if (type === 'select') {
              const value =
                getValues(`services.${formService.item}.${name}`) ??
                defaultValue;
              return (
                <Select
                  {...inputFormProps}
                  control={control}
                  customOnChange={(value) => {
                    setValue(`services.${formService.item}.${name}`, value);
                    onChangeAdditional(
                      `services.${formService.item}.${name}`,
                      name,
                      value,
                    );
                  }}
                  defaultValue={value}
                  isDisabled={isDisabled}
                  name={`services.${formService.item}.${name}`}
                />
              );
            }
            if (type === 'text' || type === 'number') {
              return (
                <TextField
                  {...inputFormProps}
                  control={control}
                  customOnChange={(value) => {
                    setValue(`services.${formService.item}.${name}`, value);
                    onChangeAdditional(
                      `services.${formService.item}.${name}`,
                      name,
                      value,
                    );
                  }}
                  disabled={disabledProps ?? isDisabled}
                  name={`services.${formService.item}.${name}`}
                />
              );
            }
          })()}
        </Box>
      ))}
    </Box>
  );
}
ProductsForm.defaultProps = {
  className: '',
  form: {},
  formService: {},
  isDisabled: false,
  onChangeAdditional: () => {},
  serviceIdx: 0,
};

ProductsForm.propTypes = {
  className: PropTypes.string,
  form: PropTypes.object,
  formService: PropTypes.object,
  isDisabled: PropTypes.bool,
  onChangeAdditional: PropTypes.func,
  serviceIdx: PropTypes.number,
};

export default ProductsForm;
