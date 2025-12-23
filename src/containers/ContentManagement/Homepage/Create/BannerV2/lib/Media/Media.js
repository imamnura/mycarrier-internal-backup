import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { Text } from '@legion-ui/core';
import { FileUpload } from '@components/FormField';
import { getUrlMedia } from '@containers/ContentManagement/Homepage/_repositories/repositories';
import { object } from 'yup';

const CustomerInfo = (props) => {
  const { useForm } = props;

  return (
    <Grid container md={6} xs={12} spacing={2}>
      <Grid item xs={12}>
        <Text size="14px" weight="600" block mb="8px" color="secondary600">
          <Text children="*" size="14px" color="primary500" />
          Add Image/video File
        </Text>
        <FileUpload
          accept={['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.webp']}
          control={useForm?.control}
          fetcher={getUrlMedia()}
          maxSize={2097152}
          name="media"
          placeholder="Example: satellite.png"
          ratioPixel={[1280, 720]}
          shouldUnregister
          withCropper
          rules={{
            validate: async (value) =>
              object()
                .nullable()
                .required()
                .label('Banner Hero Media')
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
        />
      </Grid>
    </Grid>
  );
};

CustomerInfo.propTypes = {
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  trigger: PropTypes.func.isRequired,
};

export default CustomerInfo;
