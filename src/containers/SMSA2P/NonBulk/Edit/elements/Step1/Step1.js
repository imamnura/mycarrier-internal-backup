import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import { TextField, Select } from '@components/FormField';
import { Box, Grid } from '@material-ui/core';
import Card from '@components/Card/Card';

const Component = (props) => {
  const { control, options } = props;

  return (
    <Grid container spacing={2}>
      <Grid item sm={6} xs={12}>
        <Card title="Non Bulk Form" style={{ marginTop: 24 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box mt={1}>
                <TextField
                  control={control}
                  label="Company Name"
                  maxLength={255}
                  name="companyName"
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mt={1}>
                <TextField
                  control={control}
                  label="Brands Name"
                  maxLength={255}
                  name="brandName"
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mt={1}>
                <Select
                  control={control}
                  label="Industry Category"
                  name="industryCategory"
                  options={options.industryCategory}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mt={1}>
                <TextField
                  control={control}
                  label="Campaign Name"
                  maxLength={255}
                  name="campaignName"
                  required
                />
                <Typography color="general-mid" variant="caption">
                  Please make sure the campaign name on sales force id is
                  different from the one will be inputed.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mt={1}>
                <Select
                  control={control}
                  isDisabled
                  label="Campaign Type"
                  name="campaignType"
                  options={options.campaignType}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mt={1}>
                <Select
                  control={control}
                  isDisabled
                  label="Channel"
                  name="channel"
                  options={options.channel}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mt={1}>
                <TextField
                  control={control}
                  label="Whitelist and UAT Internal"
                  maxLength={255}
                  name="whitelistUATInternal"
                />
                <Typography color="general-mid" variant="caption">
                  Maximum of 10 test numbers and separators using commas.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mt={1}>
                <TextField
                  control={control}
                  label="Whitelist and UAT External"
                  maxLength={255}
                  name="whitelistUATExternal"
                />
                <Typography color="general-mid" variant="caption">
                  Maximum of 10 test numbers and separators using commas.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

Component.defaultProps = {
  options: {},
};

Component.propTypes = {
  control: PropTypes.object.isRequired,
  options: PropTypes.object,
};

export default Component;
