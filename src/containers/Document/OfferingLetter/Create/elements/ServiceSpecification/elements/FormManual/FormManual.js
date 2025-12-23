import PropTypes from 'prop-types';
import ButtonMinimal from '@components/ButtonMinimal';
import { TextField, TextFieldMasked } from '@components/FormField';
import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import useStyles from './styles';

const FormManual = (props) => {
  const { control, builder } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'detailFields',
  });

  const onAdd = () => {
    append({ fieldName: '', fieldValue: '' });
  };

  const onDelete = (index) => () => {
    remove(index);
  };

  const classes = useStyles();

  if (builder?.length > 0) {
    return (
      <Grid container spacing={2}>
        {builder.map(({ fieldName }, index) => (
          <Grid item key={fieldName} xs={6}>
            <TextField
              control={control}
              label={fieldName}
              maxLength={40}
              name={`detailFields.${index}.fieldValue`}
              required
              rules={{
                required: 'Value Field is a required field',
              }}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <TextFieldMasked
            control={control}
            label="Value Total"
            maskType="currency"
            maxLength={40}
            name="total"
            required
            rules={{
              required: 'Value Total is a required field',
            }}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      {fields.map((field, index) => (
        <Grid
          container
          justifyContent="space-between"
          key={field.id}
          style={{ marginBottom: 16 }}
        >
          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  control={control}
                  label={`Name Field ${index + 1}`}
                  maxLength={40}
                  name={`detailFields.${index}.fieldName`}
                  required
                  rules={{
                    required: 'Name Field is a required field',
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  control={control}
                  label={`Value Field ${index + 1}`}
                  maxLength={40}
                  name={`detailFields.${index}.fieldValue`}
                  required
                  rules={{
                    required: 'Value Field is a required field',
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Box mt={2}>
              {fields.length > 1 && (
                <ButtonMinimal onClick={onDelete(index)} variant="delete" />
              )}
            </Box>
          </Grid>
        </Grid>
      ))}
      {fields.length < 5 && (
        <Box alignItems="center" display="flex" mt={3}>
          <div className={classes.dashed} />
          <ButtonMinimal onClick={onAdd} variant="add" />
        </Box>
      )}
      <Box mt={2}>
        <TextFieldMasked
          control={control}
          label="Value Total"
          maskType="currency"
          maxLength={40}
          name="total"
          required
          rules={{
            required: 'Value Total is a required field',
          }}
        />
      </Box>
    </>
  );
};

FormManual.defaultProps = {
  builder: '',
};

FormManual.propTypes = {
  builder: PropTypes.array,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
};

export default FormManual;
