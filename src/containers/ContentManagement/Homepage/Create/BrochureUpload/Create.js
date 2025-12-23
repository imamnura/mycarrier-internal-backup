import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import UploadFile from '@__old/components/elements/UploadFile';
import { TextField } from '@components/FormField';
import Typography from '@components/Typography';
import useActions from './hooks/useActions';
import { imageCaption } from './constant';
import Create from '@fragments/Create';
import { textLimit } from '@utils/text';
import Card from '@components/Card';

const CreateBrochure = (props) => {
  const { classes } = props;

  const {
    control,
    file,
    setFile,
    handleSubmit,
    handleUploadFile,
    confirmUpload,
    detail,
    btnSave,
    handleCancel,
    isLoading,
  } = useActions(props);

  return (
    <Create
      action={[
        {
          children: 'Cancel',
          id: 'btnCancelBrochure',
          onClick: handleCancel,
          variant: 'ghost',
        },
        {
          children: 'Save',
          disabled: !!btnSave,
          id: 'btnSaveBrochure',
          loading: isLoading,
          onClick: handleSubmit(confirmUpload),
          // hideDivider: true,
        },
      ]}
      breadcrumb={
        detail?.name
          ? [
              { label: 'Homepage Management', url: '/homepage-management' },
              {
                label: textLimit(detail?.name, 40),
                url: `/brochure/detail/${detail?.id}`,
              },
              { label: 'Edit Brochure' },
            ]
          : [
              { label: 'Homepage Management', url: '/homepage-management' },
              { label: `Upload Brochure` },
            ]
      }
      loading={isLoading}
    >
      <Grid item md={6} sm={12}>
        <Card title="Brochure Attributes">
          <Grid className={classes.inputField}>
            <TextField
              control={control}
              label="Brochure Name"
              maxLength={80}
              name="name"
              required
            />
          </Grid>
          <Grid className={classes.inputField}>
            <UploadFile
              accept={['.pdf', '.png', '.jpg']}
              fileName={file ? file.name : ''}
              handleDelete={() => setFile(null)}
              isLabelInputTop={true}
              labelCustom="Example: guidelines.pdf"
              labelInput="Upload Brochure"
              maxSize={10485760}
              name="fileBrochure"
              onChange={(val) => handleUploadFile(val)}
              required={true}
              withDelete={true}
            />
            <div style={{ marginTop: '4px' }}>
              <Typography children={imageCaption} variant="overline" />
            </div>
          </Grid>
          <Grid className={classes.inputField}>
            <TextField
              control={control}
              label="Description"
              maxLength={140}
              minRows={4}
              multiline
              name="description"
              required
            />
          </Grid>
        </Card>
      </Grid>
    </Create>
  );
};

CreateBrochure.defaultProps = {
  classes: {},
  feature: [],
};

CreateBrochure.propTypes = {
  classes: PropTypes.object,
  feature: PropTypes.array,
};

export default CreateBrochure;
