import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Typography from '@components/Typography';
import useStyles from './styles';

const EstimateValue = (props) => {
  const { data } = props;

  const classes = useStyles();

  const content = {
    'CUSTOMER REQUEST': {
      title: (
        <Typography
          children="Email automatically sended to CSDA and Network Delivery"
          variant="h4"
          weight="medium"
        />
      ),
      info: (
        <Typography variant="subtitle1">
          Please follow up the email to CSDA and Network Delivery directory by offline communication
          using WhatsApp and if get latest information about system has been
          integrated, please click button{' '}
          <Typography variant="subtitle1" weight="bold">
            Integrate
          </Typography>{' '}
          and contact the relevant Customer.
        </Typography>
      ),
    },
    INTEGRATED: {
      title: (
        <Typography
          children="MRTG succesfully integrated"
          variant="h4"
          weight="medium"
        />
      ),
      info: (
        <Typography variant="subtitle1">
          Please follow up this information to Customer. Leave this message if
          already following up.
        </Typography>
      ),
      note: (
        <Typography variant="subtitle1">
          Note: &ldquo;{data?.noteIntegrated || '-'}&rdquo;
        </Typography>
      ),
    },
  }[data?.status];

  return (
    <Grid className={classes.docValue} container spacing={2}>
      {content?.title && (
        <Grid align="center" item xs={12}>
          {content.title}
        </Grid>
      )}
      {content?.info && (
        <Grid align="center" item xs={12}>
          {content.info}
        </Grid>
      )}
      {content?.note && (
        <Grid align="center" item xs={12}>
          {content.note}
        </Grid>
      )}
    </Grid>
  );
};

EstimateValue.propTypes = {
  data: PropTypes.object.isRequired,
};

export default EstimateValue;
