import React from 'react';
import { Grid, Divider } from '@material-ui/core';
import Create from '@fragments/Create';
import { TextField, Select, FileUpload } from '@components/FormField';
import { route } from '@configs';
import Tabs from '@components/Tabs';
import {
  optionsType,
  imageCaptionDesktop,
  imageCaptionMobile,
} from './constant';
import useActions from './hooks/useActions';
import useStyles from './styles';
import { getUrlMedia } from '@containers/ContentManagement/Homepage/_repositories/repositories';
import Card from '@components/Card';

const Add = (props) => {
  const classes = useStyles();

  const {
    id,
    control,
    handleSubmit,
    confirmAdd,
    optionsProduct,
    loadingProduct,
    watchTypeBanner,
    languages,
    tab,
    setTab,
    handleSwap,
    isLoading,
    handleCancel,
    validateForm,
  } = useActions(props);

  const tabsProps = {
    onChange: setTab,
    options: languages,
    value: tab,
    onSwap: handleSwap,
  };

  return (
    <Create
      action={[
        {
          children: 'Cancel',
          id: 'btnCancelBanner',
          onClick: handleCancel,
          variant: 'ghost',
        },
        {
          children: 'Save',
          disabled: validateForm,
          id: 'btnSaveBanner',
          loading: isLoading,
          onClick: handleSubmit(confirmAdd),
          // hideDivider: true,
        },
      ]}
      breadcrumb={[
        { label: 'Homepage Management', url: route.homepageManagement('list') },
        { label: `${id ? 'Edit' : 'Add'} Banner Hero` },
      ]}
      loading={isLoading}
    >
      <Grid container spacing={5}>
        <Grid item md={5} xs={12}>
          <Card title="Banner Hero Attributes">
            <Grid className={classes.inputField}>
              <Tabs {...tabsProps} />
            </Grid>
            <Grid className={classes.inputField}>
              <TextField
                control={control}
                label={`Banner Title (${tab})`}
                maxLength={40}
                name={`title${tab}`}
                required
              />
            </Grid>
            <Grid className={classes.inputField}>
              <TextField
                control={control}
                label={`Banner Description (${tab})`}
                maxLength={160}
                minRows={4}
                multiline
                name={`description${tab}`}
                required
              />
            </Grid>
            <Divider />
            <Grid className={classes.marginBT}>
              <FileUpload
                accept={['.png']}
                control={control}
                fetcher={getUrlMedia()}
                helperText={imageCaptionDesktop}
                label="Add Image File for Desktop"
                maxSize={524288} //512Kb
                name="imageDesktop"
                placeholder="Example: satellite.png"
                ratioPixel={[1440, 520]}
                required
                shouldUnregister
              />
            </Grid>
            <Grid className={classes.inputField}>
              <FileUpload
                accept={['.png']}
                control={control}
                fetcher={getUrlMedia()}
                helperText={imageCaptionMobile}
                label="Add Image File for Mobile"
                maxSize={524288} //512Kb
                name="imageMobile"
                placeholder="Example: satellite.png"
                ratioPixel={[360, 300]}
                required
                shouldUnregister
              />
            </Grid>
            <Grid className={classes.inputField}>
              <Select
                control={control}
                label="Type"
                name="type"
                options={optionsType}
                placeholder="Choose Type"
                required
              />
            </Grid>
            {watchTypeBanner === 'internal' && (
              <Grid className={classes.inputField}>
                <Select
                  control={control}
                  label="Product Slug"
                  loading={loadingProduct}
                  maxWidth={500}
                  name="linkedTo"
                  options={optionsProduct}
                  placeholder="Choose product"
                  required
                />
              </Grid>
            )}
            {watchTypeBanner === 'eksternal' && (
              <Grid className={classes.inputField}>
                <TextField
                  control={control}
                  label="Product Slug"
                  maxLength={200}
                  minRows={4}
                  multiline
                  name="linkedToEksternal"
                  placeholder="https://www.example.com"
                  required
                />
              </Grid>
            )}
          </Card>
        </Grid>
      </Grid>
    </Create>
  );
};

Add.defaultProps = {};

Add.propTypes = {};

export default Add;
