import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import {
  TextField,
  Select,
  DatePicker,
  TimePicker,
  FileUpload,
} from '@components/FormField';
import { Box, Grid } from '@material-ui/core';
import useStyles from './styles';
import { isChannelMMS } from '../../utils';
import useAction from './hooks/useActions';
import Image from 'next/image';
import Card from '@components/Card/Card';
import { postUploadFile } from '@containers/SMSA2P/NonBulk/_repositories/repositories';

const Component = (props) => {
  const { options, channel, senderId } = props;
  const classes = useStyles();

  const { control, preview } = useAction(props);

  const uploadDocumentForm = () => {
    if (isChannelMMS(channel || '')) {
      return (
        <Grid item xs={12}>
          <FileUpload
            accept={['.jpg', '.png', '.gif', '.mp4']}
            control={control}
            fetcher={postUploadFile}
            helperText="File in jpg, png, gif, mp4 only, with max. 1MB"
            label="Image/Video"
            maxSize={1048576}
            name="media"
            placeholder="Example: example.jpg"
            required={isChannelMMS(channel || '')}
          />
        </Grid>
      );
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item sm={6} xs={12}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Card title="Receiver Profile">
            <TextField
              control={control}
              label="Location"
              maxLength={255}
              name="location"
              required
            />
            <Select
              control={control}
              label="Gender"
              name="gender"
              options={options.gender}
              required
            />
            <Box>
              <Typography children="*" color="primary-main" variant="body2" />
              <Typography color="general-mid" variant="body2">
                Age
              </Typography>
              <Box alignItems="center" display="flex" width="100%" mt={2}>
                <Box width="100%">
                  <TextField
                    control={control}
                    label="Minimum"
                    name="minimumAge"
                    required
                    type="number"
                  />
                </Box>
                <Box mx={2}>
                  <Typography
                    children="-"
                    variant="subtitle2"
                    weight="medium"
                  />
                </Box>
                <Box width="100%">
                  <TextField
                    control={control}
                    label="Maximum"
                    name="maximumAge"
                    required
                    type="number"
                  />
                </Box>
              </Box>
            </Box>
            <Box mt={1}>
              <Typography children="*" color="primary-main" variant="body2" />
              <Typography color="general-mid" variant="body2">
                ARPU
              </Typography>
              <Box alignItems="center" display="flex" width="100%" mt={2}>
                <Box width="100%">
                  <TextField
                    control={control}
                    label="Minimum"
                    name="minimumARPU"
                    required
                    type="number"
                  />
                </Box>
                <Box mx={2}>
                  <Typography
                    children="-"
                    variant="subtitle2"
                    weight="medium"
                  />
                </Box>
                <Box width="100%">
                  <TextField
                    control={control}
                    label="Maximum"
                    name="maximumARPU"
                    required
                    type="number"
                  />
                </Box>
              </Box>
            </Box>
            <Select
              control={control}
              label="Religion"
              name="religion"
              options={options.religion}
              required
            />
          </Card>
          <Card title="Message Delivery">
            <DatePicker
              control={control}
              label="Campaign Date"
              name="campaignDate"
              required
            />
            <Box>
              <Box alignItems="center" display="flex" width="100%">
                <Box width="100%">
                  <TimePicker
                    control={control}
                    label="Campaign Start Time"
                    maxTime={new Date(0, 0, 0, 21)}
                    minTime={new Date(0, 0, 0, 8)}
                    name="campaignStartTime"
                    required
                  />
                </Box>
                <Box mx={2}>
                  <Typography
                    children="-"
                    variant="subtitle2"
                    weight="medium"
                  />
                </Box>
                <Box width="100%">
                  <TimePicker
                    control={control}
                    label="Campaign End Time"
                    maxTime={new Date(0, 0, 0, 21)}
                    minTime={new Date(0, 0, 0, 8)}
                    name="campaignEndTime"
                    required
                  />
                </Box>
              </Box>
              <Typography color="general-mid" variant="caption">
                Camgaign time can only be done from 8:00 to 21:00
              </Typography>
            </Box>
            <TextField
              control={control}
              label="Quantity"
              name="quantity"
              required
              type="number"
            />
            <TextField
              control={control}
              label="SMS per Day Location"
              maxLength={6}
              name="smsPerDayLocation"
              required
              type="number"
            />
          </Card>
        </div>
      </Grid>
      <Grid item sm={6} xs={12}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Card title="Message Content">
            <TextField
              control={control}
              label="Wording"
              maxLength={255}
              minRows={3}
              multiline
              name="wording"
              required
            />
            {uploadDocumentForm()}
          </Card>
          <Card
            title="Preview"
            subTitle="You need to complete all the forms to see a preview of the message
              display."
          >
            <div className={classes.wrapperPreview}>
              <Image
                alt=""
                height={400}
                src="https://i.ibb.co/pPDZCL7/preview.png"
                width={340}
              />
              <div
                className={classes.wrapperSender}
                style={{
                  width: 270,
                  height: 48,
                  top: 36,
                }}
              >
                <Typography
                  children={senderId}
                  color="general-main"
                  variant="body2"
                />
              </div>
              {(!!preview.src || !!preview.wording) && (
                <div
                  className={classes.wrapperMedia}
                  style={{
                    width: 230,
                    top: 90,
                  }}
                >
                  {!!preview.src && isChannelMMS(channel || '') && (
                    <div className={classes.media}>
                      {['video', 'mp4', 'video/mp4'].includes(preview.type) ? (
                        <video autoPlay loop src={preview.src} width="100%" />
                      ) : (
                        <Image
                          alt={preview.name}
                          height={400}
                          layout="responsive"
                          objectFit="contain"
                          src={preview.src}
                          unoptimized={true}
                          width={400}
                        />
                      )}
                    </div>
                  )}
                  <Typography
                    children={preview.wording}
                    color="general-mid"
                    variant="caption"
                  />
                </div>
              )}
            </div>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
};

Component.defaultProps = {
  channel: 'SMS',
  defaultValues: {},
  options: {},
};

Component.propTypes = {
  channel: PropTypes.string,
  defaultValues: PropTypes.object,
  options: PropTypes.object,
  senderId: PropTypes.string.isRequired,
};

export default Component;
