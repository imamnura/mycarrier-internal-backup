import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { Select } from '@components/FormField';
import useActions from './hooks/useActions';

export default function ChooseCategoryForm(props) {
  const { modalChooseCategory } = props;

  const {
    control,
    formState: { isValid, isDirty },
    handleUpdateStatus,
    handleSubmit,
    onClose,
    categoryOptions,
    subcategoryOptions,
    loading,
    category,
  } = useActions(props);

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalChooseCategory}>
      <form onSubmit={handleSubmit(handleUpdateStatus)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          {modalChooseCategory?.title && (
            <Grid align="center" item xs={12}>
              <Typography variant="h5" weight="medium">
                {modalChooseCategory?.title}
              </Typography>
            </Grid>
          )}
          {modalChooseCategory?.textInfo && (
            <Grid align="center" item xs={12}>
              <Typography variant="caption" weight="normal">
                {modalChooseCategory?.textInfo}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Select
              control={control}
              isLoading={loading.category}
              label="Salesforce Category"
              maxWidth="100%"
              menuWidth="100%"
              name="category"
              options={categoryOptions}
              placeholder="Choose Salesforce Category"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              control={control}
              isDisabled={!category}
              isLoading={loading.subcategory}
              label="Salesforce Subcategory"
              maxWidth="100%"
              menuWidth="100%"
              name="subcategory"
              options={subcategoryOptions}
              placeholder="Choose Salesforce Subcategory"
              required
            />
          </Grid>
          {modalChooseCategory?.caption && (
            <Grid item xs={12}>
              <Typography variant="caption" weight="normal">
                {modalChooseCategory?.caption}
              </Typography>
            </Grid>
          )}
          <Grid container item justifyContent="center" pt={2} spacing={2}>
            <Grid item>
              <Button onClick={onClose} variant="ghost">
                CANCEL
              </Button>
            </Grid>
            <Grid item>
              <Button disabled={!isValid || !isDirty} type="submit">
                {modalChooseCategory?.submitText || 'SUBMIT'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

ChooseCategoryForm.defaultProps = {
  modalChooseCategory: null,
};

ChooseCategoryForm.propTypes = {
  modalChooseCategory: PropTypes.object,
};
