/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete, Select, TextField } from '@components/FormField';
import { Box, Grid } from '@material-ui/core';
import Typography from '@components/Typography';
import { removePhoneSpace } from '@utils/parser';
import ArrowDown from '@assets/Svg/ArrowDown';
import Information from '@assets/icon-v2/Information';
import { Alert } from '@material-ui/lab';
import useStyles from './styles';
import { alertText } from '../../utils';
import useAction from './hooks/useActions';

const CustomerInfo = (props) => {
  const { control, state } = props;
  const classes = useStyles();

  const { loadingBillingAccount, loadingServiceAccount } = state;

  const { optionsServiceAccount, optionsBillingAccount, watchBillingAccount } =
    useAction(props);

  return (
    <Box>
      <Alert
        className={classes.alert}
        icon={<Information className={classes.alertIcon} />}
      >
        <Typography color="primary-main" variant="subtitle1">
          <span dangerouslySetInnerHTML={{ __html: alertText.customerInfo }} />
        </Typography>
      </Alert>
      <Grid container md={6} spacing={1} xs={12}>
        <Grid item xs={12}>
          <Box mb={2} mt={4}>
            <Typography color="general-mid" variant="h4" weight="medium">
              Customer Information
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            control={control}
            disabled
            label="Company Name"
            maxLength={50}
            name="custAccntName"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <AutoComplete
            control={control}
            label="Billing Account"
            loading={loadingBillingAccount}
            name="billingAccount"
            options={optionsBillingAccount}
            required
            rightAdornment={ArrowDown}
          />
        </Grid>
        <Grid item xs={12}>
          <AutoComplete
            control={control}
            disabled={!watchBillingAccount}
            label="Service Account"
            loading={!watchBillingAccount ? false : loadingServiceAccount}
            name="serviceAccount"
            options={optionsServiceAccount}
            required
            rightAdornment={ArrowDown}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            control={control}
            isSearchable
            label="Business Type"
            maxWidth="100%"
            menuWidth={280}
            name="businessType"
            options={[
              { label: 'Game Publishers', value: 'Game Publishers' },
              {
                label: 'OLO (Other License Operation)',
                value: 'OLO (Other License Operation)',
              },
              { label: 'Enterprise', value: 'Enterprise' },
              { label: 'System Integration', value: 'System Integration' },
              { label: 'ISP/NSP/Telco', value: 'ISP/NSP/Telco' },
              { label: 'Others', value: 'Others' },
            ]}
            placeholder="Choose Business Type"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Box mb={2} mt={4}>
            <Typography color="general-mid" variant="h4" weight="medium">
              Contact Information
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            control={control}
            label="Full Name"
            maxLength={40}
            name="name"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            control={control}
            label="Job Title"
            maxLength={40}
            name="jobTitle"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            control={control}
            label="Email"
            maxLength={80}
            name="email"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            control={control}
            label="Mobile Phone"
            maxLength={14}
            name="phone"
            required
            valueMasking={removePhoneSpace}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

CustomerInfo.defaultProps = {
  control: {},
  state: {
    optionsBillingAccount: [],
    optionsServiceAccount: [],
  },
};

CustomerInfo.propTypes = {
  control: PropTypes.object,
  state: PropTypes.object,
};

export default CustomerInfo;
