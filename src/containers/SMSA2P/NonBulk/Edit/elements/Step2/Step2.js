import React from 'react';
import PropTypes from 'prop-types';
import { OTPInput } from '@components/FormField';
import { Box, Grid } from '@material-ui/core';
import DetailedList from '@components/DetailedList';
import { schema } from './constant';
import Card from '@components/Card/Card';

const Component = (props) => {
  const { control, detailedCampaign } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card title="Campaign Order" style={{ marginTop: 24 }}>
          <Box mt={1}>
            <OTPInput
              control={control}
              helperText="Case sensitive, with min. 3 and max. 11 characters"
              label="Sender ID/Masking"
              maxLength={11}
              name="senderId"
              required
            />
          </Box>
        </Card>
        <Card title="Campaign List" style={{ marginTop: 24 }}>
          <Box mt={1}>
            <DetailedList data={detailedCampaign} schema={schema} />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

Component.defaultProps = {
  detailedCampaign: [],
};

Component.propTypes = {
  control: PropTypes.object.isRequired,
  detailedCampaign: PropTypes.array,
};

export default Component;
