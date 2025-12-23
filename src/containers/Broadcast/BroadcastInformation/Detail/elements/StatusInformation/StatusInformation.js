import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import { Box, Grid } from '@material-ui/core';
import Typography from '@components/Typography';

export const CardStatus = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.baseBox}>
      <div className={classes.title}>
        <Typography variant="subtitle2" weight="medium">
          {props.title}
        </Typography>
      </div>
      <div className={classes.content}>
        <Typography variant="h3" weight="medium">
          {props.content}
        </Typography>
      </div>
    </div>
  );
};

CardStatus.defaultProps = {
  content: '',
  title: '',
  variant: 'info',
};

CardStatus.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  variant: PropTypes.oneOf(['info', 'warning', 'success', 'alert', 'danger']),
};

const StatusInformation = (props) => {
  const { data } = props;
  return (
    <Box mt={-4}>
      <Grid container spacing={2}>
        <Grid item lg={2} md={3} sm={3} xs={6}>
          <CardStatus
            content={data.submitted}
            title="Submitted"
            variant="info"
          />
        </Grid>
        <Grid item lg={2} md={3} sm={3} xs={6}>
          <CardStatus
            content={data.delivered}
            title="Delivered"
            variant="alert"
          />
        </Grid>
        <Grid item lg={2} md={3} sm={3} xs={6}>
          <CardStatus content={data.read} title="Read" variant="success" />
        </Grid>
        <Grid item lg={2} md={3} sm={3} xs={6}>
          <CardStatus
            content={data.inQueue}
            title="In Queue"
            variant="warning"
          />
        </Grid>
        <Grid item lg={2} md={3} sm={3} xs={6}>
          <CardStatus content={data.failed} title="Failed" variant="danger" />
        </Grid>
        <Grid item lg={2} md={3} sm={3} xs={6}>
          <CardStatus
            content={data.rejected}
            title="Rejected"
            variant="danger"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

StatusInformation.defaultProps = {
  data: {
    delivered: '0',
    failed: '0',
    inQueue: '0',
    read: '0',
    rejected: '0',
    submitted: '0',
  },
};

StatusInformation.propTypes = {
  data: PropTypes.object,
};

export default StatusInformation;
