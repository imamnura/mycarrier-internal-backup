import React from 'react';
import PropTypes from 'prop-types';
import {
  AutoComplete,
  SelectDatePicker,
  FileUpload,
  RadioGroup,
  TextField,
} from '@components/FormField';
import { DetailGenerator } from '@fragments/Detail';
import { Box, Grid } from '@material-ui/core';
import Typography from '@components/Typography/Typography';
import useAction from './hooks/useActions';
import ArrowDown from '@assets/icon-v2/ArrowDown';
import { postUploadFile } from '@containers/Document/PurchaseOrder/_repositories/repositories';

const UploadBakes = (props) => {
  const { control, data, loadingOptionBakes, optionsBakesNumber } = props;

  const { radioBakes, bakesStartDate } = useAction(props);

  const uploadBakesForm = () => {
    if (data?.isHaveBakes) {
      if (data?.isExistingBakes) {
        return (
          <>
            <Grid item style={{ paddingTop: '1.5rem' }} xs={12}>
              <Typography children="Select BAKES" variant="body2" />
            </Grid>
            <Grid item style={{ paddingTop: '0.5rem' }} xs={12}>
              <TextField
                control={control}
                disabled={true}
                label="BAKES Number"
                maxLength={27}
                name="bakesNumber"
                required
                rightAdornment={ArrowDown}
              />
            </Grid>
          </>
        );
      } else {
        return (
          <>
            <Grid item style={{ paddingTop: '1.5rem' }} xs={12}>
              <Typography children="Upload New BAKES File" variant="body2" />
            </Grid>
            <Grid item style={{ paddingTop: '0.5rem' }} xs={12}>
              <FileUpload
                accept={['.pdf']}
                control={control}
                disabled
                helperText="Upload .pdf document, max 5 MB "
                maxSize={5242880}
                name="media"
                placeholder="Example: bakes.pdf"
              />
            </Grid>
            <Grid item style={{ paddingTop: '1.5rem' }} xs={12}>
              <TextField
                control={control}
                disabled={true}
                label="BAKES Number"
                maxLength={27}
                name="bakesNumber"
                required
              />
            </Grid>
          </>
        );
      }
    } else {
      return (
        <Grid item style={{ paddingTop: '1.5rem' }} xs={12}>
          <RadioGroup
            alignItems="flex-start"
            control={control}
            direction="vertical"
            name="radioBakes"
            options={[
              {
                label: (
                  <Grid container spacing={1} style={{ marginBottom: 16 }}>
                    <Grid item xs={12}>
                      <Typography children="Select BAKES" variant="body2" />
                    </Grid>
                    <Grid item xs={12}>
                      <AutoComplete
                        control={control}
                        disabled={radioBakes !== '1'}
                        label="BAKES Number"
                        loading={loadingOptionBakes}
                        name="bakesNumberAuto"
                        options={
                          optionsBakesNumber.map((v) => v.bakesNumber) || []
                        }
                        required
                        rightAdornment={ArrowDown}
                      />
                    </Grid>
                  </Grid>
                ),
                value: '1',
              },
              {
                label: (
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography
                        children="Upload New BAKES File"
                        variant="body2"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FileUpload
                        accept={['.pdf']}
                        control={control}
                        disabled={radioBakes !== '2'}
                        fetcher={postUploadFile}
                        helperText="Upload .pdf document, max 5 MB "
                        maxSize={5242880}
                        name="media"
                        placeholder="Example: bakes.pdf"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        control={control}
                        disabled={radioBakes !== '2'}
                        label="BAKES Number"
                        maxLength={35}
                        name="bakesNumber"
                        required
                      />
                    </Grid>
                  </Grid>
                ),
                value: '2',
              },
            ]}
            required
          />
        </Grid>
      );
    }
  };

  const schema = [
    {
      type: 'custom',
      title: 'BAKES Document',
      render: (
        <Grid container style={{ padding: '0.5rem 0rem' }}>
          {uploadBakesForm()}
          <Grid item style={{ paddingTop: '1.5rem' }} xs={12}>
            <SelectDatePicker
              control={control}
              menuLabel="BAKES Start Date"
              name="bakesStartDate"
              required
            />
          </Grid>
          <Grid item style={{ paddingTop: '1.5rem' }} xs={12}>
            <SelectDatePicker
              control={control}
              minDate={bakesStartDate}
              menuLabel="BAKES End Date"
              name="bakesEndDate"
              required
            />
          </Grid>
          <Grid item style={{ paddingTop: '1.5rem' }} xs={6}>
            <TextField
              control={control}
              disabled
              label="BAKES Duration"
              name="bakesDuration"
              required
              type="number"
            />
          </Grid>
          <Grid
            item
            style={{ paddingTop: '1.5rem', paddingLeft: '0.5rem' }}
            xs={6}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Typography
                children="month"
                color="general-mid"
                variant="body2"
              />
            </Box>
          </Grid>
          <Grid item style={{ paddingTop: '1.5rem' }} xs={12}>
            <TextField
              control={control}
              label="Note"
              maxLength={1000}
              minRows={3}
              multiline
              name="noteProgress"
              placeholder="Please describe the note.."
            />
          </Grid>
        </Grid>
      ),
    },
  ];

  return <DetailGenerator data={schema} />;
};

UploadBakes.defaultProps = {
  control: {},
  data: null,
  loadingOptionBakes: true,
  optionsBakesNumber: [],
};

UploadBakes.propTypes = {
  control: PropTypes.object,
  data: PropTypes.object,
  loadingOptionBakes: PropTypes.bool,
  optionsBakesNumber: PropTypes.array,
};

export default UploadBakes;
