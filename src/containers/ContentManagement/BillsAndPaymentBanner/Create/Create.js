import React from 'react';
import { Grid, Divider } from '@material-ui/core';
import Create from '@fragments/Create';
import { TextField, FileUpload } from '@components/FormField';
import { route } from '@configs';
import useActions from './hooks/useActions';
import Card from '@components/Card';
import { postUploadImage } from '@containers/ContentManagement/BillsAndPaymentBanner/_repositories/repositories';

const CreateBillsAndPaymentBanner = (props) => {
  const {
    id,
    control,
    handleSubmit,
    onAddBanner,
    isLoading,
    handleCancel,
    validateForm,
  } = useActions(props);

  return (
    <Create
      action={[
        {
          children: 'Cancel',
          id: 'btnCancelBillsAndPaymentBanner',
          onClick: handleCancel,
          variant: 'ghost',
        },
        {
          children: 'Save',
          disabled: validateForm,
          id: 'btnSaveBillsAndPaymentBanner',
          loading: isLoading,
          onClick: handleSubmit(onAddBanner),
        },
      ]}
      breadcrumb={[
        {
          label: 'Bills & Payment Banner',
          url: route.billsAndPaymentBanner('list'),
        },
        { label: `${id ? 'Edit' : 'Add'} Banner` },
      ]}
      loading={isLoading}
    >
      <Grid container spacing={5}>
        <Grid item md={5} xs={12}>
          <Card title="Banner Details">
            <Grid>
              <TextField
                control={control}
                label="Banner Title"
                maxLength={40}
                name="title"
                required
              />
            </Grid>
            <Grid>
              <TextField
                control={control}
                label="Banner Description"
                maxLength={160}
                minRows={4}
                multiline
                name="bannerDesc"
                required
              />
            </Grid>
            <Divider />
            <Grid>
              <FileUpload
                accept={['.png', '.jpg']}
                control={control}
                fetcher={postUploadImage(id)}
                helperText="Upload jpg,png image, max 512 KB and size 840 x 160 px"
                label="Add Image"
                maxSize={524288} //512Kb
                name="imageBanner"
                placeholder="Example: banner.png"
                ratioPixel={[840, 160]}
                required
                withDelete={true}
              />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Create>
  );
};

CreateBillsAndPaymentBanner.defaultProps = {};

CreateBillsAndPaymentBanner.propTypes = {};

export default CreateBillsAndPaymentBanner;
