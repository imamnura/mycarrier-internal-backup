import React from 'react';
import PropTypes from 'prop-types';
import { Clear } from '@material-ui/icons';
import { Box, Grid } from '@material-ui/core';
import { Select } from '@components/FormField';
import Button from '@components/Button';
import Typography from '@components/Typography';
import SectionMark from '../../components/SectionMark';
import useStyles from './styles';
import useActions from './hooks/useActions';

const RelatedProducts = (props) => {
  const {
    previewMode,
    loadingProduct,
    useForm: { _formState },
    display: { isDisplayRelatedProduct, setIsDisplayRelatedProduct },
    tab,
  } = props;

  const { formState, control, fields, remove, options, handleAddProduct } =
    useActions(props);

  const classes = useStyles(previewMode, fields.length === 0);

  return (
    <div className={classes.root}>
      {!previewMode && (
        <SectionMark
          isDisplay={isDisplayRelatedProduct}
          nonmandatory
          onChange={() => setIsDisplayRelatedProduct(!isDisplayRelatedProduct)}
          title="Related Products"
        />
      )}

      <Grid container direction="column" spacing={2}>
        <Grid item sm={6} xs={12}>
          <div>
            <Typography color="general-main" variant="h4" weight="medium">
              Produk Terkait
            </Typography>
          </div>

          {fields.length !== 6 && tab !== 'en' && (
            <Box className={classes.selectBox} mt={3}>
              <div className={classes.selectContainer}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Select
                      control={control}
                      isDisabled={
                        tab === 'en' || !isDisplayRelatedProduct ? true : false
                      }
                      isLoading={loadingProduct}
                      name="selectedProduct"
                      options={options}
                      placeholder="Pilih product terkait"
                      staticWidth="100%"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Button
                      children="add product"
                      disabled={!formState.isValid}
                      onClick={handleAddProduct}
                    />
                  </Grid>
                </Grid>
                {_formState.errors.relatedProduct && (
                  <Typography color="primary-main" variant="caption">
                    {_formState.errors.relatedProduct.message}
                  </Typography>
                )}
              </div>
            </Box>
          )}
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            {fields.map((v, i) => (
              <Grid item key={`product-${i}-${v.name}`}>
                <div className={classes.itemContainer}>
                  <Typography
                    className={classes.itemsLabel}
                    color="general-main"
                    variant="h5"
                    weight="medium"
                  >
                    {v.name}
                  </Typography>

                  {tab !== 'en' && (
                    <Clear
                      className={classes.deleteIcon}
                      onClick={() => remove(i)}
                    />
                  )}
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <div className={!isDisplayRelatedProduct && classes.disabledSection} />
    </div>
  );
};

RelatedProducts.defaultProps = {
  options: [{ label: 'Pilih product terkait', value: '' }],
  tab: 'id',
};

RelatedProducts.propTypes = {
  display: PropTypes.object.isRequired,
  loadingProduct: PropTypes.bool.isRequired,
  options: PropTypes.array,
  previewMode: PropTypes.bool.isRequired,
  tab: PropTypes.string,
  useForm: PropTypes.object.isRequired,
};

export default RelatedProducts;
