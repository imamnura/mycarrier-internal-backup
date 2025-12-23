/* eslint-disable react/no-danger */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  AutoComplete,
  FileUpload,
  RadioGroup,
  Select,
  SelectDatePicker,
  TextField,
} from '@components/FormField';
import { Box, Grid } from '@material-ui/core';
import Typography from '@components/Typography';
import ArrowDown from '@assets/Svg/ArrowDown';
import Information from '@assets/icon-v2/Information';
import { Alert } from '@material-ui/lab';
import useStyles from './styles';
import { alertText } from '../../utils';
import useAction from './hooks/useActions';
import SectionAttachment from '@fragments/Detail/elements/SectionAttachment/SectionAttachment';

const Document = (props) => {
  const { control, data, state } = props;
  const classes = useStyles();

  const { optionsBakesNumber } = state;

  const {
    agreementAsyncProps,
    agreementMasterNumber: agreeNumber,
    bakesStartDate,
    radioBakes,
    loadingBakesNumber,
    postUploadFile,
  } = useAction(props);

  const schema = [{ name: 'purchaseOrderDocument', label: 'Purchase Order' }];

  const uploadBakesForm = () => {
    if (data?.isHaveBakes) {
      if (data?.isExistingBakes) {
        return (
          <>
            <Box pb={2} pt={1}>
              <Typography children="Select BAKES" variant="body2" />
              <Box pt={1}>
                <TextField
                  control={control}
                  disabled
                  label="BAKES Number"
                  maxLength={35}
                  name="bakesNumberAuto"
                  required
                  rightAdornment={ArrowDown}
                />
              </Box>
            </Box>
          </>
        );
      } else {
        return (
          <>
            <Box py={1}>
              <Typography children="Upload New BAKES File" variant="body2" />
              <FileUpload
                accept={['.pdf']}
                control={control}
                disabled
                helperText="Upload .pdf document, max 5 MB "
                maxSize={5242880}
                name="bakesFile"
                placeholder="Example: bakes.pdf"
              />
            </Box>
            <Box py={2}>
              <TextField
                control={control}
                disabled
                label="BAKES Number"
                maxLength={35}
                name="bakesNumber"
                required
              />
            </Box>
          </>
        );
      }
    } else {
      return (
        <Box py={1}>
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
                        loading={loadingBakesNumber}
                        name="bakesNumberAuto"
                        options={optionsBakesNumber.map((v) => v.bakesNumber)}
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
                        name="bakesFile"
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
        </Box>
      );
    }
  };

  return (
    <Box>
      <Alert
        className={classes.alert}
        icon={<Information className={classes.alertIcon} />}
      >
        <Typography color="primary-main" variant="subtitle1">
          <span dangerouslySetInnerHTML={{ __html: alertText.document }} />
        </Typography>
      </Alert>
      <Grid container justifyContent="space-between" spacing={5}>
        <Grid item md={5} xs={12}>
          <Box mb={3} mt={4}>
            <Typography color="general-mid" variant="h4" weight="medium">
              Document
            </Typography>
          </Box>
          <Select
            asyncProps={agreementAsyncProps}
            cacheOptions
            control={control}
            defaultOptions
            helperText="Check Agreement Number on Agreement document"
            isSearchable
            label="Master Agreement Number"
            maxWidth="100%"
            menuWidth={290}
            name="agreementMasterNumber"
            placeholder="Choose Master Agreement Number"
            rawValue
            required
          />
          <Box mt={2}>{uploadBakesForm()}</Box>
          <SelectDatePicker
            control={control}
            disabled={!agreeNumber?.data?.startDate}
            maxDate={moment(agreeNumber?.data?.endDate)}
            menuLabel="BAKES Start Date"
            // minDate={moment(agreeNumber?.data?.startDate)}
            minDate={moment()} // change to current date
            name="bakesStartDate"
            required
          />
          <Box my={1}>
            <SelectDatePicker
              control={control}
              disabled={!agreeNumber?.data?.endDate}
              maxDate={moment(agreeNumber?.data?.endDate)}
              menuLabel="BAKES End Date"
              // minDate={bakesStartDate}
              minDate={moment(bakesStartDate).add(1, 'days')} // change to 1 day after start date
              name="bakesEndDate"
              required
            />
          </Box>
          <Box mt={1}>
            <Grid alignItems="center" container spacing={2}>
              <Grid item md={8}>
                <TextField
                  control={control}
                  disabled
                  label="BAKES Duration"
                  name="bakesDuration"
                  required
                  type="number"
                />
              </Grid>
              <Grid item>
                <Typography
                  children="month"
                  color="general-mid"
                  variant="body2"
                />
              </Grid>
            </Grid>
          </Box>
          <Grid alignItems="center" container spacing={2}>
            <Grid item md={8}>
              <TextField
                control={control}
                label="TTD BAKES Days"
                name="ttdBakesDays"
                required
                type="number"
              />
            </Grid>
            <Grid item>
              <Typography children="days" color="general-mid" variant="body2" />
            </Grid>
          </Grid>
          <Box my={2}>
            <TextField
              control={control}
              helperText="Check Purchase Order Number on PO document"
              label="PO Number (On Document)"
              maxLength={20}
              name="purchaseOrderNumber"
              required
            />
          </Box>
          <Box my={2}>
            <TextField
              control={control}
              label="PO Signer Name"
              maxLength={20}
              name="purchaseOrderSignerName"
              required
            />
          </Box>
          <SelectDatePicker
            control={control}
            helperText="Check Purchase Order Date on PO document"
            menuLabel="PO Date (On Document)"
            minDate={bakesStartDate || moment(agreeNumber?.data?.startDate)}
            name="purchaseOrderDate"
            required
          />
          <Box my={1}>
            <SelectDatePicker
              control={control}
              menuLabel="Expected Delivery Date"
              name="expectedDeliveryDate"
              required
            />
          </Box>
          <TextField
            control={control}
            label="Agreement Note"
            maxLength={160}
            minRows={4}
            multiline
            name="bakesNote"
          />
        </Grid>
        <Grid item md={7} xs={12}>
          <Box mb={4} mt={4}>
            <Typography color="general-mid" variant="h4" weight="medium">
              Additional File
            </Typography>
          </Box>
          <FileUpload
            accept={['.pdf']}
            control={control}
            fetcher={postUploadFile}
            helperText="Upload .pdf document, max 5 MB "
            maxSize={5242880}
            name="agreementDocument"
            placeholder="Example: agreement.pdf"
          />
          <Box mb={4} mt={4}>
            <Typography color="general-mid" variant="h4" weight="medium">
              Preview File
            </Typography>
          </Box>
          <SectionAttachment data={data} schema={schema} />
        </Grid>
      </Grid>
    </Box>
  );
};

Document.defaultProps = {
  control: {},
  data: {},
  state: {
    optionsAgreementNumber: [],
  },
};

Document.propTypes = {
  control: PropTypes.object,
  data: PropTypes.object,
  state: PropTypes.object,
};

export default Document;
