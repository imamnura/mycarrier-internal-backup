import Button from '@components/Button';
import { Switch, TextField, TextFieldMasked } from '@components/FormField';
import Typography from '@components/Typography';
import { Box, Dialog, Grid } from '@material-ui/core';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from '../../styles';
import PropTypes from 'prop-types';
import PickProduct from './elements/PickProduct';
import { Controller } from 'react-hook-form';

const Product = (props) => {
  const { onClose, variant } = props;
  const classes = useStyles();

  const { control, onSubmit, handleSubmit } = useAction(props);

  const title = {
    add: 'Add New Product',
    edit: 'Edit Product',
  }[variant];

  const submitLabel = {
    add: 'Add Product',
    edit: 'Edit Product',
  }[variant];

  return (
    <Dialog
      classes={{ paper: classes.dialogRoot }}
      maxWidth="lg"
      open
      scroll="body"
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography color="general-dark" inline variant="h5" weight="medium">
          {title}
        </Typography>
      </Box>
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 8 }}>
              <Typography>Automatic Quote?</Typography>
              <Switch control={control} name="autoQuote" />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="product"
              render={({ field, fieldState }) => (
                <PickProduct
                  error={fieldState?.error?.message}
                  onSubmit={field.onChange}
                  value={field.value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              disabled
              label="Product Line"
              maxLength={9}
              name="productLine"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldMasked
              control={control}
              label="Net Price"
              maskType="currency"
              name="netPrice"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldMasked
              control={control}
              label="Revenue"
              maskType="currency"
              name="revenue"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Probability (%)"
              name="probability"
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Quantity"
              name="quantity"
              required
              type="number"
            />
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button onClick={onClose} variant="ghost">
          Cancel
        </Button>
        <Button ml={16} onClick={handleSubmit(onSubmit)}>
          {submitLabel}
        </Button>
      </Box>
    </Dialog>
  );
};

Product.defaultProps = {
  variant: 'add',
};

Product.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['add', 'edit']),
};

export default Product;
