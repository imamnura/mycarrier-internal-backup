import Button from '@components/Button';
import DatePicker from '@components/DatePicker';
import Typography from '@components/Typography';
import { Box, Grid } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';
import { rupiahFormat } from '@utils/parser';

const Action = (props) => {
  const classes = useStyles();
  const { data, period, handlePeriod, onDownload } = props;
  return (
    <Grid
      alignItems="center"
      className={classes.actionBox}
      container
      spacing={2}
    >
      <Grid item md={6} xs={12}>
        <Box>
          <Typography variant="body1">
            {data?.userInformation?.companyName}
          </Typography>
          <Box className={classes.circleDivider} />
          <Typography color="blue-main" variant="body1">
            {data?.userInformation?.billingEmail}
          </Typography>
        </Box>
        <Box alignItems="center" display="flex" flexWrap="wrap" mt={1}>
          <Typography color="general-main" variant="h4">
            Total Usage
          </Typography>
          <Box
            color="general-dark"
            component={Typography}
            sx={{ marginLeft: 15, marginRight: 15 }}
            variant="h4"
            weight="medium"
          >
            {rupiahFormat(data?.totalUsage)}
          </Box>
          {!!data.totalUsage && (
            <Button onClick={onDownload}>Download Pdf</Button>
          )}
        </Box>
      </Grid>
      <Box component={Grid} display={{ xs: 'none', md: 'block' }} item md={1}>
        <Box className={classes.divider} />
      </Box>
      <Grid item md={5} xs={12}>
        <DatePicker
          format="MMMM YYYY"
          label="Select Period"
          minDate="2020/01/01"
          onChange={handlePeriod}
          openTo="month"
          value={period}
          views={['year', 'month']}
        />
      </Grid>
    </Grid>
  );
};

Action.defaultProps = {
  data: {},
  period: null,
};

Action.propTypes = {
  data: PropTypes.object,
  handlePeriod: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  period: PropTypes.string,
};

export default Action;
