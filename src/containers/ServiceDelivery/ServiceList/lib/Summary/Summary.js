import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import CardSummary from '@components/CardSummary';
import useResponsive from '@utils/hooks/useResponsive';
import useStyles from './styles';

const ServiceList = ({ schema }) => {
  const classes = useStyles();
  const mobileClient = useResponsive('xs');

  return (
    <Box mb={3} mt={3}>
      <Grid container justifyContent="space-between" spacing={2}>
        {schema.map(({ useDivider = false, sm, ...value }, i) => (
          <Grid alignItems="center" container item key={i} md sm={sm} xs={12}>
            <Grid item>
              {!!i && useDivider && !mobileClient && (
                <div className={classes.actionDivider} />
              )}
            </Grid>
            <Grid item md sm xs={12}>
              <CardSummary {...value} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

ServiceList.defaultProps = {
  schema: [],
};

ServiceList.propTypes = {
  schema: PropTypes.array,
};

export default ServiceList;
