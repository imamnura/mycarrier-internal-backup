import React from 'react';
import PropTypes from 'prop-types';
import { Switch, TextField } from '@components/FormFieldLegion';
import { Text } from '@legion-ui/core';
import {
  FileUpload,
  RadioGroup,
  SelectDatePicker,
} from '@components/FormField';
import { postUploadFile } from '@containers/ContentManagement/Homepage/_repositories/repositories';
import { Grid } from '@material-ui/core';
import useAction from './hooks/useActions';
import { subtractRealDate } from '@utils/parser';

const PopUpDetail = (props) => {
  const { control } = props;

  const { startPeriod, period } = useAction(props);

  return (
    <Grid container>
      <Grid item style={{ paddingTop: '1.5rem' }} xs={12}>
        <TextField
          block
          control={control}
          label="Pop Up Name"
          name="name"
          placeholder="Input pop up name"
          required
        />
      </Grid>
      <Grid item style={{ paddingTop: '1.5rem' }} xs={12}>
        <Text size="sm" weight="600" block color="#3B525C">
          <Text children="*" size="sm" color="#DE1B1B" />
          Add Image Pop Up
        </Text>
        <FileUpload
          accept={['.jpg', '.png']}
          control={control}
          fetcher={postUploadFile}
          helperText="Upload .png, jpg, max 300 KB"
          maxSize={307200}
          name="imageUrl"
          placeholder="Example: satellite.png"
        />
      </Grid>
      <Grid item style={{ paddingTop: '1.5rem' }} xs={12}>
        <TextField
          block
          control={control}
          label="Action Button Link"
          name="link"
          placeholder="eg: http://sample.com/"
          required
        />
      </Grid>
      <Grid item style={{ paddingTop: '1.5rem' }} xs={12}>
        <Text size="sm" weight="600" block color="#3B525C">
          <Text children="*" size="sm" color="#DE1B1B" />
          Period
        </Text>
        <RadioGroup
          control={control}
          direction="horizontal"
          // label="Dropdown Type"
          name="period"
          options={[
            { label: 'Unlimited', value: 'unlimited' },
            { label: 'By Period', value: 'by period' },
          ]}
          required
          hideHelper
        />
      </Grid>
      {period === 'by period' && (
        <Grid
          item
          container
          style={{ paddingTop: '0.5rem' }}
          xs={12}
          spacing={2}
        >
          <Grid item xs={12} md={6}>
            <Text size="sm" weight="600" block color="#3B525C" mb="8px">
              <Text children="*" size="sm" color="#DE1B1B" />
              Start Date
            </Text>
            <SelectDatePicker
              control={control}
              minDate={new Date()}
              name="startPeriod"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Text size="sm" weight="600" block color="#3B525C" mb="8px">
              <Text children="*" size="sm" color="#DE1B1B" />
              End Date
            </Text>
            <SelectDatePicker
              control={control}
              minDate={subtractRealDate('days', startPeriod, 1) || new Date()}
              name="endPeriod"
              required
              fullWidth
            />
          </Grid>
        </Grid>
      )}
      <Grid item style={{ paddingTop: '1.5rem' }} xs={12}>
        <Text size="sm" weight="600" block color="#3B525C" mb="8px">
          <Text children="*" size="sm" color="#DE1B1B" />
          Status
        </Text>
        <Switch
          control={control}
          label="Set it to active when submitted"
          name="status"
          required
        />
      </Grid>
    </Grid>
  );
};

PopUpDetail.defaultProps = {
  control: {},
};

PopUpDetail.propTypes = {
  control: PropTypes.object,
};

export default PopUpDetail;
